# projeto18-valex
A Typescript designed project to manage benefit cards among companies and employees


<p align="center">
  <img  src="https://cdn.iconscout.com/icon/free/png-256/credit-card-2650080-2196542.png">
</p>
<h1 align="center">
  Valex
</h1>
<div align="center">

  <h3>Built With</h3>

  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

<br/>

# Description

Valex simulates an API that manages a benefit card, generally made available by companies to their employees.

</br>

## Features

-   Get the card balance and transactions
-   Create cards
-   Activate / Block / Unlock a card
-   Recharge a card
-   Make card payments

</br>

## API Reference

### Get card balance

```http
GET /card/:cardId
```

#### Request:

| Params      | Type      | Description           |
| :---------- | :-------- | :-------------------- |
| `cardId` | `integer` | **Required**. card Id |

#

### Create a card

```http
POST /card
```

#### Request:

| Body         | Type     | Description                              |
| :------------| :------- | :--------------------------------------- |
| `employeeId` | `integer`| **Required**. user Id                    |
| `type`       | `string` | **Required**. type of card benefit       |

`Valid types: [groceries, restaurant, transport, education, health]`

####

| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `x-api-key` | `string` | **Required**. api key |

####

</br>

#### Response:

```json
{
  "message": "cartão criado com sucesso",
  "CVC": "111"
}
```

#

### Activate a card

```http
PUT /card
```

#### Request:

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `cardId`         | `integer`| **Required**. card Id      
| `CVC`   | `string` | **Required**. card CVC             |        |
| `password`       | `string` | **Required**. card password        |

`CVC max length: 3`

`CVC pattern: only numbers`

`Password length: 4`

`Password pattern: only numbers`

#

### Block a card

```http
PUT /card/block
```

#### Request:

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `cardId`         | `integer`| **Required**. card Id              |
| `password`       | `string` | **Required**. card password        |

#

### Unblock a card

```http
PUT /card/unblock
```

#### Request:

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `cardId`         | `integer`| **Required**. card Id              |
| `password`       | `string` | **Required**. card password        |

#

### Recharge a card

```http
POST /recharge
```

#### Request:

| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `x-api-key` | `string` | **Required**. api key |

####

| Body             | Type      | Description                        |
| :--------------- | :-------- | :--------------------------------- |
| `cardId`         | `integer` | **Required**. card Id              |
| `amount`         | `integer` | **Required**. recharge amount      |

#

### Card payments

```http
POST /payment
```
#### Request:

| Body             | Type      | Description                        |
| :--------------- | :-------- | :--------------------------------- |
| `cardId`         | `integer` | **Required**. card Id              |
| `password`       | `string`  | **Required**. card password        |
| `businessId`     | `integer` | **Required**. card expiration date |
| `amount`         | `integer` | **Required**. payment amount       |

#

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName`

`PORT = number #recommended:5000`

`SECRET_KEY = any string`

</br>

## Run Locally

Clone the project

```bash
  git clone https://github.com/LuigiTanaka/valex
```

Go to the project directory

```bash
  cd projeto18-valex/
```

Install dependencies

```bash
  npm install
```

Create database

```bash
  cd src/db/dbConfig
```
```bash
  bash ./create-database
```
```bash
  cd ../../..
```

Start the server

```bash
  npm run start
```

</br>

## Authors

-   Luigi Tanaka, a student at Driven Education 
<br/>
