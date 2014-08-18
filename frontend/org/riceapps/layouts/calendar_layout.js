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
  window.console.log('CalendarLayout.relayout');
  var matrix = this.createMatrix_();
  var offsets = {};

  // Ask the calendar for all of the items.
  var items = this.calendar_.getCalendarItems();

  // Calculate the layout of the calendar.
  for (var i = 0; i < items.length; i++) {
    offsets[i] = [];
    var item = items[i];
    var times = item.getCalendarTimes();

    for (var j = 0; j < times.length; j++) {
      var time = times[j];
      var offset = this.placeItem_(matrix, time);
      offsets[i].push(offset);
    }
  }

  //window.console.log(matrix);

  // Inform the calendar items of their positions.
  for (var i = 0; i < items.length; i++) {
    var times = items[i].getCalendarTimes();
    var rects = [];

    for (var j = 0; j < times.length; j++) {
      //window.console.log(offsets[i][j], matrix[times[j]['day']][Math.floor(times[j]['start'])]);
      rects.push(this.calendar_.getCalendarItemRect(
        times[j]['day'],
        times[j]['start'],
        times[j]['end'],
        offsets[i][j],
        matrix[times[j]['day']][Math.floor(times[j]['start'])].length
      ));
    }

    items[i].drawInRects(rects);
  }
};


/**
 * @param {!Object.<number, !Object.<number, !Array.<boolean>>>} matrix
 * @param {!org.riceapps.models.CourseModel.MeetingTime} time
 * @return {number}
 */
CalendarLayout.prototype.placeItem_ = function(matrix, time) {
  var day = time['day'];
  var start = time['start'];
  var end = time['end'];
  var offset = 0;

  while (true) {
    var placed = this.canPlaceAt_(matrix, day, start, end, offset);

    if (placed) {
      break;
    }

    offset++;
  }

  // Write the item into the marix.
  for (var hour = Math.floor(start); hour < Math.ceil(end); hour += 1) {
    // Ensure there is sufficient space.
    while (offset >= matrix[day][hour].length) {
      matrix[day][hour].push(false);
    }

    // Write the placement.
    matrix[day][hour][offset] = true;
  }

  return offset;
};


/**
 * @param {!Object.<number, !Object.<number, !Array.<boolean>>>} matrix
 * @param {number} day
 * @param {number} start
 * @param {number} end
 * @param {number} offset
 * @return {boolean}
 */
CalendarLayout.prototype.canPlaceAt_ = function(matrix, day, start, end, offset) {
  for (var hour = Math.floor(start); hour < Math.ceil(end); hour += 1) {
    if (offset < matrix[day][hour].length && matrix[day][hour][offset]) {
      return false;
    }
  }

  return true;
};


/**
 * @return {!Object.<number, !Object.<number, !Array.<boolean>>>}
 */
CalendarLayout.prototype.createMatrix_ = function() {
  // Build a matrix of calendar positions.
  var matrix = {};

  for (var day = 0; day < 7; day ++) {
    matrix[day] = {};

    for (var hour = 0; hour < 24; hour++) {
      matrix[day][hour] = [];
    }
  }

  return matrix;
};


});
