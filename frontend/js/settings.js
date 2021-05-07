//If user is not logged in he is redirected to the login page
if (sessionStorage.getItem('userSessionKey')==null){
    location.href = "login.html"
}

$(document).ready(function () {
    document.getElementById("showPriceInput").style.display = "none"
});

/**
 * Function that logs the user out
 */
function logout(){
    sessionStorage.removeItem('userSessionKey')
    location.href = "login.html"
}

/**
 * Function that shows correct input field based on the price attribute that should be changed
 */
function showCorrectInputfield(){
    if(document.getElementById("priceAttributes").value==="price"){
        document.getElementById("priceInput").style.display = "block"
        document.getElementById("showPriceInput").style.display = "none"
    }
    else {
        document.getElementById("priceInput").style.display = "none"
        document.getElementById("showPriceInput").style.display = "block"
    }
}

/**
 * Function that validates price input and updates price
 */
function validateAndUpdatePrice(){
    if(document.getElementById("priceAttributes").value==="price"){
        let newPrice = document.getElementById("priceInput").value
        if(stringToNumber(newPrice)>=0){
            updatePrice(document.getElementById("priceID").textContent, "price", newPrice)
        }
        else{
            alert("Price can not be negative value")
        }
    }
    else{
        let newShowPrice = document.getElementById("showPriceTrue").checked
        let oldShowPrice = document.getElementById("priceShowPrice").textContent

        if(newShowPrice){
            if(newShowPrice.toString()!==oldShowPrice){
                updatePrice(document.getElementById("priceID").textContent, "showPrice",
                    true)
            }
        }
        else{
            if(newShowPrice.toString()!==oldShowPrice){
                updatePrice(document.getElementById("priceID").textContent, "showPrice",
                    false)}
        }
    }
}