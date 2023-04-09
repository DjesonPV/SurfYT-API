//surfyt-api
// > CHANNEL UPLOADS
//  • • • • • • • • • • • • • • • • • • • • • • • •

import * as Methods from './_methods.mjs';
import getInitialData from "./_getInitialData.mjs";
import * as Utils from "./_Utils.mjs";
import { youtubeEndpoints } from "./YouTubeEndpoints.mjs";
import * as YTP from "./YouTubePaths.mjs";

// imports for documentation purpose
import { youtubeLocations } from "./AvailableLocationsOnYoutube.mjs";
import { youtubeLanguages } from "./AvailableLanguagesOnYoutube.mjs";

/** Get YouTube Channel upload content URL list 
 * 
 * @param {string} channelURL A valid YouTube Channel URL 
 * @param {{
 *   showVideos ?: boolean | undefined,
 *   showShorts ?: boolean | undefined,
 *   showLives  ?: boolean | undefined,
 *   limit      ?: number  | undefined,   
 *   location                           ?: string  | undefined,
 *   language                           ?: string  | undefined,
 *   bypassLocationAndLanguageChecking  ?: boolean | undefined,
 *   logLocationAndLanguage             ?: boolean | undefined
 * }} options - (optionals) To change request behaviours.
 * > \<\< Default `options` parameters \>\>
 * * `showVideos ?: true`
 * * `showShorts ?: false`
 * * `showLives ?: false`
 * * `limit ?: 100`
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
export async function getYoutubeChannelUploadList(
    channelURL,
    options = {
        limit: 100,
        showVideos: true,
        showShorts: true,
        showLives: true,
    }
) {
    return await new Promise(async (resolve, reject) => {
        // INIT PARAMETERS
        const limit = (options.limit !== undefined && options.limit !== false) ? Math.max(0, options.limit) : -1;

        const o = new Utils.coreObject(
            options.showVideos  || false,
            options.showShorts  || false,
            options.showLives   || false
        );

        const youtubeLink = Utils.analyseYoutubeURL(channelURL);

        if ((!o.showVideos && !o.showShorts && !o.showLives) || (youtubeLink.TYPE !== 'usercontent') || (limit == 0)) resolve([]);

        const [gl, hl] = options.bypassLocationAndLanguageChecking ? [options.location, options.language] : Utils.checkLocationAndLanguage(options.location, options.language);

        try {
            // FIRST PAGE
            const firstUploadsPage = await getInitialData(youtubeEndpoints.addLocationAndOrLanguage(youtubeEndpoints.videosOfAYoutubeChannel(youtubeLink.URL), gl, hl, '?'));
            const apiKey = firstUploadsPage.apiKey;

            console.log( Utils.seekFor(firstUploadsPage.ytInitialData, "contents.twoColumnBrowseResultsRenderer.tabs.find(tabRenderer#selected).tabRenderer.content.richGridRenderer.contents[0].richItemRenderer.content"));

            Utils.seekFor(firstUploadsPage.ytInitialData, YTP.CHANNEL__RESULTS_CONTENTS).forEach(function (content) {
                sortYoutubeChannelContent(content, o);
            });

            o.previousContext = { context: firstUploadsPage.context, continuation: o.continuationToken };

            // LOG LOCATION AND LANGUAGE IF REQUESTED   //##LOG
            if (options.logLocationAndLanguage) Utils.logLocationAndLanguage(
                Utils.seekFor(firstUploadsPage.context, YTP.HOME__LOCATION),
                Utils.seekFor(firstUploadsPage.context, YTP.HOME__LANGUAGE),
                "Channel Upload List"
            );


            // SCROLLING
            while (((o.items.length < limit) || (limit == -1)) && o.continuationToken && o.previousContext && (o.numberOfUnfructfulPages > 0)) {
                o.previousItemsLength = o.items.length;

                const nextUploadsPage = await Methods.post(
                    Utils.fixedEncodeURI(youtubeEndpoints.nextBrowse(apiKey)),
                    o.previousContext
                );

                o.continuationToken = null;

                Utils.seekFor(nextUploadsPage, YTP.PLAYLIST__RESULTS_NEXT_CONTENTS).forEach(function (item) {
                    sortYoutubeChannelContent(item, o);
                });

                if (o.previousItemsLength == o.items.length) o.numberOfUnfructfulPages--;
                else o.numberOfUnfructfulPages = 1;
                o.previousContext.continuation = o.continuationToken;
            }
        } catch (error) {
            console.warn(error);
            reject("Can't get data from YouTube for Channel upload content");
        }

        // RETURN
        const items = limit == -1 ? o.items : o.items.slice(0, limit);
        resolve(items || []);

    });
}

//  • • • • • • • • • • • • • • • • • • • • • • • •
//  << ITEM SORTING >>

function sortYoutubeChannelContent(content, o) {
    const videoID           = Utils.seekFor(content, YTP.CHANNEL_ITEM__VIDEO_ID);
    const isLive            = (Utils.seekFor(content, YTP.CHANNEL_ITEM__VIDEO_LIVE_BADGE) === YTP.LIVE_BADGE);
    const isShort           = (Utils.seekFor(content, YTP.CHANNEL_ITEM__VIDEO_SHORT_TYPE) === YTP.SHORTS_TYPE);
    const continuationToken = Utils.seekFor(content, YTP.CHANNEL__CONTINUATION);

    Utils.sortItem(o, videoID, null, null, isLive, isShort, continuationToken);
}

