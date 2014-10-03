goog.provide('org.riceapps.proto.CoursesRequest');

goog.require('org.riceapps.proto.ProtocolMessage');

goog.scope(function() {



/**
 * @extends {org.riceapps.proto.ProtocolMessage}
 * @constructor
 */
org.riceapps.proto.CoursesRequest = function() {
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
};
goog.inherits(org.riceapps.proto.CoursesRequest,
              org.riceapps.proto.ProtocolMessage);
var CoursesRequest = org.riceapps.proto.CoursesRequest;

});  // goog.scope
