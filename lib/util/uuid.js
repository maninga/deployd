var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;
var crypto = require('crypto');

// Modified RFC 4122 v4 UUID
exports.create = function (length) {
  length = length || 24;
  var hexDigits = "0123456789abcdef";
  var s = crypto.randomBytes(length).toString('hex').split(''); // convert string to array
  s.length = length; // trim to length if bigger

  s[length - 3] = hexDigits.substr((s[length - 3] & 0x3) | 0x8, 1);

  // return the uuid
  return s.join('');
};

/**
 * Convert to ObjectID.
 *
 * @param {String} hex
 * @return {ObjectID}
 */
exports.toObjectID = function (hex) {
  if (hex instanceof ObjectID) {
    return hex;
  }
  if (!hex || hex.length !== 24) {
    return hex;
  }
  var oid = new ObjectID(hex); // .createFromHexString(hex);

  return oid;
};

exports.isObjectID = function (idstr) {
  return ObjectID.isValid(idstr);
};
