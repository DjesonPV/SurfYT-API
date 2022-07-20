// As of the list available from the website the 2022 July 03 at 19h20 in France

// You can search for with your IDE search function to directly use the right value
// Search Map for laguage denomination taken into account with `youtubeLanguages.has("Français")`
// Search Map for value with `Array.from(youtubeLanguages.values()).includes("fr")`

// Languages as YouTube display them
export const youtubeLanguages = new Map([
    ["Afrikaans"                 , 'af'     ],      // African
    ["Azərbaycan"                , 'az'     ],      // Azerbaijan           Azerbaycan
    ["Bahasa Indonesia"          , 'id'     ],      // Indonesian
    ["Bahasa Malaysia"           , 'ms'     ],      // Malay Malaysian
    ["Bosanski"                  , 'bs'     ],      // Bosnian
    ["Català"                    , 'ca'     ],      // Catalan
    ["Čeština"                   , 'cs'     ],      // Czech                Cestina
    ["Dansk"                     , 'da'     ],      // Danish
    ["Deutsch"                   , 'de'     ],      // German
    ["Eesti"                     , 'et'     ],      // Estonian
    ["English (India)"           , 'en-IN'  ],      // Indian
    ["English (UK)"              , 'en-GB'  ],      // British
    ["English (US)"              , 'en'     ],      // American
    ["Español (España)"          , 'es'     ],      // Spanish              Espanol
    ["Español (Latinoamérica)"   , 'es-419' ],      // Latino               Espanol
    ["Español (US)"              , 'es-US'  ],      // Mexican              Espanol
    ["Euskara"                   , 'eu'     ],      // Basque
    ["Filipino"                  , 'fil'    ],      // Filipino
    ["Français"                  , 'fr'     ],      // French               Francais
    ["Français (Canada)"         , 'fr-CA'  ],      // Quebecois            Francais
    ["Galego"                    , 'gl'     ],      // Galician
    ["Hrvatski"                  , 'hr'     ],      // Croatian
    ["IsiZulu"                   , 'zu'     ],      // Zulu
    ["Íslenska"                  , 'is'     ],      // Islandic
    ["Italiano"                  , 'it'     ],      // Italian
    ["Kiswahili"                 , 'sw'     ],      // Swahillian
    ["Latviešu valoda"           , 'lv'     ],      // Latvian              Latviesu valoda
    ["Lietuvių"                  , 'lt'     ],      // Lithuanian           Lietuviu
    ["Magyar"                    , 'hu'     ],      // Hungarian
    ["Nederlands"                , 'nl'     ],      // Dutch
    ["Norsk"                     , 'no'     ],      // Norwegian
    ["O‘zbek"                    , 'uz'     ],      // Uzbek                O'zbek
    ["Polski"                    , 'pl'     ],      // Polish
    ["Português"                 , 'pt-PT'  ],      // Portuguese           Portugues
    ["Português (Brasil)"        , 'pt'     ],      // Brazilian            Portugues
    ["Română"                    , 'ro'     ],      // Romanian             Romana
    ["Shqip"                     , 'sq'     ],      // Albanian
    ["Slovenčina"                , 'sk'     ],      // Slovak               Slovencina
    ["Slovenščina"               , 'sl'     ],      // Slovenian            Slovenscina
    ["Srpski"                    , 'sr-Latn'],      // Serbian
    ["Suomi"                     , 'fi'     ],      // Finnish
    ["Svenska"                   , 'sv'     ],      // Swedish
    ["Tiếng Việt"                , 'vi'     ],      // Vietnamese           Tieng Viet
    ["Türkçe"                    , 'tr'     ],      // Turkish              Turkce
    ["Беларуская"                , 'be'     ],      // Belarusian           Bielaruskaja
    ["Български"                 , 'bg'     ],      // Bulgarian            Bŭlgarski / Bulgarski
    ["Кыргызча"                  , 'ky'     ],      // Kyrgyz               Kırgızça  / Kirgizca
    ["Қазақ Тілі"                , 'kk'     ],      // Kazakh               Qazaq Tili
    ["Македонски"                , 'mk'     ],      // Macedonian           Makedonski
    ["Монгол"                    , 'mn'     ],      // Mongolian            Mongol
    ["Русский"                   , 'ru'     ],      // Russian              Russkiy
    ["Српски"                    , 'sr'     ],      // Serbian              Srpski
    ["Українська"                , 'uk'     ],      // Urkainian            Ukrayinsʹka / Ukrayins'ka
    ["Ελληνικά"                  , "el"     ],      // Greek                Elliniká / Ellinika
    ["Հայերեն"                   , 'hy'     ],      // Armenian             Hayeren
    ["עברית"                     , 'iw'     ],      // Hebrew
    ["اردو"                      , 'ur'     ],      // Urdu (Pakistan)
    ["العربية"                   , 'ar'     ],      // Arabic               Alearabia
    ["فارسی"                     , 'fa'     ],      // Persian
    ["नेपाली"                       , 'ne'     ],      // Nepali               Nēpālī
    ["मराठी"                       ,'mr'      ],       // Marathi (India)      Marāṭhī
    ["हिन्दी"                       , 'hi'     ],       // Hindi (India)        Hindee
    ["অসমীয়া"                      , 'as'     ],     // Assamese (India)
    ["বাংলা"                        , 'bn'     ],     // Bengali (India)      Bānlā / Banla
    ["ਪੰਜਾਬੀ"                       , 'pa'     ],      // Punjabi (Pakistan)   Pajābī / Pajabi
    ["ગુજરાતી"                      , 'gu'     ],     // Gujarati (India)     Gujarātī
    ["ଓଡ଼ିଆ"                       , 'or'     ],      // Odia (India)         Oriya
    ["தமிழ்"                       , 'ta'     ],     // Tamil (Sri Lanka)    Tamiḻ
    ["తెలుగు"                       , 'te'     ],    // Telugu  (India)
    ["ಕನ್ನಡ"                      , 'kn'     ],      // Kannada (India)
    ["മലയാളം"                      , 'ml'     ],  // Malayalam (India)    Malayāḷaṁ
    ["සිංහල"                       , 'si'     ],     // Sinhala (Sri Lanka)  Siṁhala / Simhala
    ["ภาษาไทย"                   , 'th'     ],       // Thai Siamese         P̣hās̄ʹā thịy / Phas'a thiy
    ["ລາວ"                       , 'lo'     ],       // Laotian              Lav
    ["ဗမာ"                       , 'my'     ],       // Burmese              Bamar
    ["ქართული"                   , 'ka'     ],     // Georgian             Kartuli
    ["አማርኛ"                      , 'am'     ],     // Amharic Ethopian     Āmarinya / Amarinya
    ["ខ្មែរ"                       , 'km'     ],      // Khmer
    ["中文 (简体)"                   , 'zh-CN'  ],   // Chinese (simplified)     Zhōngwén (Jiǎntǐ) / Zhongwen (Jianti)
    ["中文 (繁體)"                   , 'zh-TW'  ],   // Chinese (traditional)    Zhōngwén (Fántǐ)  / Zhongwen (Fanti)
    ["中文 (香港)"                   , 'zh-HK'  ],   // Chinese (Hong Kong)      Zhōngwén (Xiānggǎng) / Zhongwen (Xianggang)
    ["日本語"                       , 'ja'     ],    // Japanese                 Nihongo
    ["한국어"                       , 'ko'     ],    // Korean                   Hangug-eo
]);
