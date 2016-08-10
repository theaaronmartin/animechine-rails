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
var signupPage = $('#signup-page');
var navLinks = $('.nav-link');
var addBtn1 = $('#add-btn-1');
var addBtn2 = $('#add-btn-2');
var addBtn3 = $('#add-btn-3');
var addBtn4 = $('#add-btn-4');
var cartDisplay = $('#cart-display');
var products = [];

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

      case 'signup-btn':
        navigate(currentPage, signupPage);
        break;

      default:
        console.log('404');
    }
  });
}

// AJAX
$('#login-submit').click(function(event){
    $.ajax({
        url: 'http://localhost:3002/admins',
        type: 'GET',
        dataType: 'json',
        data: JSON.stringify({
        username: $('#username').val(),
        password:$("#password").val()
      }),
        error: function() {
            console.log("error");
        },
        success:function(data){
            console.log("success");
            // var responseData = jQuery.parseJSON(data);
        }
    });
    event.preventDefault();
});

$('#signup-submit').click(function(event){
    $.ajax({
        url: 'http://localhost:3002/admins',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
        username: $('#username-signup').val(),
        password:$("#password-signup").val()
      }),
        error: function() {
            console.log("error");
        },
        success:function(data){
            console.log("success");
            // var responseData = jQuery.parseJSON(data);
        }
    });
    event.preventDefault();
});

$('#add-btn-1').click(function(event){
$.ajax({
  url: 'http://localhost:3002/products/57a8cf7c45ad2e6714ee705e',
  type: 'GET',
  dataType: 'json',
  contentType: 'application/json',
  error: function() {
      console.log("error");
  },
  success:function(data){
      console.log("success");
      console.log(data);
      $.ajax({
        url: 'http://localhost:3002/carts',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
        product:$("#productName").val()
      }),
        error: function() {
          console.log("You fucked up!");
        },
        success:function(data){
          console.log("success");
          console.log(data);
        },
      });
      $.each(products, function (index, product){
        var productDisplay = $('<p></p>');
        productDisplay.html(product.productName);
        cartDisplay.append(product);
    });
  },
});
});

$('#add-btn-2').click(function(event){
$.ajax({
  url: 'http://localhost:3002/products/57aa3abbc542023a06829ccd',
  type: 'GET',
  dataType: 'json',
  contentType: 'application/json',
  error: function() {
      console.log("error");
  },
  success:function(data){
      console.log("success");
      console.log(data);
  }
});
});

$('#add-btn-3').click(function(event){
$.ajax({
  url: 'http://localhost:3002/products/57aa3ad6c542023a06829cce',
  type: 'GET',
  dataType: 'json',
  contentType: 'application/json',
  error: function() {
      console.log("error");
  },
  success:function(data){
      console.log("success");
      console.log(data);
  }
});
});

$('#add-btn-4').click(function(event){
$.ajax({
  url: 'http://localhost:3002/products/57aa3aebc542023a06829ccf',
  type: 'GET',
  dataType: 'json',
  contentType: 'application/json',
  error: function() {
      console.log("error");
  },
  success:function(data){
      console.log("success");
      console.log(data);
  }
 });
});

// Add to Cart
addBtn1.on( 'click', function() {
  console.log('------ Product Added! ------');
  products.push(new Product());

  navigate(currentPage, cartPage);
});

addBtn2.on( 'click', function() {
  console.log('------ Product Added! ------');

  navigate(currentPage, cartPage);
});

addBtn3.on( 'click', function() {
  console.log('------ Product Added! ------');

  navigate(currentPage, cartPage);
});

addBtn4.on( 'click', function() {
  console.log('------ Product Added! ------');

  navigate(currentPage, cartPage);
});

// Cart Display
// var showCart = function() {
  // $.each(products, function(product) {
  //   var productDisplay = $('<p></p>');
  //   productDisplay.html(product.productName);
  //   cartDisplay.append(product);
  // });
// };


// Product
// var Product = function(product) {
//   this.productName = product.productName;
//    this.size = product.size;
//    this.color = product.color;
//    this.price = product.price;
//    this._id = product._id;
// };

function Product(productName, size, color, price, _id) {
 this.productName = productName;
 this.size = size;
 this.color = color;
 this.price = price;
 this._id = _id;
}


});
