// $(document).ready(function() {
//     $(window).scroll(function() {
//         if ($(this).scrollTop() > 50) {
//             $('#back-to-top').fadeIn();
//         } else {
//             $('#back-to-top').fadeOut();
//         }
//     });
//     // scroll body to 0px on click
//     $('#back-to-top').click(function() {
//         $('body,html').animate({
//             scrollTop: 0
//         }, 400);
//         return false;
//     });
// });
var scrollToTopBtn = document.getElementById("scrollToTopBtn");
var rootElement = document.documentElement;

function scrollToTop() {
  // Scroll to top logic
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}
scrollToTopBtn.addEventListener("click", scrollToTop)