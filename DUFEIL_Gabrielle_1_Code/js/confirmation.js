
//---------------------------------CART CONFIRMATION NUMBER-------------------------------------------
        //--Retrieve Order Id--
const params = new URL(document.location).searchParams;
const orderId = params.get("orderId");

      //--Display Order Number--
document.getElementById("orderId").textContent = orderId;


