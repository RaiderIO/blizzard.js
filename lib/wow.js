/**
 * @file Exports the World of Warcraft API methods.
 * @module lib/wow
 */

/**
 * World of Warcraft class constructor.
 *
 * @constructor
 * @param  {Object} blizzard A Blizzard.js instance
 * @return {Function}        WoW constructor function
 */
const WoW = function WoW (blizzard) {
  this.blizzard = blizzard;
};

/**
 * Fetch achievement data.
 *
 * @param  {Object} args          The achievement request arguments
 * @param  {Number} args.id       The achievement ID
 * @param  {String} [args.origin] The region key
 * @param  {String} [args.locale] A locale code for this region
 * @param  {Object} [instance]    An [axios](https://github.com/mzabriskie/axios) compatible instance configuration
 * @return {Promise}              A thenable Promises/A+ reference
 */
WoW.prototype.achievement = function achievement (args, instance) {
  return this.blizzard.get(`/wow/achievement/${args.id}`, args, instance);
};

/**
 * Fetch auction data.
 *
 * @param  {Object} args          The auction request arguments
 * @param  {String} args.realm    The slugified realm name
 * @param  {String} [args.origin] The region key
 * @param  {String} [args.locale] A locale code for this region
 * @param  {Object} [instance]    An [axios](https://github.com/mzabriskie/axios) compatible instance configuration
 * @return {Promise}              A thenable Promises/A+ reference
 */
WoW.prototype.auction = function auction (args, instance) {
  return this.blizzard.get(`/wow/auction/data/${args.realm}`, args, instance);
};

/**
 * Fetch boss data.
 *
 * @param  {Object} args          The boss request arguments
 * @param  {Number} [args.id]     The boss ID
 * @param  {String} [args.origin] The region key
 * @param  {String} [args.locale] A locale code for this region
 * @param  {Object} [instance]    An [axios](https://github.com/mzabriskie/axios) compatible instance configuration
 * @return {Promise}              A thenable Promises/A+ reference
 */
WoW.prototype.boss = function boss (args, instance) {
  const obj = Object.assign({ id: '' }, args);

  return this.blizzard.get(`/wow/boss/${obj.id}`, obj, instance);
};

/**
 * Fetch challenge data.
 *
 * @param  {Object} args          The challenge request arguments
 * @param  {Number} [args.realm]  The slugified realm name
 * @param  {String} [args.origin] The region key
 * @param  {String} [args.locale] A locale code for this region
 * @param  {Object} [instance]    An [axios](https://github.com/mzabriskie/axios) compatible instance configuration
 * @return {Promise}              A thenable Promises/A+ reference
 */
WoW.prototype.challenge = function challenge (args, instance) {
  const obj = Object.assign({}, { realm: 'region' }, args);

  return this.blizzard.get(`/wow/challenge/${obj.realm}`, obj, instance);
};

/**
 * Fetch character data.
 *
 * @param  {Array} keys           A list of character resource keys
 * @param  {Object} args          The character request arguments
 * @param  {String} args.name     The character name
 * @param  {String} args.realm    The slugified realm name
 * @param  {String} [args.origin] The region key
 * @param  {String} [args.locale] A locale code for this region
 * @param  {Object} [instance]    An [axios](https://github.com/mzabriskie/axios) compatible instance configuration
 * @return {Promise}              A thenable Promises/A+ reference
 */
WoW.prototype.character = function character (keys, args, instance) {
  const params = { fields: keys.length ? keys.toString() : 'profile' };

  return this.blizzard.get(`/wow/character/${args.realm}/${args.name}`, Object.assign({}, args, { params }), instance);
};

/**
 * Fetch a data resource.
 *
 * @param  {Object} key           The data resource key
 * @param  {Object} args          The data resource request arguments
 * @param  {String} [args.origin] The region key
 * @param  {String} [args.locale] A locale code for this region
 * @param  {Object} [instance]    An [axios](https://github.com/mzabriskie/axios) compatible instance configuration
 * @return {Promise}              A thenable Promises/A+ reference
 */
WoW.prototype.data = function data (key, args, instance) {
  const path = key === 'battlegroups' ? '/wow/data/battlegroups/' : `/wow/data/${key.replace('-', '/')}`;

  return this.blizzard.get(path, args, instance);
};

/**
 * Fetch guild data.
 *
 * @param  {Array} keys           A list of guild resource keys
 * @param  {Object} args          The guild request arguments
 * @param  {String} args.name     The guild name
 * @param  {String} args.realm    The slugified realm name
 * @param  {String} [args.origin] The region key
 * @param  {String} [args.locale] A locale code for this region
 * @param  {Object} [instance]    An [axios](https://github.com/mzabriskie/axios) compatible instance configuration
 * @return {Promise}              A thenable Promises/A+ reference
 */
WoW.prototype.guild = function guild (keys, args, instance) {
  const params = { fields: keys.length ? keys.toString() : 'profile' };

  return this.blizzard.get(`/wow/guild/${args.realm}/${args.name}`, Object.assign({}, args, { params }), instance);
};

/**
 * Fetch item data.
 *
 * @param  {Object} args          The item request arguments
 * @param  {Number} args.id       The item or set ID
 * @param  {Boolean} [args.set]   Whether this is an item set request or not
 * @param  {Array} [args.bonuses] A list of bonuses to apply to the item
 * @param  {String} [args.origin] The region key
 * @param  {String} [args.locale] A locale code for this region
 * @param  {Object} [instance]    An [axios](https://github.com/mzabriskie/axios) compatible instance configuration
 * @return {Promise}              A thenable Promises/A+ reference
 */
WoW.prototype.item = function item (args, instance) {
  const path = args.set ? `/wow/item/set/${args.id}` : `/wow/item/${args.id}`;
  const bl = args.bonuses ? args.bonuses.toString() : null;

  return this.blizzard.get(path, Object.assign({}, args, { params: { bl } }), instance);
};

/**
 * Fetch mount data.
 *
 * @param  {Object} args          The mount request arguments
 * @param  {String} [args.origin] The region key
 * @param  {String} [args.locale] A locale code for this region
 * @param  {Object} [instance]    An [axios](https://github.com/mzabriskie/axios) compatible instance configuration
 * @return {Promise}              A thenable Promises/A+ reference
 */
WoW.prototype.mount = function mount (args, instance) {
  return this.blizzard.get('/wow/mount/', args, instance);
};

/**
 * Fetch pet data.
 *
 * @param  {String} key           The pet resource key
 * @param  {Object} args          The pet request arguments
 * @param  {String} [args.id]     The pet resource ID
 * @param  {String} [args.origin] The region key
 * @param  {String} [args.locale] A locale code for this region
 * @param  {Object} [instance]    An [axios](https://github.com/mzabriskie/axios) compatible instance configuration
 * @return {Promise}              A thenable Promises/A+ reference
 */
WoW.prototype.pet = function pet (key, args, instance) {
  if (key === 'list') {
    return this.blizzard.get('/wow/pet/', args, instance);
  }

  const obj = Object.assign({}, args);
  const params = { level: obj.level, breedId: obj.breedId, qualityId: obj.qualityId };

  return this.blizzard.get(`/wow/pet/${key}/${args.id}`, Object.assign({}, obj, { params }), instance);
};

/**
 * Fetch pvp data.
 *
 * @param  {Object} args          The pvp request arguments
 * @param  {String} args.bracket  The pvp bracket ID
 * @param  {String} [args.origin] The region key
 * @param  {String} [args.locale] A locale code for this region
 * @param  {Object} [instance]    An [axios](https://github.com/mzabriskie/axios) compatible instance configuration
 * @return {Promise}              A thenable Promises/A+ reference
 */
WoW.prototype.pvp = function pvp (args, instance) {
  return this.blizzard.get(`/wow/leaderboard/${args.bracket}`, args, instance);
};

/**
 * Fetch quest data.
 *
 * @param  {Object} args          The quest request arguments
 * @param  {Number} args.id       The quest ID
 * @param  {String} [args.origin] The region key
 * @param  {String} [args.locale] A locale code for this region
 * @param  {Object} [instance]    An [axios](https://github.com/mzabriskie/axios) compatible instance configuration
 * @return {Promise}              A thenable Promises/A+ reference
 */
WoW.prototype.quest = function quest (args, instance) {
  return this.blizzard.get(`/wow/quest/${args.id}`, args, instance);
};

/**
 * Fetch realm data.
 *
 * @param  {Object} args          The realm request arguments
 * @param  {Array} [args.realms]  A list of slugified realm names
 * @param  {String} [args.origin] The region key
 * @param  {String} [args.locale] A locale code for this region
 * @param  {Object} [instance]    An [axios](https://github.com/mzabriskie/axios) compatible instance configuration
 * @return {Promise}              A thenable Promises/A+ reference
 */
WoW.prototype.realms = function realms (args, instance) {
  const obj = Object.assign({}, args);
  const params = { realms: obj.realms ? obj.realms.toString() : null };

  return this.blizzard.get('/wow/realm/status', Object.assign({}, obj, { params }), instance);
};

/**
 * Fetch recipe data.
 *
 * @param  {Object} args          The recipe request arguments
 * @param  {Number} args.id       The recipe ID
 * @param  {String} [args.origin] The region key
 * @param  {String} [args.locale] A locale code for this region
 * @param  {Object} [instance]    An [axios](https://github.com/mzabriskie/axios) compatible instance configuration
 * @return {Promise}              A thenable Promises/A+ reference
 */
WoW.prototype.recipe = function recipe (args, instance) {
  return this.blizzard.get(`/wow/recipe/${args.id}`, args, instance);
};

/**
 * Fetch spell data.
 *
 * @param  {Object} args          The spell request arguments
 * @param  {Number} args.id       The spell ID
 * @param  {String} [args.origin] The region key
 * @param  {String} [args.locale] A locale code for this region
 * @param  {Object} [instance]    An [axios](https://github.com/mzabriskie/axios) compatible instance configuration
 * @return {Promise}              A thenable Promises/A+ reference
 */
WoW.prototype.spell = function spell (args, instance) {
  return this.blizzard.get(`/wow/spell/${args.id}`, args, instance);
};

/**
 * Fetch zone data.
 *
 * @param  {Object} args          The zone request arguments
 * @param  {Number} args.id       The zone ID
 * @param  {String} [args.origin] The region key
 * @param  {String} [args.locale] A locale code for this region
 * @param  {Object} [instance]    An [axios](https://github.com/mzabriskie/axios) compatible instance configuration
 * @return {Promise}              A thenable Promises/A+ reference
 */
WoW.prototype.zone = function zone (args, instance) {
  const obj = Object.assign({ id: '' }, args);

  return this.blizzard.get(`/wow/zone/${obj.id}`, obj, instance);
};

/**
 * Game Data API
 *
 * Retrieve character profile
 */
WoW.prototype.characterProfile = function characterProfile (args, instance) {
  const params = { namespace: args.namespace || `profile-${args.origin}` };
  return this.blizzard.get(`/profile/wow/character/${args.realm.toLowerCase()}/${args.character.toLowerCase()}`, Object.assign({}, args, { params }), instance);
};

/**
 * Game Data API
 *
 * Retrieve season runs
 */
WoW.prototype.characterMythicKeystoneProfileSeason = function characterMythicKeystoneProfileSeason (args, instance) {
  const params = { namespace: args.namespace || `profile-${args.origin}` };
  return this.blizzard.get(`/profile/wow/character/${args.realm.toLowerCase()}/${args.character.toLowerCase()}/mythic-keystone-profile/season/${args.seasonId}`, Object.assign({}, args, { params }), instance);
};

/**
 * Game Data API
 *
 * Retrieve profile index
 */
WoW.prototype.characterMythicKeystoneProfile = function characterMythicKeystoneProfile (args, instance) {
  const params = { namespace: args.namespace || `profile-${args.origin}` };
  return this.blizzard.get(`/profile/wow/character/${args.realm.toLowerCase()}/${args.character.toLowerCase()}/mythic-keystone-profile`, Object.assign({}, args, { params }), instance);
};


/**
 * Game Data API
 *
 * Retrieve character equipment
 */
WoW.prototype.characterEquipment = function characterEquipment (args, instance) {
  const params = { namespace: args.namespace || `profile-${args.origin}` };
  return this.blizzard.get(`/profile/wow/character/${args.realm.toLowerCase()}/${args.character.toLowerCase()}/equipment`, Object.assign({}, args, { params }), instance);
};

/**
 * Game Data API
 *
 * Retrieve character appearance
 */
WoW.prototype.characterAppearance = function characterAppearance (args, instance) {
  const params = { namespace: args.namespace || `profile-${args.origin}` };
  return this.blizzard.get(`/profile/wow/character/${args.realm.toLowerCase()}/${args.character.toLowerCase()}/appearance`, Object.assign({}, args, { params }), instance);
};

/**
 * Game Data API
 *
 * Retrieve character achievements
 */
WoW.prototype.characterAchievements = function characterAchievements (args, instance) {
  const params = { namespace: args.namespace || `profile-${args.origin}` };
  return this.blizzard.get(`/profile/wow/character/${args.realm.toLowerCase()}/${args.character.toLowerCase()}/achievements`, Object.assign({}, args, { params }), instance);
};

/**
 * Game Data API
 *
 * Retrieve character media
 */
WoW.prototype.characterMedia = function characterMedia (args, instance) {
  const params = { namespace: args.namespace || `profile-${args.origin}` };
  return this.blizzard.get(`/profile/wow/character/${args.realm.toLowerCase()}/${args.character.toLowerCase()}/character-media`, Object.assign({}, args, { params }), instance);
};

/**
 * Game Data API
 *
 * Retrieve character specializations
 */
WoW.prototype.characterSpecializations = function characterSpecializations (args, instance) {
  const params = { namespace: args.namespace || `profile-${args.origin}` };
  return this.blizzard.get(`/profile/wow/character/${args.realm.toLowerCase()}/${args.character.toLowerCase()}/specializations`, Object.assign({}, args, { params }), instance);
};

/**
 * Game Data API
 *
 * Retrieve character statistics
 */
WoW.prototype.characterStatistics = function characterStatistics (args, instance) {
  const params = { namespace: args.namespace || `profile-${args.origin}` };
  return this.blizzard.get(`/profile/wow/character/${args.realm.toLowerCase()}/${args.character.toLowerCase()}/statistics`, Object.assign({}, args, { params }), instance);
};

/**
 * Game Data API
 *
 * Retrieve character titles
 */
WoW.prototype.characterTitles = function characterTitles (args, instance) {
  const params = { namespace: args.namespace || `profile-${args.origin}` };
  return this.blizzard.get(`/profile/wow/character/${args.realm.toLowerCase()}/${args.character.toLowerCase()}/titles`, Object.assign({}, args, { params }), instance);
};

/**
 * Game Data API
 *
 * Retrieve character pvp brackets
 */
WoW.prototype.characterPvpBracket = function characterPvpBracket (args, instance) {
  const params = { namespace: args.namespace || `profile-${args.origin}` };
  return this.blizzard.get(`/profile/wow/character/${args.realm.toLowerCase()}/${args.character.toLowerCase()}/pvp-bracket/${args.pvpBracket}`, Object.assign({}, args, { params }), instance);
};

/**
 * Game Data API
 *
 * Retrieve character pvp summary
 */
WoW.prototype.characterPvpSummary = function characterPvpSummary (args, instance) {
  const params = { namespace: args.namespace || `profile-${args.origin}` };
  return this.blizzard.get(`/profile/wow/character/${args.realm.toLowerCase()}/${args.character.toLowerCase()}/pvp-summary`, Object.assign({}, args, { params }), instance);
};

module.exports = WoW;
