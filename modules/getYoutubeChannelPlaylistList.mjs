//surfyt-api
// > CHANNEL PLAYLIST
//  • • • • • • • • • • • • • • • • • • • • • • • •

import Axios from "axios";
import getInitialData from "./_getInitialData.mjs";
import * as Utils from "./_Utils.mjs";
import { youtubeEndpoints } from "./YouTubeEndpoints.mjs";
import * as YTP from "./YouTubePaths.mjs";

// imports for documentation purpose
import { youtubeLocations } from "./AvailableLocationsOnYoutube.mjs";
import { youtubeLanguages } from "./AvailableLanguagesOnYoutube.mjs";

/** Get YouTube Channel playlist URL list 
 * 
 * @param {string} channelURL 
 * @param {{
 *   limit      ?: number  | undefined,   
 *   location                           ?: string  | undefined,
 *   language                           ?: string  | undefined,
 *   bypassLocationAndLanguageChecking  ?: boolean | undefined,
 *   logLocationAndLanguage             ?: boolean | undefined
 * }} options - (optionals) To change request behaviours.
 * > \<\< Default `options` parameters \>\>
 * * `limit ?: undefined` no limit
 * 
 * > \<\< Additionnal optional parameters \>\>
 * * `location` and `language` are chosen by default by Google through IP location. 
 * You can check valid parameters in the librairy files {@link youtubeLocations} and {@link youtubeLanguages} ;
 * * You can `bypassLocationAndLanguageChecking: true` and input what you wish but **the website** will 
 * ignore it if wrong and apply its default values ;
 * * You can check what values are applied by Google with `logLocationAndLanguage: true`,
 * that will output a string in your Logs ;
 * 
 * > *Be aware it will not bypass bans/restrictions by Google based on IP or IP location.
 * It's only for more customised display of content.*
 *  
 * @returns {Promise<{
 *   type : string,
 *   url  : string
 * }[]>}
 */
export async function getYoutubeChannelPlaylistList(
    channelURL,
    options = {
    }
) {
    return await new Promise(async (resolve, reject) => {
        // INIT PARAMETERS
        const limit = (options.limit !== undefined && options.limit !== false) ? Math.max(0, options.limit) : -1;

        const o = new Utils.coreObject(
            false,
            false,
            false,
            false,
            true
        );

        const youtubeLink = Utils.analyseYoutubeURL(channelURL);

        if ((limit == 0) || (youtubeLink.TYPE !== 'usercontent')) resolve([]);

        const [gl, hl] = options.bypassLocationAndLanguageChecking ? [options.location, options.language] : Utils.checkLocationAndLanguage(options.location, options.language);
        try {

            // FIRST PAGE
            const firstPlaylistPage = await getInitialData(youtubeEndpoints.addLocationAndOrLanguage(youtubeEndpoints.playlistsOfAYoutubeChannel(youtubeLink.URL), gl, hl, '?'));
            const apiKey = firstPlaylistPage.apiKey;

            Utils.seekFor(firstPlaylistPage.ytInitialData, YTP.COLLECTION__RESULTS_CONTENTS).forEach(function (content) {
                sortYoutubeCollectionContent(content, o);
            });

            o.previousContext = { context: firstPlaylistPage.context, continuation: o.continuationToken };

            // LOG LOCATION AND LANGUAGE IF REQUESTED   //##LOG
            if (options.logLocationAndLanguage) Utils.logLocationAndLanguage(
                Utils.seekFor(firstPlaylistPage.context, YTP.HOME__LOCATION),
                Utils.seekFor(firstPlaylistPage.context, YTP.HOME__LANGUAGE),
                "Channel Playlist List"
            );

            // SCROLLING
            while (((o.items.length < limit) || (limit == -1)) && o.continuationToken && o.previousContext && (o.numberOfUnfructfulPages > 0)) {
                o.previousItemsLength = o.items.length;

                const nextUploadsPage = await Axios.post(
                    Utils.fixedEncodeURI(youtubeEndpoints.nextBrowse(apiKey)),
                    o.previousContext
                );

                o.continuationToken = null;

                Utils.seekFor(nextUploadsPage, YTP.PLAYLIST__RESULTS_NEXT_CONTENTS).forEach(function (item) {
                    sortYoutubeCollectionContent(item, o);
                });

                if (o.previousItemsLength == o.items.length) o.numberOfUnfructfulPages--;
                else o.numberOfUnfructfulPages = 1;
                o.previousContext.continuation = o.continuationToken;
            }
        } catch (error) {
                reject("Can't get data from YouTube for Channel playlist list");
        }

        // RETURN
        const items = limit == -1 ? o.items : o.items.slice(0, limit);
        resolve(items || []);
    });
}

//  • • • • • • • • • • • • • • • • • • • • • • • •
//  << ITEM SORTING >>

function sortYoutubeCollectionContent(content, o) {
    const playlistID        = Utils.seekFor(content, YTP.COLLECTION_ITEM__PLAYLIST_ID);
    const continuationToken = Utils.seekFor(content, YTP.COLLECTION__CONTINUATION);

    Utils.sortItem(o, null, playlistID, null, null, null, continuationToken);
}

