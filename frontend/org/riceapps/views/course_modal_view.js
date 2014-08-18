goog.provide('org.riceapps.views.CourseModalView');

goog.require('org.riceapps.models.CourseModel');
goog.require('org.riceapps.views.ModalView');

goog.scope(function() {



/**
 * @param {!org.riceapps.models.CourseModel} courseModel
 * @extends {org.riceapps.views.ModalView}
 * @constructor
 */
org.riceapps.views.CourseModalView = function(courseModel) {
  goog.base(this);

  /** @private {!org.riceapps.models.CourseModel} */
  this.courseModel_ = courseModel;
};
goog.inherits(org.riceapps.views.CourseModalView,
              org.riceapps.views.ModalView);
var CourseModalView = org.riceapps.views.CourseModalView;


/**
 * @override
 */
CourseModalView.prototype.createDom = function() {
  goog.base(this, 'createDom');
};

});  // goog.scope
