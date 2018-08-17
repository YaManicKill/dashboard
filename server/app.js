const express = require('express')
const proxy = require('express-http-proxy');
 
const request = require('request-promise')
const keys = require('./keys')
const app = express()

app.get('/weather', (req, res) => updateWeather().then((data) => res.send(data)))

app.use('*', proxy('localhost:8080', {
    proxyReqPathResolver(req){
        return req.baseUrl
    },
}));

app.listen(8081, () => console.log('Example app listening on port 8081!'))

console.log(keys)

async function updateWeather() {
    return request({url: `https://api.darksky.net/forecast/${keys.weather.key}/${keys.homeCoord}?units=uk2`, json: true})
}