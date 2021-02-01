const sensorList = require("../sensors");
const { getTheNewestData } = require('../data');
const { sendEmail } = require('../sendEmail');


const getSensors = (req, res) => {
    res.status(200).json(sensorList);
}

const getOneSensor = (req, res) => {
    let found = sensorList.find(function (item) {
        return item.id === req.params.id;
    });

    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
}

const addSensor = (req, res) => {
    let newItem = {
        id: req.body.id,
        name: req.body.name,
        type: req.body.type,
        snowDepthLimit: req.body.snowDepthLimit,
        baseValue: req.body.baseValue,
        comment: req.body.comment,
        adminStatus: req.body.adminStatus
    };
    let found = sensorList.find(function (item) {
        return item.id === newItem.id;
    })

    if (!found)
        sensorList.push(newItem);

    res.status(201).json(newItem);
}

const deleteSensor = (req, res) => {
    let found = sensorList.find(function (item) {
        return item.id === req.params.id;
    });

    if (found) {
        let targetIndex = sensorList.indexOf(found);
        sensorList.splice(targetIndex, 1);
    }
    res.sendStatus(204);
}

const updateSensor = async (req, res) => {

    try {

        let items = await getTheNewestData()
        let dict = {}

        items.forEach(item => dict[item.Id] = item)

        let found = sensorList.find(function (item) {
            return item.id === req.params.id
        });
        let updated = {}

        if (found) {
            updated = {
                id: found.id,
                name: req.body.name,
                type: req.body.type,
                snowDepthLimit: req.body.snowDepthLimit,
                baseValue: req.body.baseValue,
                comment: req.body.comment,
                adminStatus: req.body.adminStatus
            };

            const date = new Date(dict[found.id].ReportedAt);
            const hours = date.getHours()
            const minutes = date.getUTCMinutes()
            const time = hours + ':' + minutes

            let targetIndex = sensorList.indexOf(found);
            sensorList.splice(targetIndex, 1, updated);

            if (updated.adminStatus && updated.adminStatus !== dict[found.id].Status) {
                sendEmail(dict[found.id].Name, dict[found.id].SnowDepth, time)

            }
            res.sendStatus(204)
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.log(err.message);
    }
}


module.exports = { addSensor, getSensors, getOneSensor, updateSensor, deleteSensor }