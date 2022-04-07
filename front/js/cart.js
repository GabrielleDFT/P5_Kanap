
// RETRIEVING CART FROM LOCAL STORAGE
let itemsInLocalStorage = JSON.parse(localStorage.getItem('cart'));  
console.log(cart);

// Variable
var productQuantity = document.getElementsByClassName("itemQuantity");

// DISPLAY PRODUCT
async function displayCart() {
    const parser = new DOMParser();
    const positionEmptyCart = document.getElementById("cart__items");
    let cartArray = [];
  
    // IF Empty Localstorage 
    if (itemsInLocalStorage === null || itemsInLocalStorage == 0) {
      positionEmptyCart.textContent = "Votre panier est vide";
    } else {
      // IF Products in LocalStorage
      for (i = 0; i < itemsInLocalStorage.length; i++) {
        const product = await getProductById(itemsInLocalStorage[i].id);
        const totalPriceItem = (product.price *= itemsInLocalStorage[i].quantity);
        cartArray += `
         <article class="cart__item" data-id=${itemsInLocalStorage[i].id}>
         <div class="cart__item__img">
           <img src="${product.imageUrl}" alt="Photographie d'un canapé">
         </div>
         <div class="cart__item__content">
           <div class="cart__item__content__titlePrice">
             <h2>${product.name}</h2>
             <p>${itemsInLocalStorage[i].color}</p>
             <p>
             
             ${totalPriceItem} €</p>
           </div>
           <div class="cart__item__content__settings">
             <div class="cart__item__content__settings__quantity">
               <p>Qté : </p>
               <input data-id= ${itemsInLocalStorage[i].id} data-color= ${itemsInLocalStorage[i].color} type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${itemsInLocalStorage[i].quantity}>
             </div>
             <div class="cart__item__content__settings__delete">
               <p data-id= ${itemsInLocalStorage[i].id} data-color= ${itemsInLocalStorage[i].color} class="deleteItem">Supprimer</p>
             </div>
           </div>
         </div>
       </article>
       `;
      }
      // TOTAL PRODUCT & PRICE IN CART 
      let totalQuantity = 0;
      let totalPrice = 0;
      for (i = 0; i < itemsInLocalStorage.length; i++) {
        const article = await getProductById(itemsInLocalStorage[i].id);
        totalQuantity += parseInt(itemsInLocalStorage[i].quantity);
        totalPrice += parseInt(article.price * itemsInLocalStorage[i].quantity);
      }
      document.getElementById("totalQuantity").innerHTML = totalQuantity;
      document.getElementById("totalPrice").innerHTML = totalPrice;
      if (i == itemsInLocalStorage.length) {
        const displayBasket = parser.parseFromString(cartArray, "text/html");
        positionEmptyCart.appendChild(displayBasket.body);
        changeQuantity();
        deleteItem();
      }
    }
  }

// RETRIEVING PRODUCTS FROM API
async function getProductById(productId) {
    return fetch("http://localhost:3000/api/products/" + productId)
      .then(function (res) {
        return res.json();
      })
      .catch((err) => {
        // Une erreur est survenue
        console.log("error");
      })
      .then(function (response) {
        return response;
      });
  }
  displayCart();

// ADD PRODUCT
function addCart(product) {
    let cart = getCart(); 
    let itsExist = false;
    cart.map(product => {
        if(product.id == product.id && product.colors == product.colors) {
            itsExist = true;
            item.newQuantity += parseInt(product.quantity);
        }  
    });
        if(itsExist == false) {
        cart.push(product);  
    }
    saveCart(cart);     
};

// UPDATE QUANTITY PRODUCT
function updateQuantity() {
    const productQuantity = document.querySelectorAll('.itemQuantity');
    for (let i = 0; i < productQuantity.length; i++) {
        productQuantity[i].addEventListener('change', (event) => {
        event.preventDefault();
        const productNewQuantity = event.target.value;
        const newCart = {
          id: cart[i].id,
          colors: cart[i].colors,
          quantity: productNewQuantity,
          price: cart[i].price,
        };
        cart[i] = newCart;
        localStorage.clear();
        localStorage.setItem('cart',JSON.stringify(cart));
        location.reload();
      });
    }
    console.log(cart);
}

// DELETE PRODUCT
function deleteProduct() {  
    const eraseProduct = document.querySelectorAll('.deleteItem');  
    eraseProduct.forEach((eraseProduct) => {
    eraseProduct.addEventListener("click", (event) => {
        event.preventDefault();
        const deleteId = event.target.getAttribute("data-id");
        const deleteColor = event.target.getAttribute("data-color");
        itemsInLocalStorage = itemsInLocalStorage.filter(
          (element) => !(element.id == deleteId && element.color == deleteColor)
        );
        console.log(itemsInLocalStorage);
        deleteConfirm = window.confirm("Etes vous sûr de vouloir supprimer cet article ?");
        if (deleteConfirm == true) {
          localStorage.setItem("cartItems", JSON.stringify(itemsInLocalStorage));
          location.reload();
          alert("Article supprimé avec succès");
        }
      });
    });
}

// EMPTY CART
function getCart() {
    let cart = localStorage.getItem("cart");
      if (cart < 1) {  
      return[];         
    } else {
      return JSON.parse(cart);
    };
}
// Linéarisation (transforme données complexes en chaine de caractères)
function saveCart(cart) {                               
    localStorage.setItem('cart', JSON.stringify(cart)); 
}

//--------------------------------------------EVENTS----------------------------------------------
// Variables REGEX
var nameRegex = /^[a-zA-Z\-çñàéèêëïîôüù ]{3}$/;
var adressRegex = /^[0-9a-zA-Z\s,.'-çñàéèêëïîôüù]{3}$/;
var emailRegex = /^[A-Za-z0-9\-\.]+@([A-Za-z0-9\-]+\.)+[A-Za-z0-9-]{2,4}$/;

// Retrieving form id 
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

// 1-LISTENING TO "FirstName" EVENT
firstName.addEventListener("input", (event) => {
    event.preventDefault();
    if (nameRegex.test(firstName.value) == false || firstName.value == "") {
      document.getElementById("firstNameErrorMsg").innerHTML =
        "Prénom non valide";
      return false;
    } else {
      document.getElementById("firstNameErrorMsg").innerHTML = "";
      return true;
    }
  });
// 2-LISTENING TO "LastName" EVENT 
lastName.addEventListener("input", (event) => {
    event.preventDefault();
    if (nameRegex.test(lastName.value) == false || lastName.value == "") {
      document.getElementById("lastNameErrorMsg").innerHTML = "Nom non valide";
      return false;
    } else {
      document.getElementById("lastNameErrorMsg").innerHTML = "";
      return true;
    }
  });
// 3-LISTENING TO "Address" EVENT 
address.addEventListener("input", (event) => {
    event.preventDefault();
    if (nameRegex.test(address.value) == false || address.value == "") {
      document.getElementById("addressErrorMsg").innerHTML = "Adresse non valide";
      return false;
    } else {
      document.getElementById("addressErrorMsg").innerHTML = "";
      return true;
    }
  });
// 4-LISTENING TO "City" EVENT
city.addEventListener("input", (event) => {
    event.preventDefault();
    if (nameRegex.test(city.value) == false || city.value == "") {
      document.getElementById("cityErrorMsg").innerHTML = "Ville introuvable";
      return false;
    } else {
      document.getElementById("cityErrorMsg").innerHTML = "";
      return true;
    }
  });
// 5-LISTENING TO "Email" EVENT
email.addEventListener("input", (event) => {
    event.preventDefault();
    if (nameRegex.test(email.value) == false || email.value == "") {
      document.getElementById("cityErrorMsg").innerHTML = "Email non valide";
      return false;
    } else {
      document.getElementById("cityErrorMsg").innerHTML = "";
      return true;
    }
  });


let order = document.getElementById("order");
order.addEventListener("click", (e) => {
  e.preventDefault();
  // OBJECT CREATION ORDER PRODUCT / DataOrder Array to have data Order user 
  let dataOrder = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };
// CHECKING VALID FORM
  if (
    firstName.value === "" ||
    lastName.value === "" ||
    address.value === "" ||
    city.value === "" ||
    email.value === ""
  ) {
    alert("Vous devez renseigner vos coordonnées pour passer commande.");
  } else if (
    nameRegex.test(firstName.value) == false ||
    nameRegex.test(lastName.value) == false ||
    adressRegex.test(address.value) == false ||
    nameRegex.test(city.value) == false ||
    emailRegex.test(email.value) == false
  ) {
    alert("Merci de renseigner correctement vos coordonnées.");
  } else {
    let products = [];
    itemsInLocalStorage.forEach((order) => {
      products.push(order.id);
    });

    let pageOrder = { dataOrder, products };

    // CALL TO API Order/ POST METHOD (pr envoyer les tableaux)
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(pageOrder),
    })
      .then((res) => {
        return res.json();
      })
      .then((confirm) => {
        window.location.href = "./confirmation.html?orderId=" + confirm.orderId;
        localStorage.clear();
      })
      .catch((error) => {
        console.log("une erreur est survenue");
      });
  }
});





