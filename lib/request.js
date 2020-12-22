import { Buffer } from 'buffer'
var 
  axios = require("axios"),
  url = require("url");

module.exports = function (opts, buffer, cb) {
  //All IPP requires are POSTs- so we must have some data.
  //  10 is just a number I picked- this probably should have something more meaningful
  if (!Buffer.isBuffer(buffer) || buffer.length < 10) {
    return cb(new Error("Data required"));
  }
  

  if (!opts.headers) opts.headers = {};
  opts.headers["Content-Type"] = "application/ipp";
  return axios.default
    .post(opts.href, buffer, {
      headers: opts.headers,
    })
    .then((res) => {
      if (res.status === 200) {
				return cb(null, res)
      } else {
        return cb(new IppResponseError(res.status));
      }
    })
    .catch((e) => {
      cb(e)
    });

};

function IppResponseError(statusCode, message) {
  this.name = "IppResponseError";
  this.statusCode = statusCode;
  this.message =
    message ||
    "Received unexpected response status " + statusCode + " from the printer";
  this.stack = new Error().stack;
}
IppResponseError.prototype = Object.create(Error.prototype);
IppResponseError.prototype.constructor = IppResponseError;
