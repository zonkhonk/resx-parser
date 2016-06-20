describe("resx-parese", function() {
  var ResxParser = require('../lib/resx-parser');
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

  // parsing tests
  describe("parsing", function() {
    beforeEach(function() {
      this.parser = new ResxParser();
    });
    it("should parse resource XML", function(done) {
      var expected = {
        armButton: 'Arm',
        coordinatesLabel: 'Enter coordinates',
        launchButton: 'Launch',
        title: 'nuke launch controls'
      };

      this.parser.parseString(xmlString, function(err, result) {
        expect(result).toEqual(expected);
        done();
      });

    });

    it("should parse .resx file", function(done) {
      var expected = {
        armButton: 'Arm',
        coordinatesLabel: 'Enter coordinates',
        launchButton: 'Launch',
        title: 'nuke launch controls'
      };

      this.parser.parseResxFile("./spec/resourcesFiles/example.resx", function(err, result) {
        expect(result).toEqual(expected);
        done();
      });
    });
  });

  // options tests
  describe("options", function() {
    it("should use ID 'case transformation' if supplied in options", function(done) {

      var expected = {
          'Arm Button': 'Arm',
          'Coordinates Label': 'Enter coordinates',
          'Launch Button': 'Launch',
          'Title': 'nuke launch controls'
        },
        options = {
          convertIdCase: 'title'
        },
        parser = new ResxParser(options);

      parser.parseString(xmlString, function(err, result) {
        expect(result).toEqual(expected);
        done();
      });
    });

    it("should use filter if supplied in options", function(done) {

      var expected = {
          'title': 'nuke launch controls'
        },
        options = {
          filter: function(id, value, comment) {

            if (id === "title") {
              return false;
            } else {
              return true;
            }
          }
        },
        parser = new ResxParser(options);

      parser.parseString(xmlString, function(err, result) {
        expect(result).toEqual(expected);
        done();
      });
    });

    it("should be able to transform output by using fnTransformValue ", function(done) {

      var expected = {
          armButton: ['Arm', 'text on the arm button'],
          coordinatesLabel: ['Enter coordinates', 'text on the label for coordinates'],
          launchButton: ['Launch', 'text on the launch button'],
          title: ['nuke launch controls', 'title of the console']
        },
        options = {
          fnTransformValue: function(id, value, comment) {
            return [value, comment];
          }
        },
        parser = new ResxParser(options);

      parser.parseString(xmlString, function(err, result) {
        expect(result).toEqual(expected);
        done();
      });
    });
  });
});
