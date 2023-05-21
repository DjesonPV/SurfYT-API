//surfyt-api
// > VIDEO SUGGESTED CONTENT
//  • • • • • • • • • • • • • • • • • • • • • • • •

import * as Methods from './_methods.js';
import getInitialData from "./_getInitialData.js";
import * as Utils from "./_Utils.js";
import { youtubeEndpoints } from "./YouTubeEndpoints.js";
import * as YTP from "./YouTubePaths.js";

// imports for documentation purpose
import { youtubeLocations } from "./AvailableLocationsOnYoutube.js";
import { youtubeLanguages } from "./AvailableLanguagesOnYoutube.js";

/** Get the list of suggested YouTube content next to a YouTube video 
 * 
 * @async
 * @param {string} videoURL Valid YouTube Video or Live ID
 * @param {{
 *   showVideos     ?: boolean | undefined,
 *   showShorts     ?: boolean | undefined,
 *   showLives      ?: boolean | undefined,
 *   showPlaylists  ?: boolean | undefined,
 *   limit          ?: number  | undefined,
 *   location                           ?: string  | undefined,
 *   language                           ?: string  | undefined,
 *   bypassLocationAndLanguageChecking  ?: boolean | undefined,
 *   logLocationAndLanguage             ?: boolean | undefined
 * }} options - (optionals) To change request behaviours.
 * > \<\< Default `options` parameters \>\>
 * * `showVideos ?: true`
 * * `showShorts ?: true`
 * * `showLives ?: false`
 * * `showPlaylists ?: false`
 * * `limit ?: undefined` (no limit)
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
 * @returns {Promise<{
 *   type : string,
 *   url  : string
 * }[]>} An array of objects with two properties : the `type` of Youtube content 
 * (`video|short|livestream|playlist`) and the `url`
 */
export async function getYoutubeVideoSuggestedList(
    videoURL,
    options = {
        showVideos: true,
        limit: 10
    }
) {
    return await new Promise(async (resolve, reject) => {
        // INIT PARAMETERS
        const limit = (options.limit !== undefined && options.limit !== false) ? Math.max(0, options.limit) : -1;

        const o = new Utils.coreObject(
            options.showVideos      || false,
            options.showShorts      || false,
            options.showLives       || false,
            false, // show Channels
            options.showPlaylists   || false
        );

        const youtubeLink = Utils.analyseYoutubeURL(videoURL);

        if ((!o.showVideos && !o.showShorts && !o.showLives) || (youtubeLink.TYPE !== 'videolive') || (limit == 0)) resolve([]);

        const [gl, hl] = options.bypassLocationAndLanguageChecking ? [options.location, options.language] : Utils.checkLocationAndLanguage(options.location, options.language);

        try {
            // FIRST PAGE
            const firstSuggestedPage = await getInitialData(youtubeEndpoints.addLocationAndOrLanguage(youtubeLink.URL, gl, hl, '&'));;
            const apiKey = firstSuggestedPage.apiKey;

            Utils.seekFor(firstSuggestedPage.ytInitialData, YTP.SUGGESTED__RESULTS_CONTENTS).forEach(function (content) {
                sortYoutubeSuggestedContent(content, o);
            });

            o.previousContext = { context: firstSuggestedPage.context, continuation: o.continuationToken };

            // LOG LOCATION AND LANGUAGE IF REQUESTED   //##LOG
            if (options.logLocationAndLanguage) Utils.logLocationAndLanguage(
                Utils.seekFor(firstSuggestedPage.context, YTP.SUGGESTED__LOCATION),
                Utils.seekFor(firstSuggestedPage.context, YTP.SUGGESTED__LANGUAGE),
                "Suggested List"
            );

            // SCROLLING
            while (((o.items.length < limit) || (limit == -1)) && o.continuationToken && o.previousContext && (o.numberOfUnfructfulPages > 0)) {
                o.previousItemsLength = o.items.length;

                const nextSuggestedPage = await Methods.post(
                    Utils.fixedEncodeURI(youtubeEndpoints.nextSuggested(apiKey)),
                    o.previousContext
                );

                // Set to null, to avoid repeated requests
                o.continuationToken = null;

                Utils.seekFor(nextSuggestedPage, YTP.SUGGESTED__RESULTS_NEXT_CONTENTS).forEach(function (item) {
                    sortYoutubeSuggestedContent(item, o);
                });

                if (o.previousItemsLength == o.items.length) o.numberOfUnfructfulPages--;
                else o.numberOfUnfructfulPages = 1;
                o.previousContext.continuation = o.continuationToken;
            }

        } catch (error) {
            console.warn(error);
            reject("Can't get data from YouTube for Suggestion List");
        };

        // RETURN
        const items = limit == -1 ? o.items : o.items.slice(0, limit);
        resolve(items || []);
    });
}

//  • • • • • • • • • • • • • • • • • • • • • • • •
//  << ITEM SORTING >>

function sortYoutubeSuggestedContent(content, o) {
    const videoID           = Utils.seekFor(content, YTP.SUGGESTED_ITEM__VIDEO_ID);
    const playlistID        = Utils.seekFor(content, YTP.SUGGESTED_ITEM__PLAYLIST_ID);
    const isLive            = (Utils.seekFor(content, YTP.SUGGESTED_ITEM__VIDEO_LIVE_BADGE) === YTP.LIVE_BADGE);
    const continuationToken = Utils.seekFor(content, YTP.SUGGESTED__CONTINUATION);

    Utils.sortItem(o, videoID, playlistID, null, isLive, null, continuationToken);
}

