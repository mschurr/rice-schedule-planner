goog.provide('org.riceapps.controllers.SchedulePlannerXhrController');

goog.require('goog.Promise');
goog.require('goog.Uri');
goog.require('goog.Uri.QueryData');
goog.require('goog.events.Event');
goog.require('org.riceapps.controllers.Controller');
goog.require('org.riceapps.models.UserModel');
goog.require('org.riceapps.events.UserModelEvent');

goog.scope(function() {
var UserModelEvent = org.riceapps.events.UserModelEvent;



/**
 * @extends {org.riceapps.controllers.Controller}
 * @constructor
 */
org.riceapps.controllers.SchedulePlannerXhrController = function() {
  goog.base(this);

  /** @private {org.riceapps.models.UserModel} */
  this.userModel_ = null;
};
goog.inherits(org.riceapps.controllers.SchedulePlannerXhrController,
              org.riceapps.controllers.Controller);
var SchedulePlannerXhrController = org.riceapps.controllers.SchedulePlannerXhrController;


/**
 * @enum {string}
 */
SchedulePlannerXhrController.ErrorType = {
  SESSION_EXPIRED: 'session_expired',
  XSRF_EXPIRED: 'xsrf_expired'
};


/** @const {string} */
SchedulePlannerXhrController.XSRF_PARAM_NAME = '_xsrf';


/** @enum {string} */
SchedulePlannerXhrController.Path = {

};


/**
 * Retrieves the user model from the server.
 * @return {!goog.Promise.<!org.riceapps.models.UserModel>}
 */
SchedulePlannerXhrController.prototype.getUserModel = function() {
  if (this.userModel_) {
    return goog.Promise.resolve(this.userModel_);
  }

  return goog.Promise.resolve(new org.riceapps.models.UserModel(1, 'lol', 'xsrf')).then(function(userModel) {
    this.userModel_ = userModel;
    this.getHandler().
      listen(this.userModel_, UserModelEvent.Type.PLAYGROUND_COURSES_ADDED, this.onPlaygroundCoursesAdded_).
      listen(this.userModel_, UserModelEvent.Type.PLAYGROUND_COURSES_REMOVED, this.onPlaygroundCoursesRemoved_).
      listen(this.userModel_, UserModelEvent.Type.SCHEDULE_COURSES_ADDED, this.onScheduleCoursesAdded_).
      listen(this.userModel_, UserModelEvent.Type.SCHEDULE_COURSES_REMOVED, this.onScheduleCoursesRemoved_);
    return userModel;
  }, undefined, this);
};


/**
 * Pushes the user model to the remote server, synchronizing any properties changed client-side to the server.
 * @return {!goog.Promise<boolean>}
 */
SchedulePlannerXhrController.prototype.pushUserModel = function() {
  return goog.Promise.resolve(true);
};


/**
 * Retrieves a course model from the server.
 * @return {!goog.Promise.<!org.riceapps.models.CourseModel>}
 */
SchedulePlannerXhrController.prototype.getCourseModel = function(courseId) {
  return goog.Promise.resolve(new org.riecapps.models.CourseModel());
};


/**
 * @param {org.riceapps.events.UserModelEvent} event
 * @private
 */
SchedulePlannerXhrController.prototype.onPlaygroundCoursesAdded_ = function(event) {
  window.console.log('xhr dispatch: playground_add ', event.courses);
};


/**
 * @param {org.riceapps.events.UserModelEvent} event
 * @private
 */
SchedulePlannerXhrController.prototype.onPlaygroundCoursesRemoved_ = function(event) {
  window.console.log('xhr dispatch: playground_remove ', event.courses);
};


/**
 * @param {org.riceapps.events.UserModelEvent} event
 * @private
 */
SchedulePlannerXhrController.prototype.onScheduleCoursesAdded_ = function(event) {
  window.console.log('xhr dispatch: schedule_add ', event.courses);
};


/**
 * @param {org.riceapps.events.UserModelEvent} event
 * @private
 */
SchedulePlannerXhrController.prototype.onScheduleCoursesRemoved_ = function(event) {
  window.console.log('xhr dispatch: schedule_remove ', event.courses);
};


/**
 * @param {string} path
 * @param {!Object.<string, *>} params
 * @return {!goog.Uri}
 */
SchedulePlannerXhrController.prototype.buildXhrUrl = function(path, params) {
  if (this.userModel_) {
    params[SchedulePlannerXhrController.XSRF_PARAM_NAME] = this.userModel_.getXsrfToken();
  }

  return goog.Uri.parse(window.location).
      setFragment('').
      setPath(path).
      setQueryData(goog.Uri.QueryData.createFromMap(params));
};


/**
 * @param {number} courseId
 * @return {!goog.Promise.<CourseModel>}
 */
SchedulePlannerXhrController.prototype.getCourseById = function(courseId) {
  return goog.Promise.resolve([]);
};


/**
 * Returns all sessions of the provided course model (including the provided model).
 * @param {!CourseModel}
 * @return {!goog.Promise.<!Array.<!CourseModel>>}
 */
SchedulePlannerXhrController.prototype.getAllCourseSessions = function(courseModel) {
  return goog.Promise.resolve([courseModel]);
};


/**
 * Returns all courses matching the provided query string.
 * @param {string} query
 * @return {!goog.Promise.<!Array.<!CourseModel>>}
 */
SchedulePlannerXhrController.prototype.getCoursesByQuery = function(query, offset, limit) {
  return goog.Promise.resolve([]);
};



});  // goog.scope
