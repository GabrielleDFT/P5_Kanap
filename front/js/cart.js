
// OL/ RETRIEVING CART FROM LOCAL STORAGE
var itemsInLocalStorage = JSON.parse(localStorage.getItem("infoCart"));  
console.log("");
console.table(itemsInLocalStorage);

//---------------------------------- OL/creation du contenu de la page--------------------------------------
// creation du contenu de la page
async function creationPanier() {
  fetch("http://localhost:3000/api/products")
    .then(function (reponseAPI) {
      return reponseAPI.json();
    })

    .then(function (ArticleAPI) {
      console.log("");
      console.table(ArticleAPI);
      let idArticlesAPI = ArticleAPI.map((el) => el._id);

      for (let articles of itemsInLocalStorage) {
        let id = articles["id"];
        let indexId = idArticlesAPI.indexOf(id);
        let prix = ArticleAPI[indexId].price;
        let couleur = articles["couleur"];
        let url = ArticleAPI[indexId].imageUrl;
        let txtAlt = ArticleAPI[indexId].altTxt;
        let nom = ArticleAPI[indexId].name;
        let quantite = articles["quantite"];
        // creation balise article
        let baliseArticle = document.createElement("article");
        let bArticle = document
          .getElementById("cart__items")
          .appendChild(baliseArticle);
        bArticle.classList.add("cart__item");
        bArticle.setAttribute("data-id", id);
        bArticle.setAttribute("data-color", couleur);

        // creation de la balise div pour l'image de l'article
        let baliseDivImg = document.createElement("div");
        let bDivImg = bArticle.appendChild(baliseDivImg);
        bDivImg.classList.add("cart__item__img");


        // creation de la balise pour l'image de l'article
        let baliseImg = document.createElement("img");
        let bImg = bDivImg.appendChild(baliseImg);
        bImg.src = url;
        bImg.alt = txtAlt;

        // creation de la balise div pour les details de l'article
        let baliseDivDetails = document.createElement("div");
        let bDivDetails = bArticle.appendChild(baliseDivDetails);
        bDivDetails.classList.add("cart__item__content");

        // creation de la balise div pour la description de l'article
        let baliseDivDetailsDescription = document.createElement("div");
        let bDivDetailsDescription = bDivImg.nextElementSibling.appendChild(
          baliseDivDetailsDescription
        );
        bDivDetailsDescription.classList.add(
          "cart__item__content__description"
        );

        // creation des balises h2 p p pour la description de l'article
        let baliseDivDetailsDescriptionH2 = document.createElement("h2");
        let baliseDivDetailsDescriptionP1 = document.createElement("p");
        let baliseDivDetailsDescriptionP2 = document.createElement("p");
        bDivDetailsDescription.appendChild(
          baliseDivDetailsDescriptionH2
        ).innerText = nom;
        bDivDetailsDescription.appendChild(
          baliseDivDetailsDescriptionP1
        ).innerText = couleur;
        bDivDetailsDescription.appendChild(
          baliseDivDetailsDescriptionP2
        ).innerText = prix + " €";

        // creation div pour modifier les details
        let baliseDivModifDetails = document.createElement("div");
        let bDivModifdetails = bDivDetails.appendChild(baliseDivModifDetails);
        bDivModifdetails.classList.add("cart__item__content__settings");

        // creation div pour modifier les quantités
        let baliseDivModifDetailsQuantite = document.createElement("div");
        let bDivModifDetailsQuantite = bDivModifdetails.appendChild(
          baliseDivModifDetailsQuantite
        );
        bDivModifDetailsQuantite.classList.add(
          "cart__item__content__settings__quantity"
        );

        // creation de la balise p et input pour modifier les quantités
        let balisePModifDetailsQuantite = document.createElement("div");
        let baliseInputModifDetailsQuantite = document.createElement("input");
        bDivModifDetailsQuantite.appendChild(
          balisePModifDetailsQuantite
        ).innerText = "Quantité : ";
        let bInputModifDetailsQuantite = bDivModifDetailsQuantite.appendChild(
          baliseInputModifDetailsQuantite
        );
        bInputModifDetailsQuantite.setAttribute("input", "number");
        bInputModifDetailsQuantite.setAttribute("name", "itemQuantity");
        bInputModifDetailsQuantite.setAttribute("min", 1);
        bInputModifDetailsQuantite.setAttribute("max", 100);
        bInputModifDetailsQuantite.setAttribute("value", quantite);
        bInputModifDetailsQuantite.classList.add("itemQuantity");

        // creation de la div pour supprimer l'article
        let baliseDivSupprimer = document.createElement("div");
        let bDivSupprimer = bDivModifdetails.appendChild(baliseDivSupprimer);
        bDivSupprimer.classList.add("cart__item__content__settings__delete");

        // creation de la balise p pour supprimer l'article
        let balisePSupprimer = document.createElement("p");
        let bPSupprimer = bDivSupprimer.appendChild(balisePSupprimer);
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
//-----------------------------------------------------------------------------------------------------

//--------------------------1-TOTAL DES PRODUITS------------------------------------
function getTotals(){
  // Total quantity
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
//------------------------------------------------------------------------------------------------

//-------------------------------------- 2-DELETE PRODUCT----------------------------------------------
function deleteProduct() {  
    const eraseProduct = document.querySelectorAll('.deleteItem');  
    eraseProduct.forEach((eraseProduct) => {
    eraseProduct.addEventListener("click", (event) => {
        event.preventDefault();
         //Delete Id & Color
        const deleteId = event.target.getAttribute("data-id");
        const deleteColor = event.target.getAttribute("data-color");
        itemsInLocalStorage = itemsInLocalStorage.filter(
          (el) => !(el.id == deleteId && el.color == deleteColor)
        );
        console.log(itemsInLocalStorage);
        deleteConfirm = window.confirm("Etes vous sûr de vouloir supprimer cet article ?");
        if (deleteConfirm == true) {
          localStorage.setItem("cartItems", JSON.stringify(itemsInLocalStorage));

          //Alerte produit supprimé et refresh
          location.reload();
          alert("Article supprimé avec succès");
        }
      });
    });
}
deleteProduct();
//-----------------------------------------------------------------------------------


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

// 1-LISTENING TO "FirstName" EVENT
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
// 2-LISTENING TO "LastName" EVENT 
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
// 3-LISTENING TO "Address" EVENT 
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
// 4-LISTENING TO "City" EVENT
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
// 5-LISTENING TO "Email" EVENT
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

let order = document.getElementById("order");
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

    // CALL TO API Order/ POST METHOD (pr envoyer les tableaux)
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









