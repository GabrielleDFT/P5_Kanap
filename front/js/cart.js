
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









