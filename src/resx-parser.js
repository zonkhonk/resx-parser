import xml2js from 'xml2js'
import fs from 'fs'
import changeCase from 'change-case'

export default class ResxParser {
  constructor({
    convertIdCase = 'camel', // camel,constant,dot,header,isLower,isUpper,lower,lcFirst,no,param,pascal,path,sentence,snake,swap,title,upper,ucFirst
      fnTransformId = null, // (idString)=>{  doSometing(idString) ... return idString;}
      fnTransformValue = this.transformResource, // (valueString)=>{  doSometing(valueString) ... return valueString;
      filter = null
  } = {}) {

    this.convertIdCase = convertIdCase;
    this.fnTransformId = fnTransformId;
    this.fnTransformValue = fnTransformValue;
    this.filter = filter;
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
    let resources = {};
    if (xmlDom && xmlDom.root && xmlDom.root.data && xmlDom.root.data.length > 0) {
      xmlDom.root.data.forEach((node) => {
        let res = this.getResource(node);
        if (res) {
          resources[res.id] = res.resource;
        }
      });

      if (callback) {
        callback(null, resources);
      }
    }
  }

  getResource(item) {
    if (item && item.$ && item.$.name) {

      let id = this.getID(item.$.name),
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
    }
  }

  transformResource(id, value, comment) {
    return value;
  }

  getID(id) {
    if (this.convertIdCase) {
      id = changeCase[this.convertIdCase](id);
    }
    if (this.fnTransformId) {
      id = this.fnTransformId(id);
    }
    return id;
  }


  /* TODO: 
  //  error checking
  // get comment
  // return{ 'ID':{value:"value",comment:"comment"}}
  // options{
    convertIdCase:
    filter:function(id,value,comment){return true},
    processValue:function(id,value,comment){return value},
    processId:function(id){return id}

  }
  */

  /* getComment(item) {
     let value = item.comment[0] || "";
     if (this.fnTransformValue) {
       value = this.fnTransformValue(value);
     }
     return value;
   }*/

}
