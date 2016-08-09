// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

$(document).ready(function() {

var homePage = $('#home-page');
var loginPage = $('#login-page');
var cartPage = $('#cart-page');
var navLinks = $('.nav-link');

homePage.css('display', 'block');
var currentPage = homePage;

// *********** Navigation ***********
var navigate = function(pageFrom, pageTo) {
  pageFrom.css('display', 'none');
  currentPage = pageTo;
  currentPage.css('display', 'block');
};

// Nav links
for (i = 0; i < navLinks.length; i++) {
  navLinks.on( 'click', function() {
    switch (this.id) {
      case 'home-btn':
        navigate(currentPage, homePage);
        break;

      case 'login-btn':
        navigate(currentPage, loginPage);
        break;

      case 'cart-btn':
        navigate(currentPage, cartPage);
        break;

      default:
        console.log('404');
    }
  });
}

// AJAX
$('#login-submit').click(function(event){
  var data = {
              username:$("#username").val(),
              password:$("#password").val()
  };
  console.log(data);
    $.ajax({
        url: 'http://localhost:3002/admins',
        type: 'POST',
        dataType: 'json',
        data:data,
        error: function() {
            console.log("error");
        },
        success:function(data){
            console.log("success");
            var responseData = jQuery.parseJSON(data);
        }
    });
    event.preventDefault();
});
});
