goog.provide('org.riceapps.proto.ProtocolMessage');

goog.scope(function() {



/**
 * @constructor
 */
org.riceapps.proto.ProtocolMessage = function() {};
var ProtocolMessage = org.riceapps.proto.ProtocolMessage;


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
