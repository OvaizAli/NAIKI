// const { authenticate } = require("passport");

// const { session } = require("passport");


// ------------------------------------------------------------------ Scroll To-Top Button ------------------------------------------------------
var scrollToTopBtn = document.getElementById("scrollToTopBtn");
var rootElement = document.documentElement;

function scrollToTop() {
  // Scroll to top logic
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}
scrollToTopBtn.addEventListener("click", scrollToTop);

// ------------------------------------------------------------------ Login/Signup Modal --------------------------------------------------------

jQuery(document).ready(function($){
  var $form_modal = $('.cd-user-modal'),
  $form_login = $form_modal.find('#cd-login'),
  $form_signup = $form_modal.find('#cd-signup'),
  $form_forgot_password = $form_modal.find('#cd-reset-password'),
  $form_modal_tab = $('.cd-switcher'),
  $tab_login = $form_modal_tab.children('li').eq(0).children('a'),
  $tab_signup = $form_modal_tab.children('li').eq(1).children('a'),
  $forgot_password_link = $form_login.find('.cd-form-bottom-message a'),
  $back_to_login_link = $form_forgot_password.find('.cd-form-bottom-message a'),
  $main_nav = $('.inupModal');
  
  //open modal
  $main_nav.on('click', function(event){
  
  if( $(event.target).is($main_nav) ) {
  // on mobile open the submenu
  $(this).children('ul').toggleClass('is-visible');
  } else {
  // on mobile close submenu
  $main_nav.children('ul').removeClass('is-visible');
  //show modal layer
  $form_modal.addClass('is-visible');
  //show the selected form
  ( $(event.target).is('.cd-signup') ) ? signup_selected() : login_selected();
  }
  
  });
  
  //close modal
  $('.cd-user-modal').on('click', function(event){
  if( $(event.target).is($form_modal) || $(event.target).is('.cd-close-form') ) {
  $form_modal.removeClass('is-visible');
  }
  });
  //close modal when clicking the esc keyboard button
  $(document).keyup(function(event){
      if(event.which=='27'){
      $form_modal.removeClass('is-visible');
      }
      });
  
  //switch from a tab to another
  $form_modal_tab.on('click', function(event) {
  event.preventDefault();
  ( $(event.target).is( $tab_login ) ) ? login_selected() : signup_selected();
  });
  
  //hide or show password
  $('.hide-password').on('click', function(){
  var $this= $(this),
  $password_field = $this.prev('input');
  
  ( 'password' == $password_field.attr('type') ) ? $password_field.attr('type', 'text') : $password_field.attr('type', 'password');
  ( 'Hide' == $this.text() ) ? $this.text('Show') : $this.text('Hide');
  //focus and move cursor to the end of input field
  $password_field.putCursorAtEnd();
  });
  
  //show forgot-password form 
  $forgot_password_link.on('click', function(event){
  event.preventDefault();
  forgot_password_selected();
  });
  
  //back to login from the forgot-password form
  $back_to_login_link.on('click', function(event){
  event.preventDefault();
  login_selected();
  });
  
  function login_selected(){
  $form_login.addClass('is-selected');
  $form_signup.removeClass('is-selected');
  $form_forgot_password.removeClass('is-selected');
  $tab_login.addClass('selected');
  $tab_signup.removeClass('selected');
  }
  
  function signup_selected(){
  $form_login.removeClass('is-selected');
  $form_signup.addClass('is-selected');
  $form_forgot_password.removeClass('is-selected');
  $tab_login.removeClass('selected');
  $tab_signup.addClass('selected');
  }
  
  function forgot_password_selected(){
  $form_login.removeClass('is-selected');
  $form_signup.removeClass('is-selected');
  $form_forgot_password.addClass('is-selected');
  }
  
  // //REMOVE THIS - it's just to show error messages 
  // $form_login.find('input[type="submit"]').on('click', function(event){
  // event.preventDefault();
  // $form_login.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
  // });
  // $form_signup.find('input[type="submit"]').on('click', function(event){
  // event.preventDefault();
  // $form_signup.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
  // });
  
  
  //IE9 placeholder fallback
  //credits http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
  if(!Modernizr.input.placeholder){
  $('[placeholder]').focus(function() {
  var input = $(this);
  if (input.val() == input.attr('placeholder')) {
  input.val('');
    }
  }).blur(function() {
   var input = $(this);
    if (input.val() == '' || input.val() == input.attr('placeholder')) {
  input.val(input.attr('placeholder'));
    }
  }).blur();
  $('[placeholder]').parents('form').submit(function() {
    $(this).find('[placeholder]').each(function() {
  var input = $(this);
  if (input.val() == input.attr('placeholder')) {
   input.val('');
  }
    })
  });
  }
  
  });
  
  //credits https://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/
  jQuery.fn.putCursorAtEnd = function() {
  return this.each(function() {
      // If this function exists...
      if (this.setSelectionRange) {
        // ... then use it (Doesn't work in IE)
        // Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
        var len = $(this).val().length * 2;
        this.setSelectionRange(len, len);
      } else {
      // ... otherwise replace the contents with itself
      // (Doesn't work in Google Chrome)
        $(this).val($(this).val());
      }
  });
  };
  
  jQuery('#cody-info ul li').eq(1).on('click', function(){
  $('#cody-info').hide();
  });

  // --------------------------------------------------------------------------------------------------------------------

  function signin() {
    fetch('http://localhost:3001/Signin/', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => validate(data['data']));
}

function validate(data){
  console.log(data);
  var valFlag = 0;
  var userCnic = parseInt(document.getElementById('signin-cnic').value);
  var userPass = (document.getElementById('signin-password').value);
  var donor =  document.getElementById("rd1");
  var seeker =  document.getElementById("rd2");
  var admin =  document.getElementById("rd3");
  // console.log(userCnic,userPass);
  (data.forEach(function ({cnic, password}) {
    if(userCnic === cnic && userPass === password){
      valFlag = 1;
    }
  })
  );
  if (valFlag == 1){
    // console.log("Login!");
    ////////////////////////////// Called To Set CNIC //////////////////////////////////
    funcSession(userCnic); 
    if(donor.checked==true)
    {
      window.location.assign("Client/mainDonor.html");
    }
    if(seeker.checked==true)
    {
      window.location.assign("Client/mainSeeker.html");
    //   fetch('http://localhost:3001/Seekcheck/' , {
    //     method: 'GET'
    // })
    // .then(response => response.json())
    // .then(data => seekercreate(data['data']));
    }
    if(admin.checked==true)
    {
        fetch('http://localhost:3001/NgoEmp/' , {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => NgoEmpCheck(data['data']));
      
    }
  }else{
    alert("Your cnic or pass is incorrect!");
  }
}

function NgoEmpCheck(data)
{
  var valFlag = 0;
  var userCnic = parseInt(document.getElementById('signin-cnic').value);
  (data.forEach(function ({cnic}) {
    if(userCnic === cnic){
      valFlag = 1;
    }
  })
  );
  if (valFlag == 1){
    window.location.assign("Client/NGOAdmin.html");
  }
}
function funcSession(userCnic) {
      fetch('http://localhost:3001/SetCnic/' + userCnic, {
       method: 'GET'
      })
    .then(response => response.json())
    .then(data => setCnic(data['data']));
};
// Just for response which is of no use
function setCnic(data){
  // Do not un-comment it
  // window.location.assign("index2.html");
}

// function logout(){
//   fetch('http://localhost:3001/Logout/', {
//         method: 'GET'
//     })
//     .then(response => response.json())
//     .then(data => displayHome(data['data']));
//   console.log("Pressed")
// }

// function displayHome(data){
//   window.location.assign("../index.html");
// }

function logout(){
  if(window.location.pathname === "/index.html" || window.location.pathname === "/index2.html"){
    window.location.assign("/index.html");
    fetch('http://localhost:3001/Logout/', {
        method: 'GET'
    })
    // .then(response => response.json())
    
  }
  window.location.assign("../index.html");
  fetch('http://localhost:3001/Logout/', {
        method: 'GET'
    })
    // .then(response => response.json())
}

function donation(){
  if(window.location.pathname === "/index.html" || window.location.pathname === "/index2.html"){
    window.location.assign("/index.html");
  }else if(window.location.pathname === "/Donor.html"){
    window.location.assign("/Donor.html");
  }
  window.location.assign("../index.html");
}

var cityList = document.getElementById('signup-location');
if(window.location.pathname === "/index.html")
{
  document.addEventListener('DOMContentLoaded', function () 
  {
    fetch('http://localhost:3001/getAllCities')
    .then(response => response.json())
    .then(data => loadCity(data['data']));
  });
}

function loadCity(data)
{
  // console.log(data);
  data.forEach(function({LocName})
  {
    // console.log(LocName);
    var new_city = document.createElement('option');
    var newcity = document.createTextNode(LocName);
    new_city.appendChild(newcity);
    cityList.appendChild(new_city);
  });
}

function signup() {
  fetch('http://localhost:3001/Signup/', {
      method: 'GET'
  })
  .then(response => response.json())
  .then(data => signupp(data['data']));
}

function signupp(data)
{
  var Cflag = 0;
  var Coflag = 0;
  var Eflag = 0;
  var UCnic = parseInt(document.getElementById('signup-cnic').value);
  var UPassword = (document.getElementById('signup-password').value);
  var UName = (document.getElementById('signup-username').value);
  var ULocation = (document.getElementById('signup-location').value);
  var UContact = parseInt(document.getElementById('signup-contact').value);
  var UEmail = (document.getElementById('signup-email').value);
  var UMale =  document.getElementById('signup-gender-M');
  var UFemale =  document.getElementById('signup-gender-F');
  var UGender = null;
  if(UMale.checked==true)
    UGender = document.getElementById('signup-gender-M').value;
  if(UFemale.checked==true)
    UGender = document.getElementById('signup-gender-F').value;
  // console.log(UCnic,UPassword,UGender,ULocation);
  (data.forEach(function ({cnic,email,contact}) 
  {
    if(UCnic === cnic)
    {
      Cflag = 1;
      console.log("Cnic already in use cannot create account");
    }
    if(UEmail === email)
    {
      Eflag = 1;
      console.log("Email already in use cannot create account"); 
    }
    if(UContact === contact)
    {
      Coflag = 1;
      console.log("Contact already in use cannot create account");
    }
  })
  );
  if(Cflag == 0 && Eflag == 0 && Coflag == 0)
  {
    //window.location.assign("Client/Donor.html");
    // console.log("user created");
    fetch('http://localhost:3001/NewUser/', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ name: UName, cnic : UCnic, gender : UGender , contact: UContact , email : UEmail , city : ULocation, password : UPassword})
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) 
        {
          location.reload();
        }
    });
  }
}
var tList = document.getElementById('validationDefault04');
if(window.location.pathname === "/Client/Donor.html" || window.location.pathname === "/Client/helpSeeker.html")
{
  document.addEventListener('DOMContentLoaded', function () 
  {
    fetch('http://localhost:3001/getAllTypes')
    .then(response => response.json())
    .then(data => loadDType(data['data']));
  });
}

function loadDType(data)
{
  // console.log(data);
  data.forEach(function({type_name})
  {
    // console.log(type_name);
    var new_type = document.createElement('option');
    var newType = document.createTextNode(type_name);
    new_type.appendChild(newType);
    tList.appendChild(new_type);
  });
}

var cList = document.getElementById('validationDefault03');
if(window.location.pathname === "/Client/Donor.html" || window.location.pathname === "/Client/helpSeeker.html")
{
  document.addEventListener('DOMContentLoaded', function () 
  {
    fetch('http://localhost:3001/getAllCities')
    .then(response => response.json())
    .then(data => loadCitie(data['data']));
  });
}

function loadCitie(data)
{
  // console.log(data);
  data.forEach(function({LocName})
  {
    // console.log(LocName);
    var new_city = document.createElement('option');
    var newcity = document.createTextNode(LocName);
    new_city.appendChild(newcity);
    cList.appendChild(new_city);
  });
}

// ------------------------------------------------------ Help Seeker -----------------------------------------------------
function reqhelp() {
  // console.log(window.location.pathname);
  var Name = document.getElementById("validationDefault01").value;
  var Cnic = parseInt(document.getElementById("validationDefault02").value);
  var city =  document.getElementById("validationDefault03").value;
  var type =  document.getElementById("validationDefault04").value;
  var quantity =  (document.getElementById("validationDefault05").value);
  fetch('http://localhost:3001/seek/', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ Name: Name, cnic : Cnic, city : city, type : type, quantity : quantity})
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    });
}

function donate() {
  // console.log(window.location.pathname);
  var Name = document.getElementById("validationDefault01").value;
  var Cnic = parseInt(document.getElementById("validationDefault02").value);
  var city =  document.getElementById("validationDefault03").value;
  var type =  document.getElementById("validationDefault04").value;
  var quantity =  (document.getElementById("validationDefault05").value);
  fetch('http://localhost:3001/donate/', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ Name: Name, cnic : Cnic, city : city, type : type, quantity : quantity})
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    });
};

var reqList = document.getElementById('helpReqList');
if(window.location.pathname === "/Client/helpRequests.html"){
  document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3001/getAllReq')
    .then(response => response.json())
    .then(data => loadReq(data['data']));
    
  });
  }
  
  function loadReq(data)
  {
    // console.log(data);
    data.forEach(function({don_id, name, type_name, quantity, contact}){
      // console.log(don_id, name, type_name, quantity, contact);
      var newReq = document.createElement('tr');
  
      var new_name = document.createElement('td');
      var newName = document.createTextNode(name);
      new_name.appendChild(newName);
  
      var new_type = document.createElement('td');
      var newType = document.createTextNode(type_name);
      new_type.appendChild(newType);
  
      var new_quantity = document.createElement('td');
      var newQuantity = document.createTextNode(quantity);
      new_quantity.appendChild(newQuantity);
  
      var new_contact = document.createElement('td');
      var newContact = document.createTextNode(contact);
      new_contact.appendChild(newContact);
  
      var new_id = document.createElement('td');
      var newId = document.createTextNode(don_id);
      new_id.appendChild(newId);
      
      newReq.appendChild(new_id);
      newReq.appendChild(new_name);
      newReq.appendChild(new_type);
      newReq.appendChild(new_quantity);
      newReq.appendChild(new_contact);
      reqList.appendChild(newReq);
    });
  }
  
  var donatList = document.getElementById('donationList');
  if(window.location.pathname === "/Client/donationReceived.html")
  {
    document.addEventListener('DOMContentLoaded', function () 
    {
      fetch('http://localhost:3001/getAllDonat')
      .then(response => response.json())
      .then(data => loadDon(data['data']));
    });
  }
  
  function loadDon(data)
  {
    // console.log(data);
    data.forEach(function({donat_id, name, type_name, quantity, contact}){
      // console.log(donat_id, name, type_name, quantity, contact);
      var newDon = document.createElement('tr');
  
      var new_id = document.createElement('td');
      var newId = document.createTextNode(donat_id);
      new_id.appendChild(newId);

      var new_name = document.createElement('td');
      var newName = document.createTextNode(name);
      new_name.appendChild(newName);
  
      var new_type = document.createElement('td');
      var newType = document.createTextNode(type_name);
      new_type.appendChild(newType);
  
      var new_quantity = document.createElement('td');
      var newQuantity = document.createTextNode(quantity);
      new_quantity.appendChild(newQuantity);
  
      var new_contact = document.createElement('td');
      var newContact = document.createTextNode(contact);
      new_contact.appendChild(newContact);
      
      newDon.appendChild(new_id);
      newDon.appendChild(new_name);
      newDon.appendChild(new_type);
      newDon.appendChild(new_quantity);
      newDon.appendChild(new_contact);
      donatList.appendChild(newDon);
    });
  }

// ----------------------------------------------------------------- Allocate Donation ---------------------------------------------

  var TypeList = document.getElementById('type_id');
  if(window.location.pathname === "/Client/allocateDonations.html")
  {
    document.addEventListener('DOMContentLoaded', function () 
    {
      fetch('http://localhost:3001/getAllTypes')
      .then(response => response.json())
      .then(data => loadType(data['data']));
    });
  }

  function loadType(data)
  {
    // console.log(data);
    data.forEach(function({type_name}){
      // console.log(type_name);
      // var newDon = document.createElement('option');
  
      var new_type = document.createElement('option');
      var newType = document.createTextNode(type_name);
      new_type.appendChild(newType);

      TypeList.appendChild(new_type);
    });
  }
  
  function T_search(){
    var type = document.getElementById('type_id').value;
    // console.log(type);
    // document.getElementById('D_cnic').innerHTML = "";
    document.getElementById('D_amount').value= "";
    document.getElementById('R_amount').value= "";
    fetch('http://localhost:3001/DonorList/' + type, {
       method: 'GET'
      })
    .then(response => response.json())
    .then(data => loadDonor(data['data']));
  }
    
  
  var DonorList = document.getElementById('D_cnic');
  function loadDonor(data)
  {
    // console.log(data);
    document.getElementById('D_cnic').innerHTML = "";
    var new_donor = document.createElement('option');
    var newdonor = document.createTextNode('Choose...');
    new_donor.appendChild(newdonor);

    DonorList.appendChild(new_donor);
    
    data.forEach(function({cnic}){
      // var newDon = document.createElement('option');
      var new_donor = document.createElement('option');
      var newdonor = document.createTextNode(cnic);
      new_donor.appendChild(newdonor);

      DonorList.appendChild(new_donor);
    });
  }
  
  function D_search()
  {
    var Dcnic = document.getElementById('D_cnic').value;
    var type = document.getElementById('type_id').value;
    // console.log(type, Dcnic);
    fetch('http://localhost:3001/DonorAmount/' + Dcnic, {
       method: 'GET'
      })
    .then(response => response.json())
    .then(data => loadAmount(data['data']));
  }

  function loadAmount(data){ 
    data.forEach(function({quantity}){
      document.getElementById('D_amount').value= quantity;
    });
    SList();
  }

  function SList()
  {
    var type = document.getElementById('type_id').value;
    // console.log(type)
    fetch('http://localhost:3001/SeekerList/' + type, {
       method: 'GET'
      })
    .then(response => response.json())
    .then(data => loadSeeker(data['data']));
  }
  
  var SeekerList = document.getElementById('S_cnic');
  function loadSeeker(data)
  {
    // console.log("SList");
    document.getElementById('S_cnic').innerHTML = "";
    var new_seeker = document.createElement('option');
    var newseeker = document.createTextNode("Choose...");
    new_seeker.appendChild(newseeker);

    SeekerList.appendChild(new_seeker);
    data.forEach(function({cnic}){
      // console.log(cnic);
      // var newDon = document.createElement('option');
  
      var new_seeker = document.createElement('option');
      var newseeker = document.createTextNode(cnic);
      new_seeker.appendChild(newseeker);

      SeekerList.appendChild(new_seeker);
    });

  }

  function S_amount()
  {
    var cnic = document.getElementById('S_cnic').value;
    // console.log(cnic);
    fetch('http://localhost:3001/ReqAmount/' + cnic, {
       method: 'GET'
      })
    .then(response => response.json())
    .then(data => loadReqAmount(data['data']));
  }

  var SAmount = document.getElementById('R_amount');
  function loadReqAmount(data)
  {
    // console.log(data);
    data.forEach(function({quantity}){
      // console.log(quantity);
      document.getElementById('R_amount').value=quantity;
    });
  }

function alloc_donate()
{
  var type = document.getElementById('type_id').value;
  var  don_cnic = parseInt(document.getElementById('D_cnic').value);
  var  seek_cnic = parseInt(document.getElementById('S_cnic').value);
  var  don_amount = parseInt(document.getElementById('D_amount').value);
  var  req_amount = parseInt(document.getElementById('R_amount').value);
  fetch('http://localhost:3001/NewMatch/', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ type:type, don_cnic:don_cnic, seek_cnic:seek_cnic, don_amount:don_amount, req_amount:req_amount})
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) 
        {
          location.reload();
        }
    });
}

var TypeList = document.getElementById('type_id');
  if(window.location.pathname === "/Client/allocateDonations.html")
  {
    document.addEventListener('DOMContentLoaded', function () 
    {
      fetch('http://localhost:3001/getAllTypes')
      .then(response => response.json())
      .then(data => loadType(data['data']));
    });
  }

  function loadType(data)
  {
    // console.log(data);
    data.forEach(function({type_name}){
      // console.log(type_name);
      // var newDon = document.createElement('option');
  
      var new_type = document.createElement('option');
      var newType = document.createTextNode(type_name);
      new_type.appendChild(newType);

      TypeList.appendChild(new_type);
    });
  }


  var donList = document.getElementById('DonationList');
  if(window.location.pathname === "/Client/viewMyDonations.html")
  {
    document.addEventListener('DOMContentLoaded', function () 
    {
      fetch('http://localhost:3001/getAllUserDonat' , {
       method: 'GET'
      })
    .then(response => response.json())
    .then(data => loadUDon(data['data']));
    });
  }
  
  function loadUDon(data)
  {
    // console.log(data);
    data.forEach(function({donat_id, name, type_name, quantity, contact}){
      // console.log(donat_id, name, type_name, quantity, contact);
      var newDon = document.createElement('tr');
  
      var new_id = document.createElement('td');
      var newId = document.createTextNode(donat_id);
      new_id.appendChild(newId);

      var new_name = document.createElement('td');
      var newName = document.createTextNode(name);
      new_name.appendChild(newName);
  
      var new_type = document.createElement('td');
      var newType = document.createTextNode(type_name);
      new_type.appendChild(newType);
  
      var new_quantity = document.createElement('td');
      var newQuantity = document.createTextNode(quantity);
      new_quantity.appendChild(newQuantity);
  
      var new_contact = document.createElement('td');
      var newContact = document.createTextNode(contact);
      new_contact.appendChild(newContact);
      
      newDon.appendChild(new_id);
      newDon.appendChild(new_name);
      newDon.appendChild(new_type);
      newDon.appendChild(new_quantity);
      newDon.appendChild(new_contact);
      donList.appendChild(newDon);
    });
  }

  var rList = document.getElementById('helpReqList_');
if(window.location.pathname === "/Client/viewMyHelp.html"){
  document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3001/getAllUserReq' , {
       method: 'GET'
      })
    .then(response => response.json())
    .then(data => loadUserReq(data['data']));
  });
  }
  
  function loadUserReq(data)
  {
    // console.log(data);
    data.forEach(function({don_id, name, type_name, quantity, contact}){
      // console.log(don_id, name, type_name, quantity, contact);
      var newReq = document.createElement('tr');
  
      var new_name = document.createElement('td');
      var newName = document.createTextNode(name);
      new_name.appendChild(newName);
  
      var new_type = document.createElement('td');
      var newType = document.createTextNode(type_name);
      new_type.appendChild(newType);
  
      var new_quantity = document.createElement('td');
      var newQuantity = document.createTextNode(quantity);
      new_quantity.appendChild(newQuantity);
  
      var new_contact = document.createElement('td');
      var newContact = document.createTextNode(contact);
      new_contact.appendChild(newContact);
  
      var new_id = document.createElement('td');
      var newId = document.createTextNode(don_id);
      new_id.appendChild(newId);
      
      newReq.appendChild(new_id);
      newReq.appendChild(new_name);
      newReq.appendChild(new_type);
      newReq.appendChild(new_quantity);
      newReq.appendChild(new_contact);
      rList.appendChild(newReq);
    });
  }

