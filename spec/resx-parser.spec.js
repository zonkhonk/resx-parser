describe("resx-parese", function() {
  var ResxParser = require('../lib/resx-parser');
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
  });
});
