Built the start of a messaging app (similar to iMessage) that gives a tour of
some of the most common core APIs. Users will send text, send photos from the camera
roll, and share their location. It will let users know when they are disconnected from the network.

Used a variety of APIs including Alert, CameraRoll, Dimensions, Geolocation,
NetInfo,PixelRatio, and StatusBar.

For messages I would likely want to use a more sophisticated id, such as a UUID, if I was
actually connecting with a backend. Incrementing a number works for this app,
but once messages are persisted or coming from multiple devices, there would be most likely be id collisions.