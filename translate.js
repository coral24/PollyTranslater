// License MIT, Author Special Agent Squeaky (specialagentsqueaky.com), Last updated 2020-11-25
var AWS = require('aws-sdk');

AWS.config.update({region: 'us-east-1'});

var translate = new AWS.Translate();
exports.handler = function(event, context,callback){

console.log(JSON.stringify(event.body));

const response = JSON.parse(event.body)

  
  try{
    const translateParams = {
    SourceLanguageCode: 'ko',
    TargetLanguageCode: 'en',
    Text: response.text
  }

  
  translate.translateText(translateParams, function (err, data) {
    if (err) callback(err)
    callback(null,{
        statusCode:200,
        headers: {
        "Access-Control-Allow-Origin" : "*", 
        "Access-Control-Allow-Credentials" : true
        },
        body:data.TranslatedText
    })
  })
  }catch(e){
    callback(null,{
      statusCode:200,
      body:JSON.stringify(e)
    })
  }


};
