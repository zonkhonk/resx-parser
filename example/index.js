(function resxParserUsage(ResxParser, fs) {

  function logResult(err, result) {
    if (err) {
      return console.log(err);
    } else {
      console.log(result);
    }
  }

  function parseFile() {

    // various options for preprossing
    var options = {
      convertIdCase: 'snake', // camel,constant,dot,header,isLower,isUpper,lower,lcFirst,no,param,pascal,path,sentence,snake,swap,title,upper,ucFirst
      fnTransformId: function(id) { // will be called for each resource id
        return "RESOURCE_" + id;
      },
      fnTransformValue: function(value) { // will be called for each resource id
        if (value) {
          return value.toUpperCase();
        }
      }
    };

    var parser = new ResxParser(options);
    parser.parseResxFile("./spec/resourcesFiles/example.resx", logResult);

  }

  function parseString() {
    var xmlString =
      '<root>' +
      '<data name="Arm-Button" xml:space="preserve">' +
      '<value>Arm</value>' +
      '</data>' +
      '<data name="CoordinatesLabel" xml:space="preserve">' +
      '<value>Enter coordinates</value>' +
      '</data>' +
      '<data name="launchButton" xml:space="preserve">' +
      '<value>Launch</value>' +
      '</data>' +
      '<data name="title" xml:space="preserve">' +
      '<value>nuke launch controls</value>' +
      '</data>' +
      '</root>';

    // init parser with default options
    var parser = new ResxParser();

    parser.parseString(xmlString, logResult);
  }

  console.log("\nparsing string\n");
  parseString();
  console.log("\nparsing file\n");
  parseFile();


})(require('../lib/resx-parser'), require('fs'));
