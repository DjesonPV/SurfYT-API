//surfyt-api
// > SHARED FUNCTIONS
//  • • • • • • • • • • • • • • • • • • • • • • • •

import { youtubeLocations } from "./AvailableLocationsOnYoutube.js";
import { youtubeLanguages } from "./AvailableLanguagesOnYoutube.js";
import { youtubeEndpoints } from "./YouTubeEndpoints.js";

export function fixedEncodeURI(str) {
    return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');    // According to Mozilla recomandation about https://tools.ietf.org/html/rfc3986
}


export function fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/%20/g, '+');    // Because why make it like every other languages
}

// It seems like YouTube only encode special "code harming" characters for search queries 
// and not the every char that isn't unicode like encodeURIComponent.
// I'm aware of this by trial and error, only because I tried French queries and was given wrong results.
// The HTML link will not give the same result as the fetch request, as if somewhere non 
// special encoded chars aren't decoded.
export function youtubeEncodeSearch(str) {
    return str
    .replace(/\+/g,'%2B')   // convert + to code
    .replace(/\s/g,'+')     // convert blank space to +
    // handling "code reserved characters"
    .replace(/[\&\#\'\{\}\[\]\|\`\\\^\@\=\$\%\:\/\;\,\?]/g, function(c) {
        return '%' + c.charCodeAt(0).toString(16).toUpperCase();
      });
    // These should prevent code injection for both the library and the website
    // Please keep updating any other characters that need to be added to this list !
}

/** Sort class the item and push it to the items array */
export function sortItem(o, videoID, playlistID, channelURL, isLive, isShort, continuationToken) {

    if (channelURL) {
        if (o.showChannels)
            o.items.push({
                type: 'channel',
                url: youtubeEndpoints.pathLink(channelURL),
            });
        o.numberOfSearchResultsSorted++;

    } else if (playlistID) {
        if (o.showPlaylists)
            o.items.push({
                type: 'playlist',
                url: youtubeEndpoints.playlist(playlistID),
            })
        o.numberOfSearchResultsSorted++;

    } else if (videoID) {
        if (isLive && !isShort && o.showLives) {
            o.items.push({
                type: 'livestream',
                url: youtubeEndpoints.video(videoID),
            });
        } else if (!isLive && isShort && o.showShorts) {
            o.items.push({
                type: 'short',
                url: youtubeEndpoints.short(videoID),
            });
        } else if (!isLive && !isShort && o.showVideos) {
            o.items.push({
                type: 'video',
                url: youtubeEndpoints.video(videoID),
            });
        };
        o.numberOfSearchResultsSorted++;
    } else if (continuationToken) {
        o.continuationToken = continuationToken;
    }
}


/**
 * 
 * @param {*} location 
 * @param {*} language 
 * @returns 
 */
export function checkLocationAndLanguage(location, language) {
    let loc = null;
    let lang = null;

    let isLocKey, isLocVal, isLangKey, isLangVal;

    if (!!location) {
        isLocKey = youtubeLocations.has(location);
        isLocVal = isLocKey ? false : Array.from(youtubeLocations.values()).includes(location);

        loc = isLocKey ? youtubeLocations.get(location) : (isLocVal ? location : null);
    };

    if (!!language) {
        isLangKey = youtubeLanguages.has(language);
        isLangVal = isLangKey ? false : Array.from(youtubeLanguages.values()).includes(language);

        lang = isLangKey ? youtubeLanguages.get(language) : (isLangVal ? language : null);
    };

    return [loc, lang];
}

/**
 * 
 * @param {Object} object 
 * @param {string} path 
 */
export function seekFor(object, path) {
    if (!path) return object;

    const splitPath = path.split('.');
    let currentObject = object;

    splitPath.every(pathSegment => {
        let segment = pathSegment;
        let key = null;

        if (segment.slice(-1) === ']') {
            let sps = segment.split('[');
            segment = sps[0];
            key = sps[1].slice(0, -1);
        }
        if (segment.split('(')[0] === 'find') {
            const findPath = segment.split('(')[1].slice(0,-1).replace('#','.');
            currentObject = currentObject.find(item => {return seekFor(item, findPath);});
            key = null;
            segment = null;
        }
        if ((segment !== null) && (currentObject != undefined)) currentObject = currentObject[segment];
        if ((key !== null) && (currentObject != undefined)) currentObject = currentObject[key];
        if (currentObject == undefined) return false;
        return true;
    });

    return currentObject;

}

export function logLocationAndLanguage(location, language, context) {
    console.log(`YouTube Search w/o APIkey | ${context} : Client Location [${location}], Client Language [${language}]`);
};

export class coreObject {

    constructor(showVideos = true, showShorts = true, showLives = true, showChannels = true, showPlaylists = true, numberOfUnfructfulPages = 1) {
        this.showVideos = showVideos;
        this.showShorts = showShorts;
        this.showLives = showLives;
        this.showChannels = showChannels;
        this.showPlaylists = showPlaylists;
        this.numberOfUnfructfulPages = numberOfUnfructfulPages;

        this.items = [];
        this.numberOfSearchResultsSorted = 0;
        this.continuationToken = null;
        this.previousContext = null;
        this.previousItemsLength = 0;

    }

}


/** Passivate inputed url and make sure it's a supported link
 * Only for YouTube no support for Youtube Music (yet)
 * 
 * @param {*} url URL to verify
 * @returns {TYPE:string, URL:string} `TYPE : videolive | tiktok | contentlist | usercontent`
 * Specially changed from `video/live|short|playlist|channel` to reduce confusion with outputed item type 
 */
export function analyseYoutubeURL(url){
    const O = {};
    O.URL = null;
    O.TYPE = false;

    if (typeof url == "string") {
        const youtu_dot_be = url.match(/(?:https:\/\/youtu.be\/)([a-zA-Z0-9\-\_]+)/);
        if (youtu_dot_be && youtu_dot_be[1]) {
            O.URL = youtubeEndpoints.video(youtu_dot_be[1]);
            O.TYPE = 'videolive';
        }

        const youtube_dot_com = url.match(/(?:https:\/\/www\.youtube\.com\/)(watch\?v=|shorts\/|c\/|user\/|channel\/|playlist\?list=)([a-zA-Z0-9\-\_]+)/);

        if (youtube_dot_com) {
            switch (youtube_dot_com[1]) {
                case 'watch?v=':
                    O.URL = youtubeEndpoints.video(youtube_dot_com[2]);
                    O.TYPE = 'videolive';
                    break;
                case 'shorts/':
                    O.URL = youtubeEndpoints.short(youtube_dot_com[2]);
                    O.TYPE = 'tiktok';
                    break;
                case 'playlist?list=':
                    O.URL = youtubeEndpoints.playlist(youtube_dot_com[2]);
                    O.TYPE = 'contentlist';
                    break;
                case 'c/':
                case 'channel/':
                case 'user/':
                    O.URL = youtubeEndpoints.pathLink(`/${youtube_dot_com[1]}${youtube_dot_com[2]}`);
                    O.TYPE = 'usercontent';
                    break;
                default : 
                    O.URL = null;
                    O.TYPE = null;
            }
        }
    }
    return O;

}
