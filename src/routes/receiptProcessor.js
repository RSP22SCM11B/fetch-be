const { response } = require("express");
const { request } = require("http");
const {rule1_alphaNumeric, rule2_round, rule3_multiple, rule4_items, rule5_trim, rule6_date, rule7_hour} = require("../utility/rules");
const {v4 : uuidv4} = require('uuid')

const userStore = new Map();

 exports.getPoints = (request, response) => {
    const id = request.params.id;
    
    const responseBody = {
      status: 200,
      json: {
        points: userStore.get(id)
      },
    };
  
    response.status(responseBody.status).json(responseBody.json);
};

exports.processReceipt = (request, response) => {
    const body = request.body;
    const newId = uuidv4();
    let points = 0
  
    //Rule-1
    points = points + rule1_alphaNumeric(body.retailer);
   
    //Rule-2
    if(rule2_round(body.total))
      points = points+50;
      
    //Rule-3
    if(rule3_multiple(body.total))
      points = points+25;
  
    //Rule-4
    points = points + rule4_items(body.items.length);
  
    //Rule-5
    points = points + rule5_trim(body.items);
  
    //Rule-6
    if(rule6_date(body.purchaseDate))
      points = points+6;
  
    //Rule-7
    if(rule7_hour(body.purchaseTime))
      points = points+10
    
    userStore.set(newId, points);
  
    const responseBody = {
      status: 200,
      json: {
        id: newId
      },
    };
  
    response.status(responseBody.status).json(responseBody.json);
  };