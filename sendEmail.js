const nodemailer = require('nodemailer')
const schedule = require('node-schedule')
const sensors = require("./sensors");
const { getTheNewestData, check } = require('./data')


const getData = async () => {
 let data = {}
 let items = await getTheNewestData()
 items.forEach(item => {
    date = new Date(item.ReportedAt);
    const hours = date.getHours()
    const minutes = date.getUTCMinutes()
    const time = hours + ':' + minutes
    item.ReportedAt = time
     data[item.Id] = item 
 })
return data
}


const rule = new schedule.RecurrenceRule();
rule.minutes = 20
const intMail = schedule.scheduleJob(rule, async function(){
    let data = await getData()
   
    sensors.forEach(sensor =>  {
        if(!sensor.adminStatus){
            check (sensor.id).then(bool =>{
             
                if(bool) sendEmail(data[sensor.id].Name, data[sensor.id].SnowDepth, data[sensor.id].ReportedAt )
              })
        }
        else
        return
    })
});


const sendEmail = (name, snowDepth, time) => {

    const transport = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'snowdepthnow@gmail.com',
        pass: 'snow@depth2020',
      },
  
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
      }
    });
  
    const mailOptions = {
      from: '"sensor" <snowdepthnow@gmail.com>', // sender address
      // to: "Roger.Lonnblad@vaxjo.se,peter.bengtsson@vaxjo.se,Andreas.Ineang@vaxjo.se",
      to: "Mustafa.Alsaid@vaxjo.se", 
      subject: "Sensor Status", // Subject line
      html: `<p>Hej</p>
              
            <p>Snösensorn på ${name} visar nu ett snödjup på : ${snowDepth}, Klockan ${time}</p>`, // html body
    }
  
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log(`Message sent: ${info.messageId}`);
    });
  }
  
  
  
  module.exports = {sendEmail}