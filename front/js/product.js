
var str = window.location.href;
var url = new URL(str);
var idProduct = url.searchParams.get("id");
console.log(idProduct);
let article = "";

const colorChoice = document. querySelector("#colors");
const quantityChoice = document.querySelector("#quantity");


// ---------------------------------CALL TO API TO RETRIEVE ITEMS--------------------------------------------
getArticles();
function getArticles() {
    fetch("http://localhost:3000/api/products/" + idProduct)
        .then((res) => {
            return res.json();
        })
        .then(async function (resultatAPI) {/* Retrieving Data from API to DOM */
            article = await resultatAPI;
            console.table(article);
            if (article) {
                getPost(article);
            }
        })
        .catch((error) => {
        console.log("Error API");
        })
}

// ---------------------------------DISPLAY ITEM (choose from Home) ON PRODUCT PAGE---------------------------------------
function getPost(article){
    // Display Item Image
    var itemImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(itemImg);
    itemImg.src = article.imageUrl;
    itemImg.alt = article.altTxt;

    // Display Item Title/Name 
    var itemTitle = document.getElementById('title');
    itemTitle.innerHTML = article.name;

    // Display Item Price
    var itemPrice = document.getElementById('price');
    itemPrice.innerHTML = article.price;

    // Display Item Description
    var itemDescription = document.getElementById('description');
    itemDescription.innerHTML = article.description;

    // Display Color Choice
    for (var colors of article.colors){
        console.table(colors);
        var colorSelect = document.createElement("option");
        document.querySelector("#colors").appendChild(colorSelect);
        colorSelect.value = colors;
        colorSelect.innerHTML = colors;
    }
    addToCart(article);
}
// ---------------------------------ADD TO CART FUNCTION-------------------------------------------
function addToCart(article) {
    const addToCartButn = document.querySelector("#addToCart");

    // ------------LISTENING TO THE EVENT CART---------------------
    addToCartButn.addEventListener("click", (event) => {
        
        if (quantityChoice.value > 0 && quantityChoice.value <=100 && quantityChoice.value != 0) {
            var colorPick = colorChoice.value;  /* Retrieve Color choice */
            var quantityPick = quantityChoice.value; /* Retrieve Quantity choice */
            var itemOptions = { /* Create an Object & Retrieve Item Options */
                itemId: idProduct,
                itemColor: colorPick,
                itemQuantity: Number(quantityPick),
                itemName: article.name,
                priceItem: article.price,
                itemDetails: article.description,
                itemPicture: article.imageUrl,
                itemPictureAlt: article.altTxt
            };
            var ItemsLocalStorage = JSON.parse(localStorage.getItem("produit"));
            const popUp = () => { /* Confirmation Pop-up add to Cart */
                if (window.confirm(`Votre commande de ${quantityPick} ${article.name} de couleur ${colorPick} au prix de ${price.innerHTML} € a bien été ajouté au panier.
                    OK pour consulter le panier, ANNULER pour continuer`)) {
                    window.location.href ="cart.html";
                }
            }
                if (ItemsLocalStorage) { /* If Cart content - Import in LocalStorage */
                    const result = ItemsLocalStorage.find((el) => el.itemId === idProduct && el.itemColor === colorPick);
                    
                    if (result) { /* If Item already in Cart */
                    var newQuantity = parseInt(itemOptions.itemQuantity) + parseInt(result.itemQuantity);
                    result.itemQuantity = newQuantity;
                    localStorage.setItem("produit", JSON.stringify(ItemsLocalStorage));
                    console.table(ItemsLocalStorage);
                    popUp();
                    }   
                        else {  
                            ItemsLocalStorage.push(itemOptions);
                            localStorage.setItem("produit", JSON.stringify(ItemsLocalStorage));
                            console.table(ItemsLocalStorage);
                            popUp();
                        }
                }       
                        else { /* If empty Cart */
                            ItemsLocalStorage =[];
                            ItemsLocalStorage.push(itemOptions);
                            localStorage.setItem("produit", JSON.stringify(ItemsLocalStorage));
                            console.table(ItemsLocalStorage);
                            popUp();
                        }
        }       
    });
}
