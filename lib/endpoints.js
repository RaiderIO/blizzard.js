/**
 * @file Exports Blizzard API regional endpoints.
 * @module lib/endpoints
 */

/**
 * Blizzard API regional endpoints.
 *
 * @typedef {Object} Endpoint
 * @prop    {String} hostname The regional hostname
 * @prop    {String} locale   A regional locale
 */
const endpoints = {
  us: {
    apiHostname: 'https://us.api.blizzard.com',
    oauthHostname: 'https://oauth.battle.net',
    defaultLocale: 'en_US',
    locales: ['en_US', 'es_MX', 'pt_BR'],
  },
  eu: {
    apiHostname: 'https://eu.api.blizzard.com',
    oauthHostname: 'https://oauth.battle.net',
    defaultLocale: 'en_GB',
    locales: ['en_GB', 'es_ES', 'fr_FR', 'ru_RU', 'de_DE', 'pt_PT', 'it_IT'],
  },
  sea: {
    apiHostname: 'https://sea.api.battle.net',
    oauthHostname: 'https://oauth.battle.net',
    defaultLocale: 'en_US',
    locales: ['en_US'],
  },
  kr: {
    apiHostname: 'https://kr.api.blizzard.com',
    oauthHostname: 'https://oauth.battle.net',
    defaultLocale: 'ko_KR',
    locales: ['ko_KR', 'en_GB', 'en_US'],
  },
  tw: {
    apiHostname: 'https://tw.api.blizzard.com',
    oauthHostname: 'https://oauth.battle.net',
    defaultLocale: 'zh_TW',
    locales: ['zh_TW', 'en_GB', 'en_US'],
  },
  cn: {
    apiHostname: 'https://gateway.battlenet.com.cn',
    oauthHostname: 'https://oauth.battlenet.com.cn',
    defaultLocale: 'zh_CN',
    locales: ['zh_CN', 'en_GB', 'en_US'],
  },
};

/**
 * Get the endpoint for a given region.
 *
 * @param  {String} [key=us] A regional key
 * @param  {String} [locale] An endpoint locale
 * @return {Endpoint}        The endpoint data object
 */
exports.getEndpoint = function getEndpoint (key, locale, oauth) {
  const validKey = endpoints.hasOwnProperty(key) ? key : 'us';
  const endpoint = endpoints[validKey];

  return Object.assign(
    {},
    { origin: validKey },
    { hostname: oauth ? endpoint.oauthHostname : endpoint.apiHostname },
    { locale: endpoint.locales.find(item => item === locale) || endpoint.defaultLocale }
  );
};
