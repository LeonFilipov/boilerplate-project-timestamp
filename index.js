// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  const { date } = req.params;
  let response = new Date();
  if (!date) {
    res.send({ "unix": response.getTime(), "utc": response.toUTCString() });
    return
  }
  response = new Date(parseInt(date));
  if (response.toString() === "Invalid Date") {
    res.send({ "error": "Invalid Date" } );
  } else {
    res.send({ "unix": response.getTime(), "utc": response.toUTCString() });
    return
  }
  response = new Date(date);
  if (response.toString() === "Invalid Date") {
    res.send({ "error": "Invalid Date" } );
    return
  }
  res.send({ "unix": response.getTime(), "utc": response.toUTCString() });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
