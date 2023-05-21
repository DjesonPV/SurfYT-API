//surfyt-api
// > DATA PATH
//  • • • • • • • • • • • • • • • • • • • • • • • •

export const LIVE_BADGE     = 'LIVE';
export const SHORTS_TYPE    = 'WEB_PAGE_TYPE_SHORTS';
export const FEATURED_BADGE_TYPE    = 'BADGE_STYLE_TYPE_FEATURED';


// SEARCHING IN YOUTUBE PAGE DATA TO USE WITH THE UTILS/SEEKFOR FUNCTION


// SEARCH YOUTUBE FOR
export const SEARCH__RESULTS_CONTENTS           = "contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents";
export const SEARCH__RESULTS_NEXT_CONTENTS      = "onResponseReceivedCommands[0].appendContinuationItemsAction.continuationItems";
export const SEARCH__CONTINUATION_TOKEN         = "continuationItemRenderer.continuationEndpoint.continuationCommand.token";

export const SEARCH__LANGUAGE                   = "client.hl";
export const SEARCH__LOCATION                   = "client.gl";

export const SEARCH_ITEMS                       = "itemSectionRenderer.contents";

export const SEARCH_ITEM__CHANNEL_URL           = "channelRenderer.navigationEndpoint.browseEndpoint.canonicalBaseUrl";
export const SEARCH_ITEM__PLAYLIST_ID           = "playlistRenderer.playlistId";
export const SEARCH_ITEM__VIDEO_ID              = "videoRenderer.videoId";
export const SEARCH_ITEM__VIDEO_LIVE_BADGE      = "videoRenderer.badges[0].metadataBadgeRenderer.icon.iconType";
export const SEARCH_ITEM__VIDEO_SHORT_TYPE      = "videoRenderer.navigationEndpoint.commandMetadata.webCommandMetadata.webPageType"

// PLAYLIST LIST
//export const PLAYLIST__RESULTS_CONTENTS         = "contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].playlistVideoListRenderer.contents";
export const PLAYLIST__RESULTS_CONTENTS         = "contents.twoColumnBrowseResultsRenderer.tabs.find(tabRenderer#selected).tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].playlistVideoListRenderer.contents";
export const PLAYLIST__RESULTS_NEXT_CONTENTS    = "onResponseReceivedActions[0].appendContinuationItemsAction.continuationItems";
export const PLAYLIST__CONTINUATION_TOKEN       = "continuationItemRenderer.continuationEndpoint.continuationCommand.token";

export const PLAYLIST_ITEM__VIDEO_ID            = "playlistVideoRenderer.videoId";
export const PLAYLIST_ITEM__VIDEO_LIVE_BADGE    = "playlistVideoRenderer.thumbnailOverlays[0].thumbnailOverlayTimeStatusRenderer.icon.iconType";

// CHANNEL UPLOADS
//export const CHANNEL__RESULTS_CONTENTS          = "contents.twoColumnBrowseResultsRenderer.tabs[1].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].gridRenderer.items";
export const CHANNEL__RESULTS_CONTENTS          = "contents.twoColumnBrowseResultsRenderer.tabs.find(tabRenderer#selected).tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].gridRenderer.items";
export const CHANNEL__RESULTS_NEXT_CONTENTS     = "onResponseReceivedActions[0].appendContinuationItemsAction.continuationItems";
export const CHANNEL__CONTINUATION              = "continuationItemRenderer.continuationEndpoint.continuationCommand.token";

export const CHANNEL_ITEM__VIDEO_ID             = "gridVideoRenderer.videoId";
export const CHANNEL_ITEM__VIDEO_SHORT_TYPE     = "gridVideoRenderer.navigationEndpoint.commandMetadata.webCommandMetadata.webPageType";
export const CHANNEL_ITEM__VIDEO_LIVE_BADGE     = "gridVideoRenderer.thumbnailOverlays[0].thumbnailOverlayTimeStatusRenderer.icon.iconType";


// CHANNEL UPLOADS
//export const COLLECTION__RESULTS_CONTENTS       = "contents.twoColumnBrowseResultsRenderer.tabs[2].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].gridRenderer.items";
export const COLLECTION__RESULTS_CONTENTS       = "contents.twoColumnBrowseResultsRenderer.tabs.find(tabRenderer#selected).tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].gridRenderer.items";
export const COLLECTION__RESULTS_NEXT_CONTENTS  = "onResponseReceivedActions[0].appendContinuationItemsAction.continuationItems";
export const COLLECTION__CONTINUATION           = "continuationItemRenderer.continuationEndpoint.continuationCommand.token";

export const COLLECTION_ITEM__PLAYLIST_ID       = "gridPlaylistRenderer.playlistId";

// SUGGESTED CONTENT NEXT TO A VIDEO
export const SUGGESTED__RESULTS_CONTENTS        = "contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results";
export const SUGGESTED__RESULTS_NEXT_CONTENTS   = "onResponseReceivedEndpoints[0].appendContinuationItemsAction.continuationItems";
export const SUGGESTED__CONTINUATION            = "continuationItemRenderer.continuationEndpoint.continuationCommand.token";

export const SUGGESTED__LANGUAGE                = "client.hl";
export const SUGGESTED__LOCATION                = "client.gl";

export const SUGGESTED_ITEM__VIDEO_ID           = "compactVideoRenderer.videoId";
export const SUGGESTED_ITEM__VIDEO_LIVE_BADGE   = "compactVideoRenderer.badges[0].metadataBadgeRenderer.icon.iconType";
export const SUGGESTED_ITEM__PLAYLIST_ID        = "compactPlaylistRenderer.playlistId";

// TRENDING
//export const TRENDING__SECTIONS                 = "contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents";
export const TRENDING__SECTIONS                 = "contents.twoColumnBrowseResultsRenderer.tabs.find(tabRenderer#selected).tabRenderer.content.sectionListRenderer.contents";

export const TRENDING__SECTION_CONTENTS         = "itemSectionRenderer.contents[0].shelfRenderer";

export const TRENDING_SECTION__TITLE_OBJECT       = "title";
export const TRENDING_SECTION__NORMAL_ITEMS       = "content.expandedShelfContentsRenderer.items";
export const TRENDING_SECTION__SHORTS_ITEMS       = "content.horizontalListRenderer.items";
export const TRENDING_SECTION__FEATURED_ENDPOINT  = "endpoint.commandMetadata.webCommandMetadata.url";

export const TRENDING_SECTION__TITLE              = "title.simpleText";
export const TRENDING_SECTION__BADGES             = "badges";
export const TRENDING_SECTION__FEATURED_BADGE     = "badges[0].metadataBadgeRenderer.style";


export const TRENDING__CUT_FIRST_FOUR           = "contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].shelfRenderer.content.expandedShelfContentsRenderer.items";
export const TRENDING__CUT_SHORTS               = "contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[1].itemSectionRenderer.contents[0].shelfRenderer.content.horizontalListRenderer.items";
export const TRENDING__CUT_NEXT_TO_50           = "contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[2].itemSectionRenderer.contents[0].shelfRenderer.content.expandedShelfContentsRenderer.items";
export const TRENDING__CUT_RECENTLY             = "contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[3].itemSectionRenderer.contents[0].shelfRenderer.content.expandedShelfContentsRenderer.items";

export const TRENDING__TOP50                    = "contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].shelfRenderer.content.expandedShelfContentsRenderer.items";
export const TRENDING__RECENTLY                 = "contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[1].itemSectionRenderer.contents[0].shelfRenderer.content.expandedShelfContentsRenderer.items";

export const TRENDING__LANGUAGE                 = "client.hl";
export const TRENDING__LOCATION                 = "client.gl";

export const TRENDING_ITEM__VIDEO_ID            = "videoRenderer.videoId";
export const TRENDING_ITEM__VIDEO_LIVE_BADGE    = "videoRenderer.badges[0].metadataBadgeRenderer.icon.iconType";
export const TRENDING_ITEM__VIDEO_SHORT_TYPE    = "videoRenderer.navigationEndpoint.commandMetadata.webCommandMetadata.webPageType";
export const TRENDING_ITEM__SHORT_ID            = "gridVideoRenderer.videoId";

// YOUTUBE HOMEPAGE
export const HOME__RESULTS_CONTENTS             = "contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.richGridRenderer.contents";
export const HOME__RESULTS_NEXT_CONTENTS        = "onResponseReceivedActions[0].appendContinuationItemsAction.continuationItems";
export const HOME__CONTINUATION                 = "continuationItemRenderer.continuationEndpoint.continuationCommand.token";

export const HOME__LANGUAGE                     = "client.hl";
export const HOME__LOCATION                     = "client.gl";

export const HOME_ITEM__VIDEO_ID                = "richItemRenderer.content.videoRenderer.videoId";
export const HOME_ITEM__VIDEO_LIVE_BADGE        = "richItemRenderer.content.videoRenderer.badges[0].metadataBadgeRenderer.icon.iconType";