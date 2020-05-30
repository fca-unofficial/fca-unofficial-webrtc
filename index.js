const EventEmitter = require('events');
var nullfunc = function () { };
var globalCallback = nullfunc;

function listenRTC(defaultFuncs, api, ctx) {
  return function listenRTC(callback) {
    var rtcListening = false;
    class RTCMessageEmitter extends EventEmitter {
      stopListening(callback) {
        callback = callback || (() => { });
        globalCallback = nullfunc;
      }
    }

    var msgEmitter = new RTCMessageEmitter();
    if (!callback) {
      globalCallback = function (err, data) {
        if (err) {
          msgEmitter.emit("error", err);
        }
        if (data) {
          msgEmitter.emit("message", data);
        }
      }
    }

    if (!ctx.mqttClient) {
      setTimeout(() => {
        globalCallback(new Error("No MQTT Client detected!"));
      }, 1);
    } else {
      ctx.mqttClient.on('message', function (topic, message, _packet) {
        if (topic == "/webrtc") {
          try {
            var rtcobj = JSON.parse(message);
            callback(null, rtcobj);
          } catch (ex) {
            callback(ex, message);
          }
        }
      });
    }

    return msgEmitter;
  }
}

module.exports = {
  listenRTC
}