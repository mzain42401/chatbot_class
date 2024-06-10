const dialogflow = require('@google-cloud/dialogflow');
const { WebhookClient, Suggestion } = require('dialogflow-fulfillment');
const express = require("express")
const cors = require("cors");
require('dotenv').config();
const app = express();
app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 8080;

app.post("/class", async (req, res) => {
    var id = (res.req.body.session).substr(43);
    console.log(id)
    const agent = new WebhookClient({ request: req, response: res });

    function hi(agent) {
        console.log(`intent  =>  hi`);
        agent.add("hi from server")
    }

    function fallback(agent) {
        // const { number , date , email} = agent.parameters;
       agent.add("fallback from server")
    }


    function enrollment(agent) {

        const { stdname,stdemail,stdnumber,stdDOB} = agent.parameters;


        
        var mydate=new Date(stdDOB)

        var year=mydate.getFullYear()
        var month=mydate.getMonth()
        var day=mydate.getDay()

        var DOB=month + "-" + day + "-" + year


        agent.add(`name is ${stdname.name}, email ${stdemail}, number ${stdnumber} DOB${year}-${month}-${day}`)



        var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mzainali1199@gmail.com',
    pass: "adar vqqc ozdo ganp"
  }
});

var mail_list=['hammadn788@gmail.com','samiullahbaig661@gmail.com', 'mzain42401@gmail.com',stdemail]

var mailOptions = {
  from: 'mzainali1199@gmail.com',
  to: mail_list,
  subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
html:`<body style="font-family: Arial, sans-serif; margin: 0; margin-top: 5px; padding: 0;">
    <div style="max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 0px; background-color: #f9f9f9;">
        
        <div style="background-color: #4CAF50; color: white; padding: 10px; text-align: center; border-radius: 8px 8px 0 0; margin-top: 0px;">
            <h1 style="margin: 0;">Student Card</h1>
        </div>
        <div style="text-align: center;">
            <img src="https://firebasestorage.googleapis.com/v0/b/images-51af5.appspot.com/o/images__1_-removebg-preview.png?alt=media&token=03781b49-7515-47ae-aca3-fe097c435866" alt="Student Image" style="border-radius: 50%; margin-top: 10px; height: 130px; width: 130px; border: 4px solid white;">
        </div>
        <div style="padding: 20px; padding-top: 5px;">
            <p style="text-align: center;">Dear ${stdname.name},</p>
            <p style="text-align: center;">We are excited to inform you that your enrollment in our course has been confirmed!</p>
            <p style="text-align: center;">Course Details:</p>

            <ul style="list-style-type: none; padding: 0;text-align: center;">
                
               
                <li style="margin-bottom: 10px;"><strong>E-mail:</strong> ${stdemail}</li>
                <li style="margin-bottom: 10px;"><strong>Date of Birth:</strong> ${DOB}</li>
                <li style="margin-bottom: 10px;"><strong>Phone No:</strong> ${stdnumber}</li>
                

            </ul>
            <p style="text-align: center;">If you have any questions or need further assistance, please do not hesitate to contact us.</p>
            <div style="text-align: center;">
                <a href="https://saylaniwelfare.com/" target="_blank" style="display: inline-block; padding: 10px 20px; margin-top: 20px; font-size: 16px; color: white; background-color: #4CAF50; text-align: center; border-radius: 5px; text-decoration: none;">Contact Us</a>
            </div>
        </div>
        <div style="margin-top: 20px; font-size: 12px; color: #777; text-align: center;">
            <p>Thank you for choosing our course. We look forward to seeing you!</p>
            <p>&copy; 2024 SMIT. All rights reserved. <a href="https://zainali.vercel.app/" target="_blank">zain ali</a></p>
        </div>
    </div>
</body>`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
        
    }

    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', hi); 
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('stdenroll', enrollment);
    agent.handleRequest(intentMap);
})


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});