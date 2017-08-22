'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

var _xml2js = require('xml2js');

var _xml2js2 = _interopRequireDefault(_xml2js);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _changeCase = require('change-case');

var _changeCase2 = _interopRequireDefault(_changeCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ResxParser = function () {
  function ResxParser() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$convertIdCase = _ref.convertIdCase,
        convertIdCase = _ref$convertIdCase === undefined ? 'camel' : _ref$convertIdCase,
        _ref$fnTransformId = _ref.fnTransformId,
        fnTransformId = _ref$fnTransformId === undefined ? null : _ref$fnTransformId,
        _ref$fnTransformValue = _ref.fnTransformValue,
        fnTransformValue = _ref$fnTransformValue === undefined ? this.transformResource : _ref$fnTransformValue,
        _ref$filter = _ref.filter,
        filter = _ref$filter === undefined ? null : _ref$filter;

    _classCallCheck(this, ResxParser);

    var supportedCases = ["camel", "constant", "dot", "header", "lower", "lcFirst", "no", "param", "pascal", "path", "sentence", "snake", "swap", "title", "upper", "ucFirst"];

    if (convertIdCase) {
      if (supportedCases.includes(convertIdCase) == true) {
        this.convertIdCase = convertIdCase;
      } else {
        throw new Error(convertIdCase + ' is not a supported case conversion');
      }
    }
    this.fnTransformId = fnTransformId;
    this.fnTransformValue = fnTransformValue;
    this.filter = filter;
  }

  _createClass(ResxParser, [{
    key: 'do',
    value: function _do(fn, callback) {
      var that = this;
      return function (err) {
        if (err) {
          console.log(err);
          if (callback) {
            callback(err, null);
          }
        } else {
          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          if (callback) {
            fn.bind(that).apply(undefined, args.concat([callback]));
          } else {
            fn.bind(that).apply(undefined, args);
          }
        }
      };
    }
  }, {
    key: 'parseResxFile',
    value: function parseResxFile(filename, callback) {
      _fs2.default.readFile(filename, this.do(this.parseString, callback));
    }
  }, {
    key: 'parseString',
    value: function parseString(xmlString, callback) {
      var parser = new _xml2js2.default.Parser();
      parser.parseString(xmlString, this.do(this.extractFromXml, callback));
    }
  }, {
    key: 'extractFromXml',
    value: function extractFromXml(xmlDom, callback) {
      var _this = this;

      var resources = {};
      try {
        if (xmlDom && xmlDom.root && xmlDom.root.data && xmlDom.root.data.length > 0) {
          xmlDom.root.data.forEach(function (node) {
            var res = _this.getResource(node);
            if (res) {
              resources[res.id] = res.resource;
            }
          });

          if (callback) {
            callback(null, resources);
          }
        } else if (callback) {
          callback(null, {});
        }
      } catch (ex) {
        if (callback) {
          callback(ex, null);
        }
      }
    }
  }, {
    key: 'getResource',
    value: function getResource(item) {
      if (item && item.$ && item.$.name) {

        var id = this.getID(item.$.name),
            value = item.value && item.value[0] ? item.value[0] : "",
            comment = item.comment && item.comment[0] ? item.comment[0] : "";

        if (this.filter) {
          if (this.filter(id, value, comment)) {
            return null;
          }
        }
        return {
          id: id,
          resource: this.fnTransformValue(id, value, comment)
        };
      } else {
        throw new Error("Resource Id missing");
      }
    }
  }, {
    key: 'transformResource',
    value: function transformResource(id, value, comment) {
      return value;
    }
  }, {
    key: 'getID',
    value: function getID(id) {
      if (this.convertIdCase) {
        id = _changeCase2.default[this.convertIdCase](id);
      }
      if (this.fnTransformId) {
        id = this.fnTransformId(id);
      }
      return id;
    }
  }]);

  return ResxParser;
}();

exports.default = ResxParser;
module.exports = exports['default'];