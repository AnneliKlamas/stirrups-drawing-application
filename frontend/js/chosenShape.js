/**
 * Function that gets the information from shapes modal and displays correct layout for them
 */
function chosenShape(){

    let div = document.getElementById("calculate");
    div.style.display = "none";

    let value = document.querySelector('input[name="shapeRadio"]:checked').value;
    let informationField = document.getElementById("allParameters");

    deleteCanvas()

    while (informationField.firstChild) {
        informationField.firstChild.remove()
    }

    let angles
    let rotate

    if (value ==="custom") {

        //Creating table
        let table = document.createElement("table");
        table.className="table table-bordered scrollTable";
        table.id = "table"

        let tableHead = document.createElement("thead");
        tableHead.className = "fixedHeader"

        let tableHeadRow = document.createElement("tr");
        tableHeadRow.className = "alternateRow"
        tableHeadRow.appendChild(document.createElement("th"));

        let circleColumnName = document.createElement("th");
        circleColumnName.textContent = "circle"
        tableHeadRow.appendChild(circleColumnName)

        let mmColumnName = document.createElement("th");
        mmColumnName.textContent = "mm"
        tableHeadRow.appendChild(mmColumnName)

        let directionColumnName = document.createElement("th");
        directionColumnName.textContent = "dw/up"
        tableHeadRow.appendChild(directionColumnName)

        let angleColumnName = document.createElement("th");
        angleColumnName.textContent = "angle/radius"
        tableHeadRow.appendChild(angleColumnName)

        tableHead.appendChild(tableHeadRow)
        table.appendChild(tableHead)

        let tableBody = document.createElement("tbody")
        tableBody.id = "parameters"
        tableBody.className = "scrollContent"

        tableBody = addRowToTable(1, tableBody)
        table.appendChild(tableBody)

        informationField.appendChild(table)


        let numberOfPiecesDiv = document.createElement("div")
        numberOfPiecesDiv.className = "inline"
        let numberOfPiecesText = document.createElement("p")
        numberOfPiecesText.textContent = "Number of pieces:"
        numberOfPiecesText.className="inline"
        numberOfPiecesDiv.appendChild(numberOfPiecesText)
        let numberOfPiecesInput = document.createElement("input")
        numberOfPiecesInput.type = "number"
        numberOfPiecesInput.min = "0"
        numberOfPiecesInput.id = "numberOfPiecesInput"
        numberOfPiecesInput.className="inline"
        numberOfPiecesDiv.appendChild(numberOfPiecesInput)
        informationField.appendChild(numberOfPiecesDiv)

        let addFieldsButton = document.createElement("button")
        addFieldsButton.textContent = "Add fields"
        addFieldsButton.onclick = function () {addFieldsToTable()}

        informationField.appendChild(addFieldsButton)

        let deleteLastFieldButton = document.createElement("button")
        deleteLastFieldButton.textContent = "Delete last field"
        deleteLastFieldButton.onclick = function () {deleteLastField()}

        informationField.appendChild(deleteLastFieldButton)
    }

    else if (value === "A"){

        addImage(informationField,"A")
        let table = createTable()
        addTableRow(table, "a", "A", false)
        informationField.appendChild(table)

        angles=[0]
        rotate=false
    }

    else if (value === "B"){

        addImage(informationField, "B")

        let table = createTable()
        addTableRow(table, "a", "B", false)
        addTableRow(table, "b", "B", false)
        informationField.appendChild(table)

        angles=[90,0]
        rotate= false
    }

    else if (value === "C"){

        addImage(informationField, "C")

        let table = createTable()
        addTableRow(table, "a", "B", false)
        addTableRow(table, "u", "B", true)
        addTableRow(table, "b", "B", false)
        informationField.appendChild(table)

        angles=["+", 0]
        rotate= false
    }

    else if (value === "D"){

        addImage(informationField, "D")

        let table = createTable()
        addTableRow(table, "a", "D", false)
        addTableRow(table, "b", "D", false)
        addTableRow(table, "c", "D", false)

        informationField.appendChild(table)

        angles=[90,90,0]
        rotate = true
    }

    else if (value === "E"){

        addImage(informationField, "E")

        let table = createTable()
        addTableRow(table, "a", "E", false)
        addTableRow(table, "u", "E", true)
        addTableRow(table, "b", "E", false)
        addTableRow(table, "v", "E", true)
        addTableRow(table, "c", "E", false)

        informationField.appendChild(table)

        angles=["+","+",0]
        rotate = true

    }
    else if (value === "G"){

        addImage(informationField, "G")

        let table = createTable()
        addTableRow(table, "a", "G", false)
        addTableRow(table, "u", "G", true)
        addTableRow(table, "b", "G", false)
        addTableRow(table, "c", "G", false)
        addTableRow(table, "d", "G", false)
        addTableRow(table, "v", "G", true)
        addTableRow(table, "e", "G", false)

        informationField.appendChild(table)
        angles=["+","-l","-n","+",0]
        rotate=false

    }

    else if (value === "H"){
        addImage(informationField, "H")

        let table = createTable()
        addTableRow(table, "a", "H", false)
        addTableRow(table, "b", "H", false)
        addTableRow(table, "c", "H", false)
        addTableRow(table, "d", "H", false)
        addTableRow(table, "e", "H", false)

        informationField.appendChild(table)

        angles=[90,90,90,90,0]
        rotate = true
    }

    else if (value === "J"){
        addImage(informationField, "J")

        let table = createTable()
        addTableRow(table, "a", "J", false)
        addTableRow(table, "b", "J", false)
        addTableRow(table, "u", "J", true)
        addTableRow(table, "c", "J", false)

        informationField.appendChild(table)

        angles=["-","-l",0]
        rotate = false
    }

    else if (value === "K"){
        addImage(informationField, "K")

        let table = createTable()
        addTableRow(table, "a", "K", false)
        addTableRow(table, "b", "K", false)
        addTableRow(table, "r", "K", false)

        informationField.appendChild(table)
    }

    else if (value === "N"){

        addImage(informationField, "N")

        let table = createTable()
        addTableRow(table, "a", "N", false)
        addTableRow(table, "u", "N", true)
        addTableRow(table, "b", "N", false)
        addTableRow(table, "c", "N", false)
        addTableRow(table, "d", "N", false)
        addTableRow(table, "v", "N", true)
        addTableRow(table, "e", "N", false)

        informationField.appendChild(table)

        angles=["+","-l","-n","+",0]
        rotate = true
    }

    else if (value === "R"){

        addImage(informationField, "R")

        let table = createTable()
        addTableRow(table, "a", "R", false)
        addTableRow(table, "b", "R", false)
        addTableRow(table, "c", "R", false)
        addTableRow(table, "d", "R", false)
        addTableRow(table, "e", "R", false)

        informationField.appendChild(table)

        angles=["-90","90","90","-90",0]
        rotate = false
    }

    else if (value === "U"){
        addImage(informationField, "U")

        let table = createTable()
        addTableRow(table, "a", "U", false)
        addTableRow(table, "b", "U", false)
        addTableRow(table, "c", "U", false)

        informationField.appendChild(table)
    }

    else if (value === "W"){
        addImage(informationField, "W")

        let table = createTable()
        addTableRow(table, "a", "W", false)
        addTableRow(table, "b", "W", false)
        addTableRow(table, "c", "W", false)
        addTableRow(table, "d", "W", false)
        addTableRow(table, "e", "W", false)
        addTableRow(table, "u", "W", true)
        addTableRow(table, "v", "W", true)

        informationField.appendChild(table)
    }

    else if (value === "X"){
        addImage(informationField, "X")

        let table = createTable()
        addTableRow(table, "a", "X", false)
        addTableRow(table, "b", "X", false)
        addTableRow(table, "c", "X", false)
        addTableRow(table, "d", "X", false)

        informationField.appendChild(table)
    }

    else if (value === "XA"){
        addImage(informationField, "XA")

        let table = createTable()
        addTableRow(table, "a", "XA", false)
        addTableRow(table, "b", "XA", false)
        addTableRow(table, "c", "XA", false)

        informationField.appendChild(table)
    }

    else if (value === "XB"){
        addImage(informationField, "XB")

        let table = createTable()
        addTableRow(table, "a", "XB", false)
        addTableRow(table, "b", "XB", false)
        addTableRow(table, "c", "XB", false)
        addTableRow(table, "d", "XB", false)

        informationField.appendChild(table)

        angles=["90","90","90",0]
        rotate = false
    }

    else if (value === "XC"){
        addImage(informationField, "XC")

        let table = createTable()
        addTableRow(table, "a", "XC", false)
        addTableRow(table, "b", "XC", false)
        addTableRow(table, "c", "XC", false)
        addTableRow(table, "d", "XC", false)
        addTableRow(table, "e", "XC", false)

        informationField.appendChild(table)
    }

    else if (value === "XD"){
        addImage(informationField, "XD")

        let table = createTable()
        addTableRow(table, "a", "XD", false)
        addTableRow(table, "b", "XD", false)
        addTableRow(table, "c", "XD", false)
        addTableRow(table, "d", "XD", false)
        addTableRow(table, "u", "XD", true)

        informationField.appendChild(table)
    }

    else if (value === "XE"){
        addImage(informationField, "XE")

        let table = createTable()
        addTableRow(table, "a", "XE", false)
        addTableRow(table, "b", "XE", false)
        addTableRow(table, "c", "XE", false)
        addTableRow(table, "d", "XE", false)
        addTableRow(table, "e", "XE", false)
        addTableRow(table, "u", "XE", true)
        addTableRow(table, "v", "XE", true)

        informationField.appendChild(table)
    }

    else if (value === "XN"){
        addImage(informationField, "XN")

        let table = createTable()
        addTableRow(table, "a", "XN", false)
        addTableRow(table, "b", "XN", false)
        addTableRow(table, "c", "XN", false)
        addTableRow(table, "d", "XN", false)
        addTableRow(table, "e", "XN", false)
        addTableRow(table, "f", "XN", false)
        addTableRow(table, "g", "XN", false)
        addTableRow(table, "h", "XN", false)
        addTableRow(table, "i", "XN", false)

        informationField.appendChild(table)
    }

    else if (value === "XP"){
        addImage(informationField, "XP")

        let table = createTable()
        addTableRow(table, "a", "XP", false)
        addTableRow(table, "b", "XP", false)
        addTableRow(table, "c", "XP", false)

        informationField.appendChild(table)
    }

    else if (value === "Z"){
        addImage(informationField, "Z")

        let table = createTable()
        addTableRow(table, "a", "Z", false)
        addTableRow(table, "b", "Z", false)
        addTableRow(table, "c", "Z", false)
        addTableRow(table, "u", "Z", true)

        informationField.appendChild(table)
    }

    if (value ==="custom"){
        let drawBtn = document.createElement("button")
        drawBtn.textContent = "Refresh"
        drawBtn.onclick = function () {
            refresh()
        }

        informationField.appendChild(drawBtn)
    }
    else{
        let drawBtn = document.createElement("button")
        drawBtn.textContent = "draw"
        drawBtn.onclick = function () {drawStandardShape(angles,rotate)}

        informationField.appendChild(drawBtn)
    }

    let clearBtn = document.createElement("button")
    clearBtn.textContent = "Clear"
    clearBtn.onclick = function () {
        chosenShape()
        hideCalculations()
    }

    informationField.appendChild(clearBtn)
}

/**
 * Function that creates table
 * @returns {HTMLTableElement} table
 */
function createTable(){
    let table = document.createElement("table");
    table.className="table table-bordered";
    table.id = "table"
    return table
}

/**
 * Function that adds images of the stirrup shape to the html document
 * @param parent is the HTML element where the image should be put
 * @param shape is the name of the shape which image should be put to the parent
 */
function addImage(parent, shape){
    let image = document.createElement("img")
    image.alt = shape
    image.src = "images/" + shape + ".png"
    parent.appendChild(image)
}

/**
 * Function that adds table row for the standard stirrups
 * @param parent table name where the row should be placed
 * @param name is the name of the row
 * @param shape is the name of the standard shape
 * @param angle if the row is for angle or for the line
 */
function addTableRow(parent, name, shape, angle){

    let tableRow = document.createElement("tr")

    let column1 = document.createElement("td")
    column1.textContent = name + ":"
    tableRow.appendChild(column1)

    let mm = document.createElement("td")
    let mmInput = document.createElement("input")
    mmInput.type = "number";
    mmInput.min = "0"

    if(angle){
        mm.id = "a"+name
        mm.appendChild(mmInput)
        tableRow.appendChild(mm)

        let mmText = document.createElement("td")
        mmText.textContent = "°"
        tableRow.appendChild(mmText)
    }
    else{
        mm.id = "l"+name
        mm.appendChild(mmInput)
        tableRow.appendChild(mm)

        let mmText = document.createElement("td")
        mmText.textContent = "mm"
        tableRow.appendChild(mmText)
    }
    parent.appendChild(tableRow)
}

/**
 * Function deletes last row of the table
 */
function deleteLastField(){
    let table = document.getElementById("parameters")
    if(table.childElementCount!==1){
        table.lastChild.remove()
        drawShape(false)
    }
    else{
        alert("There is only one row.");
    }
}
