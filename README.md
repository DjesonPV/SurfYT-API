# SurfYT-API

Youtube API without any Google API Key needed.
Because that a web scrapper, so it use the website API.

## Table of contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Documentation](#documentation)
    1. [Common optional parameters to all function](#common-optional-parameters-to-all-functions)
    2. [Common ouputed item (in arrays)](#common-outputed-item-in-arrays)
    3. [Search API](#•-search-api)
    4. [Homepage List](#•-homepage-list)
    5. [Trending Lists](#•-trending-lists)
    6. [Video suggested content List](#•-video-suggested-content-list)
    7. [Playlist content List](#•-playlist-content-list)
    8. [Channel uploads List](#•-channel-uploads-list)
    9. [Channel playlists List](#•-channel-playlists-list)
4. [Notes and further development](#notes-and-further-development)

## Introduction

* You like to surf the web to get entertaining content or to listen to music?

* You are in search for an API to search through [the fammous "Broadcasting Yourself" website also known as YouTube](https://www.youtube.com)?

* You don't want to create a [Google Developper account and use the free 100 search per day API](https://developers.google.com/youtube/v3) to use in your Node.js application?

* You want to make more than 100 simple search requests per day?

If you answered yes to these questions then **this incomplete amateur library** is for you!

## Installation

Install it with [npm](https://www.npmjs.com/) to add it to your Node.js project

```bash
npm install surfyt-api
```

## Documentation

There are currently 7 functions you can direclty use to extract content.

The `options` parameter is a object with entries allowing you to parameter the function use.

### Common optional parameters to all functions

Common parameters availabe for all functions are `location`, `language`, `bypassLocationAndLanguageChecking` and `logLocationAndLanguage`.

Their default values are evaluated as:

| parameter       | type            | default value    |  notes          |
|:----------------|:---------------:|:----------------:|:----------------|
| `location`      | `string`        | `undefined`      |  Will be chosen by YouTube based on IP location. Check the file `./modules/AvailableLocationsOnYoutube.mjs` for valid values |
| `language`      | `string`        | `undefined`      |  Will be chosen by YouTube based on IP location. Check the file  `./modules/AvailableLanguagesOnYoutube.mjs` for valid values |
| `bypassLocationAndLanguageChecking` | `boolean`  | `false` |           |
| `logLocationAndLanguage`            | `boolean`  | `false` |           |

For location and language, either the key or the value from the files can be used (i.e. : both `'United Kingdom'` and `'GB'` are the same valid location).

### Common outputed item (in arrays)

All function will return items that are `object` with curently two properties.

| property        | type            | possible values    |
|:----------------|:---------------:|:----------------:|
| `type`          | `string`        | `'video'`, `'short'`, `'livestream'`, `'channel'`, `'playlist'`          |
| `url`           | `string`        | any `'https://www.youtube.com/'` valid URL |

---

### • Search API

`searchYoutubeFor(query, options?)`

Search for queries as if you were typing in the website searchbar.

#### Optional parameters

If some passed parameters are undefined they will be evaluated as:

| parameter       | type            | default value    |  notes          |
|:----------------|:---------------:|:----------------:|:----------------|
| `showVideos`    | `boolean`       | `false`          |                 |
| `showShorts`    | `boolean`       | `false`          |                 |
| `showLives`     | `boolean`       | `false`          |                 |
| `showChannels`  | `boolean`       | `false`          |                 |
| `showPlaylists` | `boolean`       | `false`          |                 |
| `limit`         | `number`        | `1`              | lower than max and above zero |
| `max`           | `number`        | `100`            | the bigger, the longer it takes to get the results |

#### Examples

• Without any `options`, the function will only ouptut one video (that's neither a livestream nor a short):

```javascript
searchYoutubeFor("Roméo Elvis - Soleil");
/* returns [{ type: 'video', url: 'https://www.youtube.com/watch?v=JmIPRfMhzlM'}]
```

Which is stricly equivalent to:

```javascript
searchYoutubeFor("Roméo Elvis - Soleil", {showVideos: true});
```

• Example using other parameters:

```javascript
searchYoutubeFor("Roméo Elvis", {limit: 2, showVideos: true, showChannels: true, location: 'France'});
/* returns
[
  { type: 'channel', url: 'https://www.youtube.com/channel/UCrLTHz-a-RgeVCkx4iOhs0w'},
  { type: 'video', url: 'https://www.youtube.com/watch?v=xjeKAeA1Lj8' }
]
```

Be aware that search results are impacted by location and language.

---

### • Homepage List

`getYoutubeHomepageList(options?)`

Return a list of YouTube hompage videos.

#### Optional parameters

| parameter       | type            | default value    |  notes          |
|:----------------|:---------------:|:----------------:|:----------------|
| `showVideos`    | `boolean`       | `false`          |                 |
| `showLives`     | `boolean`       | `false`          |                 |
| `showPlaylists` | `boolean`       | `false`          |                 |
| `limit`         | `number`        | `undefined`      | no limit        |

> `limit` is by default `undefined` so it's interpreted as no limit, passing any number will set a limit (greater than 0, no upper limit other than the default homepage display).

#### Examples

• Without any options it will output the first one hundred videos (that aren't livestreams nor shorts):

```js
getYoutubeHomepageList();
// returns an Array{type, url}[100]
```

Is stricly equivalent to:

```js
getYoutubeHomepageList({limit: 100, showVideos: true});
```

Be aware that Homepage content is impacted by location and language.

---

### • Trending Lists

`getYoutubeTrendingLists(options?)`

Output an object with three arrays `top50`, `recently` and `other` with respectively the current trending videos, the recently trendings and a list on any other content on the trending page (i.e. : trending shorts or featured content).

#### Optional parameters

None. It will always output the same object at the exception of the `other` array which will vary based on location and language.

Be aware, in some regions of the world trendings only contains videos while some other regions will be a mix of videos and shorts.

#### Examples

```js
getYoutubeTrendingsLists();
/* returns {
  top50: [...],
  recently: [...],
  other: [
    {
      title: 'Trending Shorts',
      items: [...]
    },
    {
      title: 'Some Creator',
      featured: 'https://www.youtube.com/c/[example]',
      items: [...]
    }
  ] 
}
```

Be aware that the Trending webpage is impacted by location and language.

---

### • Video suggested content List

`getYoutubeVideoSuggestedList(videoURL, options?)`

Get a list of the suggested content on the right side of a YouTube video.

#### Optional parameters

| parameter       | type            | default value    |  notes          |
|:----------------|:---------------:|:----------------:|:----------------|
| `showVideos`    | `boolean`       | `false`          |                 |
| `showShorts`    | `boolean`       | `false`          |                 |
| `showLives`     | `boolean`       | `false`          |                 |
| `showPlaylists` | `boolean`       | `false`          |                 |
| `limit`         | `number`        | `undefined`      | no limit        |

> `limit` is by default `undefined` so it's interpreted as no limit, passing any number will set a limit (greater than 0, no upper limit other than the default video page display).

#### Examples

• Without any options the function:

```js
getYoutubeVideoSuggestedList("https://www.youtube.com/watch?v=Nj2U6rhnucI");
/* returns [
  { type: 'video', url: 'https://www.youtube.com/watch?v=BC19kwABFwc' },
  { type: 'video', url: 'https://www.youtube.com/watch?v=oygrmJFKYZY' },
  { type: 'video', url: 'https://www.youtube.com/watch?v=ZYoMgnv9K8g' },
  { type: 'video', url: 'https://www.youtube.com/watch?v=k2qgadSvNyU' },
  { type: 'video', url: 'https://www.youtube.com/watch?v=9HDEHj2yzew' },
  { type: 'video', url: 'https://www.youtube.com/watch?v=R7mifEjdvZM' },
  { type: 'video', url: 'https://www.youtube.com/watch?v=e-ORhEE9VVg' },
  { type: 'video', url: 'https://www.youtube.com/watch?v=-rey3m8SWQI' },
  { type: 'video', url: 'https://www.youtube.com/watch?v=TUVcZfQe-Kw' },
  { type: 'video', url: 'https://www.youtube.com/watch?v=qod03PVTLqk' }
]
```

Is stricly equivalent to:

```js
getYoutubeVideoSuggestedList("https://www.youtube.com/watch?v=Nj2U6rhnucI", {showVideos: true, limit: 10})
```

---

### • Playlist content List

`getYoutubePlaylistContentList(playlistURL, options?)`

Get the elements in a YouTube playlist.

#### Optional parameters

| parameter       | type            | default value    |  notes          |
|:----------------|:---------------:|:----------------:|:----------------|
| `showVideos`    | `boolean`       | `false`          |                 |
| `showShorts`    | `boolean`       | `false`          |                 |
| `showLives`     | `boolean`       | `false`          |                 |
| `limit`         | `number`        | `undefined`      | no limit        |

> `limit` is by default `undefined` so it's interpreted as no limit, passing any number will set a limit (greater than 0, lower or equal to 5.000).

#### Examples

• Without any options the function:

```js
getYoutubePlaylistContentList("https://www.youtube.com/playlist?list=PLu8-5UhSJGkI98qmuk9zdxNRyc6nbX-6a");
/* returns [
  { type: 'video', url: 'https://www.youtube.com/watch?v=K5ve5lzs0wM' },
  { type: 'video', url: 'https://www.youtube.com/watch?v=Xvjnoagk6GU' },
  { type: 'video', url: 'https://www.youtube.com/watch?v=OwJPPaEyqhI' }
]
```

Is stricly equivalent to:

```js
getYoutubePlaylistContentList("https://www.youtube.com/playlist?list=PLu8-5UhSJGkI98qmuk9zdxNRyc6nbX-6a", {showVideos: true, showShorts: true, showLives: true, limit: 100});
```

---

### • Channel uploads List

`getYoutubeChannelUploadList(channelURL, options?)`
Can return all public videos, current livestream and shorts of a channel.

#### Optional parameters

| parameter       | type            | default value    |  notes          |
|:----------------|:---------------:|:----------------:|:----------------|
| `showVideos`    | `boolean`       | `false`          |                 |
| `showShorts`    | `boolean`       | `false`          |                 |
| `showLives`     | `boolean`       | `false`          |                 |
| `limit`         | `number`        | `undefined`      | no limit        |

> `limit` is by default `undefined` so it's interpreted as no limit, passing any number will set a limit (greater than 0, no upper limit other than available content).

#### Examples

• Without any options the function:

```js
getYoutubeChannelUploadList("https://www.youtube.com/c/ZeratoR");
// returns {type, url}[100]
```

Is stricly equivalent to:

```js
getYoutubeChannelUploadList("https://www.youtube.com/c/ZeratoR", {showVideos: true, showShorts: true, showLives: true, limit: 100});
```

Be carefull, not setting a limit may result in a long wait. In our example, no limit will give us ~8000 items.

---

### • Channel playlists List

`getYoutubeChannelPlaylistList(channelURL, options?)`
Can return all public playlists of a channel.

#### Optional parameters

| parameter       | type            | default value    |  notes          |
|:----------------|:---------------:|:----------------:|:----------------|
| `limit`         | `number`        | `undefined`      | no limit        |

#### Examples

• Without any options the function:

```js
getYoutubeChannelPlaylistList("https://www.youtube.com/c/ZeratoR");
// returns {type: 'playlist', url}[236]
```

Be carefull, not setting a limit may result in a long wait.

## Notes and further development

Hi, I'm Djeson, I developed this library only to use the [search function](#•-search-api) for simple searches because I didn't want to be limited to 100 search per day for my [Discord Bot](https://github.com/DjesonPV/Discord-PotatOS) and I wasn't happy with already existing libraries. To anyone using an older no-longer supported YouTube scrapping library, I wrote the six other functions.

Fun fact: it took me much much less time to write the functional code, than this documentation and comments in order to be able to work on it later.

There may be further features added in the future such as search filters and data scraping to remove the need to use another library to get videos data.

The TypeScript definition file might not work, please provide feedback as necessary.

If you encounter bugs or need more features, please open an issue so we can discuss on the matter.

Bon code et bonne journée !
