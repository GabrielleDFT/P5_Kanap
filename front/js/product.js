// // RETRIEVING ID 
const product_url = window.location.search;
const urlSearchParams = new URLSearchParams(product_url);
const _id = urlSearchParams.get("id");

// PRODUCTS DETAILS FROM API
// Data from API to DOM 
fetch( `http://localhost:3000/api/products/${_id}`)
    .then((res) => {
        return res.json() })

    .then((product) => {
        document.querySelector("title").innerHTML = `${product.name}`;
        document.getElementById('title').innerHTML = `${product.name}`;
        document.getElementById('description').innerHTML = `${product.description}`;
        document.getElementById('price').innerHTML =`${product.price}`;
        document.getElementsByClassName('item__img')[0]
        .insertAdjacentHTML ("afterbegin",`<img src=${product.imageUrl} alt=${product.altTxt}>`);
        const itemColors = document.getElementById('colors')
        product.colors.forEach((color) => {
            var option = document.createElement('option');
            option.value = color;
            option.innerHTML = `${color}`;
            itemColors.appendChild(option);
        });
    })
    // In case of error
    .catch((err) => {
        console.err('Error', error)
});

const color = document.getElementById("colors");
const quantity = document.getElementById("quantity");
var items = [];

const addToCart = () => {
    if(window.confirm(` L'article ${title.innerHTML} a bien été ajouté au panier.
    OK pour consultez le panier, ANNULER pour continuer`)){
        window.location.href = "cart.html";// link to cart
    }
};

const cartButton = document.getElementById("addToCart")
    .addEventListener("click", (buttonEvent) =>{ 
        buttonEvent.preventDefault();
         // if emty forms
        if(parseInt(quantity.value) === 0 && color.value ===""){
            return alert("Veuillez compléter tous les champs");
        }
        // If no color choice
        else if(color.value ===""){
            return alert("Selectionnez une couleur");
        }
        // If no quantity
        else if (parseInt(quantity.value) < 1 || parseInt(quantity.value) > 100){
            return alert("Renseignez une quantité");
       };

        const cartView = localStorage.getItem("infoCart");
       // Create an Object : Array with id + product quantity + color
        const object = {
            productId : _id,
            productColor : color.value,
            productQuantity : parseInt(quantity.value),
        };
        // If no items in LocalStorage
        if(cartView == null){
            items.push(object);
            localStorage.setItem ("infoCart",JSON.stringify(items));
            addToCart();     
        }
        // If products in LocalStorage
        else {
            var cart = JSON.parse(localStorage.getItem("infoCart"));
            const check = cart.find(p => p.productColor === object.productColor && p.productId === object.productId);
            
            if(check != undefined){ 
                check.productQuantity += object.productQuantity;

                var localQuantity = object.productQuantity;
                var addQuantity = check.productQuantity;
                var maxQuantity = parseInt(addQuantity) + parseInt(localQuantity);
                if(maxQuantity > 100){
                    return alert ("")
                };
            }
            else{
                cart.push(object);
            };    

            localStorage.setItem ("infoCart",JSON.stringify(cart));
            addToCart();
          
        };
    });

