const CONFIG = {
  //A list of cities to use for weather
  cities: ['Jerusalem', 'Tel Aviv'],
  //number of images/backgrounds in photos folder.
  backgroundCount: 36,

  // Action to take when the clock is clicked. Options include:
  // - "Menu" to show the help menu
  // - "Search" to show the search input (useful on mobile)
  clockOnClickAction: 'Menu',

  // The delimiter between the hours and minutes on the clock.
  clockDelimiter: ' : ',

  // Show AM/PM indication when CONFIG.clockTwentyFourHours is false.
  clockShowAmPm: true,

  // Show seconds on the clock. A monospaced font is recommended for this.
  clockShowSeconds: true,

  // Show a twenty-four-hour clock instead of a twelve-hour clock.
  clockTwentyFourHour: true,

  // The "category", "name", "key", "url", "search" path and "color"/"hues"
  // for your commands. If none of the specified keys are matched, the * key
  // is used. Commands without a category don't show up in the help menu.

  // You can specify either "hues" or "color" to change a command's background
  // color. "hues" is an array of HSL hues that will be converted into a
  // linear gradient. There are CSS variables defined below, prefixed with
  // "--command-color-", that determine the gradient angle, saturation,
  // lightness and alpha for each generated color. "color", if defined, will
  // be applied as-is to the command's "background" CSS property.
  commands: [
    {
      key: '*',
      name: 'Google',
      search: '/search?q={}',
      url: 'https://www.google.com',
    },
    {
      category: 'Google',
      hues: ['217', '197'],
      key: 'm',
      name: 'Mail',
      search: '/mail/u/0/?q={}#search/{}',
      url: 'https://mail.google.com/mail/u/0',
    },
    {
      category: 'Google',
      hues: ['217', '197'],
      key: 'hm',
      name: 'Huji Mail',
      url: 'http://mail.huji.ac.il',
    },
    {
      category: 'Google',
      hues: ['136', '156'],
      key: 'd',
      name: 'Drive',
      search: '/drive/u/0/search?q={}',
      url: 'https://drive.google.com/drive/u/0/my-drive',
    },
    {
      category: 'Google',
      hues: ['45', '40'],
      key: 'k',
      name: 'Keep',
      search: '/u/0/#search/text={}',
      url: 'https://keep.google.com/u/0',
    },
    {
      category: 'Google',
      hues: ['5', '355'],
      key: 'c',
      name: 'Cal',
      search: '/calendar/u/0/r/search?q={}',
      url: 'https://calendar.google.com/calendar/u/0/r',
    },
    {
      category: 'Gaming',
      hues: ['4', '24'],
      key: 'hi',
      name: 'Honey Impact',
      url: 'https://genshin.honeyhunterworld.com/?lang=EN',
    },
    {
      category: 'Gaming',
      color: 'rgb(117,214,239)',
      key: 'gim',
      name: 'Genshin Impact Map',
      url: 'https://webstatic-sea.mihoyo.com/?lang=en-us#/map/2',
    },
    {
      category: 'Gaming',
      hues: ['4', '24'],
      key: 'aks',
      name: 'AllKeyShop',
      search: '/catalogue/search-{}/',
      url: 'https://www.allkeyshop.com/blog/',
    },
    {
      category: 'Anime',
      color: 'rgb(46,81,162)',
      key: 'mal',
      name: 'MyAnimeList',
      search: '/search/all?q={}&cat=all',
      url: 'https://myanimelist.net/',
    },
    {
      category: 'Anime',
      color: 'rgb(255,193,25)',
      key: 'go',
      name: 'Gogoanime',
      search: '/search.html?keyword={}',
      url: 'https://gogoanime.vc/',
    },
    {
      category: 'Watch',
      hues: ['357', '357'],
      key: 'n',
      name: 'Netflix',
      search: '/search?q={}',
      url: 'https://www.netflix.com/browse',
    },
    {
      category: 'Watch',
      hues: ['5', '355'],
      key: 'yt',
      name: 'YouTube',
      search: '/results?search_query={}',
      url: 'https://youtube.com/',
    },
    {
      category: 'Watch',
      hues: ['264', '244'],
      key: 't',
      name: 'Twitch',
      url: 'https://www.twitch.tv/directory/following',
    },
    {
      category: 'Watch',
      color: 'rgb(245,197,24)',
      key: 'imdb',
      name: 'Imdb',
      search: '/find?q={}&ref_=nv_sr_sm',
      url: 'https://www.imdb.com/',
    },
    {
      category: 'VPS/DNS',
      color: 'rgb(199,70,52)',
      key: 'oc',
      name: 'Oracle Cloud',
      url: 'https://www.oracle.com/index.html',
    },
    {
      category: 'VPS/DNS',
      color: 'rgb(0,157,220)',
      key: 'dd',
      name: 'Dynadot',
      url: 'https://www.dynadot.com/',
    },
    {
      category: 'VPS/DNS',
      color: 'rgb(255,110,40)',
      key: 'cdns',
      name: 'ClouDNS',
      url: 'https://www.cloudns.net/',
    },
    {
      category: 'Torrents',
      hues: ['166', '146'],
      key: 'nya',
      name: 'Nyaa',
      url: 'https://nyaa.si/',
    },
    {
      category: 'Torrents',
      color: 'rgb(223,98,56)',
      key: '1337x',
      name: '1337x',
      url: 'https://www.1377x.to/',
    },
    {
      category: 'Torrents',
      color: 'rgb(211,185,165)',
      key: 'pb',
      name: 'ThePirateBay',
      url: 'https://www.pirateproxy-bay.com/',
    },
    {
      category: 'Torrents',
      hues: ['198', '218'],
      key: 'rbg',
      name: 'Rarbg',
      url: 'https://rarbgtor.org/torrents.php',
    },
    {
      category: 'Media',
      color: 'rgb(255,69,0)',
      key: 'r',
      name: 'Reddit',
      search: '/search?q={}',
      url: 'https://www.reddit.com',
    },
    {
      category: 'Media',
      hues: ['203', '183'],
      key: 'tw',
      name: 'Twitter',
      search: '/search?q={}',
      url: 'https://twitter.com/home',
    },
    {
      category: 'Media',
      hues: ['349', '329'],
      key: 'yn',
      name: 'Ynet',
      url: 'https://www.ynet.co.il/home/0,7340,L-8,00.html',
    },
    {
      category: 'Miscellaneous',
      color: 'rgb(205,217,229)',
      key: 'git',
      name: 'GitHub',
      search: '/search?q={}',
      url: 'https://github.com',
    },
    {
      category: 'Miscellaneous',
      color: 'rgb(53, 55, 83)',
      key: 'st',
      name: 'Speedtest',
      url: 'https://www.speedtest.net/',
    },
    {
      category: 'Miscellaneous',
      color: 'rgb(114,137,218)',
      key: 'pm',
      name: 'Playman',
      search: '/?query={}',
      url: 'https://playman.amitgold.com/',
    },
    {
      category: 'Learn',
      color: 'rgb(86,36,208)',
      key: 'ud',
      name: 'Udemy',
      url: 'https://www.udemy.com/',
    },
    {
      category: 'Learn',
      hues: ['201', '221'],
      key: 'tp',
      name: 'Tutorialspoint',
      search: '/search/{}',
      url: 'https://www.tutorialspoint.com',
    },
    {
      category: 'Social',
      color: 'rgb(12,194,67)',
      key: 'wa',
      name: 'Whatsapp',
      url: 'https://web.whatsapp.com/',
    },
    {
      category: 'Security',
      color: 'rgb(23,93,220)',
      key: 'bw',
      name: 'Bitwarden',
      url: 'https://vault.bitwarden.com/#/',
    },
  ],

  // Instantly redirect when a key is matched. Put a space before any other
  // queries to prevent unwanted redirects.
  queryInstantRedirect: false,

  // Open triggered queries in a new tab.
  queryNewTab: false,

  // The delimiter between a command key and a path. For example, you'd type
  // "r/r/unixporn" to go to "https://reddit.com/r/unixporn".
  queryPathDelimiter: '/',

  // The delimiter between a command key and your search query. For example,
  // to search GitHub for tilde, you'd type "g'tilde".
  querySearchDelimiter: "'",

  // Scripts allow you to open or search multiple sites at once. For example,
  // to search Google, DuckDuckGo, Ecosia and Bing for cats at the same time,
  // you'd type "se'cats".
  scripts: {
    se: ['bing', 'ecosia', 'duckduckgo', '*'],
  },

  // Default search suggestions for the specified queries.
  suggestionDefaults: {
    hi: ['hi/db/char/unreleased-and-upcoming-characters/'],
    mal: [
      'mal/topanime.php',
      'mal/anime/season',
      'mal/recommendations.php?s=recentrecs&t=anime',
    ],
    git: ['git/YotamGit/tilde', 'git/SuperCuber/playman'],
    pm: ['pm/play', 'pm/new', 'pm/tags', 'pm/edit_many'],
    rbg: [
      'rbg/torrents.php?category=movies',
      'rbg/torrents.php?category=2;18;41;49',
      'rbg/torrents.php?category=2;27;28;29;30;31;32;40;53',
    ],
    r: ['r/r/superstonk', 'r/r/startpages'],
    yt: ['yt/feed/subscriptions', 'yt/playlist?list=WL'],
    t: ['t/directory/following', 't/directory'],
  },

  // The order, limit and minimum characters for each suggestion influencer.
  // An "influencer" is just a suggestion source. "limit" is the max number of
  // suggestions an influencer will produce. "minChars" determines how many
  // characters need to be typed before the influencer kicks in.

  // The following influencers are available:
  // - "Default" suggestions come from CONFIG.suggestionDefaults (sync)
  // - "History" suggestions come from your previously entered queries (sync)
  // - "DuckDuckGo" suggestions come from the duck duck go search api (async)

  // To disable suggestions, remove all influencers.
  suggestionInfluencers: [
    { name: 'Default', limit: 4, minChars: 1 },
    { name: 'DuckDuckGo', limit: 4, minChars: 2 },
  ],

  // Max number of suggestions that will ever be shown.
  suggestionLimit: 4,
};
