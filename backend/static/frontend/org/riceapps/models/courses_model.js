goog.provide('org.riceapps.models.CoursesModel');

goog.require('goog.structs.Map');
goog.require('org.riceapps.models.Model');
goog.require('org.riceapps.models.CourseModel');
goog.require('org.riceapps.protocol.Messages');

goog.scope(function() {
var CourseModel = org.riceapps.models.CourseModel;


/**
 * @param {?org.riceapps.protocol.Messages.Courses=} opt_data
 * @extends {org.riceapps.models.Model}
 * @constructor
 */
org.riceapps.models.CoursesModel = function(opt_data) {
  goog.base(this);

  /** @private {!goog.structs.Map.<number, !CourseModel>} */
  this.courses_ = new goog.structs.Map();

  if (opt_data) {
    for (var i = 0; i < opt_data['courses'].length; i++) {
      var course = opt_data['courses'][i];
      this.courses_.set(course['courseId'], new CourseModel(course, this));
    }
  }

};
goog.inherits(org.riceapps.models.CoursesModel,
              org.riceapps.models.Model);
var CoursesModel = org.riceapps.models.CoursesModel;


/**
 * @param {number} id
 * @return {org.riceapps.models.CourseModel}
 */
CoursesModel.prototype.getCourseById = function(id) {
  return this.courses_.get(id, null);
};

});  // goog.scope
