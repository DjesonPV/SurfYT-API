//surfyt-api
// > YOUTUBE URL FACTORY
//  • • • • • • • • • • • • • • • • • • • • • • • •

import * as Utils from "./_Utils.js";

/** YouTube website URL*/
const youtubeEndpoint = `https://www.youtube.com`;

/** YouTube links builder */
export const youtubeEndpoints = {

    search(query){
        return `${youtubeEndpoint}/results?search_query=${Utils.youtubeEncodeSearch(query)}`;
    },

    playlist(playlistId){
        return `${youtubeEndpoint}/playlist?list=${Utils.fixedEncodeURIComponent(playlistId)}`;
    },

    channel(channelId){
        return `${youtubeEndpoint}/channel/${Utils.fixedEncodeURIComponent(channelId)}`;
    },

    video(videoId){
        return `${youtubeEndpoint}/watch?v=${Utils.fixedEncodeURIComponent(videoId)}`;
    },

    short(shortId){
        return `${youtubeEndpoint}/shorts/${Utils.fixedEncodeURIComponent(shortId)}`;
    },

    nextSearch(pageToken){
        return `${youtubeEndpoint}/youtubei/v1/search?key=${Utils.fixedEncodeURIComponent(pageToken)}&prettyPrint=false`;
    },

    nextBrowse(pageToken){
        return `${youtubeEndpoint}/youtubei/v1/browse?key=${Utils.fixedEncodeURIComponent(pageToken)}&prettyPrint=false`;
    },

    nextSuggested(pageToken){
        return `${youtubeEndpoint}/youtubei/v1/next?key=${Utils.fixedEncodeURIComponent(pageToken)}&prettyPrint=false`;
    },

    /** USE ONLY FOR TRUSTED PATHS */
    pathLink(path){
        return `${youtubeEndpoint}${path}`;
    },

    /** USE ONLY FOR TRUSTED URL */
    addLocationAndOrLanguage(url, location, language, sign){
        return `${url}${location||language?`${sign}${location?`persist_gl=1&gl=${Utils.fixedEncodeURIComponent(location)}`:''}${(location&&language)?'&':''}${language?`persist_hl=1&hl=${Utils.fixedEncodeURIComponent(language)}`:''}`:''}`;
    },

    /** USE ONLY FOR TRUSTED URL */
    videosOfAYoutubeChannel(channelURL){
        return `${channelURL}/videos`;
    },

    /** USE ONLY FOR TRUSTED URL */
    playlistsOfAYoutubeChannel(channelURL){
        return `${channelURL}/playlists`;
    },

    trending(){
        return `${youtubeEndpoint}/feed/trending`;
    },

    homepage(){
        return `${youtubeEndpoint}/index`;
    },

}