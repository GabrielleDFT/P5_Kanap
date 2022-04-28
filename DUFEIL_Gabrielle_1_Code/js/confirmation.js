
//---------------------------------CART CONFIRMATION NUMBER-------------------------------------------
  //--Fonction to Retrieve Order Id--
function numberConfirm() {
      if (localStorage.getItem("orderId") == null) {
          document.location.href = `index.html`; }
                  //--Display Order Number--
      const NumCommande = document.getElementById("orderId");
      NumCommande.innerText =localStorage.getItem("orderId");
      localStorage.clear();
}
numberConfirm();   


