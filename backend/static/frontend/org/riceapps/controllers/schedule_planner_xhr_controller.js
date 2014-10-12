goog.provide('org.riceapps.controllers.SchedulePlannerXhrController');

goog.require('goog.Promise');
goog.require('goog.Uri');
goog.require('goog.Uri.QueryData');
goog.require('goog.events.Event');
goog.require('goog.net.XhrIo');
goog.require('org.riceapps.controllers.Controller');
goog.require('org.riceapps.models.UserModel');
goog.require('org.riceapps.protocol.Messages');
goog.require('org.riceapps.events.UserModelEvent');

goog.scope(function() {
var Messages = org.riceapps.protocol.Messages;
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
  XSRF_EXPIRED: 'xsrf_expired',
  PARSE_ERROR: 'parse_erorr',
  NETWORK_FAILURE: 'network_failure',
  UNKNOWN: 'unknown'
};


/** @const {string} */
SchedulePlannerXhrController.XSRF_PARAM_NAME = '_xsrf';


/** @enum {string} */
SchedulePlannerXhrController.Path = {
  USER: '/api/user',
  COURSES: '/api/courses'
};


/** @const {string} */
SchedulePlannerXhrController.XSSI_PREFIX = "')]}\n";


/** @const {number} */
SchedulePlannerXhrController.DEFAULT_TIMEOUT = 2000;


/**
 * Retrieves the user model from the server.
 * @return {!goog.Promise.<!org.riceapps.models.UserModel>}
 */
SchedulePlannerXhrController.prototype.getUserModel = function() {
  // If we already have a user model, re-use it.
  if (this.userModel_) {
    return goog.Promise.resolve(this.userModel_);
  }

  // Otherwise, we will need to make a request to the server.
  return new goog.Promise(function(resolve, reject) {
    var url = this.buildXhrUrl(SchedulePlannerXhrController.Path.USER, {});

    goog.net.XhrIo.send(url, goog.bind(function(event) {
      var xhr = event.target;

      if (!xhr.isSuccess()) {
        reject(SchedulePlannerXhrController.ErrorType.NETWORK_FAILURE);
        return;
      }

      if (xhr.getStatus() !== 200) {
        reject(SchedulePlannerXhrController.ErrorType.SESSION_EXPIRED);
        return;
      }

      var data;

      try {
        data = /** @type {org.riceapps.protocol.Messages.User} */
            (xhr.getResponseJson(SchedulePlannerXhrController.XSSI_PREFIX));
      } catch (error) {
        reject(SchedulePlannerXhrController.ErrorType.PARSE_ERROR);
        return;
      }

      resolve(new org.riceapps.models.UserModel(data));
    }, this), 'GET', undefined, undefined, SchedulePlannerXhrController.DEFAULT_TIMEOUT);
  }, this).then(function(userModel) {
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
  var request = /** @type {Messages.UserRequest} */ ({
    userId: 0,
    xsrfToken: "",
    hasSeenTour: false,
    playground: {
      courses: [0]
    },
    schedule: {
      courses: [0]
    }
  });

  window.console.log('xhr dispatch: pushing user model to server ', request);

  return goog.Promise.resolve(true);
};


/**
 * @param {org.riceapps.events.UserModelEvent} event
 * @private
 */
SchedulePlannerXhrController.prototype.onPlaygroundCoursesAdded_ = function(event) {
  window.console.log('xhr dispatch: playground_add ', event.courses);
  this.pushUserModel();
};


/**
 * @param {org.riceapps.events.UserModelEvent} event
 * @private
 */
SchedulePlannerXhrController.prototype.onPlaygroundCoursesRemoved_ = function(event) {
  window.console.log('xhr dispatch: playground_remove ', event.courses);
  this.pushUserModel();
};


/**
 * @param {org.riceapps.events.UserModelEvent} event
 * @private
 */
SchedulePlannerXhrController.prototype.onScheduleCoursesAdded_ = function(event) {
  window.console.log('xhr dispatch: schedule_add ', event.courses);
  this.pushUserModel();
};


/**
 * @param {org.riceapps.events.UserModelEvent} event
 * @private
 */
SchedulePlannerXhrController.prototype.onScheduleCoursesRemoved_ = function(event) {
  window.console.log('xhr dispatch: schedule_remove ', event.courses);
  this.pushUserModel();
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
 * Returns all courses matching the provided query.
 * @param {!Messages.CoursesRequest} request
 * @return {!goog.Promise.<!Array.<!CourseModel>>}
 */
SchedulePlannerXhrController.prototype.getCourses = function(request) {
  return goog.Promise.resolve([]);
};

});  // goog.scope
