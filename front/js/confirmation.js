
// ---------------------------------CART CONFIRMATION NUMBER-------------------------------------------
function confirmation() {
    const ConfirmNumber = document.getElementById("orderId");
    ConfirmNumber.innerText = localStorage.getItem("orderId");
    console.log("Id de la commande");
    console.log(localStorage.getItem("orderId"));
    localStorage.clear();
  }
  confirmation();
  
