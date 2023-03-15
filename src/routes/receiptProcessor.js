const { response } = require("express");
 const { request } = require("http");

 exports.getPoints = (request, response) => {
   const id = request.params.id;
   const responseBody = {
     status: 200,
     json: {
       code: "SUCCESS",
     },
   };

   console.log("id = ", id);

   // TODO: Add Logic to get points

   response.status(responseBody.status).json(responseBody.json);
 };

 exports.processReceipt = (request, response) => {
   const responseBody = {
     status: 200,
     json: {
       code: "SUCCESS",
     },
   };

   // TODO: Add Logic to process receipt

   response.status(responseBody.status).json(responseBody.json);
 };