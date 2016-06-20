# resx-parser [![Build Status](https://travis-ci.org/kjayasa/resx-parser.svg?branch=master)](https://travis-ci.org/kjayasa/resx-parser)
A simple parser to parse  resource files (.resx) to json for NodeJS.

It parses a .resx file or a resource encoded xml string or and returns a json object in the format 
``` { "resource_id" : resource value }```.
The 'shape' of generated json can be changed by using various options.All parsing is `async'.

It is written in ES6 and transpiled to ES5 using Babel .

## Installation
`npm install resx-parser --save`

## Usage
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
if (err) {
    return console.log(err);
  } else {
    console.log(result);
  }
```

### Options
resx-parser takes in an options object that controls the behaviour of parsing.
The options object can have the following parameters.
#### convertIdCase
Use it convert the case of the resource id. By default it is 'camel'.
This library uses [change-case](https://github.com/blakeembrey/change-case) internally.
The supported values are as follows.(description shamelessly stolen from [change-case](https://github.com/blakeembrey/change-case))
* camel  
Converts to a string with the separators denoted by having the next letter capitalized.  
**'test string' will be converted to "testString"**
* constant  
Converts to an upper case, underscore separated string.  
**'test string' will be converted to "TEST_STRING"**

* dot  
Converts to a lower case, period separated string.  
**'test string' will be converted to "test.string"**

* header  
Converts to a title cased, dash separated string.  
**'test string' will be converted to "Test-String"**

* lower  
Return the string in lower case.  
**'TEST STRING' will be converted to "test string"**

* lcFirst  
Return the string with the first character lower cased.  
**'TEST' will be converted to "tEST"**

* no  
Return the string without any casing (lower case, space separated).  
**'test string' will be converted to "test string"**

* param  
Converts to a lower case, dash separated string.  
**'test string' will be converted to "test-string"**

* pascal  
Converts to a string denoted in the same fashion as `camelCase`, but with the first letter also capitalized.  
**'test string' will be converted to "TestString"**

* path  
Converts to a lower case, slash separated string.  
**'test string' will be converted to "test/string"**

* sentence  
Converts to a lower case, space separated string with the first letter upper case.  
**'testString' will be converted to "Test string"**

* snake  
Converts to a lower case, underscore separated string.  
**'test string' will be converted to "test_string"**

* swap  
Converts to a string with every character case reversed.  
**'Test String' will be converted to "tEST sTRING"**

* title  
Converts to a space separated string with the first character of every word upper cased.  
**'a simple test' will be converted to "A Simple Test"**

* upper  
Return the string in upper case.  
**'test string' will be converted to "TEST STRING"**

* ucFirst  
Return the string with the first character upper cased.
**test' will be converted to "Test"**
```javascript
  var options = {
      convertIdCase: 'snake'
    };  

    var parser = new ResxParser(options);
  ```

#### fnTransformId 
Use it to do any kind of processing on the resource id.
```javascript
  var options = {
      fnTransformId: function(id) {
        return "RESOURCE_" + id;
      }
    };  

    var parser = new ResxParser(options);
  ```
#### fnTransformValue 
Use it to do any kind of processing on the resource string or to change the stracture of the returned json object.
```javascript
  var options = {
      fnTransformValue: function (id, value, comment) { 
        return {
          value:value,
          comment:comment
        };
      }
    };  

    var parser = new ResxParser(options);
  ```
  this example would return
  ```javascript
  {
    foo:{
      value:"bar"
      comment:"label for foo button"
    }
  }
  ```

#### filter
.Use it to filter out any resources from being processed.A return value of `true' will exclude the resource from processing.
```javascript
  var options = {
      filter: function(id, value, comment) {
        return (id.lastIndexOf("_js_", 0) !== 0); // filters out all resources that does not start with _js_
      }  
    };

    var parser = new ResxParser(options);
  ```

## Run Code Sample

`npm run example`

## Tests

`npm run test`


## Release History
* 2016-06-19    1.0.0 Initial release

## License

MIT license; see [LICENSE](./LICENSE).

(c) 2016 by Jayasanker Karakulath
