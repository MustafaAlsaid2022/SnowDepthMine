const CosmosClient = require("@azure/cosmos").CosmosClient
const config = require("./config");
const sensors = require("./sensors");
const express = require('express')
// const bodyparser = require("body-parser")
// const moment = require('moment');
// const { Item } = require("@azure/cosmos");
// const app = express()
// app.use(bodyparser.urlencoded({ extended: true }))
// app.use(express.static(__dirname + '/public'))
// const nodemailer = require('nodemailer')
// const router = express.Router();
const { endpoint, key, databaseId, containerId } = config;
const client = new CosmosClient({ endpoint, key });
const database = client.database(databaseId);
const container = database.container(containerId);

let dict = {}

sensors.forEach(sensor => {
    dict[sensor.id] = sensor
})


async function check(id) {

    try {
        let querySpec = {
            query: "SELECT c.Distance FROM c where c.DeviceId =" + "\'" + id + "\'" + "order by c.ReportedAt DESC OFFSET 0 LIMIT 2"
        }

        const { resources: items } = await container.items
            .query(querySpec)
            .fetchAll();
        //console.log(items)
        if (items.length === 1)
            return true

        else if (items.length > 1) {
            let obj1 = dict[id]
            //console.log(items[0])
            let recentStatus = obj1.baseValue - items[0].Distance >= obj1.snowDepthLimit
            let earlierStatus = obj1.baseValue - items[1].Distance >= obj1.snowDepthLimit
            return recentStatus != earlierStatus
        }
    } catch (err) {
        console.log(err.message);
    }
}

async function getTheNewestData() {

    let arr = []

    try {
        for (let i = 0; i < sensors.length; i++) {

            let querySpec = {
                query: "SELECT c.Distance, c.Temperature, c.ReportedAt FROM c where c.DeviceId =" + "\'" + sensors[i].id + "\'" + "order by c.ReportedAt DESC OFFSET 0 LIMIT 1"
            }
            const { resources: items } = await container.items
                .query(querySpec)
                .fetchAll();
                
             if(!items.length){
                obj = {
                   'Distance': '3008',
                   'Temperature': '-',
                    ReportedAt: "2021-02-19T09:30:08.445Z"
                 }

                arr.push(obj)
                arr[i].Id = sensors[i].id;
                arr[i].Name = sensors[i].name
                arr[i].Type = sensors[i].type
                arr[i].SnowDepthLimit = sensors[i].snowDepthLimit
                arr[i].BaseValue = sensors[i].baseValue
                arr[i].Comment = sensors[i].comment
                arr[i].SnowDepth = "-"
                arr[i].Status = "Opened"
                arr[i].AdminStatus = sensors[i].adminStatus
                if (sensors[i].adminStatus)
                    arr[i].Status = sensors[i].adminStatus
             } 
           
            else if(items.length == 1) {
                arr.push(items[0])
                arr[i].Id = sensors[i].id;
                arr[i].Name = sensors[i].name
                arr[i].Type = sensors[i].type
                arr[i].SnowDepthLimit = sensors[i].snowDepthLimit
                arr[i].BaseValue = sensors[i].baseValue
                arr[i].Comment = sensors[i].comment
                arr[i].SnowDepth = arr[i].BaseValue - arr[i].Distance
                if (arr[i].SnowDepth < 0 || arr[i].SnowDepth < 5 ) arr[i].SnowDepth = 0
                else
                arr[i].SnowDepth = arr[i].SnowDepth - (arr[i].SnowDepth % 5)
                arr[i].SnowDepth >= arr[i].SnowDepthLimit ? arr[i].Status = 'Warning' : arr[i].Status = 'Opened'
                arr[i].AdminStatus = sensors[i].adminStatus
                if (sensors[i].adminStatus)
                    arr[i].Status = sensors[i].adminStatus
                else
                    arr[i].SnowDepth >= arr[i].SnowDepthLimit ? arr[i].Status = 'Warning' : arr[i].Status = 'Opened'
            }
            
        }
        // console.log(arr)
        return arr

    } catch (err) {
        console.log(err.message);
    }
}

module.exports = { getTheNewestData, check}
