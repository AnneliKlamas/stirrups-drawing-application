/** If not logged in then redirect to the login page */
if (sessionStorage.getItem('userSessionKey')==null){
    location.href = "login.html"
}

/** Creates table with users information if the user is admin, if not show alert */
$(document).ready(function (){
    const Url='http://localhost:8080/users/all'
    $.ajax({
        url: Url,
        type:"GET",
        headers: {
            authorization:
                sessionStorage.getItem("userSessionKey"),
        },
        success: function(result){
            let table = document.getElementById("userTable")
            for (let i = 0; i < result.length; i++) {
                let user = result[i]

                let row = document.createElement("tr")

                let number = document.createElement("td")
                number.textContent=(i+1).toString()
                row.appendChild(number)

                let id = document.createElement("td")
                id.textContent=user["id"].toString()
                id.headers="id"
                row.appendChild(id)

                let username =document.createElement("td")
                username.textContent=user["username"].toString()
                username.headers = "username"
                row.appendChild(username)

                let fullName =document.createElement("td")
                fullName.textContent=user["fullName"].toString()
                fullName.headers = "fullName"
                row.appendChild(fullName)

                let rolesArray = []
                for (let j = 0; j < user.roles.length; j++){
                    rolesArray.push((user.roles)[j].name)
                }
                let roles = document.createElement("td")
                roles.textContent= rolesArray.toString()
                roles.headers="weight"
                row.appendChild(roles)

                row.onclick = function () {showUserModal(row)}
                table.appendChild(row)
            }
            console.log(result)
        },
        error:function(error){
            location.href = "settings.html"
            alert("You are not admin")
            console.log(error)
        }
    })
})

/**
 * Function that validates data and adds users
 */
function addUser(){
    const username = document.getElementById("addUsername").value
    const name = document.getElementById("addFullName").value
    let roles = []
    const moderator = document.getElementById("mod")
    const admin = document.getElementById("admin")
    const password = document.getElementById("password").value
    let everythingValid = true
    if(password!==document.getElementById("passwordConfirm").value){
        alert("Password and confirmed password don't match")
        everythingValid = false
    }
    if(admin.checked){
        roles.push("admin")
    }
    if(moderator.checked){
        roles.push("mod")
    }
    if (roles.length===0){
        alert("Please choose role(s)")
    }
    if(everythingValid){
        signup(username, name, password, roles)
    }
}

/**
 * Function that opens modal with the options add or delete user
 * @param row which was clicked
 */
function showUserModal(row){

    $("#usersModal").modal();

    let addBtn = document.getElementById("addUserOption")
    addBtn.onclick = function (){$("#userAddModal").modal();}

    let deleteBtn = document.getElementById("deleteUserOption")
    deleteBtn.onclick = function (){userDelete(row)}

}

/**
 * Function that opens and creates modals content with the user information that is to be deleted
 * @param row which was clicked
 */
function userDelete(row){
    $("#userDeleteModal").modal();
    let table = document.getElementById("deleteUserTable")
    deleteTable(table)
    let username = ""

    for(let i=1; i<row.childElementCount; i++){
        let attribute = row.childNodes[i]
        let tableRow = document.createElement("tr")
        let name = document.createElement("td")
        let oldAttribute = document.createElement("td")

        name.textContent=attribute.headers
        name.className="font-weight-bold"
        tableRow.appendChild(name)

        oldAttribute.textContent=attribute.textContent
        tableRow.appendChild(oldAttribute)

        table.appendChild(tableRow)

        if(attribute.headers==="username"){
            username=attribute.textContent
        }
    }
    let deleteUserButton = document.getElementById("deleteUserButton")
    deleteUserButton.onclick = function (){deleteUser(username)}
}

/**
 * Function that deletes table
 * @param table
 */
function deleteTable(table){
    while (table.firstChild) {
        table.firstChild.remove()
    }
}