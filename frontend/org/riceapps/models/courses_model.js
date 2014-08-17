goog.provide('org.riceapps.models.CoursesModel');

goog.require('org.riceapps.models.CourseModel');
goog.require('org.riceapps.models.Model');

goog.scope(function() {



/**
 * @extends {org.riceapps.models.Model}
 * @constructor
 */
org.riceapps.models.CoursesModel = function() {
  goog.base(this);
};
goog.inherits(org.riceapps.models.CoursesModel,
              org.riceapps.models.Model);
var CoursesModel = org.riceapps.models.CoursesModel;


/**
 * @param {number} courseId
 */
CoursesModel.prototype.getCourseById = function(courseId) {};


/**
 * Returns all sessions of courses within the given course category.
 * @param {string} category
 */
CoursesModel.prototype.getCoursesInCategory = function(category) {};


/**
 * @param {string} query
 */
CoursesModel.prototype.getCoursesByQuery = function(query) {};


/**
 * @param {!Array.<!CourseModel>} courses
 * @param {!function(!CourseModel): boolean} filter
 * @return {!Array.<!CourseModel>}
 */
CoursesModel.filter = function() {
  var filtered = [];

  return filtered;
};

});  // goog.scope
