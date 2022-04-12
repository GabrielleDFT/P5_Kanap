

// RETRIEVING CART FROM LOCAL STORAGE
var itemsInLocalStorage = JSON.parse(localStorage.getItem("infoCart"));  
console.log("");
console.table(itemsInLocalStorage);

//----------------------------------CREATE CONTENT FOR WEBPAGE--------------------------------------
async function creationPanier() {
  fetch("http://localhost:3000/api/products")
    .then(function (reponseAPI) {
      return reponseAPI.json();
    })

    .then(function (ArticleAPI) {
      console.log("");
      console.table(ArticleAPI);
      var idArticlesAPI = ArticleAPI.map((el) => el._id);

      for (var articles of itemsInLocalStorage) {
        var id = articles["id"];
        var indexId = idArticlesAPI.indexOf(id);
        var prix = ArticleAPI[indexId].price;
        var couleur = articles["couleur"];
        var url = ArticleAPI[indexId].imageUrl;
        var txtAlt = ArticleAPI[indexId].altTxt;
        var nom = ArticleAPI[indexId].name;
        var quantite = articles["quantite"];
        // Create Item
        var baliseArticle = document.createElement("article");
        var bArticle = document
          .getElementById("cart__items")
          .appendChild(baliseArticle);
        bArticle.classList.add("cart__item");
        bArticle.setAttribute("data-id", id);
        bArticle.setAttribute("data-color", couleur);

        // Create Img Item
        var baliseDivImg = document.createElement("div");
        var bDivImg = bArticle.appendChild(baliseDivImg);
        bDivImg.classList.add("cart__item__img");
        var baliseImg = document.createElement("img");
        var bImg = bDivImg.appendChild(baliseImg);
        bImg.src = url;
        bImg.alt = txtAlt;

        // Create Details Item
        var baliseDivDetails = document.createElement("div");
        var bDivDetails = bArticle.appendChild(baliseDivDetails);
        bDivDetails.classList.add("cart__item__content");

        // Create Description Item
        var baliseDivDetailsDescription = document.createElement("div");
        var bDivDetailsDescription = bDivImg.nextElementSibling.appendChild(
          baliseDivDetailsDescription
        );
        bDivDetailsDescription.classList.add(
          "cart__item__content__description"
        );
        var baliseDivDetailsDescriptionH2 = document.createElement("h2");
        var baliseDivDetailsDescriptionP1 = document.createElement("p");
        var baliseDivDetailsDescriptionP2 = document.createElement("p");
        bDivDetailsDescription.appendChild(
          baliseDivDetailsDescriptionH2
        ).innerText = nom;
        bDivDetailsDescription.appendChild(
          baliseDivDetailsDescriptionP1
        ).innerText = couleur;
        bDivDetailsDescription.appendChild(
          baliseDivDetailsDescriptionP2
        ).innerText = prix + " €";

        // Modify Details
        var baliseDivModifDetails = document.createElement("div");
        var bDivModifdetails = bDivDetails.appendChild(baliseDivModifDetails);
        bDivModifdetails.classList.add("cart__item__content__settings");

        // Modify Quantity
        var baliseDivModifDetailsQuantite = document.createElement("div");
        var bDivModifDetailsQuantite = bDivModifdetails.appendChild(
          baliseDivModifDetailsQuantite
        );
        bDivModifDetailsQuantite.classList.add(
          "cart__item__content__settings__quantity"
        );
        var balisePModifDetailsQuantite = document.createElement("div");
        var baliseInputModifDetailsQuantite = document.createElement("input");
        bDivModifDetailsQuantite.appendChild(
          balisePModifDetailsQuantite
        ).innerText = "Quantité : ";
        var bInputModifDetailsQuantite = bDivModifDetailsQuantite.appendChild(
          baliseInputModifDetailsQuantite
        );
        bInputModifDetailsQuantite.setAttribute("input", "number");
        bInputModifDetailsQuantite.setAttribute("name", "itemQuantity");
        bInputModifDetailsQuantite.setAttribute("min", 1);
        bInputModifDetailsQuantite.setAttribute("max", 100);
        bInputModifDetailsQuantite.setAttribute("value", quantite);
        bInputModifDetailsQuantite.classList.add("itemQuantity");

        // Delete Item
        var baliseDivSupprimer = document.createElement("div");
        var bDivSupprimer = bDivModifdetails.appendChild(baliseDivSupprimer);
        bDivSupprimer.classList.add("cart__item__content__settings__delete");
        var balisePSupprimer = document.createElement("p");
        var bPSupprimer = bDivSupprimer.appendChild(balisePSupprimer);
        bPSupprimer.classList.add("deleteItem");
        bPSupprimer.innerText = "supprimer";
      }
      articleSuppression();
      articleModifQuantite();
      calculNombreArticle();
      quantiteTotaleAffichage();
      prixTotal();
    })
    .catch(function (error) {
      console.log("Erreur lors de la communication avec l'API");
      console.log(error);
    });
}
creationPanier();

//---------------------------TOTAL------------------------------------
function getTotals(){
  // Total Quantity
  var productQuantity = document.getElementsByClassName('itemQuantity');
  var myLength = productQuantity.length,
  totalQuantity = 0;

  for (var i = 0; i < myLength; ++i) {
    totalQuantity += productQuantity[i].valueAsNumber;
  }

  var productTotalQuantity = document.getElementById('totalQuantity');
  productTotalQuantity.innerHTML = totalQuantity;
  console.log(totalQuantity);

  // Total Price
  totalPrice = 0;

  for (var i = 0; i < myLength; ++i) {
      totalPrice += (productQuantity[i].valueAsNumber * itemsInLocalStorage[i].priceProduct);
  }

  var productTotalPrice = document.getElementById('totalPrice');
  productTotalPrice.innerHTML = totalPrice;
  console.log(totalPrice);
}
getTotals();


//--------------------------------------------EVENTS----------------------------------------------
// Create Variables REGEX
//var nameRegex = /^[a-zA-Z\-çñàéèêëïîôüù ]{3}$/;
var nameRegex = new RegExp("^[a-zA-Z\-çñàéèêëïîôüù ]{3}$/");
var adressRegexExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
var emailRegexExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
//let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");

// Retrieving form id 
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

// 1-Listening to "FirstName" 
firstName.addEventListener("input", (event) => {
    event.preventDefault();
    if (nameRegex.test(firstName.value) == false || firstName.value == "") {
      document.getElementById("firstNameErrorMsg").innerHTML =
        "Prénom non valide";
      return false;
    } else {
      document.getElementById("firstNameErrorMsg").innerHTML = "";
      return true;
    }
  });
// 2-Listening to "LastName" 
lastName.addEventListener("input", (event) => {
    event.preventDefault();
    if (nameRegex.test(lastName.value) == false || lastName.value == "") {
      document.getElementById("lastNameErrorMsg").innerHTML = "Nom non valide";
      return false;
    } else {
      document.getElementById("lastNameErrorMsg").innerHTML = "";
      return true;
    }
  });
// 3-Listening to "Address" 
address.addEventListener("input", (event) => {
    event.preventDefault();
    if (nameRegex.test(address.value) == false || address.value == "") {
      document.getElementById("addressErrorMsg").innerHTML = "Adresse non valide";
      return false;
    } else {
      document.getElementById("addressErrorMsg").innerHTML = "";
      return true;
    }
  });
// 4-Listening to "City" 
city.addEventListener("input", (event) => {
    event.preventDefault();
    if (nameRegex.test(city.value) == false || city.value == "") {
      document.getElementById("cityErrorMsg").innerHTML = "Ville introuvable";
      return false;
    } else {
      document.getElementById("cityErrorMsg").innerHTML = "";
      return true;
    }
  });
// 5-Listening to "Email"
email.addEventListener("input", (event) => {
    event.preventDefault();
    if (nameRegex.test(email.value) == false || email.value == "") {
      document.getElementById("cityErrorMsg").innerHTML = "Email non valide";
      return false;
    } else {
      document.getElementById("cityErrorMsg").innerHTML = "";
      return true;
    }
  });

var order = document.getElementById("order");
order.addEventListener("click", (e) => {
  e.preventDefault();
  // OBJECT CREATION ORDER PRODUCT / DataOrder Array to have data Order user 
  let dataOrder = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };
// CHECKING VALID FORM
  if (
    firstName.value === "" ||
    lastName.value === "" ||
    address.value === "" ||
    city.value === "" ||
    email.value === ""
  ) {
    alert("Vous devez renseigner vos coordonnées pour passer commande");
  } else if (
    nameRegex.test(firstName.value) == false ||
    nameRegex.test(lastName.value) == false ||
    adressRegex.test(address.value) == false ||
    nameRegex.test(city.value) == false ||
    emailRegex.test(email.value) == false
  ) {
    alert("Merci de renseigner correctement vos coordonnées");
  } else {
    let products = [];
    itemsInLocalStorage.forEach((order) => {
      products.push(order.id);
    });

    let pageOrder = { dataOrder, products };

    // CALL TO API Order / POST METHOD 
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
       body: JSON.stringify(pageOrder),
      headers: {
        'Accept': 'application/json',
        "Content-type": "application/json",
      },
     
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        localStorage.clear();
        localStorage.setItem("orderId", data.orderId);
        window.location.href = "confirmation.html";
      })
      .catch((err) => {
        console.log("une erreur est survenue");
      });
  }
});









