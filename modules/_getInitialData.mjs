//surfyt-api
// > GET YT_INITIAL_DATA
//  • • • • • • • • • • • • • • • • • • • • • • • •

import Axios from "axios";
import * as HTML from "node-html-parser";
import * as Utils from "./_Utils.mjs";

export default async function getInitialData(url) {
    let context = null;
    let apiKey = null;
    let ytInitialData = null;

    try {
        const page = await Axios.get(Utils.fixedEncodeURI(url));

        const root = HTML.parse(page.data);

        let rawInitialData;
        let rawContextData;

        // body
        root.childNodes[1].childNodes[1].querySelectorAll('script').forEach(function (HTMLElement) {
            if ((HTMLElement.childNodes.length == 1) && (HTMLElement.childNodes[0] instanceof HTML.TextNode) && (HTMLElement.childNodes[0]._rawText.startsWith(`var ytInitialData = `))) {
                rawInitialData = HTMLElement.childNodes[0]._rawText;
            }
        });

        ytInitialData = JSON.parse(rawInitialData.slice(20, -1));

        // header
        root.childNodes[1].childNodes[0].querySelectorAll('script').forEach(function (HTMLElement) {

            if ((HTMLElement.childNodes.length == 1) && (HTMLElement.childNodes[0] instanceof HTML.TextNode) && (HTMLElement.childNodes[0]._rawText.startsWith(`(function() {window.ytplayer={};`))) {
                rawContextData = HTMLElement.childNodes[0]._rawText;
            }
        });

        const matchForContext = await rawContextData.match(/"INNERTUBE_CONTEXT":(.*?),"INNERTUBE_CONTEXT_CLIENT_NAME"/);
        if (matchForContext) context = await JSON.parse(matchForContext[1]);

        const matchForApiKey = await rawContextData.match(/"innertubeApiKey":"(.*?)",/);
        if (matchForApiKey) apiKey = `${matchForApiKey[1]}`;

    }
    catch (error) {
    }

    return { ytInitialData: await ytInitialData, context: await context, apiKey: apiKey };
}
