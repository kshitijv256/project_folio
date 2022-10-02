const fs = require("fs"); // Adding the fs module for file reading
const http = require("http"); // Adding the http module for making a web server

// Using minimist to read the command line arguments
let args = require("minimist")(process.argv.slice(2), {
  // The slice is to remove the -- from arguments, as we will pass arguments as --port=3000
  default: {
    // In case the port is not passed, we will use 3000 as default
    port: 3000,
  },
});

// creating variables to store the html files
let homePage = "";
let projectPage = "";
let registrationPage = "";

// Reading the html files

// Readng the home.html file and storing it in homePage variable
fs.readFile("home.html", (err, home) => {
  if (err) {
    console.log(err);
  }
  homePage = home;
});

// Readng the project.html file and storing it in projectPage variable
fs.readFile("project.html", (err, home) => {
  if (err) {
    console.log(err);
  }
  projectPage = home;
});

// Readng the registration.html file and storing it in registrationPage variable
fs.readFile("registration.html", (err, home) => {
  if (err) {
    console.log(err);
  }
  registrationPage = home;
});

// Creating a web server
http
  .createServer((req, res) => {
    // Here req is the full address of the request like 'http://localhost:3000/project'
    // Here we are extracting the url part of the request for example '/project'
    let url = req.url;

    // Here res is the response object which we will use to send html data to the browser
    res.writeHead(200, { "Content-Type": "text/html" });
    switch (url) {
      // if url passed is '/project' then we will send the projectPage html
      case "/project":
        res.write(projectPage);
        res.end();
        break;

      // if url passed is '/registration' then we will send the registrationPage html
      case "/registration":
        res.write(registrationPage);
        res.end();
        break;

      // if anyhting else is passed then we will send the homePage html
      default:
        res.write(homePage);
        res.end();
        break;
    }
  })
  // Listening to the port passed in the command line arguments
  .listen(args.port);
