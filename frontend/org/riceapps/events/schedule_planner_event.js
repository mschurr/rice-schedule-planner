goog.provide('org.riceapps.events.SchedulePlannerEvent');

goog.require('goog.events.Event');

goog.scope(function() {



/**
 * @param {SchedulePlannerEvent.Type}
 * @extends {goog.events.Event}
 * @constructor
 */
org.riceapps.events.SchedulePlannerEvent = function(type) {
  goog.base(this, type);

  /** @type {!Array.<!org.riceapps.views.AbstractCourseView>} */
  this.courses = [];

  /** @type {!Array.<!org.riceapps.models.CourseModel} */
  this.models = [];
};
goog.inherits(org.riceapps.events.SchedulePlannerEvent,
              goog.events.Event);
var SchedulePlannerEvent = org.riceapps.events.SchedulePlannerEvent;


/**
 * @const {string}
 */
SchedulePlannerEvent.Type = {
  REMOVE_PLAYGROUND_ITEMS: 'sp_remove_playground_items',
  REMOVE_SCHEDULE_ITEMS: 'sp_remove_schedule_items',
  ADD_PLAYGROUND_ITEMS: 'sp_add_playground_items',
  ADD_SCHEDULE_ITEMS: 'sp_remove_playground_items',
  ADD_GUIDE_VIEWS: 'sp_add_guide_views'
};

});  // goog.scope
