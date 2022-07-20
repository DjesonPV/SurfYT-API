//surfyt-api
// > MAIN
//  • • • • • • • • • • • • • • • • • • • • • • • •

import { youtubeLanguages } from "./modules/AvailableLanguagesOnYoutube.mjs";
import { youtubeLocations } from "./modules/AvailableLocationsOnYoutube.mjs";

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
export function searchYoutubeFor(query: string, options?: {
    showVideos?: boolean | undefined;
    showShorts?: boolean | undefined;
    showLives?: boolean | undefined;
    showChannels?: boolean | undefined;
    showPlaylists?: boolean | undefined;
    limit?: number | undefined;
    max?: number | undefined;
    location?: string | undefined;
    language?: string | undefined;
    bypassLocationAndLanguageChecking?: boolean | undefined;
    logLocationAndLanguage?: boolean | undefined;
}): Promise<{
    type: string;
    url: string;
}[]>

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
export function getYoutubeHomepageList(options?: {
    showVideos?: boolean | undefined;
    showShorts?: boolean | undefined;
    showPlaylists?: boolean | undefined;
    limit?: number | undefined;
    location?: string | undefined;
    language?: string | undefined;
    bypassLocationAndLanguageChecking?: boolean | undefined;
    logLocationAndLanguage?: boolean | undefined;
}): Promise<{
    type: string;
    url: string;
}[]>

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
export function getYoutubeTrendingLists(options?: {
    location?: string | undefined;
    language?: string | undefined;
    bypassLocationAndLanguageChecking?: boolean | undefined;
    logLocationAndLanguage?: boolean | undefined;
}): Promise<{
    top50: {
        type: string;
        url: string;
    }[];
    recently: {
        type: string;
        url: string;
    }[];
    other: {
        title: string;
        endpoint: string | undefined;
        list: {
            type: string;
            url: string;
        }[];
    }[];
}>

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
export function getYoutubeVideoSuggestedList(videoURL: string, options?: {
    showVideos?: boolean | undefined;
    showShorts?: boolean | undefined;
    showLives?: boolean | undefined;
    showPlaylists?: boolean | undefined;
    limit?: number | undefined;
    location?: string | undefined;
    language?: string | undefined;
    bypassLocationAndLanguageChecking?: boolean | undefined;
    logLocationAndLanguage?: boolean | undefined;
}): Promise<{
    type: string;
    url: string;
}[]>

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
export function getYoutubePlaylistContentList(playlistURL: any, options?: {
    limit?: number | undefined;
    showVideos?: boolean | undefined;
    showShorts?: boolean | undefined;
    showLives?: boolean | undefined;
    location?: string | undefined;
    language?: string | undefined;
    bypassLocationAndLanguageChecking?: boolean | undefined;
    logLocationAndLanguage?: boolean | undefined;
}): Promise<string[]>

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
export function getYoutubeChannelUploadList(channelURL: string, options?: {
    showVideos?: boolean | undefined;
    showShorts?: boolean | undefined;
    showLives?: boolean | undefined;
    limit?: number | undefined;
    location?: string | undefined;
    language?: string | undefined;
    bypassLocationAndLanguageChecking?: boolean | undefined;
    logLocationAndLanguage?: boolean | undefined;
}): Promise<{
    type: string;
    url: string;
}[]>

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
export function getYoutubeChannelPlaylistList(channelURL: string, options?: {
    limit?: number | undefined;
    location?: string | undefined;
    language?: string | undefined;
    bypassLocationAndLanguageChecking?: boolean | undefined;
    logLocationAndLanguage?: boolean | undefined;
}): Promise<{
    type: string;
    url: string;
}[]>


