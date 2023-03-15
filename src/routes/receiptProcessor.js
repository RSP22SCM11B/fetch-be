const { response } = require("express");
const { request } = require("http");
const { rule1_alphaNumeric, rule2_round, rule3_multiple, rule4_items, rule5_trim, rule6_date, rule7_hour } = require("../utility/rules");
const { v4: uuidv4 } = require('uuid');
const e = require("express");

const userStore = new Map();

exports.getPoints = (request, response) => {
  const id = request.params.id;

  const responseBody = {
    status: 200,
    json: {
    },
  };

  if (userStore.get(id)) {
    responseBody.json = {
      points: userStore.get(id)
    }
  }
  else {
    responseBody.status = 404;
    responseBody.json = {
      description: 'ID not found'
    }
  }


  response.status(responseBody.status).json(responseBody.json);
};

exports.processReceipt = (request, response) => {
  const body = request.body;
  const newId = uuidv4();
  let points = 0

  const responseBody = {
    status: 200,
    json: {

    },
  };
  errors = []
  // Rule-1
  if (body.retailer)
    points = points + rule1_alphaNumeric(body.retailer);
  else
    errors.push("Invalid Retailer Name");


  // Rule-2 and Rule-3
  if (body.total) {
    points = rule2_round(body.total) ? points + 50 : points;
    points = rule3_multiple(body.total) ? points + 25 : points;
  }
  else
    errors.push("Invalid Amount");

  // Rule-4 and Rule-5
  if (body.items) {
    points = points + rule4_items(body.items.length);
    points = points + rule5_trim(body.items);
  }
  else
    errors.push("Invalid Items");

  // Rule-6 
  if (body.purchaseDate)
    points = rule6_date(body.purchaseDate) ? points + 6 : points;
  else
    errors.push("Invalid Purchase Date");

  // Rule-7
  if (body.purchaseTime)
    points = rule7_hour(body.purchaseTime) ? points + 10 : points;
  else
    errors.push("Invalid Purchase Time");


  userStore.set(newId, points);

  if (errors.length) {
    responseBody.status = 400;
    responseBody.json = {
      description: errors.join()
    }
  }
  else
    responseBody.json = { id: newId }

  response.status(responseBody.status).json(responseBody.json);
};