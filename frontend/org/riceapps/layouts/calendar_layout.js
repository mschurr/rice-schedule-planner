goog.provide('org.riceapps.layouts.CalendarLayout');
goog.provide('org.riceapps.layouts.CalendarLayout.Calendar');
goog.provide('org.riceapps.layouts.CalendarLayout.Item');

goog.require('goog.math.Rect');
goog.require('org.riceapps.models.CourseModel');

goog.scope(function() {



/**
 * Represents a calendar.
 * @interface
 */
org.riceapps.layouts.CalendarLayout.Calendar = function() {};


/**
 * Returns the rectangle in which a view embedded on the calendar should be drawn given its day and hour, or null if
 * unable to determine where to render the item.
 * @type {number} day (0 Sunday to 6 Satuday)
 * @type {number} start (number of hours since midnight; decimal values accepted)
 * @type {number} end (number of horus since midnight; decimal values accepted)
 * @tyoe {number} offset (offset within the timeslot at which to render)
 * @type {number} total (total number of columns within the time slot)
 * @return {goog.math.Rect}
 */
org.riceapps.layouts.CalendarLayout.Calendar.prototype.getCalendarItemRect =
    function(day, start, end, offset, total) {};


/**
 * Returns the items in the calendar.
 * @return {!Array.<!org.riceapps.layouts.CalendarLayout.Item>}
 */
org.riceapps.layouts.CalendarLayout.Calendar.prototype.getCalendarItems = function() {};



/**
 * Represents an item in a calendar.
 * @interface
 */
org.riceapps.layouts.CalendarLayout.Item = function() {};


/**
 * Informs the item of the positions and dimensions in which it should render itself.
 * The rectangles are in order corresponding to the order provided by the last call to getCalendarTimes().
 * @param {!Array.<!goog.math.Rect>} rects
 */
org.riceapps.layouts.CalendarLayout.Item.prototype.drawInRects = function(rects) {};


/**
 * Returns the times at which this calendar item wishes to position itself.
 * @return {!Array.<!CourseModel.MeetingTime>}
 */
org.riceapps.layouts.CalendarLayout.Item.prototype.getCalendarTimes = function() {};



/**
 * A calendar layout is responsible for positioning the items within a calendar. To position the items, simply call
 * relayout() provided both the calendar and its items implement the required interfaces.
 * @param {!org.riceapps.layouts.CalendarLayout.Calendar} calendar
 * @constructor
 */
org.riceapps.layouts.CalendarLayout = function(calendar) {
  /** @private {!org.riceapps.layouts.CalendarLayout.Calendar} */
  this.calendar_ = calendar;
};
var CalendarLayout = org.riceapps.layouts.CalendarLayout;


/**
 * A naive relayout operation which assumes there will never be any time conflicts between rendered courses.
 * @private
 */
CalendarLayout.prototype.naiveRelayout_ = function() {
  window.console.log('CalendarLayout.naiveRelayout_');
  var items = this.calendar_.getCalendarItems();
  for (var i = 0; i < items.length; i++) {
    var times = items[i].getCalendarTimes();
    var rects = [];

    for (var j = 0; j < times.length; j++) {
      rects.push(this.calendar_.getCalendarItemRect(times[j]['day'], times[j]['start'], times[j]['end'], 0 , 1));
    }

    items[i].drawInRects(rects);
  }
};


/**
 * Calculates the position at which each item in the calendar should be rendered and informs the calendar items of their
 * positions.
 *
 * TODO(mschurr): This ended up being a rather tricky problem... come back to it later.
 */
CalendarLayout.prototype.relayout = function() {
  this.naiveRelayout_();
  return;

  // Build a matrix of calendar positions.
  var matrix = {};

  for (var day = 0; day < 7; day ++) {
    matrix[day] = {};

    for (var hour = 0; hour < 24; hour++) {
      matrix[day][hour] = [];
    }
  }

  // Ask the calendar for all of the items.
  var items = this.calendar_.getCalendarItems();

  // Ask each item for the times in which it wishes to be rendered and add the data to the matrix.
  for (var i = 0; i < items.length; i++) {
    var times = items[i].getCalendarTimes();

    for (var j = 0; j < times.length; j++) {
      var start = times[j]['start'];
      var end = times[j]['end'];
      var day = times[j]['day'];

      for (var k = Math.floor(start); k < Math.ceil(end); k++) {
        matrix[day][k] = items[i];
      }
    }
  }

  // Calculate the final positions of each item in the calendar.

  // Inform each calendar item of the positions it should render in.
  for (var i = 0; i < items.length; i++) {
    //items[i].drawInRects(rects);
  }
};

});
