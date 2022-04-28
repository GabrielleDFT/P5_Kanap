
//-------------------------------------Init LOCAL STORAGE------------------------------------------------
var itemsInLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.table(itemsInLocalStorage);
//------------------------------------DISPLAY CART-------------------------------------------------------
const positionCart = document.querySelector("#cart__items");
function getCart() {
    if (itemsInLocalStorage === null || itemsInLocalStorage == 0) { //--If Empty Cart--
        const emptyCart = `<p>Votre panier est vide</p>`;
        positionCart.innerHTML = emptyCart;
    } 
    else { //--If Full Cart--
        for (let produit in itemsInLocalStorage) {
                        //--Insert Article--
            var kanapItem = document.createElement("article");
            document.querySelector("#cart__items").appendChild(kanapItem);
            kanapItem.className = "cart__item";
            kanapItem.setAttribute('data-id', itemsInLocalStorage[produit].idProduit);
                        //--Insert Img--
            var cartImg = document.createElement("div");
            kanapItem.appendChild(cartImg);
            cartImg.className = "cart__item__img";
            var itemImg = document.createElement("img");
            cartImg.appendChild(itemImg);
            itemImg.src = itemsInLocalStorage[produit].imgProduit;
            itemImg.alt = itemsInLocalStorage[produit].altImgProduit;
                        //--Insert "div" Content--
            var cartContent = document.createElement("div");
            kanapItem.appendChild(cartContent);
            cartContent.className = "cart__item__content";
                        //--Insert Title Price--
            var titlePrice = document.createElement("div");
            cartContent.appendChild(titlePrice);
            titlePrice.className = "cart__item__content__titlePrice";
                        //--Insert Item Name--
            var itemName = document.createElement("h2");
            titlePrice.appendChild(itemName);
            itemName.innerHTML = itemsInLocalStorage[produit].nomProduit;
                        //--Insert Price--
            var itemPrice = document.createElement("p");
            titlePrice.appendChild(itemPrice);
            itemPrice.innerHTML = itemsInLocalStorage[produit].prixProduit + " €";
                        //--Insert Color--
            var itemColor = document.createElement("p");
            itemName.appendChild(itemColor);
            itemColor.innerHTML = itemsInLocalStorage[produit].couleurProduit;
            itemColor.style.fontSize = "20px";
                        //--Insert "div settings"-- 
            var contentSet = document.createElement("div");
            cartContent.appendChild(contentSet);
            contentSet.className = "cart__item__content__settings";
                        //--Insert Quantity--
            var itemQuantity = document.createElement("div");
            contentSet.appendChild(itemQuantity);
            itemQuantity.className = "cart__item__content__settings__quantity";
            var quantityItem = document.createElement("p");
            itemQuantity.appendChild(quantityItem);
            quantityItem.innerHTML = "Quantité : ";
            var productQuantity = document.createElement("input");
            itemQuantity.appendChild(productQuantity);
            productQuantity.value = itemsInLocalStorage[produit].quantiteProduit;
            productQuantity.className = "itemQuantity";
            productQuantity.setAttribute("type", "number");
            productQuantity.setAttribute("min", "1");
            productQuantity.setAttribute("max", "100");
            productQuantity.setAttribute("name", "itemQuantity");
                        //--Insert Delete Button--
            var itemDelete = document.createElement("div");
            contentSet.appendChild(itemDelete);
            itemDelete.className = "cart__item__content__settings__delete";
            var buttonDelete = document.createElement("p");
            itemDelete.appendChild(buttonDelete);
            buttonDelete.className = "deleteItem";
            buttonDelete.innerHTML = "Supprimer";
        }
    }
}
getCart();
//--------------------------------------TOTAL ITEMS IN CART----------------------------------------------
function getTotals() {
    //--Retrieve Total Quantity--
    var articlesQuantity = document.getElementsByClassName('itemQuantity');
    var quantityContent = articlesQuantity.length,
    totalQt = 0;

    for (let i = 0; i < quantityContent; ++i) {
        totalQt += articlesQuantity[i].valueAsNumber;
    }
    var totalQuantity = document.getElementById('totalQuantity');
    totalQuantity.innerHTML = totalQt;
   // console.log(totalQt);
    totalPrice = 0; //--Retrieve Total Price--

    for (let i = 0; i < quantityContent; ++i) {
        totalPrice += (articlesQuantity[i].valueAsNumber * itemsInLocalStorage[i].prixProduit);
    }
    var cartTotal = document.getElementById('totalPrice');
    cartTotal.innerHTML = totalPrice;
   // console.log(totalPrice);
}
getTotals();
//---------------------------------------MODIFY QUANTITY-------------------------------------------------
function modify() {
    var modifQuantt = document.querySelectorAll(".itemQuantity");

    for (let k = 0; k < modifQuantt.length; k++) {
        modifQuantt[k].addEventListener("change" , (event) => {
            event.preventDefault();
            //--Select & Delete Item by Id & Color--
            var quantityModif = itemsInLocalStorage[k].quantiteProduit;
            var modifValue = modifQuantt[k].valueAsNumber;
            const result = itemsInLocalStorage.find((el) => el.modifValue !== quantityModif);
            result.quantiteProduit = modifValue;
            itemsInLocalStorage[k].quantiteProduit = result.quantiteProduit;
            localStorage.setItem("produit", JSON.stringify(itemsInLocalStorage));
            location.reload();
        })
    }
}
modify();
//--------------------------------------------DELETE ITEM------------------------------------------------
function deleteItem() {
    var deleteBttn = document.querySelectorAll(".deleteItem");
    for (let j = 0; j < deleteBttn.length; j++) {
        deleteBttn[j].addEventListener("click" , (e) => {
            e.preventDefault();
            //--Select & Delete Item by Id & Color--
            var idDelete = itemsInLocalStorage[j].idProduit;
            var colorDelete = itemsInLocalStorage[j].couleurProduit;
            itemsInLocalStorage = itemsInLocalStorage.filter( el => el.idProduit !== idDelete || el.couleurProduit !== colorDelete );
            localStorage.setItem("produit", JSON.stringify(itemsInLocalStorage));
            //--Pop-up for Deleted Items--
            alert("Attention, ce produit va être supprimé du panier");
            location.reload();
        })
    }
}
deleteItem();
//-----------------------------------VALID FORM WITH REGEX-----------------------------------------------
const form = document.querySelector('.cart__order__form');
var regex = /^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s]{3,}$/;
var regexLocal = /^[-'a-zA-Z0-9À-ÖØ-öø-ÿ\s]{3,}$/;
var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var validFirstName = false; 
var validLastName = false;
var validAddress = false;
var validCity = false;
var validMail = false;

//--Function to Validate First Name, Last Name, Address, City & Email--
form.firstName.addEventListener('input', function() {
  let firstNameTest = regex.test(this.value);
  if(firstNameTest) {
    validFirstName = true; 
    this.nextElementSibling.innerHTML = "";
  } 
  else {
    validFirstName = false; 
    this.nextElementSibling.innerHTML = "Veuillez renseigner correctement votre prénom (lettres et au moins 3 caractères)";
  }
});
form.lastName.addEventListener('input', function() {
  let lastNameTest = regex.test(this.value);
  if(lastNameTest) {
    validLastName = true; 
    this.nextElementSibling.innerHTML = "";
  } 
  else {
    validLastName = false; 
    this.nextElementSibling.innerHTML = "Veuillez renseigner correctement votre nom (avec lettres et au moins 3 caractères)";
  }
});
form.address.addEventListener('input', function() {
  let addressTest = regexLocal.test(this.value);
  if(addressTest) {
    validAddress = true; 
    this.nextElementSibling.innerHTML = "";
  }
  else {
    validAddress = false; 
    this.nextElementSibling.innerHTML = "Veuillez renseigner une adresse postale valide";
  }
});
form.city.addEventListener('input', function() {
  let cityTest = regexLocal.test(this.value);
  if(cityTest) {
    validCity = true; 
    this.nextElementSibling.innerHTML = "";
  }
  else {
    validCity = false; 
    this.nextElementSibling.innerHTML = "Veuillez renseigner un nom de ville valide";
  }
});
form.email.addEventListener('input', function() {
  let emailTest = emailRegex.test(this.value);
  if(emailTest) {
    validMail = true; 
    this.nextElementSibling.innerHTML = "";
  }
  else {
    validMail = false; 
    this.nextElementSibling.innerHTML = "Veuillez renseigner une adresse email valide";
  }
});
        //--Function to valid form--
function verifForm() {
  if (
    validFirstName &&
    validLastName &&
    validAddress &&
    validCity &&
    validMail
  ) {
    return true;
  } 
  else {
    alert('Merci de renseigner correctement vos coordonnées pour passer la commande');
    return false;
  }
};
//------------------------CLIENT INFOS TO LOCAL STORAGE FOR CONFIRMATION---------------------------------
//--Create an Object to Retrieve Data User--
var order = {
  contact: {
    firstName: firstName,
    lastName: lastName,
    address: address,
    city: city,
    email: email,
    },
  products: []
}; 
const orderButton  = document.getElementById('order');
          //--Event listening to Cart--
orderButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (verifForm()){    
    const post = { //--Post method--
      method: 'POST',  
      headers: {
        'content-Type': 'application/json'},
      body: JSON.stringify(order),
    }; 
    console.log(post);
            //--Call to API "order" to send Object--
    fetch("http://localhost:3000/api/products/order", post)       
      .then((res) => res.json())
      .then(data => {
      console.log(data); 
      localStorage.setItem("orderId", data.orderId);
      document.location.href = `confirmation.html`;
    });   
  }
});






