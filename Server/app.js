const express = require("express") 
const session = require('express-session') 
const app = express();
const cors = require('cors');
const path = require('path');
const dbService = require('./dbService');
// app.engine('html', require('ejs').renderFile);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
var sess;

// app.use(flash())
//   app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
//   }))
  // app.use(passport.initialize())
  // app.use(passport.session())
  // app.use(methodOverride('_method'))

  app.get("/SetCnic/:cnic", function(request, response){ 
    const { cnic } = request.params;
    // console.log(cnic);
    sess = request.session;
    sess.cnic = request.params;
    const db = dbService.getDbServiceInstance();
    if(sess.cnic) {
      console.log(sess.cnic);
      // return response.redirect(__dirname + '/index3.html');
      // response.sendFile(__dirname + '/index.html');
      const result = db.getUserName(cnic);

    result
        .then(data => response.json({data : data}))
        .catch(err => console.log(err));
  }}) 

app.get('/Logout', function(request, response){ 
  // sess = request.session;
  // console.log(sess.cnic);
    request.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
    });
    // const db = dbService.getDbServiceInstance();
    // const result = db.getDonationData();
      
    // result
    //     .then(data => response.json({data : data}))
    //     .catch(err => console.log(err));
      }) 

app.get('/Signin', (request, response) => {
        const db = dbService.getDbServiceInstance();

        const result = db.getSignInDetails();
        
        result
        .then(data => response.json({data : data}))
        .catch(err => console.log(err));
});

app.get('/Signup', (request, response) => {
  const db = dbService.getDbServiceInstance();
  
  const result = db.getSignUpDetails();
  
  result
        // .then(data => console.log(data))
      .then(data => response.json({data : data}))
      .catch(err => console.log(err));
  }
);

app.get('/getDonationData', (request, response) => {
      const db = dbService.getDbServiceInstance();
      const result = db.getDonationData();
      result
      // .then(data => console.log(data))
      .then(data => response.json({data : data}))
      .catch(err => console.log(err));
});

app.get('/Dontype', (request, response) => {
      const db = dbService.getDbServiceInstance();
      const result = db.getDonationType();
      result
      // .then(data => console.log(data))
      .then(data => response.json({data : data}))
      .catch(err => console.log(err));
});

app.post('/NewUser', (request, response)=>{
  const {name,cnic,gender,contact,email,city,password} = request.body;
  const db =  dbService.getDbServiceInstance();
  const result = db.insertUser(name,cnic,gender,contact,email,city,password);
  result
  .then(data => response.json({data : data}))
  .catch(err => console.log(err));
});

app.post('/seek', (request, response) => {
  const { Name, cnic, city, type, quantity } = request.body;
  const db = dbService.getDbServiceInstance();
  
  console.log(Name, cnic, city, type, quantity);

  const result = db.setDonationReq(Name, cnic, city, type, quantity);

  result
  .then(data => response.json({ data: data}))
  .catch(err => console.log(err));
});

app.post('/donate', (request, response) => {
  const { Name, cnic, city, type, quantity } = request.body;
  const db = dbService.getDbServiceInstance();
  
  console.log(Name, cnic, city, type, quantity);

  const result = db.setDonation(Name, cnic, city, type, quantity);

  result
  .then(data => response.json({ data: data}))
  .catch(err => console.log(err));
});

app.get('/Seekcheck', (request, response) => {
  const db = dbService.getDbServiceInstance();
  
  const result = db.checkseeker();
  
  if(result)
  {
    try{
      data => response.json({data : data});
      //request.session.opp = 1;
    }catch(err ){
      console.log(err)
    };
  }
});

app.get('/NgoEmp', (request, response) => {
  const db = dbService.getDbServiceInstance();

  const result = db.getSignInDetails();
  
  result
  .then(data => response.json({data : data}))
  .catch(err => console.log(err));
});

app.get('/getAllReq', (request, response) => {
  const db = dbService.getDbServiceInstance();

  const result = db.getAllReqData();
  
  result
  .then(data => response.json({data : data}))
  .catch(err => console.log(err));
});

app.get('/getAllDonat', (request, response) => {
  const db = dbService.getDbServiceInstance();

  const result = db.getAllDonatData();
  
  result
  .then(data => response.json({data : data}))
  .catch(err => console.log(err));
});

app.get('/getAllTypes', (request, response) => {
  const db = dbService.getDbServiceInstance();

  const result = db.getAllTypeData();
  
  result
  .then(data => response.json({data : data}))
  .catch(err => console.log(err));
});

app.get('/getAllCities', (request, response) => {
  const db = dbService.getDbServiceInstance();

  const result = db.getAllCityData();
  
  result
  .then(data => response.json({data : data}))
  .catch(err => console.log(err));
});

app.get('/DonorList/:type', (request, response)=>{
  const { type } = request.params;
  // console.log("DL: ", type);
  const db =  dbService.getDbServiceInstance();
  const result = db.dispDonor(type);
  result
  .then(data => response.json({data : data}))
  .catch(err => console.log(err));
});

var cnic;
app.get('/DonorAmount/:Dcnic', (request, response)=>{
  const { Dcnic } = request.params;
  cnic = Dcnic;
  // console.log(Dcnic);
  const db =  dbService.getDbServiceInstance();
  const result = db.dispAmount(Dcnic);
  result
  .then(data => response.json({data : data}))
  .catch(err => console.log(err));
});

app.get('/SeekerList/:type', (request, response)=>{
  const { type } = request.params;
  // console.log(cnic, type);
  const db =  dbService.getDbServiceInstance();
  const result = db.dispSeeker(type,cnic);
  result
  .then(data => response.json({data : data}))
  .catch(err => console.log(err));
});

app.get('/ReqAmount/:cnic', (request, response)=>{
  const { cnic } = request.params;
  // console.log(cnic);
  const db =  dbService.getDbServiceInstance();
  const result = db.disp_Req_Amount(cnic);
  result
  .then(data => response.json({data : data}))
  .catch(err => console.log(err));
});

app.post('/NewMatch', (request, response)=>{
  const {type, don_cnic, seek_cnic, don_amount, req_amount} = request.body;
  const db =  dbService.getDbServiceInstance();
  const result = db.insertMatch(type, don_cnic, seek_cnic, don_amount, req_amount);
  result
  .then(data => response.json({data : data}))
  .catch(err => console.log(err));
});

app.get('/getAllUserDonat', (request, response) => {
  // sess = request.session;
  var dcnic;
  dcnic = sess.cnic;
  console.log(dcnic.cnic);
  const db = dbService.getDbServiceInstance();

  const result = db.getAllUserDonatData(dcnic.cnic);
  
  result
  .then(data => response.json({data : data}))
  .catch(err => console.log(err));
});

app.get('/getAllUserReq', (request, response) => {
  // sess = request.session;
  var scnic;
  scnic = sess.cnic;
  console.log(scnic.cnic);
  const db = dbService.getDbServiceInstance();

  const result = db.getAllUserReqData(scnic.cnic);
  
  result
  .then(data => response.json({data : data}))
  .catch(err => console.log(err));
});

app.get('/deleteDon', (request, response) => {
  // sess = request.session;
  var dcnic;
  dcnic = sess.cnic;
  console.log(dcnic.cnic);
  const db = dbService.getDbServiceInstance();

  const result = db.deleteDonation(dcnic.cnic);
  
  result
  .then(data => response.json({data : data}))
  .catch(err => console.log(err));
});

app.get('/deleteReq', (request, response) => {
  // sess = request.session;
  var scnic;
  scnic = sess.cnic;
  console.log(scnic.cnic);
  const db = dbService.getDbServiceInstance();

  const result = db.deleteRequest(scnic.cnic);
  
  result
  .then(data => response.json({data : data}))
  .catch(err => console.log(err));
});

app.get('/donCount', (request, response) => {
  const db = dbService.getDbServiceInstance();

  const result = db.countDonation();
  
  result
  .then(data => response.json({data : data}))
  .catch(err => console.log(err));
});

app.get('/reqCount', (request, response) => {
  const db = dbService.getDbServiceInstance();

  const result = db.countRequest();
  
  result
  .then(data => response.json({data : data}))
  .catch(err => console.log(err));
});

app.get('/matchCount', (request, response) => {
  const db = dbService.getDbServiceInstance();

  const result = db.countMatch();
  
  result
  .then(data => response.json({data : data}))
  .catch(err => console.log(err));
});

app.listen(3001, () => console.log('app is running'));


