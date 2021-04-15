$(document).ready(function(){

// scrolltop button functionality
  $(window).scroll(function(){
    if($(this).scrollTop() > 40){
      $('#topBtn').fadeIn();
    } else{
      $('#topBtn').fadeOut();
    }
  });

  $('#topBtn').click(function(){
    $('html ,body').animate({scrollTop : 0},800);
  });
});


// Web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAsiM_XqEvMobjmQJ9DdauklAoEfXDKiJ0",
  authDomain: "agro-web-23803.firebaseapp.com",
  databaseURL: "https://agro-web-23803.firebaseio.com",
  projectId: "agro-web-23803",
  storageBucket: "agro-web-23803.appspot.com",
  messagingSenderId: "10306571049",
  appId: "1:10306571049:web:fb4fa7379142ac67878538"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// prooducts list
let products = [{
  id: 1,
  img: 'produs-conopida.jpg',
  name: 'Conopida',
  price: 4.10,
  quantity: 1,
  subTotal: 0,
  unit: 'kg'
},{
  id: 2,
  img: 'produs-rosii.jpg',
  name: 'Rosii',
  price: 10.50,
  quantity: 1,
  subTotal: 0,
  unit: 'kg'
},{
  id: 3,
  img: 'produs-morcovi.jpg',
  name: 'Morcovi',
  price: 3.99,
  quantity: 1,
  subTotal: 0,
  unit: 'kg'
},{
  id: 4,
  img: 'produs-ardei.jpg',
  name: 'Ardei',
  price: 9.15,
  quantity: 1,
  subTotal: 0,
  unit: 'kg'
},{
  id: 5,
  img: 'produs-broccoli.jpg',
  name: 'Broccoli',
  price: 6.50,
  quantity: 1,
  subTotal: 0,
  unit: 'kg'
},{
  id: 6,
  img: 'produs-varza.jpg',
  name: 'Varza',
  price: 3.00,
  quantity: 1,
  subTotal: 0,
  unit: 'kg'
},{
  id: 7,
  img: 'produs-salata.jpg',
  name: 'Salata',
  price: 2.20,
  quantity: 1,
  subTotal: 0,
  unit: 'buc'
},{
  id: 8,
  img: 'produs-cartofi.jpg',
  name: 'Cartofi',
  price: 2.60,
  quantity: 1,
  subTotal: 0,
  unit: 'kg'
},{
  id: 9,
  img: 'produs-usturoi.jpg',
  name: 'Usturoi',
  price: 21.70,
  quantity: 1,
  subTotal: 0,
  unit: 'kg'
},{
  id: 10,
  img: 'produs-cirese.jpg',
  name: 'Cirese',
  price: 17.90,
  quantity: 1,
  subTotal: 0,
  unit: 'kg'
},{
  id: 11,
  img: 'produs-capsuni.jpg',
  name: 'Capsuni',
  price: 25.50,
  quantity: 1,
  subTotal: 0,
  unit: 'kg'
},{
  id: 12,
  img: 'produs-pepene-galben.jpg',
  name: 'Pepene galben',
  price: 6.05,
  quantity: 1,
  subTotal: 0,
  unit: 'kg'
},{
  id: 13,
  img: 'produs-pepene-rosu.jpg',
  name: 'Pepene rosu',
  price: 2.70,
  quantity: 1,
  subTotal: 0,
  unit: 'kg'
},{
  id: 14,
  img: 'produs-zmeura.jpg',
  name: 'Zmeura',
  price: 23.80,
  quantity: 1,
  subTotal: 0,
  unit: 'kg'
}];

let cart = [];

products.forEach((item, index) => {
  $('#products-container').append(`
    <div class="col-sm-6 col-md-4 col-lg-3 my-3">
      <div class="card text-center shadow">
        <img class="card-img-top w-100 d-block" src="assets/img/${item.img}" />
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <p class="text-center card-text price"><strong>        <span>${displayPrice(item.price, 'int')}</span>
        <sup>${displayPrice(item.price, 'dec')}</sup></strong><span>lei/${item.unit}</span></p>
          <button class="btn btn-primary add-cart" type="button" onclick="addToCart(${item.id}, ${index})"><i class="fa fa-shopping-cart"></i>Adaugă în coș</button>
        </div>
      </div>
    </div>
    `);
});


 $('#visible-shopping-cart').click(() => {
     if (cart.length !== 0 && $('.mini-cart').attr('class', 'mini-cart')) {
       $('.mini-cart').attr('class', 'mini-cart active');
       $('.mini-cart').show();
     }
 });

$('.cart-close .fa-close').click(() => {
    $('.mini-cart').attr('class', 'mini-cart');
});


$(document).ready(function(){
 if (localStorage.cart)
 {
   cart = JSON.parse(localStorage.cart);
   updateCartDisplay();
 }
});


function addToCart(id, index) {
    let foundItem = cart.find((element) => element.id === id);
    if (!foundItem) {
        cart.push(products[index]);
        cart[cart.length - 1].subTotal += cart[cart.length - 1].price;
        saveCart();
        updateCartDisplay();

    }
}


function saveCart() {
   if (window.localStorage) {
     localStorage.cart = JSON.stringify(cart);
   }
}

function updateCartDisplay() {
    let totalMiniPrice = 0;

    $ ('.cart-products').empty();
    $('#table-items').empty();
    if (cart.length == 0) {
        $('#visible-shopping-cart .badge').hide();
        $('.mini-cart').attr('class', 'mini-cart');
        $('#empty-cart-message').show();
        $('#cart-table').hide();
        return;
    }

      $('#visible-shopping-cart .badge').show();
      $('#visible-shopping-cart .badge').text(cart.length);

    cart.forEach((item, index) => {

    $('.cart-products').append(`
  <div class="d-flex justify-content-between cart-item">
    <div class="cart-img"><img class="img-fluid" src="assets/img/${item.img}" /></div>
    <div class="d-flex flex-column justify-content-center cart-info">
        <h6 class="cart-item-name">${item.name}</h6>
        <p>1 <span class="cart-product-unit">${item.unit}</span> x <strong><span class="cart-product-price"><span>${displayPrice(item.price, 'int')}</span>
        <sup>${displayPrice(item.price, 'dec')}</sup></span> Lei</strong></p>
    </div>
    <div class="d-flex align-items-center cart-remove-item"><i class="fa fa-trash-o" onclick="deleteItem(${index})"></i></div>
  </div>
 `);
  totalMiniPrice += item.price;

    $('#table-items').append(`
       <tr>
          <th scope="row">${index + 1}.</th>
          <td><i class="fa fa-times" onclick="deleteItem(${index})"></i></td>
          <td><img class="img-fluid" style="width:4rem" src="assets/img/${item.img}"></td>
          <td>${item.name}</td>
          <td><span>${displayPrice(item.price, 'int')}</span>
        <sup>${displayPrice(item.price, 'dec')}</sup> Lei</td>
          <td>
            <i class="fa fa-minus" onclick="reduceAmount(${index})"></i>
            <input style="width:2rem;text-align:center" id="${item.id}" value="${item.quantity}" disabled>
            <i class="fa fa-plus" onclick="addAmount(${index})"></i>
          </td>
          <td><strong><span>${displayPrice(item.subTotal, 'int')}</span>
        <sup>${displayPrice(item.subTotal, 'dec')}</sup> Lei</strong></td>
        </tr>
 `);



        $('#total-table').html(`
          <tr>
      <th scope="row"></th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>
        <h4 style="font-size:1.5rem">Total: </h4>
      </td>
      <td>
       <strong style="font-size:1.5rem">
        <span>${displayPrice(total(), 'int')}</span>
        <sup>${displayPrice(total(), 'dec')}</sup>
        <span>Lei</span>
       </strong>
      </td>
    </tr>

  `);


});

      $('#mini-cart-total-price').html(`<span>${displayPrice(totalMiniPrice, 'int')}</span>
        <sup>${displayPrice(totalMiniPrice, 'dec')}</sup>`);

}


function deleteItem(index) {
    cart.splice(index, 1);
    updateCartDisplay();
    saveCart();
}


function reduceAmount(index) {
   if(cart[index].quantity > 1) {
       cart[index].quantity--;
       cart[index].subTotal -= cart[index].price;
       updateCartDisplay();
       saveCart();
   } else {
       deleteItem(index);
   }
}


function addAmount(index) {
    if(cart[index].quantity > 0) {
       cart[index].quantity++;
       cart[index].subTotal += cart[index].price;
       updateCartDisplay();
       saveCart();
    }
}

function total() {
    let total = 0;
    cart.forEach((item) => total += item.subTotal);
    return total;
}

function displayPrice(num, part) {
  if(num) {
  let arr = num.toFixed(2).split(".");
   switch(part) {
       case 'int':
        return arr[0];
        break;
       case 'dec':
        return arr[1];
        break;
       default:
         console.log('First argument must be a number and the second argument must be one of the following strings: "int" or "dec".')
   }
  }
}


//send newsletter form data to Firebase
$('#newsletter-submit').click(function() {
    event.preventDefault();
    if ($('#newsletter-name').get(0).reportValidity() && $('#newsletter-email').get(0).reportValidity()) {
    firebase.database().ref('newsletter').push({
        name: $('#newsletter-name').val(),
        email: $('#newsletter-email').val()
    });

      $('#newsletter-form input').val('');

      Swal.fire({
      type: 'success',
      title: 'Iti multumim pentru ca te-ai abonat la newsletter!',
      text: 'Am inregistrat adresa ta de email, de acum inainte vei primi periodic informatii importante de la noi.'
  });
    }

});


//send contact form data to Firebase
$('#contact-submit').click(function() {
    event.preventDefault();
    if ($('#contact-name').get(0).reportValidity() && $('#contact-email').get(0).reportValidity() && $('#contact-message').get(0).reportValidity()) {
    firebase.database().ref('messages').push({
        name: $('#contact-name').val(),
        email: $('#contact-email').val(),
        message: $('#contact-message').val()
    });
      $('#contact-form input, #contact-form textarea').val('');

      Swal.fire({
      type: 'success',
      title: 'Iti multumim pentru mesaj!',
      text: 'Suntem bucurosi sa primi sugestii de orice fel din partea clientilor nostri.'
  });
    }

});

//send order data to Firebase
$('#order-submit').click(function() {
    event.preventDefault();
    if ($('#order-first-name').get(0).reportValidity() && $('#order-last-name').get(0).reportValidity() && $('#order-address').get(0).reportValidity() && $('#order-phone').get(0).reportValidity() && $('.form-check-input').get(0).reportValidity()) {
     let productsFirebase = [];
           cart.forEach((item, index) => {
      let product = {
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subTotal: item.subTotal,
      }
      productsFirebase.push(product);
 });

    firebase.database().ref('orders').push({
        firstName: $('#order-first-name').val(),
        lastName: $('#order-last-name').val(),
        address: $('#order-address').val(),
        phone: $('#order-phone').val(),
        email: $('#order-email').val(),
        payment: $('input[name="payment"]:checked').val(),
        products: productsFirebase,
        total: total()
    });
      $('#order-form, #order-submit').parents('.row').hide();
      $('#empty-cart-message').show();
      $('#goodby').show();
      cart.length = 0;
      updateCartDisplay();
      saveCart();

      Swal.fire({
      type: 'success',
      title: 'Comanda a fost plasata!',
      text: 'In cel mai scurt timp te vom suna pentru detalii legate de plata si transport.'
  });
    }

});
