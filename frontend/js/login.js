/**
 * Checks if the user is logged in
 */
$(document).ready(function (){
    if (sessionStorage.getItem('userSessionKey')!==null){
        location.href = "settings.html"
    }
})

/**
 * Function that logs in the user
 */
function getLoginInfo(){
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value
    login(username, password)
}

/**
 * Function that sends logged in user to the settings page
 */
function goToLoggedinPage(){
    location.href = "settings.html"
}

