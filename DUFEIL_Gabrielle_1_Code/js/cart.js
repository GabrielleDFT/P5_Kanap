
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
function getTotals(){
    //--Retrieve Total Quantity--
    var articlesQuantity = document.getElementsByClassName('itemQuantity');
    var quantityContent = articlesQuantity.length,
    totalQt = 0;

    for (let i = 0; i < quantityContent; ++i) {
        totalQt += articlesQuantity[i].valueAsNumber;
    }
    var totalQuantity = document.getElementById('totalQuantity');
    totalQuantity.innerHTML = totalQt;
    console.log(totalQt);
    //--Retrieve Total Price--
    totalPrice = 0;

    for (let i = 0; i < quantityContent; ++i) {
        totalPrice += (articlesQuantity[i].valueAsNumber * itemsInLocalStorage[i].prixProduit);
    }
    var cartTotal = document.getElementById('totalPrice');
    cartTotal.innerHTML = totalPrice;
    console.log(totalPrice);
}
getTotals();
//---------------------------------------MODIFY QUANTITY-------------------------------------------------
function modify() {
    var modifQuantt = document.querySelectorAll(".itemQuantity");

    for (let k = 0; k < modifQuantt.length; k++){
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
    for (let j = 0; j < deleteBttn.length; j++){
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
function validForm() {
    var form = document.querySelector(".cart__order__form");
    var emailRegex = new RegExp('^[A-Za-z0-9\-\.]+@([A-Za-z0-9\-]+\.)+[A-Za-z0-9-]{2,4}$');
    var regex = new RegExp("^[a-zA-Z\-çñàéèêëïîôüù ]{2,}$");
    var addressRegex = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Z]+)+");

    //--Create Function to Validate First Name, Last Name, Address, City & Email--
    const validFirstName = function(inputFirstName) {
        var firstNameErrorMsg = inputFirstName.nextElementSibling;
        if (regex.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = ''; } 
        else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner correctement votre prénom'; }
    };
    const validLastName = function(familyName) {
        var lastNameErrorMsg = familyName.nextElementSibling;
        if (regex.test(familyName.value)) {
            lastNameErrorMsg.innerHTML = ''; } 
        else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner correctement votre nom'; }
    };
    const validAddress = function(inputAddress) {
        var addressErrorMsg = inputAddress.nextElementSibling;
        if (addressRegex.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = ''; } 
        else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner une adresse postale valide'; }
    };
    const validCity = function(cityPlace) {
        var cityErrorMsg = cityPlace.nextElementSibling;
        if (regex.test(cityPlace.value)) {
            cityErrorMsg.innerHTML = ''; } 
        else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner un nom de votre ville valide'; }
    };
    const validEmail = function(inputEmail) {
        var emailErrorMsg = inputEmail.nextElementSibling;
        if (emailRegex.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = ''; } 
            else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner une adresse email valide'; }
    };
        //--Event listening to First Name, Last Name, Address, City & Email---
    form.firstName.addEventListener('change', function() { validFirstName(this); });
    form.lastName.addEventListener('change', function() { validLastName(this); });
    form.address.addEventListener('change', function() { validAddress(this);  });
    form.city.addEventListener('change', function() { validCity(this); });
    form.email.addEventListener('change', function() { validEmail(this); });
}
validForm();
//------------------------CLIENT INFOS TO LOCAL STORAGE FOR CONFIRMATION---------------------------------
function Form() {
    const orderButton = document.getElementById("order"); 

                //--Event listening to Cart--
    orderButton.addEventListener("click", (e) => {
        e.preventDefault();

                //--Retrieve Client details form--
        var name = document.getElementById('firstName');
        var familyName = document.getElementById('lastName');
        var adresse = document.getElementById('address');
        var cityPlace = document.getElementById('city');
        var mail = document.getElementById('email');
 
                //--Create an Array to Local Storage--
        var idProducts = [];  
        for (var i = 0; i<itemsInLocalStorage.length;i++) {
            idProducts.push(itemsInLocalStorage[i].idProduit); }
        console.log(idProducts);

                //--Create an Object to Retrieve Data User--
        const order = {  
            contact : {
                firstName: name.value,
                lastName: familyName.value,
                address: adresse.value,
                city: cityPlace.value,
                email: mail.value,
            },
            products: idProducts,
        }; 
        const post = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                Accept: 'application/json', 
                "Content-Type": "application/json",
            },
        };
                //--Call to API "order" to send Object--
        fetch("http://localhost:3000/api/products/order", post)
            .then((res) => {
                return res.json();
            })
            .then((confirm) => {
                document.location.href = "./confirmation.html?orderId=" + confirm.orderId;
                localStorage.clear();
            })
            .catch((err) => {
                alert ("Problème avec fetch" + err);
                //console.log("une erreur est survenue");
            });
    })
}
Form();


