var Converter = require('csvtojson').core.Converter
  , _         = require('lodash')
  ;

// jquery ajax using a promise
$.get('data.csv').then(
  function(data) {
    parseCSV(data);
  },
  function() {
    console.warn('file does nit exist');
  }
);

var parseCSV = function(data) {
  var converter = new Converter();
  
  converter.fromString(data,function(err, data){
      if (err){
        console.warn('error parsing file');
      }
      doShitWithData(data);
  });
};

var doShitWithData = function(data) {
  var dataEl  = $('#data tbody');
  // lodash mustache template delims
  _.templateSettings.interpolate = /{([\s\S]+?)}/g;
  _.forEach(data, function(row) {
    var template = _.template('<tr><td>{name}</td><td>{category}</td><td>{weight}</td></tr>');
    var output = template(row);
    dataEl.append(output);
  });
};
