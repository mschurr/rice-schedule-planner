goog.provide('org.riceapps.controllers.SchedulePlannerXhrController');

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
  this.userModel_ = new org.riceapps.models.UserModel(1, 'lol');
};
goog.inherits(org.riceapps.controllers.SchedulePlannerXhrController,
              org.riceapps.controllers.Controller);
var SchedulePlannerXhrController = org.riceapps.controllers.SchedulePlannerXhrController;


/**
 * @enum {string}
 */
SchedulePlannerXhrController.EventType = {
  USER_MODEL_READY: 'user_model_ready'
};


/**
 * @return {org.riceapps.models.UserModel}
 */
SchedulePlannerXhrController.prototype.getUserModel = function() {
  return this.userModel_;
};


/**
 *
 */
SchedulePlannerXhrController.prototype.startLoadingUserModel = function() {
  this.getHandler().listenOnce(this, SchedulePlannerXhrController.EventType.USER_MODEL_READY, this.onUserModelReady_);
  this.dispatchEvent(new goog.events.Event(SchedulePlannerXhrController.EventType.USER_MODEL_READY));
};


/**
 *
 */
SchedulePlannerXhrController.prototype.getCourseModel = function(courseId) {};


/**
 * @param {goog.events.Event} event
 * @private
 */
SchedulePlannerXhrController.prototype.onUserModelReady_ = function(event) {
  this.getHandler().
    listen(this.userModel_, UserModelEvent.Type.PLAYGROUND_COURSES_ADDED, this.onPlaygroundCoursesAdded_).
    listen(this.userModel_, UserModelEvent.Type.PLAYGROUND_COURSES_REMOVED, this.onPlaygroundCoursesRemoved_).
    listen(this.userModel_, UserModelEvent.Type.SCHEDULE_COURSES_ADDED, this.onScheduleCoursesAdded_).
    listen(this.userModel_, UserModelEvent.Type.SCHEDULE_COURSES_REMOVED, this.onScheduleCoursesRemoved_);
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


});  // goog.scope
