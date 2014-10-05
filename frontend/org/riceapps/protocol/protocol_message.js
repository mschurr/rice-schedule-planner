goog.provide('org.riceapps.protocol.ProtocolMessage');

goog.scope(function() {



/**
 * @constructor
 */
org.riceapps.protocol.ProtocolMessage = function() {};
var ProtocolMessage = org.riceapps.protocol.ProtocolMessage;


/**
 * @return {boolean}
 */
ProtocolMessage.prototype.validate = function() {
  return true;
};


/**
 * @param {string} data
 * @return {ProtocolMessage}
 */
ProtocolMessage.unserialize = function(data) {
  return null;
};


/**
 * @param {ProtocolMessage} message
 * @return {string}
 */
ProtocolMessage.serialize = function(message) {
  return "";
};

});  // goog.scope
