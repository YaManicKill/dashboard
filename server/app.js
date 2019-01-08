const path = require("path");
const express = require('express');
var archiver = require('archiver');
const proxy = require('express-http-proxy');
const prod = process.argv.includes("--prod");
 
const request = require('request-promise');
const keys = require('./keys');
const app = express();

const VERSION = require(path.join(__dirname, "..", "package.json")).version;

app.get('/weather', (req, res) => updateWeather().then((data) => res.send(data)));
app.get('/version', (req, res) => res.send({version: VERSION}));
 
app.get('/extension', function(req, res) {
    const host = req.protocol + '://' + req.get('host');

    var archive = archiver('zip');
    archive.on('end', function() {
        console.log('Archive wrote %d bytes', archive.pointer());
    });
    res.attachment('dash.zip');
    archive.pipe(res);
    archive.glob("**/!(*manifest.json)", {cwd: path.join(__dirname, "..", "dist")}, {prefix: ""});

    const manifest = require("../dist/chrome-manifest.json");
    manifest.permissions = [host + "/*"];
    archive.append(JSON.stringify(manifest), { name: 'manifest.json' });

    archive.append(`window.VAR_DOMAIN = "${host}"; \nwindow.VERSION = "${VERSION}";`, {name: "js/vars.js"});

    archive.finalize();
});

if (prod) {
    app.use(express.static('dist'));
} else {
    app.get("/js/vars.js", (_, res) => res.send(404));
    app.use('*', proxy('localhost:8080', {
        proxyReqPathResolver(req){
            return req.baseUrl
        },
    }));
}

app.listen(8081, () => console.log('Example app listening on port 8081!'))

async function updateWeather() {
    return request({url: `https://api.darksky.net/forecast/${keys.weather.key}/${keys.homeCoord}?units=uk2`, json: true})
}