# Butcher's burger

React app based with SemanticUI

## Prerequisites
 - Node.js
 - MongoDB

## Installation

Install packages
```
cd butcher-burger
npm install
```

Create mongoDB and category collection
```
cd butcher-burger/api/database
node createDb.js
node categoryCollection.js
```

Start node server
```
cd butcher-burger/api
node server.js

Server is running at http://localhost:3000/
```

Start react
```
cd butcher-burger
node start

Project is running at http://localhost:8080/
```