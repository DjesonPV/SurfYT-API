//surfyt-api
// > SEARCH YOUTUBE FOR
//  • • • • • • • • • • • • • • • • • • • • • • • •

import * as Utils from "./_Utils.mjs";
import getInitialData from "./_getInitialData.mjs";
import Axios from "axios";
import { youtubeEndpoints } from "./YouTubeEndpoints.mjs";
import * as YTP from "./YouTubePaths.mjs";

// imports for documentation purpose
import { youtubeLocations } from "./AvailableLocationsOnYoutube.mjs";
import { youtubeLanguages } from "./AvailableLanguagesOnYoutube.mjs";

/** Allows you to search for queries as if you were typing in https://www.youtube.com search bar.
 * 
 * /!\ **Default behaviour** is to output **only the first** ***video*** result.
 *
 * 
 * *Disclaimer :* When searching for a specific item like channels, you will have less 
 * results than requested because the search will automatically stops if nothing else is
 * found in the next result pages or if the `max` amount of YouTube items read is reached.
 * @async
 * @param {string} query - Text you want to search YouTube for.
 * @param {{
 *   showVideos     ?: boolean | undefined,
 *   showShorts     ?: boolean | undefined,
 *   showLives      ?: boolean | undefined,
 *   showChannels   ?: boolean | undefined,
 *   showPlaylists  ?: boolean | undefined,
 *   limit          ?: number  | undefined,   
 *   max            ?: number  | undefined,
 *   location                           ?: string  | undefined,
 *   language                           ?: string  | undefined,
 *   bypassLocationAndLanguageChecking  ?: boolean | undefined,
 *   logLocationAndLanguage             ?: boolean | undefined
 * }} options - (optionals) To change request behaviours.
 * > \<\< Default `options` parameters \>\>
 * * `showVideos ?: true`
 * * `showShorts ?: true`
 * * `showLives ?: false`
 * * `showChannels ?: false`
 * * `showPlaylists ?: false`
 * * `limit ?: 1`
 * * `max: 100` - Max number of Youtube results we'll look for the ones we want. 
 * For reference, a Youtube results page is 20 results.
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
 * (`video|short|livestream|channel|playlist`) and the `url`
 * 
 */
export async function searchYoutubeFor(
    query,
    options = {
        showVideos: true,
        limit: 1,
    }
) {
    return await new Promise(async (resolve, reject) => {
        // INIT PARAMETERS
        const max   = (options.max !== undefined) && (options.max !== false) ? Math.max(0, options.max) : 100;
        const limit = (options.limit !== undefined) && (options.limit !== false) ? Math.min(Math.max(0, options.limit), max) : 1;

        const o = new Utils.coreObject(
            options.showVideos      || false,
            options.showShorts      || false,
            options.showLives       || false,
            options.showChannels    || false,
            options.showPlaylists   || false,
            5
        );

        // If nothing should be return, or if there is no query, or if the list must be empty
        if ((!o.showVideos && !o.showChannels && !o.showPlaylists && !o.showLives && !o.showShorts && query) || !query || (limit == 0))
            resolve([]);
        // Return an empty array

        const [gl, hl] = options.bypassLocationAndLanguageChecking ? [options.location, options.language] : Utils.checkLocationAndLanguage(options.location, options.language);

        try {
            // FIRST PAGE RESULTS
            //console.log(youtubeEndpoints.addLocationAndOrLanguage(youtubeEndpoints.search(query), gl, hl, '&'));
            const firstPageOfResults = await getInitialData(youtubeEndpoints.addLocationAndOrLanguage(youtubeEndpoints.search(query), gl, hl, '&'));

            const apiKey = firstPageOfResults.apiKey;

            Utils.seekFor(firstPageOfResults.ytInitialData, YTP.SEARCH__RESULTS_CONTENTS).forEach(function (content) {
                sortYoutubeSearchContent(content, o);
            });

            o.previousContext = { context: firstPageOfResults.context, continuation: o.continuationToken };

            // LOG LOCATION AND LANGUAGE IF REQUESTED   //##LOG
            if (options.logLocationAndLanguage) Utils.logLocationAndLanguage(
                Utils.seekFor(firstPageOfResults.context, YTP.SEARCH__LOCATION),
                Utils.seekFor(firstPageOfResults.context, YTP.SEARCH__LANGUAGE),
                "Search For"
            );

            // SCROLLING THROUGH FOR MORE RESULTS
            while ((o.items.length < limit) && o.continuationToken && o.previousContext && (o.numberOfUnfructfulPages > 0) && (o.numberOfSearchResultsSorted < max)) {
                o.previousItemsLength = o.items.length;

                const nextPageOfResults = await Axios.post(
                    Utils.fixedEncodeURI(youtubeEndpoints.nextSearch(apiKey)),
                    o.previousContext
                );

                // Set to null, to avoid repeated requests
                o.continuationToken = null;

                // Get next items and continuation token
                Utils.seekFor(nextPageOfResults, YTP.SEARCH__RESULTS_NEXT_CONTENTS).forEach(function (content) {
                    sortYoutubeSearchContent(content, o);
                });

                // check if new items were picked, to choose
                if (o.previousItemsLength == o.items.length) o.numberOfUnfructfulPages--;
                else o.numberOfUnfructfulPages = max;

                o.previousContext.continuation = o.continuationToken;
            }
        } catch (error) {
            reject("Can't get data for this search");
        };

        // RETURN
        const items = o.items.slice(0, limit);
        resolve(items || []);

    });
}

//  • • • • • • • • • • • • • • • • • • • • • • • •
//  << ITEM SORTING >>

/*
  This one need another forEach be cause for youtube search request the continuation token is outside of
  the item list
    contents = [ itemList[], continuation]

  Whereas for the browse request the continuation is next to the items
    contents = [...itemList, continuation]

*/
function sortYoutubeSearchContent(content, o) {
    const contents = Utils.seekFor(content, YTP.SEARCH_ITEMS);

    if (contents) {
        contents.forEach(function (item) {

            const videoID       = Utils.seekFor(item, YTP.SEARCH_ITEM__VIDEO_ID);
            const playlistID    = Utils.seekFor(item, YTP.SEARCH_ITEM__PLAYLIST_ID);
            const channelURL    = Utils.seekFor(item, YTP.SEARCH_ITEM__CHANNEL_URL);
            const isLive        = (Utils.seekFor(item, YTP.SEARCH_ITEM__VIDEO_LIVE_BADGE) == YTP.LIVE_BADGE);
            const isShort       = (Utils.seekFor(item, YTP.SEARCH_ITEM__VIDEO_SHORT_TYPE) == YTP.SHORTS_TYPE);

            Utils.sortItem(o, videoID, playlistID, channelURL, isLive, isShort, null);
        })
    } else {
        const continuationToken = Utils.seekFor(content, YTP.SEARCH__CONTINUATION_TOKEN);
        Utils.sortItem(o, null, null, null, null, null, continuationToken);
    }
}
