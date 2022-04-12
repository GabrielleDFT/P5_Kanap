
// ---------------------A CALL TO API (to Display Items)----------------------------------
displayProducts();
async function getProducts() {// GET method to retrieve Data from API
    return await fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json(); /* Return objects from server + Convert to Json */
    }
  })
  .then(function(value) {//return result 
    console.log(value);
    return value;
  })
  .catch(function(err) {// Case of error
    });
}

//-------------------DATA INSERT TO THE DOM : RETRIEVE + DISPLAY ITEMS-------------------------
async function displayProducts() {
  const parser = new DOMParser();
  const products = await getProducts();
 console.log("displayProducts", products);
 let productsSection = document.getElementById("items"); 
   
 for (let i = 0; i < products.length; i++) {  // Loop to Iterate Products
  
  var productsItems = /* HTML insert */
  `<a href="./product.html?id=${products[i]._id}"> 
 <article>
   <img src="${products[i].imageUrl}" alt="${products[i].altTxt}">
   <h3 class="productName">${products[i].name}</h3>
   <p class="productDescription">${products[i].description}</p>
 </article>
</a>`;
const displayShop = parser.parseFromString(productsItems, "text/html");
productsSection.appendChild(displayShop.body.firstChild);
}
}


 

  


