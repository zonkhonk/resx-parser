(function resxParserUsage(ResxParser, fs, q) {

  var xmlString =
    '<root>' +
    '<data name="Arm-Button" xml:space="preserve">' +
    '<value>Arm</value>' +
    '<comment>text on the arm button</comment>'+
    '</data>' +
    '<data name="CoordinatesLabel" xml:space="preserve">' +
    '<value>Enter coordinates</value>' +
    '<comment>text on the label for coordinates</comment>'+
    '</data>' +
    '<data name="launchButton" xml:space="preserve">' +
    '<value>Launch</value>' +
    '<comment>text on the launch button</comment>'+
    '</data>' +
    '<data name="title" xml:space="preserve">' +
    '<value>nuke launch controls</value>' +
    '<comment>title of the console</comment>'+
    '</data>' +
    '</root>';

  function logResult(err, result) {
    if (err) {
      return console.log(err);
    } else {
      console.log(result);
    }
  }

  function parseString() {
    // init parser with default options
    var parser = new ResxParser();
    parser.parseString(xmlString, logResult);
  }

  function filter() {
    var options = {
      filter: function(id, value, comment) {
        if (id === "title") { 
          return false;
        } else {
          return true;
        }
      }
    };
    var parser = new ResxParser(options);
    parser.parseString(xmlString, logResult);
  }

   function transformOutput() {
    var options = {
      fnTransformValue: function (id, value, comment) { // will be called for each resource id
        return {
          value:value,
          comment:comment
        };
      }
    };

    var parser = new ResxParser(options);
    parser.parseString(xmlString, logResult);
  }

  function parseFile() {
    // various options for preprossing
    var options = {
      convertIdCase: 'snake', // camel,constant,dot,header,isLower,isUpper,lower,lcFirst,no,param,pascal,path,sentence,snake,swap,title,upper,ucFirst
      fnTransformId: function(id) { // will be called for each resource id
        return "RESOURCE_" + id;
      },
      fnTransformValue: function (id, value, comment) { // will be called for each resource id
        if (value) {
          return value.toUpperCase();
        }
      }
    };

    var parser = new ResxParser(options);
    parser.parseResxFile("./spec/resourcesFiles/example.resx", logResult);

  }

  console.log("\nparsing string\n");
  parseString();
  console.log("\nparsing and filtering \n");
  filter();
  console.log("\ntransforming output");
  transformOutput();
  console.log("\nparsing file\n");
  parseFile();


})(require('../lib/resx-parser'), require('fs'));
