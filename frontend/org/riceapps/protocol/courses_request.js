goog.provide('org.riceapps.protocol.CoursesRequest');

goog.require('org.riceapps.protocol.ProtocolMessage');

goog.scope(function() {



/**
 * @extends {org.riceapps.protocol.ProtocolMessage}
 * @constructor
 */
org.riceapps.protocol.CoursesRequest = function() {
  goog.base(this);

  /** @type {number} */
  this.userId = 0;

  /** @type {string} */
  this.xsrfToken = "";

  /** @type {string} */
  this.keywords = "";

  /** @type {boolean} */
  this.showNonDistribution = true;

  /** @type {boolean} */
  this.showDistribution1 = true;

  /** @type {boolean} */
  this.showDistribution2 = true;

  /** @type {boolean} */
  this.showDistribution3 = true;

  /** @type {boolean} */
  this.hideFull = true;

  /** @type {boolean} */
  this.hideConflicts = true;

  /** @type {number} */
  this.offset = 0;

  /** @type {number} */
  this.limit = 100;

  /** @type {number} */
  this.term = 0;

  /** @type {number} */
  this.year = 0;
};
goog.inherits(org.riceapps.protocol.CoursesRequest,
              org.riceapps.protocol.ProtocolMessage);
var CoursesRequest = org.riceapps.protocol.CoursesRequest;

});  // goog.scope
