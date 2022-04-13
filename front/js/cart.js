
// -------------------RETRIEVING CART FROM LOCAL STORAGE------------
var itemsInLocalStorage = JSON.parse(localStorage.getItem("produit"));  
console.log(localStorage);
// console.table(itemsInLocalStorage);

//--------------------DISPLAY CART--------------------------
const selectCart = document.querySelector("#cart__items");

function getCart(){

if (itemsInLocalStorage === null || itemsInLocalStorage == 0) {// If Empty cart
    const emptyCart = `<p>Votre panier est vide</p>`;
    selectCart.innerHTML = emptyCart;
} else {
for (var produit in itemsInLocalStorage){
                    // Insert Article
    var itemArticle = document.createElement("article");
    document.querySelector("#cart__items").appendChild(itemArticle);
    itemArticle.className = "cart__item";
    itemArticle.setAttribute('data-id', itemsInLocalStorage[produit].idProduit);
                      // Insert " div Img"
    var cartImg = document.createElement("div");
    itemArticle.appendChild(cartImg);
    cartImg.className = "cart__item__img";
    var itemImg = document.createElement("img");
    cartImg.appendChild(itemImg);
    itemImg.src = itemsInLocalStorage[produit].imgProduit;
    itemImg.alt = itemsInLocalStorage[produit].altImgProduit;
                      // Insert "div Content"
    var cartContent = document.createElement("div");
    itemArticle.appendChild(cartContent);
    cartContent.className = "cart__item__content";
                      // Insert "div Title Price"
    var titlePrice = document.createElement("div");
    cartContent.appendChild(titlePrice);
    titlePrice.className = "cart__item__content__titlePrice";
                      // Insert Item Name
    var itemName = document.createElement("h2");
    titlePrice.appendChild(itemName);
    itemName.innerHTML = itemsInLocalStorage[produit].nomProduit;
                      // Insert Price
     var itemPrice = document.createElement("p");
     titlePrice.appendChild(itemPrice);
     itemPrice.innerHTML = itemsInLocalStorage[produit].prixProduit + " �";
                      // Insert Color
    var itemColor = document.createElement("p");
    itemName.appendChild(itemColor);
    itemColor.innerHTML = itemsInLocalStorage[produit].couleurProduit;
    itemColor.style.fontSize = "20px";
                      // Insert "div Settings"
    var contentSet = document.createElement("div");
    cartContent.appendChild(contentSet);
    contentSet.className = "cart__item__content__settings";
                      // Insert Quantity
    var itemQuantity = document.createElement("div");
    contentSet.appendChild(itemQuantity );
    itemQuantity .className = "cart__item__content__settings__quantity";
    var quantityItem = document.createElement("p");
    itemQuantity .appendChild(quantityItem);
    quantityItem.innerHTML = "Qt : ";

    var productQuantity = document.createElement("input");
    itemQuantity .appendChild(productQuantity);
    productQuantity.value = itemsInLocalStorage[produit].quantiteProduit;
    productQuantity.className = "itemQuantity";
    productQuantity.setAttribute("type", "number");
    productQuantity.setAttribute("min", "1");
    productQuantity.setAttribute("max", "100");
    productQuantity.setAttribute("name", "itemQuantity");
                      // Insert Delete Button
    var itemDelete = document.createElement("div");
    contentSet.appendChild(itemDelete);
    itemDelete.className = "cart__item__content__settings__delete";
    var deleteButton = document.createElement("p");
    itemDelete.appendChild(deleteButton);
    deleteButton.className = "deleteItem";
    deleteButton.innerHTML = "Supprimer";
}
}}
getCart();

//----------------------MODIFY QUANTITY------------------------------
function modify() {
  var modifQuantity = document.querySelectorAll(".itemQuantity");

  for (let k = 0; k < modifQuantity.length; k++){
    modifQuantity[k].addEventListener("change" , (e) => {
          e.preventDefault();

          //Select to Modify Item by Id & Color
          var quantityModif = itemsInLocalStorage[k].quantiteProduit;
          var modifValue = modifQuantity[k].valueAsNumber;
          
          const result = itemsInLocalStorage.find((el) => el.modifValue !== quantityModif);
          result.quantiteProduit = modifValue;
          itemsInLocalStorage[k].quantiteProduit = result.quantiteProduit;

          localStorage.setItem("produit", JSON.stringify(itemsInLocalStorage));
          location.reload();   // refresh rapide
      })
  }
}
modify();

//----------------------DELETE AN ITEM------------------------------
function deleteItem() {
  var btnDelete = document.querySelectorAll(".deleteItem");

  for (var j = 0; j < btnDelete.length; j++){
    btnDelete[j].addEventListener("click" , (e) => {
          e.preventDefault();

          // Select to Delete Item by Id & Color
          var idDelete = itemsInLocalStorage[j].idProduit;
          var colorDelete = itemsInLocalStorage[j].couleurProduit;

          itemsInLocalStorage = itemsInLocalStorage.filter( el => el.idProduit !== idDelete || el.couleurProduit !== colorDelete );
          localStorage.setItem("produit", JSON.stringify(itemsInLocalStorage));
          //Pop-up for Deleted Item
          alert("Ce produit a bien été supprimé du panier");
          location.reload();
      })
  }
}
deleteItem();

//-----CLIENT INFOS TO LOCAL STORAGE FOR CONFIRMATION-----------------------------
function Form(){
  const orderButton = document.getElementById("order");

  // Event Listening to Cart
  orderButton.addEventListener("click", (event)=>{
                // Retrieve Client Details Form 
      var name = document.getElementById('firstName');
      var familyName = document.getElementById('lastName');
      var adress = document.getElementById('address');
      var cityPlace = document.getElementById('city');
      var mail = document.getElementById('email');

      // Create an Array to Local Storage
      var idProducts = [];
      for (var i = 0; i < itemsInLocalStorage.length;i++) {
          idProducts.push(itemsInLocalStorage[i].idProduit);
      }
      console.log(idProducts);

      const order = {
          contact : {
              firstName: name.value,
              lastName: familyName.value,
              address: adress.value,
              city: cityPlace.value,
              email: mail.value,
          },
          products: idProducts,
      } 

      const options = {
          method: 'POST',
          body: JSON.stringify(order),// Transform JS Object "order" in JSON
          headers: {
              'Accept': 'application/json', 
              "Content-Type": "application/json" 
          },
      };

      fetch("http://localhost:3000/api/products/order", options)
      .then((res) => res.json())
      .then((data) => {
          console.log(data);
          localStorage.clear();
          localStorage.setItem("orderId", data.orderId);
          document.location.href = "confirmation.html";
      })
      .catch((err) => {
          alert (err);
      });
      })
}
Form();





