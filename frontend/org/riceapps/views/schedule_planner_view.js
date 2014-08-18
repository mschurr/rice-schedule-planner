goog.provide('org.riceapps.views.SchedulePlannerView');

goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.dom.classlist');
goog.require('org.riceapps.views.CalendarView');
goog.require('org.riceapps.views.CourseView');
goog.require('org.riceapps.views.FooterView');
goog.require('org.riceapps.views.ModalView');
goog.require('org.riceapps.views.NavigationBarView');
goog.require('org.riceapps.views.PlaygroundView');
goog.require('org.riceapps.views.ToolbarView');
goog.require('org.riceapps.views.View');
/*goog.require('org.riceapps.views.CourseInfoView');
goog.require('org.riceapps.views.SearchView');*/

goog.scope(function() {



/**
 * @extends {org.riceapps.views.View}
 * @constructor
 */
org.riceapps.views.SchedulePlannerView = function() {
  goog.base(this);

  /** @private {!org.riceapps.views.NavigationBarView} */
  this.navigationBarView_ = new org.riceapps.views.NavigationBarView();
  this.addChild(this.navigationBarView_);

  /** @private {!org.riceapps.views.ToolbarView} */
  this.toolbarView_ = new org.riceapps.views.ToolbarView();
  this.addChild(this.toolbarView_);

  /** @private {!org.riceapps.views.PlaygroundView} */
  this.playgroundView_ = new org.riceapps.views.PlaygroundView();
  this.addChild(this.playgroundView_);

  /** @private {!org.riceapps.views.CalendarView} */
  this.calendarView_ = new org.riceapps.views.CalendarView();
  this.addChild(this.calendarView_);

  /** @private {!org.riceapps.views.FooterView} */
  this.footerView_ = new org.riceapps.views.FooterView();
  this.addChild(this.footerView_);
};
goog.inherits(org.riceapps.views.SchedulePlannerView,
              org.riceapps.views.View);
var SchedulePlannerView = org.riceapps.views.SchedulePlannerView;


/** @enum {string} */
SchedulePlannerView.Theme = {
  BASE: 'schedule-planner-view',
  COLUMNS: 'columns'
};


/**
 * @return {!org.riceapps.views.CalendarView}
 */
SchedulePlannerView.prototype.getCalendarView = function() {
  return this.calendarView_;
};


/**
 * @return {!org.riceapps.views.PlaygroundView}
 */
SchedulePlannerView.prototype.getPlaygroundView = function() {
  return this.playgroundView_;
};


/**
 * @return {!org.riceapps.views.TrashView}
 */
SchedulePlannerView.prototype.getTrashView = function() {
  return this.toolbarView_.getTrashView();
};


/**
 * @override
 */
SchedulePlannerView.prototype.createDom = function() {
  goog.base(this, 'createDom');
  goog.dom.classlist.add(this.getElement(), SchedulePlannerView.Theme.BASE);

  this.navigationBarView_.render(this.getElement());
  this.toolbarView_.render(this.getElement());

  var columns = goog.dom.createDom(goog.dom.TagName.DIV, SchedulePlannerView.Theme.COLUMNS);
  goog.dom.appendChild(this.getElement(), columns);
  this.playgroundView_.render(columns);
  this.calendarView_.render(columns);

  this.footerView_.render(this.getElement());
};



/**
 * @override
 */
SchedulePlannerView.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  this.relayout(true);
};


/**
 * @override
 */
SchedulePlannerView.prototype.relayout = function(opt_preventAnimation) {
  var size = goog.dom.getViewportSize();
  goog.style.setWidth(this.getElementStrict(), Math.max(size.width, 1000));
  window.console.log('SchedulePlannerView.relayout');
  goog.base(this, 'relayout', opt_preventAnimation);
};

}); // goog.scope