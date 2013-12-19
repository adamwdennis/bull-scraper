var jsdom = require('jsdom');
var request = require('request');

var symbols = ['CRM', 'FB', 'AAPL', 'GOOG', 'AMZN'];

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

symbols.forEach(function(symbol) {
  checkSignal(symbol, function(signal, text) {
    console.log(symbol, "-", signal, "-", text);
  });
})
