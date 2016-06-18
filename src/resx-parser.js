import xml2js from 'xml2js'
import fs from 'fs'
import changeCase from 'change-case'

export default class ResxParser {
  constructor({
    convertIdCase = 'camel',    // camel,constant,dot,header,isLower,isUpper,lower,lcFirst,no,param,pascal,path,sentence,snake,swap,title,upper,ucFirst
      fnTransformId = null,     // (idString)=>{  doSometing(idString) ... return idString;}
      fnTransformValue = null   // (valueString)=>{  doSometing(valueString) ... return valueString;
  } = {}) {

    this.convertIdCase = convertIdCase;
    this.fnTransformId = fnTransformId;
    this.fnTransformValue = fnTransformValue;
  }
  
  do(fn, callback) {
    let that = this;
    return function(err, ...args) {
      if (err) {
        console.log(err);
        if (callback) {
          callback(err, null);
        }
      } else {
        if (callback) {
          fn.bind(that)(...args, callback);
        } else {
          fn.bind(that)(...args);
        }
      }
    }
  }

  parseResxFile(filename, callback) {
    fs.readFile(filename, this.do(this.parseString, callback));
  }

  parseString(xmlString, callback) {
    const parser = new xml2js.Parser();
    parser.parseString(xmlString, this.do(this.extractFromXml, callback));
  }

  extractFromXml(xmlDom, callback) {
    let ret = {};
    if (xmlDom && xmlDom.root && xmlDom.root.data && xmlDom.root.data.length > 0) {
      xmlDom.root.data.forEach((node) => ret[this.getID(node)] = this.getValue(node));
    }
    if (callback) {
      callback(null, ret);
    }
  }

  getID(item) {
    let id = item.$.name;
    if (this.convertIdCase) {
      id = changeCase[this.convertIdCase](id);
    }
    if (this.fnTransformId) {
      id = this.fnTransformId(id);
    }
    return id;
  }

  getValue(item) {
    let value = item.value[0];
    if (this.fnTransformValue) {
      value = this.fnTransformValue(value);
    }
    return value;
  }

}
