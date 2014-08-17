goog.provide('org.riceapps.models.UserModel');

goog.require('goog.array');
goog.require('org.riceapps.events.UserModelEvent');
goog.require('org.riceapps.models.Model');
goog.require('org.riceapps.models.CourseModel');

goog.scope(function() {
var CourseModel = org.riceapps.models.CourseModel;
var UserModelEvent = org.riceapps.events.UserModelEvent;



/**
 * @param {number} userId
 * @param {string} userName
 * @param {Array.<!CourseModel>=} opt_schedule
 * @param {Array.<!CourseModel>=} opt_playground
 * @extends {org.riceapps.models.Model}
 * @constructor
 */
org.riceapps.models.UserModel = function(userId, userName, opt_schedule, opt_playground) {
  goog.base(this);

  /** @private {!Array.<!CourseModel>} */
  this.schedule_ = [new org.riceapps.models.CourseModel()];

  /** @private {!Array.<!CourseModel>} */
  this.playground_ = [new org.riceapps.models.CourseModel()];

  /** @private {number} */
  this.userId_ = userId;

  /** @private {string} */
  this.userName_ = userName;

  if (opt_playground) {
    this.addCoursesToPlayground(opt_playground);
  }

  if (opt_schedule) {
    this.addCoursesToSchedule(opt_schedule);
  }
};
goog.inherits(org.riceapps.models.UserModel,
              org.riceapps.models.Model);
var UserModel = org.riceapps.models.UserModel;


/**
 * @return {number}
 */
UserModel.prototype.getUserId = function() {
  return this.userId_;
};


/**
 * @return {string}
 */
UserModel.prototype.getUserName = function() {
  return this.userName_;
};


/**
 * @param {!Array.<!CourseModel>} courses
 */
UserModel.prototype.addCoursesToPlayground = function(courses) {
  for (var i = 0; i < courses.length; i++) {
    if (!goog.array.contains(this.playground_, courses[i])) {
      goog.array.insert(this.playground_, courses[i]);
    }
  }

  this.dispatchEvent(new UserModelEvent(UserModelEvent.Type.PLAYGROUND_COURSES_ADDED, courses));
};


/**
 * @param {!Array.<!CourseModel>} courses
 */
UserModel.prototype.removeCoursesFromPlayground = function(courses) {
  for (var i = 0; i < courses.length; i++) {
    goog.array.remove(this.playground_, courses[i]);
  }

  this.dispatchEvent(new UserModelEvent(UserModelEvent.Type.PLAYGROUND_COURSES_REMOVED, courses));
};


/**
 * @return {!Array.<!CourseModel>}
 */
UserModel.prototype.getCoursesInPlayground = function() {
  return this.playground_;
};


/**
 * @param {!Array.<!CourseModel>} courses
 */
UserModel.prototype.addCoursesToSchedule = function(courses) {
  for (var i = 0; i < courses.length; i++) {
    if (!goog.array.contains(this.schedule_, courses[i])) {
      goog.array.insert(this.schedule_, courses[i]);
    }
  }

  this.dispatchEvent(new UserModelEvent(UserModelEvent.Type.SCHEDULE_COURSES_ADDED, courses));
};


/**
 * @param {!Array.<!CourseModel>} courses
 */
UserModel.prototype.removeCoursesFromSchedule = function(courses) {
  for (var i = 0; i < courses.length; i++) {
    goog.array.remove(this.schedule_, courses[i]);
  }

  this.dispatchEvent(new UserModelEvent(UserModelEvent.Type.SCHEDULE_COURSES_REMOVED, courses));
};


/**
 * @return {!Array.<!CourseModel>}
 */
UserModel.prototype.getCoursesInSchedule = function() {
  return this.schedule_;
};


});  // goog.scope
