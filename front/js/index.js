
// ---------------------A CALL TO API (to Display Items)----------------------------------
//displayProducts();
async function getProducts() {/* GET method to retrieve Data from API */
    return await fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json(); /* Return objects from server + Convert to Json */
    }
  })
  .then(function(value) {/* Return result */
    console.log(value);
    return value;
  })
  .catch(function(err) {/* Case of error */
    });
}
//-------------------DATA INSERT TO THE DOM : RETRIEVE + DISPLAY ITEMS-------------------------
async function displayProducts() {
    const parser = new DOMParser();
    const items = await getProducts();
    console.log("displayProducts", items);
    var products = document.getElementById("items"); 
    
    for (let i = 0; i < items.length; i++) { /* Loop to Iterate Products */

        var ItemsDetails =   /* HTML insert */
        `<a href="./product.html?id=${items[i]._id}"> 
        <article>
        <img src="${items[i].imageUrl}" alt="${items[i].altTxt}">
        <h3 class="productName">${items[i].name}</h3>
        <p class="productDescription">${items[i].description}</p>
        </article>
        </a>`;
        const displayShop = parser.parseFromString(ItemsDetails, "text/html");
        products.appendChild(displayShop.body.firstChild);
    }
}

 

  





 

  


