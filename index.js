var jsdom = require('jsdom');
var request = require('request');

var symbols = [];
process.argv.forEach(function(val, index, array) {
  if (index > 1) {
    symbols.push(val);
  }
});

if (symbols.length == 0) {
  throw new Error("Please pass ticker symbols, separated by spaces");
}

function checkSignal(symbol, cb) {
  request( {
    uri: 'http://americanbulls.com/SignalPage.aspx?lang=en&Ticker=' + symbol
  }, function(err, res, body) {
    if(err && response.statusCode !== 200){console.log('Request error.');}
    jsdom.env({
      html: body,
      scripts: ['//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js'],
      done: function(err, window) {
        var $ = window.jQuery;
        var ticker = $('#MainContent_CompanyTicker').text();
        var signal = $('#MainContent_LastSignal').text();
        var text = $('#MainContent_signalpagedailycommentarytext').text();
        return cb(signal, text);
      }
    });
  });
}

console.log("------------------------------");
console.log("Welcome to BullScraper v0.0.1");
console.log(" - a page scraper for American Bulls");
console.log("------------------------------\n");
symbols.forEach(function(symbol) {
  checkSignal(symbol, function(signal, text) {
    console.log("Ticker:", symbol);
    console.log("Signal:", signal);
    console.log("Comments:", text);
    console.log("------------------------------");
  });
})
