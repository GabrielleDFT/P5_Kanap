
//---------------------------------CART CONFIRMATION NUMBER-------------------------------------------
function confirmation() {
    const confirmNumb = document.getElementById("orderId");
    confirmNumb.innerText = localStorage.getItem("orderId");
    console.log("Id de la commande =");
    console.log(localStorage.getItem("orderId"));
    localStorage.clear();
}
  confirmation();
