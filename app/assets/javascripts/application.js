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
var addBtn = $('.add-btn');
var cartDisplay = $('#cart-display');
var showProducts = $('#show-products');
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

// Login Submit
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

// Signup Submit
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

// Show Products

$.ajax('http://localhost:3002/products/', {
  method: 'GET'
  })
  .done(function(products) {
    console.log(products);
      $.each(products, function(index, product) {
        var item = $('<div class="col-md-6"><img class="shirt-img"/><h3 class="shirt-desc"></h3><h5 class="shirt-desc"></h5><h5 class="shirt-price"></h5><h5 class="add-cart" ><a class="add-btn" href="javascript://"></a></h5></div>');
        item.find('img.shirt-img').attr('src', product.image);
        item.find('h3.shirt-desc').html(product.productName);
        item.find('h5.shirt-desc').html(product.size);
        item.find('h5.shirt-price').html(product.price);
        item.find('a.add-btn').html('Add to Cart');
        showProducts.append(item);
      });
    })
    .fail(function() {
      console.log('error');
    })
    .always(function() {
      console.log('complete');
    });

    // Add to Cart
    showProducts.on( 'click', '.add-btn', function() {
      $.ajax({
        url: 'http://localhost:3002/carts',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
        productId:$(_id).val(),
        userId:$(user_id).val()
      }),
        error: function() {
          console.log("You fucked up!");
        },
        success:function(data){
          console.log("success");
          console.log(data);
        },
      });
      console.log('added');

      // $.ajax('http://localhost:3002/carts/', {
      //   method: 'POST'
      //   })
      //   .done(function(products) {
      //     console.log(products);
      //     })
      //     .fail(function() {
      //       console.log('error');
      //     })
      //     .always(function() {
      //       console.log('complete');
      //     });
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
function Product(productName, size, color, price, _id) {
 this.productName = productName;
 this.size = size;
 this.color = color;
 this.price = price;
 this._id = _id;
}


});
