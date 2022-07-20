//surfyt-api
// > TRENDING CONTENT
//  • • • • • • • • • • • • • • • • • • • • • • • •

import getInitialData from "./_getInitialData.mjs";
import * as Utils from "./_Utils.mjs";
import { youtubeEndpoints } from "./YouTubeEndpoints.mjs";
import * as YTP from "./YouTubePaths.mjs";

// imports for documentation purpose
import { youtubeLocations } from "./AvailableLocationsOnYoutube.mjs";
import { youtubeLanguages } from "./AvailableLanguagesOnYoutube.mjs";

/** Get the content of the YouTube Trending page
 * @async
 * @param {{
 *   location                           ?: string  | undefined,
 *   language                           ?: string  | undefined,
 *   bypassLocationAndLanguageChecking  ?: boolean | undefined,
 *   logLocationAndLanguage             ?: boolean | undefined
 * }} options > \<\< optional parameters \>\>
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
 * top50:{type:string, url:string}[],
 * recently:{type:string, url:string}[],
 * other:{title:string, endpoint:string|undefined, list:{type:string, url:string}[]}[]
 * }>}
 */
export async function getYoutubeTrendingLists(
    options = {
    }
) {
    return await new Promise(async (resolve, reject) => {
        // INIT PARAMETERS

        const [gl, hl] = options.bypassLocationAndLanguageChecking ? [options.location, options.language] : Utils.checkLocationAndLanguage(options.location, options.language);

        try {
            // FIRST PAGE
            const trendingPage = await getInitialData(youtubeEndpoints.addLocationAndOrLanguage(youtubeEndpoints.trending(), gl, hl, '?'));;

            const trendingSections = Utils.seekFor(trendingPage.ytInitialData, YTP.TRENDING__SECTIONS);

            const trendingSortedSections    = {};
            trendingSortedSections.top50    = [];
            trendingSortedSections.recently = [];
            trendingSortedSections.other    = [];

            for (let i = 0; i < trendingSections.length; i++) {
                const section       = Utils.seekFor(trendingSections[i], YTP.TRENDING__SECTION_CONTENTS);
                const hasTitle      = Utils.seekFor(section, YTP.TRENDING_SECTION__TITLE_OBJECT);
                const normalItems   = Utils.seekFor(section, YTP.TRENDING_SECTION__NORMAL_ITEMS);
                const shortsItems   = normalItems ? null : Utils.seekFor(section, YTP.TRENDING_SECTION__SHORTS_ITEMS);
                const hasBadges     = Utils.seekFor(section, YTP.TRENDING_SECTION__BADGES);
                const endpoint      = Utils.seekFor(section, YTP.TRENDING_SECTION__FEATURED_ENDPOINT);

                const title = `${Utils.seekFor(section, YTP.TRENDING_SECTION__TITLE)}`;

                // If it's Top 50
                // no title, no badges, no endpoint, normal display
                if (!hasTitle && normalItems && !hasBadges && !endpoint) {
                    trendingSortedSections.top50.push(...normalItems);
                }
                // If that's Recently Trending
                // titled, no badges, no endpoint, normal display
                else if (hasTitle && normalItems && !hasBadges && !endpoint) {
                    trendingSortedSections.recently.push(...normalItems);
                }
                // If it's a Trending Shorts section
                // titled, no badges, no endpoint, shorts display
                else if (hasTitle && shortsItems && !hasBadges && !endpoint) {
                    let collector = {};
                    collector.title = "Trending Shorts";
                    collector.items = shortsItems;

                    trendingSortedSections.other.push(collector);
                }
                // It it's none of the above, it must be featured content
                // has a titled and an endpoint
                else if (hasTitle && hasBadges && endpoint) {
                    let collector   = {};
                    collector.title     = title;
                    collector.featured  = youtubeEndpoints.pathLink(endpoint);
                    collector.items     = normalItems || shortsItems;
                    trendingSortedSections.other.push(collector);
                }
            }

            // Create objects to use consistent sorting system
            const top50     = new Utils.coreObject(true, true);
            const recently  = new Utils.coreObject(true, true);;
            const other     = {};

            // Sorting
            trendingSortedSections.top50.forEach(item => {
                sortYoutubeTrendingContent(item, top50);
            });

            trendingSortedSections.recently.forEach(item => {
                sortYoutubeTrendingContent(item, recently);
            });


            for (let i = 0; i < trendingSortedSections.other.length; i++) {
                other[i] = new Utils.coreObject(true, true);

                trendingSortedSections.other[i].items.forEach(item => {
                    sortYoutubeTrendingContent(item, other[i]);
                });
            };

            // Generating the formatted output
            const output = {
                top50:      [],
                recently:   [],
                other:      [],
            };

            output.top50.push(...top50.items);
            output.recently.push(...recently.items);

            for (let i = 0; i < trendingSortedSections.other.length; i++) {
                let collector = {};
                const endpoint = trendingSortedSections.other[i].featured;

                collector.title = trendingSortedSections.other[i].title;

                if (endpoint) collector.featured = endpoint;

                collector.list = other[i].items;

                output.other.push(collector);
            };

            // LOG LOCATION AND LANGUAGE IF REQUESTED   //##LOG
            if (options.logLocationAndLanguage) Utils.logLocationAndLanguage(
                Utils.seekFor(trendingPage.context, YTP.TRENDING__LOCATION),
                Utils.seekFor(trendingPage.context, YTP.TRENDING__LANGUAGE),
                "Trending List"
            );
        } catch (error) {
            reject("Can't get data from YouTube for Trending page")
        }

        // RETURN
        resolve(output);
    });
}

//  • • • • • • • • • • • • • • • • • • • • • • • •
//  << ITEM SORTING >>

function sortYoutubeTrendingContent(content, o) {
    const specialShortID    = Utils.seekFor(content, YTP.TRENDING_ITEM__SHORT_ID);
    const videoID           = specialShortID ? specialShortID : Utils.seekFor(content, YTP.TRENDING_ITEM__VIDEO_ID);
    const isLive            = (Utils.seekFor(content, YTP.TRENDING_ITEM__VIDEO_LIVE_BADGE) === YTP.LIVE_BADGE);
    const isShort           = specialShortID ? true : (Utils.seekFor(content, YTP.TRENDING_ITEM__VIDEO_SHORT_TYPE) === YTP.SHORTS_TYPE);

    Utils.sortItem(o, videoID, null, null, isLive, isShort, false);
}

