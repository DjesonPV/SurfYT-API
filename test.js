
// ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣
//  << NORMALLY SUCCESSFULL MODULE TESTS >>

//console.log(`Resultat : -------------------------------------`);

// Comment first line (/*) of comment block to unconmment block (//*)

/* ♣ ♣ ♣ ♣ ♣ >> SEARCH FOR > Electrodance • • • • •
    import { searchYoutubeFor } from "./main.js";
    
    const eval0 = await searchYoutubeFor("playlist electrodance", { limit:40, showChannels:true, showLives:true, showPlaylists:true});
    
    console.log(eval0);
//*/

//* ♣ ♣ ♣ ♣ ♣ >> SEARCH FOR > Soleil
    import { searchYoutubeFor } from "./main.js";
    
    const eval1 = await searchYoutubeFor("Roméo Elvis - Soleil", {limit:5, location:"Canada", showVideos:true, logLocationAndLanguage:true});
    
    console.log(eval1);
//*/

/* ♣ ♣ ♣ ♣ ♣ >> YOUTUBE HOMEPAGE
    import { getYoutubeHomepageList } from "./main.js";
    
    const eval2 = await getYoutubeHomepageList({location:'United States', showLives:true});
    
    console.log(eval2);
//*/

/* ♣ ♣ ♣ ♣ ♣ >> YOUTUBE TRENDS
    import { getYoutubeTrendingLists } from "./main.js";
    
    const eval3 = await getYoutubeTrendingLists({location:'United States'});
    
    console.log(eval3);
//*/

/* ♣ ♣ ♣ ♣ ♣ >> SUGGESTED CONTENT
import { getYoutubeVideoSuggestedList } from "./main.js";
    
//> ZZCCMXTP - Captain
//const eval4 = await getYoutubeVideoSuggestedList("https://www.youtube.com/watch?v=LoFwjSi_Ns8", {showLives:true, showShorts: true, showPlaylists:true, location:'Italy', language:'fr-CA', logLocationAndLanguage:true});

//> Random Electrodance 24/7 Live
//const eval4 = await getYoutubeVideoSuggestedList("https://www.youtube.com/watch?v=eLSH4ZMXrGw", {limit:10, showLives:true, showShorts: true, showPlaylists:true});

//>
const eval4 = await getYoutubeVideoSuggestedList("https://www.youtube.com/watch?v=W9P_qUnMaFg");

console.log(eval4);
//*/

/* ♣ ♣ ♣ ♣ ♣ >> PLAYLIST VIDEOS
import { getYoutubePlaylistContentList } from "./main.js";

//> Random Playlist >100 videos : Spanish TOP100 Electronic Musics
const eval5 = await getYoutubePlaylistContentList('https://www.youtube.com/playlist?list=PLH4vUK9DCQdnBUbzQTXplfbeLqEpjr7dJ', {showLives:true, logLocationAndLanguage:true});

//> Random Playlist >2000 : Anime Memes/Short AMV 
//const eval5 = await getYoutubePlaylistContentList('https://www.youtube.com/playlist?list=PLT0yj5YzlBjF55KYPpnKUStc8froio9_j', {showLives:true, limit:100});

console.log(eval5.length);
//*/

/* ♣ ♣ ♣ ♣ ♣ >> PLAYLIST VIDEOS > with a live in playlist
import { getYoutubePlaylistContentList } from "./main.js";

//> Playlist from See Jackson Hole (24/7 Cam from Wyoming)
const eval6 = await getYoutubePlaylistContentList("https://www.youtube.com/playlist?list=PLVbK7gAfqHmRdzCfNyEMbbzIoB4dNTpE-", {showLives:true,location:'Italy', logLocationAndLanguage:true});

console.log(eval6)
//*/

/* ♣ ♣ ♣ ♣ ♣ >> CHANNEL > WITH TOO MUCH SHORTS
import { getYoutubeChannelUploadList } from "./main.js";

//> Nozman
const eval7 = await getYoutubeChannelUploadList("https://www.youtube.com/c/DrNozman",{showShorts:true, limit:20, logLocationAndLanguage:true, location:'Spain'});

console.log(eval7);
//*/

/* ♣ ♣ ♣ ♣ ♣ >> CHANNEL > WITH SPECIAL VIDEOS
import { getYoutubeChannelUploadList } from "./main.js";

//> Zerator with >8000 videos
const eval8 = await getYoutubeChannelUploadList("https://www.youtube.com/c/ZeratoR",{});
// empty object to undefined limit

//> Live Webcams from Wyoming
//const eval8 = await getYoutubeChannelUploadList("https://www.youtube.com/c/Seejh",{showLives:true});

console.log(eval8.length);
//*/

/* ♣ ♣ ♣ ♣ ♣ >> CHANNEL > WITH PLAYLIST
import { getYoutubeChannelPlaylistList } from "./main.js";

//> PSY
//const eval9 = await getYoutubeChannelPlaylistList(`https://www.youtube.com/c/officialpsy`, {location:'CH', logLocationAndLanguage:true});

//> Zerator
const eval9 = await getYoutubeChannelPlaylistList(`https://www.youtube.com/c/ZeratoR`);

console.log(eval9.length);
//*/

// ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
//  << ERRORED INPUTS MODULE TESTS >>

//console.log(`Resultat : -------------------------------------`);

/* ♦ ♦ ♦ ♦ ♦ >> SEARCH FOR > Gibberish
import { searchYoutubeFor } from "./main.js";

const eval0 = await searchYoutubeFor("1?§$£%%==//", { limit:20, showChannels:true, showLives:true, showPlaylists:true});

console.log(eval0);
//*/

/* ♦ ♦ ♦ ♦ ♦ >> SUGGESTED CONTENT OF > Not a valid link
import { getYoutubeVideoSuggestedList } from "./main.js";

const eval4 = await getYoutubeVideoSuggestedList("https://www.youtube.com/watch?v=aaaaaaaa", {limit:10, showLives:true, showShorts: true, showPlaylists:true});
//const eval4 = await getYoutubeVideoSuggestedList("https://www.youtube.com/playlist?list=AAAA", {limit:10, showLives:true, showShorts: true, showPlaylists:true});

console.log(eval4);
//*/

/* ♦ ♦ ♦ ♦ ♦ >> PLAYLIST VIDEOS OF > Not a valid link
import { getYoutubePlaylistContentList } from "./main.js";

const eval5 = await getYoutubePlaylistContentList('https://www.youtube.com/playlist?list=PLT0yj5YzlBjF55KYPpnKUStc8froio9_j3', {showLives:true, limit:100});
//const eval5 = await getYoutubePlaylistContentList('https://www.youtube.com/watch?v=aaaaaaaa', {showLives:true, limit:100});

console.log(eval5.length);
//*/

/* ♦ ♦ ♦ ♦ ♦ >> CHANNEL > UPLOADS >Not the right link
import { getYoutubeChannelUploadList } from "./main.js";

const eval7 = await getYoutubeChannelUploadList("https://www.youtube.com/c/aaaa",{showShorts:true, limit:20, logLocationAndLanguage:true, location:'Spain'});
//const eval8 = await getYoutubeChannelUploadList("https://www.youtube.com/watch?v=LoFwjSi_Ns8",{});

console.log(eval7);
//*/


/* ♦ ♦ ♦ ♦ ♦ >> CHANNEL > WITH PLAYLIST
import { getYoutubeChannelPlaylistList } from "./main.js";

//> PSY
const eval9 = await getYoutubeChannelPlaylistList(`https://www.youtube.com/c/aaaa`, {location:'CH', logLocationAndLanguage:true});
//const eval8 = await getYoutubeChannelPlaylistList("https://www.youtube.com/watch?v=LoFwjSi_Ns8",{});

console.log(eval9);
//*/
