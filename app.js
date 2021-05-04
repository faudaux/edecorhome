// Async

const async = require("async");

// Setting up express

const express = require("express");

const app = express();

// Setting up body-parser

const bodyParser = require("body-parser");

// Setting up Mailchimp

const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: "c50c4a5d37a8d69997c9d484494673bf-us2",
  server: "us2",
});


// Create static folder

app.use(express.static(__dirname + "/public"));


// Extract body parse

app.use(bodyParser.urlencoded({
  extended: true
}));


// POST method

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const correo = req.body.correo;

  async function run() {
    const response = await mailchimp.lists.addListMember("eda3d6bcb9", {
      email_address: correo,
      status: "subscribed",
      merge_fields: {
        FNAME: nombre,
        LNAME: apellido
      }
    });
    console.log(response);
  }
  run();
});




app.listen(3000, function() {
  console.log("He who listens.");
})
