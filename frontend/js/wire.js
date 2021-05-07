/**If not logged in then redirect to the login page */
if (sessionStorage.getItem('userSessionKey')==null){
    location.href = "login.html"
}

/** Creates table with wires information */
$(document).ready(function (){
    const Url='http://localhost:8080/wires'
    $.ajax({
        url: Url,
        type:"GET",
        success: function(result){
            let wire;
            let table = document.getElementById("wireTable")
            let resultList = result["_embedded"]["wireEntityDTOList"]
            for (let i = 0; i < resultList.length; i++) {
                wire = resultList[i]
                let row = document.createElement("tr")
                let number = document.createElement("td")
                number.textContent=(i+1).toString()
                row.appendChild(number)
                let id = document.createElement("td")
                id.textContent=wire["id"].toString()
                id.headers="id"
                row.appendChild(id)
                let diameter =document.createElement("td")
                diameter.textContent=wire["diameter"].toString()
                diameter.headers = "diameter"
                row.appendChild(diameter)
                let weight = document.createElement("td")
                weight.textContent=wire["weight"].toString()
                weight.headers="weight"
                row.appendChild(weight)
                let enStandardRoll = document.createElement("td")
                enStandardRoll.textContent=wire["enStandardRoll"].toString()
                enStandardRoll.headers="en_standard_roll"
                row.appendChild(enStandardRoll)
                let finStandardRoll = document.createElement("td")
                finStandardRoll.textContent=wire["finStandardRoll"].toString()
                finStandardRoll.headers="fin_standard_roll"
                row.appendChild(finStandardRoll)
                let enLengthPerDegree = document.createElement("td")
                enLengthPerDegree.textContent=wire["enLengthPerDegree"].toString()
                enLengthPerDegree.headers="en_length_per_degree"
                row.appendChild(enLengthPerDegree)
                let finLengthPerDegree = document.createElement("td")
                finLengthPerDegree.textContent=wire["finLengthPerDegree"].toString()
                finLengthPerDegree.headers="fin_length_per_degree"
                row.appendChild(finLengthPerDegree)
                row.onclick = function () {showModal(row)}
                table.appendChild(row)
            }
            console.log(result)
        },
        error:function(error){
            console.log(error)
        }
    })
})

/**
 * Function that opens modal with the options add, update or delete selected wire
 * @param row which was clicked
 */
function showModal(row){
    $("#wireModal").modal();
    let updateBtn = document.getElementById("updateWireOption")
    updateBtn.onclick = function (){wireUpdate(row)}

    let addBtn = document.getElementById("addWireOption")
    addBtn.onclick = function (){wireAdd()}

    let deleteBtn = document.getElementById("deleteWireOption")
    deleteBtn.onclick = function (){wireDelete(row)}
}

/**
 * Function that opens and creates modal content with wire information that will be updated
 * @param row that was clicked
 */
function wireUpdate(row){
    $("#wireUpdateModal").modal()

    let table = document.getElementById("updateTable")
    deleteTable(table)

    for(let i=1; i<row.childElementCount; i++){
        let attribute = row.childNodes[i]
        let tableRow = document.createElement("tr")
        let name = document.createElement("td")
        let oldAttribute = document.createElement("td")

        name.textContent=attribute.headers
        tableRow.appendChild(name)

        oldAttribute.textContent=attribute.textContent
        oldAttribute.id = "selectedWire" + attribute.headers
        tableRow.appendChild(oldAttribute)

        let input=document.createElement("input")
        input.type="number"
        input.value = attribute.textContent
        table.appendChild(tableRow)
    }
}

/**
 * Function that opens and creates modal content
 */
function wireAdd(){
    $("#wireAddModal").modal();
    document.getElementById("addWireButton").onclick = function () {
        let diameter = document.getElementById("addDiameter").value
        let weight = document.getElementById("addWeight").value
        let enStandardRoll = document.getElementById("addEnStandardRoll").value
        let finStandardRoll = document.getElementById("addFinStandardRoll").value
        let enLengthPerDegree = document.getElementById("addEnLengthPerDegree").value
        let finLengthPerDegree = document.getElementById("addFinLengthPerDegree").value
        addWire(diameter, weight, enStandardRoll, finStandardRoll, enLengthPerDegree, finLengthPerDegree)
    }
}

/**
 * Function that opens modal and deletes wire
 * @param row that was clicked
 */
function wireDelete(row){
    $("#wireDeleteModal").modal();
    let table = document.getElementById("deleteTable")
    deleteTable(table)
    let id = ""

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

        if(attribute.headers==="id"){
            id=attribute.textContent
        }
        console.log(row.childNodes[i])
    }
    let deleteWireButton = document.getElementById("deleteWireButton")
    deleteWireButton.onclick = function (){deleteWire(id)}
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

/**
 * Function that updates selected wire
 */
function update(){
    let newValue = document.getElementById("newValue").value
    let attribute = document.getElementById("attributes").value
    updateWire(document.getElementById("selectedWireid").textContent, attribute, newValue)
}

