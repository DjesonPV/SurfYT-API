//surfyt-api
// > PLAYLIST
//  • • • • • • • • • • • • • • • • • • • • • • • •

import * as Methods from './_methods.mjs';
import getInitialData from "./_getInitialData.mjs";
import * as Utils from "./_Utils.mjs";
import { youtubeEndpoints } from "./YouTubeEndpoints.mjs";
import * as YTP from "./YouTubePaths.mjs";

// imports for documentation purpose
import { youtubeLocations } from "./AvailableLocationsOnYoutube.mjs";
import { youtubeLanguages } from "./AvailableLanguagesOnYoutube.mjs";

/** Return an array containing all of the **public videos** URLs of a YouTube playlist.
 * * Currently, YouTube playlists can go up to 5,000 videos.
 * * But there is a major exception : channel "watch all videos" playlists (which is the same than the `/videos` tab)
 * * In that special case, if you wish you can disable the hard-coded limit of this function with the option
 * `isItThePlaylistOfAllVideosOfAChannel` if you accept the simple fact it could load for a lot of time depending on the channel.
 * 
 * @async
 * @param {string} url URL of a YouTube playlist
 * @param {{
 *   limit?      : number  | undefined,
 *   showVideos? : boolean | undefined,
 *   showShorts? : boolean | undefined,
 *   showLives?  : boolean | undefined,
 *   location                           ?: string  | undefined,
 *   language                           ?: string  | undefined,
 *   bypassLocationAndLanguageChecking  ?: boolean | undefined,
 *   logLocationAndLanguage             ?: boolean | undefined
 * }} options - (optionals) To change request behaviours.
 * > \<\< Default `options` parameters \>\>
 * * `showVideos ?: true`
 * * `showShorts ?: true`
 * * `showLives ?: false`
 * * `limit ?: 100` Can be up to 5000
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
 * @returns {Promise<string[]>} An array of YouTube video URLs
 */
export async function getYoutubePlaylistContentList(
    playlistURL,
    options = {
        showVideos: true,
        showShorts: true,
        showLives: true,
        limit: 100,
    }
) {
    return await new Promise(async (resolve, reject) => {
        // INIT PARAMETERS
        const limit = (options.limit !== undefined) && (options.limit !== false) ? Math.min(Math.max(0, options.limit), 5000) : -1;

        const o = new Utils.coreObject(
            options.showVideos || false,
            options.showShorts || false,
            options.showLives || false,
        );

        const youtubeLink = Utils.analyseYoutubeURL(playlistURL);

        if ((limit == 0) || (!o.showVideos && !o.showLives && !o.showShorts) || (youtubeLink.TYPE !== 'contentlist')) resolve([]);

        const [gl, hl] = options.bypassLocationAndLanguageChecking ? [options.location, options.language] : Utils.checkLocationAndLanguage(options.location, options.language);

        try {
            // FIRST PAGE RESULTS
            const firstPageOfPlaylist = await getInitialData(youtubeEndpoints.addLocationAndOrLanguage(youtubeLink.URL, gl, hl, '&'));

            const apiKey = firstPageOfPlaylist.apiKey;

            Utils.seekFor(firstPageOfPlaylist.ytInitialData, YTP.PLAYLIST__RESULTS_CONTENTS).forEach(function (content) {
                sortYoutubePlaylistItem(content, o);
            });

            o.previousContext = { context: firstPageOfPlaylist.context, continuation: o.continuationToken };

            // LOG LOCATION AND LANGUAGE IF REQUESTED   //##LOG
            if (options.logLocationAndLanguage) Utils.logLocationAndLanguage(
                Utils.seekFor(firstPageOfPlaylist.context, YTP.SEARCH__LOCATION),
                Utils.seekFor(firstPageOfPlaylist.context, YTP.SEARCH__LANGUAGE),
                "Playlist List"
            );

            // SCROLLING TROUGH FOR MORE RESULTS
            while (((o.items.length < limit) || (limit == -1)) && o.continuationToken && o.previousContext && (o.numberOfUnfructfulPages > 0)) {
                o.previousItemsLength = o.items.length;

                const nextPageOfPlaylist = await Methods.post(
                    Utils.fixedEncodeURI(youtubeEndpoints.nextBrowse(apiKey)),
                    o.previousContext
                );

                o.continuationToken = null;

                Utils.seekFor(nextPageOfPlaylist, YTP.CHANNEL__RESULTS_NEXT_CONTENTS).forEach(function (item) {
                    sortYoutubePlaylistItem(item, o);
                });

                if (o.previousItemsLength == o.items.length) o.numberOfUnfructfulPages--;
                else o.numberOfUnfructfulPages = 1;
                o.previousContext.continuation = o.continuationToken;
            }
        } catch (error) {
            console.warn(error);
            reject("Can't get data from YouTube for Playlist Content");
        }

        // RETURN
        const items = limit == -1 ? o.items : o.items.slice(0, limit);
        resolve(items);
    });
}

//  • • • • • • • • • • • • • • • • • • • • • • • •
//  << ITEM SORTING >>

function sortYoutubePlaylistItem(item, o) {
    const videoID = Utils.seekFor(item, YTP.PLAYLIST_ITEM__VIDEO_ID);
    const isLive = (Utils.seekFor(item, YTP.PLAYLIST_ITEM__VIDEO_LIVE_BADGE) == YTP.LIVE_BADGE);
    const continuationToken = Utils.seekFor(item, YTP.PLAYLIST__CONTINUATION_TOKEN);

    Utils.sortItem(o, videoID, null, null, isLive, null, continuationToken);
}
