// const { authenticate } = require("passport");

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
    fetch('http://localhost:3000/Signin/', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => validate(data['data']));
}

function validate(data){
  // console.log(data);
  var valFlag = 0;
  var userCnic = parseInt(document.getElementById('signin-cnic').value);
  var userPass = (document.getElementById('signin-password').value);
  var donor =  document.getElementById("rd1");
  var seeker =  document.getElementById("rd2");
  var admin =  document.getElementById("rd3");
  console.log(userCnic,userPass);
  (data.forEach(function ({cnic, password}) {
    //password = parseInt(password);
    console.log(typeof cnic,typeof password);
    if(userCnic === cnic && userPass === password){
      valFlag = 1;
    }
  })
  );
  if (valFlag == 1){
    console.log("Login!");
    if(donor.checked==true)
    {
      window.location.assign("Client/Donor.html");
    }
    if(seeker.checked==true)
    {
      window.location.assign("Client/helpSeeker.html");
    //   fetch('http://localhost:3000/Seekcheck/' , {
    //     method: 'GET'
    // })
    // .then(response => response.json())
    // .then(data => seekercreate(data['data']));
    }
    if(admin.checked==true)
    {
      window.location.assign("Client/NGOAdmin.html");
    }
  }else{
    console.log("Your cnic or pass is incorrect!");
  }
}

// function seekercreate(data)
// {
//   var valFlag = 0;
//   var userCnic = parseInt(document.getElementById('signin-cnic').value);
//   console.log(userCnic);
//   (data.forEach(function ({cnic}) {
//     if(userCnic === cnic ){
//       valFlag = 1;
//       console.log ("Success");
//     }
//   }))
//   if(varflag == 1)
//   {
//     window.location.assign("Client/helpSeeker.html");
//   }
//   else{
//     fetch('http://localhost:3000/seekcreate/', {
//         headers: {
//             'Content-type': 'application/json'
//         },
//         method: 'POST',
//         body: JSON.stringify({ cnic : UserCnic})
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             window.location.assign("Client/helpSeeker.html");
//         }
//     });
//   }
// }

function signup() {
  fetch('http://localhost:3000/Signup/', {
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
  console.log(UCnic,UPassword,UGender,ULocation);
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
    console.log("user created");
    fetch('http://localhost:3000/NewUser/', {
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

// ------------------------------------------------------ Help Seeker -----------------------------------------------------

// ZAEEM THIS FUNCTION IMPLEMENTATION CAN HELP YOU, CHECK OTHER COMMENTED TOO

// console.log(window.location.pathname);
// if(window.location.pathname === "/Client/helpSeeker.html"){
//     document.addEventListener('DOMContentLoaded', function () {
//       fetch('http://localhost:3000/getDonationData')
//       .then(response => response.json())
//       .then(data => loadDonations(data['data']));
    
// })};
// function loadDonations(data, text) {
//   console.log(text)
//   data.forEach(function ({type_name}) {
//     console.log(type_name);
//     document.getElementById("donationTitle").innerHTML = type_name;
// });
// }}

function reqhelp() {
  console.log(window.location.pathname);
  var Name = document.getElementById("validationDefault01").value;
  var Cnic = parseInt(document.getElementById("validationDefault02").value);
  var city =  document.getElementById("validationDefault03").value;
  var type =  document.getElementById("validationDefault04").value;
  var quantity =  (document.getElementById("validationDefault05").value);
  fetch('http://localhost:3000/seek/', {
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

//function validate(data){
  