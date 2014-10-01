goog.provide('org.riceapps.models.CourseModel');

goog.require('goog.Promise');
goog.require('org.riceapps.models.Model');
goog.require('org.riceapps.models.InstructorModel');

goog.scope(function() {



/**
 * @extends {org.riceapps.models.Model}
 * @constructor
 */
org.riceapps.models.CourseModel = function() {
  goog.base(this);
};
goog.inherits(org.riceapps.models.CourseModel,
              org.riceapps.models.Model);
var CourseModel = org.riceapps.models.CourseModel;


/**
 * @param {Object} json
 */
CourseModel.fromJson = function(json) {
  if (!json) {
    return null;
  }

  var model = new CourseModel();

  // TODO(mschurr@rice.edu): Copy the values.

  return model;
};



/**
 * Represents a time and place at which the course meets.
 *   day: 0 (Sunday) to 6 (Saturday)
 *   start: time at which course starts in hours elapsed since midnight
 *   end: time at which course ends in hours elapsed since midnight
 *   location: classroom where this meeting occurs
 *
 * @typedef {{
 *   day: {number},
 *   start: {number},
 *   end: {number},
 *   location: {string}
 * }}
 */
CourseModel.MeetingTime;


/**
 * @return {number}
 */
CourseModel.prototype.getId = function() {
  return 1;
};


/**
 * @return {!Array.<!CourseModel.MeetingTime>}
 */
CourseModel.prototype.getMeetingTimes = function() {
  return [{
      "day" : 0,
      "start" : 9,
      "end" : 11,
      "location" : 'RZR 121'
    }, {
      "day" : 2,
      "start" : 9,
      "end" : 11,
      "location" : 'RZR 121'
    }, {
      "day" : 4,
      "start" : 9,
      "end" : 11,
      "location" : 'RZR 121'
    }, {
      "day" : 2,
      "start" : 13,
      "end" : 14.5,
      "location" : 'RZR 121'
    }];
};


/**
 * Returns the category that the course belongs to. The category is not guaranteed to be unique, as a single course may
 * have multiple sessions.
 * @return {string}
 */
CourseModel.prototype.getCourseCategory = function() {
  // A (subject, course number) pair uniquely identifies a course (which may have other sessions with different course
  // ids).
  return this.getSubject() + ' ' + this.getCourseNumber();
};


/**
 * @return {!org.riceapps.models.InstructorModel}
 */
CourseModel.prototype.getInstructor = function() {
  return new org.riceapps.models.InstructorModel();
};


/**
 * @return {number}
 */
CourseModel.prototype.getCrn = function() {
  return 22923;
};


/**
 * @return {string}
 */
CourseModel.prototype.getFormattedTermCode = function() {
  return '201420';
};


/**
 * Returns the four character course subject code (e.g. 'MATH').
 * @return {string}
 */
CourseModel.prototype.getSubject = function() {
  return 'COLL';
};


/**
 * Returns the three digit course number (e.g. 101).
 * @return {number}
 */
CourseModel.prototype.getCourseNumber = function() {
  return 144;
};


/**
 * @return {string}
 */
CourseModel.prototype.getTitle = function() {
  return 'COLL 144: @' + goog.getUid(this);
};


/**
 * @return {number}
 */
CourseModel.prototype.getEnrollmentCap = function() {
  return 1;
};


/**
 * @return {number}
 */
CourseModel.prototype.getCredits = function() {
  return 1;
};


/**
 * @return {number}
 */
CourseModel.prototype.getDistributionOneCredits = function() {
  return 0;
};


/**
 * @return {number}
 */
CourseModel.prototype.getDistributionTwoCredits = function() {
  return 0;
};


/**
 * @return {number}
 */
CourseModel.prototype.getDistributionThreeCredits = function() {
  return 0;
};


/**
 * Returns all sections of the current course (including this one).
 * @return {!goog.Promise.<!Array.<!CourseModel>>}
 */
CourseModel.prototype.getAllSections = function() {
  return goog.Promise.resolve([this]);
};

});  // goog.scope
