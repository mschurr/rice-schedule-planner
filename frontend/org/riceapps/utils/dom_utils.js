goog.provide('org.riceapps.utils.DomUtils');

goog.require('goog.dom');
goog.require('goog.style');
goog.require('goog.math.Coordinate');
goog.require('goog.math.Rect');
goog.require('goog.math.Size');

goog.scope(function() {
var DomUtils = org.riceapps.utils.DomUtils;



/**
 * Returns the computed size of an element.
 * @param {!Element} element
 * @return {!goog.math.Size}
 */
DomUtils.getComputedSize = function(element) {
  return goog.style.getSize(element);
};


/**
 * Returns the computed size of an element.
 * @param {!Element} element
 * @return {!goog.math.Size}
 */
DomUtils.getComputedInnerSize = function(element) {
  return goog.style.getContentBoxSize(element);
};


/**
 * @param {number} scrollTop
 */
DomUtils.setDocumentScroll = function(distance) {
  distance = Math.max(Math.min(distance, DomUtils.getDocumentHeight()), 0);

  var scroll = goog.dom.getDocumentScroll();
  window.scroll(scroll.x, distance);
};


/**
 * @return {number}
 */
DomUtils.getDocumentHeight = function() {
  var body = document.body,
      html = document.documentElement;

  var height = Math.max(body.scrollHeight, body.offsetHeight,
                        html.clientHeight, html.scrollHeight, html.offsetHeight);

  return height;
};


/**
 * @param {!Elemenet} element
 * @param {goog.math.Rect} rect
 * @param {goog.math.Rect=} opt_adjust
 */
DomUtils.applyRect = function(element, rect, opt_adjust) {
    if (opt_adjust) {
      rect = new goog.math.Rect(
        rect.left - opt_adjust.left,
        rect.top - opt_adjust.top,
        rect.width - opt_adjust.width,
        rect.height - opt_adjust.height
      );
    }

    goog.style.setStyle(element, {
      'position': 'absolute',
      'top' : rect.top + 'px',
      'left' : rect.left + 'px',
      'width': rect.width + 'px',
      'height': rect.height + 'px'
    });

    /*var actualSize = goog.style.getSize(element);
    goog.style.setStyle(element, {
      'width': (rect.width + (rect.width - actualSize.width)) + 'px',
      'height': (rect.height + (rect.height - actualSize.height)) + 'px'
    });

    var actualSize = goog.style.getSize(element);*/
};

});  // goog.scope
