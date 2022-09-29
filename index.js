const fs = require('fs');
const http = require('http');
let args = require('minimist')(process.argv.slice(2),{
    default: {
        port: 3000
    }
});



let homePage = '';
let projectPage = '';
let registrationPage = '';


fs.readFile('home.html', (err, home) => {
    if (err) {
        console.log(err);
    }
    homePage = home;
});
fs.readFile('project.html', (err, home) => {
    if (err) {
        console.log(err);
    }
    projectPage = home;
});
fs.readFile('registration.html', (err, home) => {
    if (err) {
        console.log(err);
    }
    registrationPage = home;
});

// console.log(args);

http
    .createServer((req, res) => {
        let url = req.url;
        res.writeHead(200, {'Content-Type': 'text/html'});
        switch (url) {
            case '/project':
                res.write(projectPage);
                res.end();
                break;
            case '/registration':
                res.write(registrationPage);
                res.end();
                break;
            default:
                res.write(homePage);
                res.end();
                break;
        }
    })
    .listen(args.port);