//surfyt-api
// > GET YT_INITIAL_DATA
//  • • • • • • • • • • • • • • • • • • • • • • • •

import * as Methods from './_methods.js';
import * as HTML from "node-html-parser";
import * as Utils from "./_Utils.js";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function getInitialData(url) {
    let numberOfTry = 5;

    while(numberOfTry--) {

        const data = await tryToGetInitialData(url);

        if ((data.ytInitialData != null) && (data.context != null) && (data.apiKey != null)) return data;
        
        await sleep(100);
    }
    throw "initial data not found";
}

async function tryToGetInitialData(url) {
    let context = null;
    let apiKey = null;
    let ytInitialData = null;

    try {
        const html = HTML.parse(await Methods.getHTML(Utils.fixedEncodeURI(url)));

        //const body = html.querySelector('body');
        const head = html.querySelector('head');

        //const bodyScripts = body.querySelectorAll('script');
        const headScripts = head.querySelectorAll('script');

        const rawInitialData = headScripts.find(script => {
            return script.rawText.startsWith(`var ytInitialData = `);
        });

        try {
            ytInitialData = JSON.parse(rawInitialData.rawText.slice(20, -1));
        } catch (err) {
        };

        const rawContextData = headScripts.find(script => {
            return script.rawText.startsWith(`(function() {window.ytplayer={};`);
        });

        const matchForContext = rawContextData.rawText.match(/"INNERTUBE_CONTEXT":(.*?),"INNERTUBE_CONTEXT_CLIENT_NAME"/);
        if (matchForContext) context = JSON.parse(matchForContext[1]);

        const matchForApiKey = rawContextData.rawText.match(/"innertubeApiKey":"(.*?)",/);
        if (matchForApiKey) apiKey = `${matchForApiKey[1]}`;

    }
    catch (error) {
        console.warn(error);
    }

    return { ytInitialData: ytInitialData, context: context, apiKey: apiKey };
}
