

var str = window.location.href;
var url = new URL(str);
var idProduct = url.searchParams.get("id");
console.log(idProduct);
let article = "";

const colorPicked = document. querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");

// ---------------------------------CALL TO API TO RETRIEVE ITEMS--------------------------------------------
getArticle();
function getArticle() {
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {
        return res.json();
    })
    .then(async function (resultatAPI) { // Retrieving Data from API to DOM
        article = await resultatAPI;
        console.table(article);
        if (article){
            getPost(article);
        }
    })
    .catch((error) => {
        console.log("Error API");
    })
}
 
// ---------------------------------DISPLAY ITEM (choose from Home) ON PRODUCT PAGE---------------------------------------
function getPost(article){
    // Display Item img
    var productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;

    // Display Item Title/Name 
    var productName = document.getElementById('title');
    productName.innerHTML = article.name;

    // Display Item Price
    var productPrice = document.getElementById('price');
    productPrice.innerHTML = article.price;

    // Display Item Description
    var productDescription = document.getElementById('description');
    productDescription.innerHTML = article.description;

    // Display Color Choice
    for (var colors of article.colors){
        console.table(colors);
        var productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }
    addToCart(article);
}

// ---------------------------------ADD TO CART FUNCTION-------------------------------------------
function addToCart(article) {
    const addToCartButn = document.querySelector("#addToCart");

    // ------------LISTENING TO THE EVENT CART---------------------
    addToCartButn.addEventListener("click", (event)=>{
             /* 2 color conditions & quantity between 1 and 100 */
        if (quantityPicked.value > 0 && quantityPicked.value <=100 && quantityPicked.value != 0){

    var colorChoice = colorPicked.value;/* Retrieve Color choice */
    var choixQuantite = quantityPicked.value;/* Retrieve Quantity choice */

    // Create an Object & Retrieve Item Options 
    var optionsProduit = {
        idProduit: idProduct,
        couleurProduit: colorChoice,
        quantiteProduit: Number(choixQuantite),
        nomProduit: article.name,
        prixProduit: article.price,
        descriptionProduit: article.description,
        imgProduit: article.imageUrl,
        altImgProduit: article.altTxt
    };

// ---------------------------------INIT LOCAL STORAGE-------------------------------------------    
var produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

// ---------------------------------CONFIRMATION-------------------------------------------
    const popupConfirmation =() =>{ // Confirmation Pop-up add to Cart 
        if(window.confirm(`Votre commande de ${choixQuantite} ${article.name} de couleur ${colorChoice} au prix de ${price.innerHTML} € a bien été ajouté au panier.
        OK pour consultez le panier, ANNULER pour continuer`)){
            window.location.href ="cart.html";
        }
    }

// ---------------------------------IMPORT IN LOCAL STORAGE -------------------------------------------    
    //If Cart content
    if (produitLocalStorage) {
    const resultFind = produitLocalStorage.find(
        (el) => el.idProduit === idProduct && el.couleurProduit === colorChoice);
        //If Item already in Cart
        if (resultFind) {
            var newQuantite =
            parseInt(optionsProduit.quantiteProduit) + parseInt(resultFind.quantiteProduit);
            resultFind.quantiteProduit = newQuantite;
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            console.table(produitLocalStorage);
            popupConfirmation();
        // If ordered Item not in Cart ?*/
        } else {
            produitLocalStorage.push(optionsProduit);
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            console.table(produitLocalStorage);
            popupConfirmation();
        }
    //If empty cart
    } else {
        produitLocalStorage =[];
        produitLocalStorage.push(optionsProduit);
        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        console.table(produitLocalStorage);
        popupConfirmation();
    }}
    });
}
