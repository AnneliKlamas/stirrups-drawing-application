/**
 * Function that gets wire from the backend
 * @returns wire
 */
function getWireFromBackend(){
    let diameter = document.getElementById("diameters").value
    let wire = ""
    const Url='http://localhost:8080/wires/id?id='+diameter

    $.ajax({
        url: Url,
        async: false,
        type:"GET",
        success: function(result){
            wire = result
        },
        error:function(error){
            console.log(error)
            wire = null
        }
    })
    return wire
}

/**
 * Function that gets price from the backend
 * @returns {*} price
 */
function getPriceFromBackend() {
    let price = ""
    const Url='http://localhost:8080/price'

    $.ajax({
        url: Url,
        async: false,
        type:"GET",
        success: function(result){
            price = result
        },
        error:function(error){
            console.log(error)
            price = null
        }
    })

    return price["_embedded"]["priceEntityDTOList"][0]["price"]
}

/**
 * Function that adds price information to the price table
 */
function getPriceInfo(){
    const Url='http://localhost:8080/price'

    $.ajax({
        url: Url,
        async: false,
        type:"GET",
        success: function(result){
            let price = result["_embedded"]["priceEntityDTOList"][0]
            document.getElementById("priceID").textContent = price["id"]
            document.getElementById("pricePrice").textContent = price["price"]
            document.getElementById("priceShowPrice").textContent = price["showPrice"]
        },
        error:function(error){
            console.log(error)
        }
    })
}

/**
 * Function that sends email to the company and to the customer
 */
function sendEmail(){
    let email = document.getElementById("senderEmail").value
    let description = getDescription()
    let message = document.getElementById("messageInput").value
    let companyName
    if(document.getElementById("company").checked){
        companyName = "Company"
    }
    else{
        companyName = ""
    }
    let personName = document.getElementById("personName").value
    let personPhone = document.getElementById("personPhone").value

    const Url='http://localhost:8080/sendEmailToCompany?senderEmail='+email+'&description='+description+
        '&message='+message+'&companyName='+companyName+'&personName='+personName+'&phone='+personPhone

    $.ajax({
        url: Url,
        type:"GET",
        success: function(result){
            console.log(result)
        },
        error:function(error){
            console.log(error)
        }
    })

    let UrlClient = 'http://localhost:8080/sendEmailToClient?senderEmail='+email+'&description='+description+
        '&message='+message
    $.ajax({
        url: UrlClient,
        type:"GET",
        success: function(result){
            console.log(result)
        },
        error:function(error){
            console.log(error)
        }
    })

    $('#inquiryFormModal').modal('hide')
}

/**
 * Function that deletes wire from the backend
 * @param id of the wire
 */
function deleteWire(id){
    const Url='http://localhost:8080/wires/delete/' + id

    $.ajax({
        url: Url,
        async: false,
        type:"DELETE",
        headers: {
            authorization:
                sessionStorage.getItem("userSessionKey"),
        },
        success: function(result){
            location.reload()
        },
        error:function(error){
            console.log(error)
            alert("Something went wrong")
        }
    })
}

/**
 * Function that updates wire
 * @param id of the wire
 * @param attribute that needs to be changed
 * @param newValue new of the attribute
 */
function updateWire(id, attribute, newValue){
    const Url='http://localhost:8080/wires/update/'+id+'?attribute='+attribute+'&newValue='+newValue
    $.ajax({
        url: Url,
        async: false,
        type:"PATCH",
        headers: {
            authorization:
                sessionStorage.getItem("userSessionKey"),
        },
        success: function(result){
            location.reload();
        },
        error:function(error){
            alert("Something went wrong")
            console.log(error)
        }
    })
}

/**
 * Function that adds wire to the backend
 * @param diameter of the new wire
 * @param weight of the new wire
 * @param enStandardRoll diameter of the new wires English standard roll
 * @param finStandardRoll diameter of the new wires Finnish standard roll
 * @param enLengthPerDegree how many millimetres the length of the line will be longer when using English standard
 * @param finLengthPerDegree how many millimetres the length of the line will be longer when using Finnish standard
 */
function addWire(diameter, weight, enStandardRoll, finStandardRoll, enLengthPerDegree, finLengthPerDegree){
    const Url='http://localhost:8080/wires/add'

    $.ajax({
        url: Url,
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        headers: {
            authorization:
                sessionStorage.getItem("userSessionKey"),
        },
        data: JSON.stringify( {
            "id": 0,
            "diameter": diameter,
            "weight": weight,
            "enStandardRoll": enStandardRoll,
            "finStandardRoll": finStandardRoll,
            "enLengthPerDegree": enLengthPerDegree,
            "finLengthPerDegree": finLengthPerDegree
        }),
        processData: false,
        success: function( data, textStatus, jQxhr ){
            location.reload()
        },
        error: function( jqXhr, textStatus, errorThrown ){
            alert("Something went wrong")
            console.log( errorThrown );
        }
    })
}

/**
 * Function that sends request to login the user
 * @param username
 * @param password
 */
function login(username, password){
    const Url='http://localhost:8080/users/signin'

    $.ajax({
        url: Url,
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify( {
            "username": username,
            "password": password
        }),
        processData: false,
        success: function( data, textStatus, jQxhr ){
            goToLoggedinPage()
            sessionStorage.setItem("userSessionKey", data.tokenType + " " + data.accessToken)

        },
        error: function( jqXhr, textStatus, errorThrown ){
            alert("Wrong username or password")
        }
    })
}

/**
 * Function that creates a new user
 * @param username
 * @param fullName full name of the user
 * @param password
 * @param roles is user moderator, admin or both
 */
function signup(username, fullName, password, roles){
    const Url='http://localhost:8080/users/signup'

    $.ajax({
        url: Url,
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify( {
            "username": username,
            "fullName": fullName,
            "password": password,
            "role": roles
        }),
        headers: {
            authorization:
                sessionStorage.getItem("userSessionKey"),
        },
        processData: false,
        success: function( data, textStatus, jQxhr ){
            location.reload()
        },
        error: function( jqXhr, textStatus, errorThrown ){
            alert("Something went wrong. Make sure that You are an admin.")
        }
    })
}

/**
 * Function that deletes users by username
 * @param username
 */
function deleteUser(username){
    const Url='http://localhost:8080/users/delete/'+username

    $.ajax({
        url: Url,
        dataType: 'json',
        type: 'DELETE',
        contentType: 'application/json',
        headers: {
            authorization:
                sessionStorage.getItem("userSessionKey"),
        },
        processData: false,
        success: function( data, textStatus, jQxhr ){
            location.reload()
        },
        error: function( jqXhr, textStatus, errorThrown ){
            location.reload()
        }
    })
}

/**
 * Function that updates price
 * @param id of the price
 * @param attribute attribute that needs to be changed
 * @param newValue new value of the attribute
 */
function updatePrice(id, attribute, newValue){
    const Url='http://localhost:8080/price/update/'+id+'?attribute='+attribute+'&newValue='+newValue
    $.ajax({
        url: Url,
        async: false,
        type:"PATCH",
        headers: {
            authorization:
                sessionStorage.getItem("userSessionKey"),
        },
        success: function(result){
            location.reload();
        },
        error:function(error){
            alert("Something went wrong")
            console.log(error)
        }
    })
}