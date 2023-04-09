//surfyt-api
// > HOMEPAGE CONTENT
//  • • • • • • • • • • • • • • • • • • • • • • • •

import * as Methods from './_methods.mjs';
import getInitialData from "./_getInitialData.mjs";
import * as Utils from "./_Utils.mjs";
import { youtubeEndpoints } from "./YouTubeEndpoints.mjs";
import * as YTP from "./YouTubePaths.mjs";

// imports for documentation purpose
import { youtubeLocations } from "./AvailableLocationsOnYoutube.mjs";
import { youtubeLanguages } from "./AvailableLanguagesOnYoutube.mjs";

/** Get the content of the YouTube Homepage
 * 
 * @param {{
 *   showVideos     ?: boolean | undefined,
 *   showShorts     ?: boolean | undefined,
 *   showPlaylists  ?: boolean | undefined,
 *   limit          ?: number  | undefined,   
 *   location                           ?: string  | undefined,
 *   language                           ?: string  | undefined,
 *   bypassLocationAndLanguageChecking  ?: boolean | undefined,
 *   logLocationAndLanguage             ?: boolean | undefined
 * }} options - (optionals) To change request behaviours.
 * > \<\< Default `options` parameters \>\>
 * * `showVideos ?: true`
 * * `showLives ?: false`
 * * `showPlaylists ?: false`
 * * `limit ?: 100`
 * 
 * > \<\< Additionnal optional parameters \>\>
 * * `location` and `language` are chosen by default by Google through IP location. 
 * You can check valid parameters in the library files {@link youtubeLocations} and {@link youtubeLanguages} ;
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
 * }[]>} An array of objects with two properties : the `type` of Youtube content 
 * (`video|livestream|playlist`) and the `url`
 */
export async function getYoutubeHomepageList(
    options = {
        showVideos: true,
        limit: 100,
    }
) {
    return await new Promise(async (resolve, reject) => {
        // INIT PARAMETERS
        const limit = (options.limit !== undefined && options.limit !== false) ? Math.max(0, options.limit) : -1;

        const o = new Utils.coreObject(
            options.showVideos      || false,
            false,
            options.showLives       || false,
            false,
            options.showPlaylists   || false,
        );


        if ((!o.showVideos && !o.showShorts && !o.showLives) || (limit == 0)) resolve([]);

        const [gl, hl] = options.bypassLocationAndLanguageChecking ? [options.location, options.language] : Utils.checkLocationAndLanguage(options.location, options.language);

        try {
            // FIRST PAGE
            const firstHomePage = await getInitialData(youtubeEndpoints.addLocationAndOrLanguage(youtubeEndpoints.homepage(), gl, hl, '?'));;
            const apiKey = firstHomePage.apiKey;

            Utils.seekFor(firstHomePage.ytInitialData, YTP.HOME__RESULTS_CONTENTS).forEach(function (content) {

                sortYoutubeHomepageContent(content, o);
            });

            o.previousContext = { context: firstHomePage.context, continuation: o.continuationToken };

            // LOG LOCATION AND LANGUAGE IF REQUESTED   //##LOG
            if (options.logLocationAndLanguage) Utils.logLocationAndLanguage(
                Utils.seekFor(firstHomePage.context, YTP.HOME__LOCATION),
                Utils.seekFor(firstHomePage.context, YTP.HOME__LANGUAGE),
                "Homepage"
            );

            // SCROLLING
            while (((o.items.length < limit) || (limit == -1)) && o.continuationToken && o.previousContext && (o.numberOfUnfructfulPages > 0)) {
                o.previousItemsLength = o.items.length;

                const nextHomePage = await Methods.post(
                    Utils.fixedEncodeURI(youtubeEndpoints.nextBrowse(apiKey)),
                    o.previousContext
                );

                o.continuationToken = null;
                Utils.seekFor(nextHomePage, YTP.HOME__RESULTS_NEXT_CONTENTS).forEach(function (item) {
                    sortYoutubeHomepageContent(item, o);
                });

                if (o.previousItemsLength == o.items.length) o.numberOfUnfructfulPages--;
                else o.numberOfUnfructfulPages = 1;
                o.previousContext.continuation = o.continuationToken;
            }
        } catch (error) {
            console.warn(error);
            reject("Can't get data from YouTube for Homepage content");
        }

        // RETURN
        const items = limit == -1 ? o.items : o.items.slice(0, limit);
        resolve(items);
    });
}

//  • • • • • • • • • • • • • • • • • • • • • • • •
//  << ITEM SORTING >>

function sortYoutubeHomepageContent(content, o) {
    const videoID           = Utils.seekFor(content, YTP.HOME_ITEM__VIDEO_ID);
    const isLive            = (Utils.seekFor(content, YTP.HOME_ITEM__VIDEO_LIVE_BADGE) === YTP.LIVE_BADGE);
    const continuationToken = Utils.seekFor(content, YTP.HOME__CONTINUATION);

    Utils.sortItem(o, videoID, null, null, isLive, null, continuationToken);
}

