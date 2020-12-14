const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const dbService = require('./dbService');
const { response } = require('express');

app.engine('html', require('ejs').renderFile);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
// app.use(flash())
//   app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
//   }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(methodOverride('_method'))


  // app.get('/', (req, res) => {
  //   res.render('./index.html')
  // })


// // Create
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

// ZAEEM THIS FUNCTION IMPLEMENTATION CAN HELP YOU, CHECK OTHER COMMENTED TOO
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

var type = null;
app.post('/SetType', (request, response)=>{
  console.log(request.body);
  type = request.body;
  console.log("check");
  console.log(type);
});

app.get('/DonorList', (request, response)=>{
  console.log("sds"+type);
  const db =  dbService.getDbServiceInstance();
  const result = db.dispDonor(type);
  result
  .then(data => response.json({data : data}))
  .catch(err => console.log(err));
});




// app.post('/s_d_create', (request, response) => {
//   const { cnic } = request.body;
//   const db = dbService.getDbServiceInstance();
  
//   console.log( cnic );

//   const result = db.createseekerdonor(cnic);

//   result
//   .then(data => response.json({ data: data}))
//   .catch(err => console.log(err));
// });
// // read
// app.get('/getAll', (request, response) => {
//     const db = dbService.getDbServiceInstance();

//     const result = db.getAllData();
    
//     result
//     // .then(data => console.log(data))
//     .then(data => response.json({data : data}))
//     .catch(err => console.log(err));
//     // console.log('Hello');
// });

// // update
// app.patch('/update', (request, response) => {
//     const { todo_id, todo_item } = request.body;
//     const db = dbService.getDbServiceInstance();

//     const result = db.updateNameById(todo_id, todo_item);
    
//     result
//     .then(data => response.json({success : data}))
//     .catch(err => console.log(err));
// });

// // delete
// app.delete('/delete/:todo_id', (request, response) => {
//     const { todo_id } = request.params;
//     const db = dbService.getDbServiceInstance();

//     const result = db.deleteRowById(todo_id);
    
//     result
//     .then(data => response.json({success : data}))
//     .catch(err => console.log(err));
// });

// // delete all
// app.get('/deleteAll', (request, response) => {
//     const db = dbService.getDbServiceInstance();

//     const result = db.deleteAllData();
    
//     result
//     // .then(data => console.log(data))
//     .catch(err => console.log(err));
//     // console.log('Hello');
// });

app.use(session({
  secret:'donation_portal',
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 60 * 1000 * 30
  }
}));


app.listen(3000, () => console.log('app is running'));


