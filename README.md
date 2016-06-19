<<<<<<< HEAD
# resx-parser [![Build Status](https://travis-ci.org/kjayasa/resx-parser.svg?branch=master)](https://travis-ci.org/kjayasa/resx-parser)
A simple parser to parse  resource files (.resx) to json for NodeJS.

It written in ES6  and transpiled using Babel .
=======
# resx-parser 
A simple parser to parse  resource files (.resx) to json for NodeJS.

It written in ES6  and transpiled using Babel to ES5.
>>>>>>> origin/master

## Installation

`npm install resx-parser --save`

## Usage

there are some examples in the example folser

### Parse a string

```javascript
var ResxParser = require('resx-parser');
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

parser.parseString(xmlString, function(err, result) {
  if (err) {
    return console.log(err);
  } else {
    console.log(result);
  }
});
```

### Parse a .resx file

```javascript
var ResxParser = require('resx-parser');
  // init parser with default options
var parser = new ResxParser();

parser.parseResxFile("example.resx", function(err, result) {
  if (err) {
    return console.log(err);
  } else {
    console.log(result);
  }
});

```

### Options
resx-parser takes in an options object that controls the behaviour of parsing

## Run Code Sample

`npm run example`

## Tests

`npm run test`


## Release History
* 2016-06-19    1.0.0 Initial release

## License

MIT license; see [LICENSE](./LICENSE).

(c) 2016 by Jayasanker Karakulath
