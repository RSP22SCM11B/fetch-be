# Fetch - Backend Assessment (2023)

## Introduction

The document illustrates how to setup the server and make requests to the required REST API's.

## Technology Stack

- **Backend Server**: Node.js and Express
- **Version Control**: GitHub
- **API Incepter**: Postman

## How to Install

### With Docker

- Make sure you have docker installed on your machine and is running.
- Clone this repo, and in the root folder follow these steps:
```
docker build ./fetch-be -t rpc:latest
```

```
docker run --name api -p 5500:5500/tcp -d rpc
```
```
docker logs -f api
```

### Without Docker

- Make sure you have the latest version of Node Installed on your machine.
- On to your Desktop open terminal
- Clone this repo, and in the root folder follow these steps:

```
 npm install
```

- Now as all the dependencies are installed let's start the BE server
- The Server will start on port `5500`

```
npm start
```

- You will see this once it is started

```
> fetch-be-assesment@1.0.0 start
> node server.js
-------------------------------
Server started on port: 5500
-------------------------------
URL: http://localhost:5500/receipts/routeName
-------------------------------
```

## Endpoints

---

```http
POST http://localhost:5500/receipts/process
```

```http
GET http://localhost:5500/receipts/:id/points
```
## Examples

```json
{
  "retailer": "Target",
  "purchaseDate": "2022-01-01",
  "purchaseTime": "13:01",
  "items": [
    {
      "shortDescription": "Mountain Dew 12PK",
      "price": "6.49"
    },{
      "shortDescription": "Emils Cheese Pizza",
      "price": "12.25"
    },{
      "shortDescription": "Knorr Creamy Chicken",
      "price": "1.26"
    },{
      "shortDescription": "Doritos Nacho Cheese",
      "price": "3.35"
    },{
      "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
      "price": "12.00"
    }
  ],
  "total": "35.35"
}
```
```text
Total Points: 28
Breakdown:
     6 points - retailer name has 6 characters
    10 points - 4 items (2 pairs @ 5 points each)
     3 Points - "Emils Cheese Pizza" is 18 characters (a multiple of 3)
                item price of 12.25 * 0.2 = 2.45, rounded up is 3 points
     3 Points - "Klarbrunn 12-PK 12 FL OZ" is 24 characters (a multiple of 3)
                item price of 12.00 * 0.2 = 2.4, rounded up is 3 points
     6 points - purchase day is odd
  + ---------
  = 28 points
```

----

```json
{
  "retailer": "M&M Corner Market",
  "purchaseDate": "2022-03-20",
  "purchaseTime": "14:33",
  "items": [
    {
      "shortDescription": "Gatorade",
      "price": "2.25"
    },{
      "shortDescription": "Gatorade",
      "price": "2.25"
    },{
      "shortDescription": "Gatorade",
      "price": "2.25"
    },{
      "shortDescription": "Gatorade",
      "price": "2.25"
    }
  ],
  "total": "9.00"
}
```
```text
Total Points: 109
Breakdown:
    50 points - total is a round dollar amount
    25 points - total is a multiple of 0.25
    14 points - retailer name (M&M Corner Market) has 14 alphanumeric characters
                note: '&' is not alphanumeric
    10 points - 2:33pm is between 2:00pm and 4:00pm
    10 points - 4 items (2 pairs @ 5 points each)
  + ---------
  = 109 points
```

---