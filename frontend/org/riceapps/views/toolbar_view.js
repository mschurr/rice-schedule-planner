goog.provide('org.riceapps.views.ToolbarView');

goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.dom.classlist');
goog.require('goog.events.BrowserEvent');
goog.require('goog.events.Event');
goog.require('goog.events.KeyEvent');
goog.require('goog.events.EventType');
goog.require('org.riceapps.views.CourseView');
goog.require('org.riceapps.views.TrashView');
goog.require('org.riceapps.views.View');

goog.scope(function() {



/**
 *
 * TODO: Show the number of credits in calendar (all, D1, D2, D3)
 * TODO: Swap between calendar view and list view.
 *
 * @extends {org.riceapps.views.View}
 * @constructor
 */
org.riceapps.views.ToolbarView = function() {
  goog.base(this);

  /** @private {!org.riceapps.views.TrashView} */
  this.trashView_ = new org.riceapps.views.TrashView();
  this.addChild(this.trashView_);

  /** @private {Element} */
  this.searchInput_ = null;

  /** @private {Element} */
  this.allCredits_ = null;

  /** @private {Element} */
  this.distributionOneCredits_ = null;

  /** @private {Element} */
  this.distrbutionTwoCredits_ = null;

  /** @private {Element} */
  this.distrbutionThreeCredits_ = null;
};
goog.inherits(org.riceapps.views.ToolbarView,
              org.riceapps.views.View);
var ToolbarView = org.riceapps.views.ToolbarView;


/** @enum {string} */
ToolbarView.Theme = {
  BASE: 'tool-bar-view',
  INPUT: 'tool-bar-view-input'
};


/** @const {string} */
ToolbarView.DEFAULT_QUERY = 'Find Courses...';


/**
 * @return {!org.riceapps.views.TrashView}
 */
ToolbarView.prototype.getTrashView = function() {
  return this.trashView_;
};


/**
 * @override
 */
ToolbarView.prototype.createDom = function() {
  goog.base(this, 'createDom');
  goog.dom.classlist.add(this.getElement(), ToolbarView.Theme.BASE);
  this.trashView_.render(this.getElement());

  this.searchInput_ = goog.dom.createDom(goog.dom.TagName.INPUT, ToolbarView.Theme.INPUT);
  this.searchInput_.value = ToolbarView.DEFAULT_QUERY;
  goog.dom.appendChild(this.getElement(), this.searchInput_);
};


/**
 * @override
 */
ToolbarView.prototype.relayout = function(opt_preventAnimation) {
  window.console.log('ToolbarView.relayout');
  goog.base(this, 'relayout', opt_preventAnimation);
};


/**
 * @override
 */
ToolbarView.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  this.getHandler().
    listen(this.searchInput_, goog.events.EventType.FOCUS, this.onSearchInputFocus_).
    listen(this.searchInput_, goog.events.EventType.BLUR, this.onSearchInputBlur_).
    listen(this.searchInput_, goog.events.EventType.KEYUP, this.onSearchInputKeyUp_);
};


/**
 * @override
 */
ToolbarView.prototype.exitDocument = function() {
  goog.base(this, 'exitDocument');

  this.getHandler().
    unlisten(this.searchInput_, goog.events.EventType.FOCUS, this.onSearchInputFocus_).
    unlisten(this.searchInput_, goog.events.EventType.BLUR, this.onSearchInputBlur_).
    unlisten(this.searchInput_, goog.events.EventType.KEYUP, this.onSearchInputKeyUp_);
};


/**
 * @param {goog.events.BrowserEvent} event
 */
ToolbarView.prototype.onSearchInputBlur_ = function(event) {
  if (this.searchInput_.value == '') {
    this.searchInput_.value = ToolbarView.DEFAULT_QUERY;
  }
};


/**
 * @param {goog.events.BrowserEvent} event
 */
ToolbarView.prototype.onSearchInputFocus_ = function(event) {
  if (this.searchInput_.value == ToolbarView.DEFAULT_QUERY) {
    this.searchInput_.value = '';
  }
};


/**
 * @param {goog.events.KeyEvent} event
 */
ToolbarView.prototype.onSearchInputKeyUp_ = function(event) {

};


}); // goog.scope
