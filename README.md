---
page_type: sample
languages:
  - javascript
products:
  - azure
description: "Azure Cosmos DB is a globally distributed multi-model database."
urlFragment: azure-cosmos-db-sql-api-nodejs-getting-started
---

# Developing a Node.js app using the Azure Cosmos DB SQL API

Azure Cosmos DB is a globally distributed multi-model database. One of the supported APIs is the SQL API, which provides a JSON document model with SQL querying and JavaScript procedural logic. This sample shows you how to use Azure Cosmos DB with the SQL API to store and access data from a Node.js application.


   ```
   const endpoint = "<Your Azure Cosmos account URI>";
   const key = "<Your Azure Cosmos account key>";
   ```

1. Run `npm install` in a terminal to install required npm modules

1. Run `node app.js` in a terminal to start your start your node application.

## About the code

The code included in this sample is intended to get you quickly started with a Node.js console application that connects to Azure Cosmos DB with the SQL API.

## More information

- [Azure Cosmos DB](https://docs.microsoft.com/azure/cosmos-db/introduction)
- [Azure Cosmos DB: SQL API](https://docs.microsoft.com/en-us/azure/cosmos-db/sql-api-introduction)
- [Azure Cosmos DB Node.js SDK](https://docs.microsoft.com/en-us/azure/cosmos-db/sql-api-sdk-node)
- [Azure Cosmos DB Node.js SDK Reference Documentation](http://azure.github.io/azure-documentdb-node/)
