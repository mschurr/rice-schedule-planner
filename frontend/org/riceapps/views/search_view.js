goog.provide('org.riceapps.views.SearchView');

goog.require('goog.Timer');
goog.require('goog.dom.classlist');
goog.require('goog.style');
goog.require('org.riceapps.fx.Animation');
goog.require('org.riceapps.views.View');

goog.scope(function() {
var Animation = org.riceapps.fx.Animation;



/**
 * @extends {org.riceapps.views.View}
 * @constructor
 */
org.riceapps.views.SearchView = function() {
  goog.base(this);

  /** @private {number} */
  this.hideTimer_ = -1;
};
goog.inherits(org.riceapps.views.SearchView,
              org.riceapps.views.View);
var SearchView = org.riceapps.views.SearchView;


/**
 * @enum {string}
 */
SearchView.Theme = {
  BASE: 'search-view'
};


/**
 * @override
 */
SearchView.prototype.createDom = function() {
  goog.base(this, 'createDom');
  goog.dom.classlist.add(this.getElement(), SearchView.Theme.BASE);
};


/**
 * @override
 */
SearchView.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  this.hide(true);
};


/**
 * @override
 */
SearchView.prototype.show = function(opt_preventAnimation) {
  if (this.isShown()) {
    return;
  }

  if (this.hideTimer_ != -1) {
    goog.Timer.clear(this.hideTimer_);
    this.hideTimer_ = -1;
  }

  goog.base(this, 'show', opt_preventAnimation);
  goog.style.setElementShown(this.getElement(), true);

  goog.dom.classlist.removeAll(this.getElement(),
      [Animation.BASE_CLASS, Animation.Preset.FADE_IN_RIGHT_BIG, Animation.Preset.FADE_OUT_RIGHT_BIG]);

  if(!opt_preventAnimation) {
    goog.dom.classlist.addAll(this.getElement(), [Animation.BASE_CLASS, Animation.Preset.FADE_IN_RIGHT_BIG]);
  }
};


/**
 * @override
 */
SearchView.prototype.hide = function(opt_preventAnimation) {
  if (!this.isInDocument() || this.isHidden()) {
    return;
  }

  goog.base(this, 'hide', opt_preventAnimation);

  goog.dom.classlist.removeAll(this.getElement(),
      [Animation.BASE_CLASS, Animation.Preset.FADE_IN_RIGHT_BIG, Animation.Preset.FADE_OUT_RIGHT_BIG]);

  if(!opt_preventAnimation) {
    goog.dom.classlist.addAll(this.getElement(), [Animation.BASE_CLASS, Animation.Preset.FADE_OUT_RIGHT_BIG]);
    this.hideTimer_ = goog.Timer.callOnce(function() {
      goog.style.setElementShown(this.getElement(), false);
      this.hideTimer_ = -1;
    }, 300, this);
  } else {
    goog.style.setElementShown(this.getElement(), false);
  }
};

});
