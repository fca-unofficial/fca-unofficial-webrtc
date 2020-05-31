# fca-unofficial-webrtc

THIS PROJECT IS JUST A TEST! WebRTC is a mess, and I only have about a day/week to learn about WebRTC and write code.

```js
var fca = require("fca-unofficial");

fca({
    email: "...",
    password: "..."
}).then(function (api) {
    //Get api.listenRTC function
    api.addExternalModule(require("fca-unofficial-webrtc"));

    var msgRec = api.listenMqtt();

    msgRec.on("error", function (err) {
        if (err == "LISTEN OK") {
            api.listenRTC(function (err, data) {
                //Do something with WebRTC data received from Facebook.
            })
        }
    })
})
```