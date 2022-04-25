
//---------------------------------CART CONFIRMATION NUMBER-------------------------------------------
        //--Récupération Order Id--
const params = new URL(document.location).searchParams;
const orderId = params.get("orderId");

      //--Display du Order Number--
document.getElementById("orderId").textContent = orderId;




