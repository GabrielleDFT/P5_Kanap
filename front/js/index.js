
// CALL TO API
displayProducts();
async function getProducts() {// GET method to retrieve Data from API
    return await fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json(); //Retrieving objects from server + Convert to Json
    }
  })
  .then(function(value) {//return result + retrieve color
    console.log(value);
    return value;
  })
  .catch(function(err) {// in case of error
    });
}

// DATA INTEGRATION IN DOM : Retrieving + Display Products 
async function displayProducts() {
  const parser = new DOMParser();
  const products = await getProducts();
 console.log("displayProducts", products);
 let productsSection = document.getElementById("items"); 
   
 // Loop to Iterate Products
 for (let i = 0; i < products.length; i++) { 
  //intégration du HTML
  let productsItems = `
 <a href="./product.html?id=${products[i]._id}"> 
 <article>
   <img src="${products[i].imageUrl}" alt="${products[i].altTxt}">
   <h3 class="productName">${products[i].name}</h3>
   <p class="productDescription">${products[i].description}</p>
 </article>
</a>`;
const displayShop = parser.parseFromString(productsItems, "text/html");
productsSection.appendChild(displayShop.body.firstChild);
}
};


 

  


