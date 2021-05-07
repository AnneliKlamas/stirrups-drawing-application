/**
 * Function that adds field to the drawing table, checks if input is correct
 * and starts drawing shape, if possible
 */
function addFieldsToTable(){
    const container = document.getElementById("parameters");
    const children = container.childElementCount+1

    //If input incorrect display notification and don't add row
    if (everythingRight(children-1)){
        addRowToTable(children, container)
        drawShape(true)
    }
}

/**
 * Function that opens arc modal when arc is selected
 * @param children is the table row number where the arc will be drawn
 */
function circleClicked(children) {
    const checkbox = document.getElementById("radius" + children)
    if(checkbox.checked){
        $('#modalCircle').modal('show')

        let lengthInput = document.getElementById("arcLineLength")
        const length = document.getElementById("lengthTable" + children).value
        lengthInput.value = length

        let radius = document.getElementById("angleTable"+children).value
        let radiusInput = document.getElementById("circleRadius")
        radiusInput.value = radius

        if(length!==""){
            document.getElementById("arcLengthRadio").checked = true
            if(radius!==""){
                document.getElementById("arcAngle").value=Math.round(180 * length / (Math.PI * stringToNumber(radius)))
            }
        }
        else{
            document.getElementById("arcAngleRadio").checked = true
        }
        document.getElementById("saveArc").onclick = function () {saveArc(children)}
    }
    else {
        refresh()
    }
}

/**
 * The function that adds arc length to the table.
 * @param children is the table row number where the arc will be drawn
 */
function saveArc(children){
    let value = document.querySelector('input[name="angleOrLength"]:checked').value;
    let radius = document.getElementById("circleRadius").value
    if(value==="angle"){
        let angle = stringToNumber(document.getElementById("arcAngle").value)
        document.getElementById("lengthTable" + children).value = Math.round((radius*Math.PI*angle)/180)
    }
    else{
        document.getElementById("lengthTable" + children).value =
            document.getElementById("arcLineLength").value

    }
    document.getElementById("angleTable"+children).value = document.getElementById("circleRadius").value
    $('#modalCircle').modal('hide')
    refresh()
}

/**
 * Function that adds row to the table with drawing information
 * @param children is the row number
 * @param tableBody is the table body to which row will be added
 * @returns {*} modified tableBody
 */
function addRowToTable(children, tableBody){
    let row = document.createElement("tr")
    row.id = "row"+children

    let rowNr = document.createElement("td")
    rowNr.textContent = children.toString()
    row.appendChild(rowNr)

    let checkBoxColumn = document.createElement("td")
    const label =document.createElement("label")
    label.className="circleLable"
    let checkBox = document.createElement("input")
    checkBox.type="checkbox"
    checkBox.id="radius" + children
    checkBox.className="circle"
    checkBox.tabIndex=-1
    checkBox.onclick = function(){circleClicked(children)}
    label.appendChild(checkBox)
    const circleSpan = document.createElement("span")
    circleSpan.className="checkmark"
    label.appendChild(circleSpan)
    checkBoxColumn.appendChild(label)
    row.appendChild(checkBoxColumn)

    const input1Column = document.createElement("td");
    const input1 = document.createElement("input");
    input1.type = "number";
    input1.min = "0"
    input1.id = "lengthTable" + children;
    input1.addEventListener("keyup", function (event){startDrawing(event)})
    input1Column.appendChild(input1);
    row.appendChild(input1Column)

    const input2Column = document.createElement("td");
    const input2Label = document.createElement("label")
    input2Label.className="switch"

    const input2 = document.createElement("input");
    input2.type="checkbox";
    input2.id = "up-down"+children;
    input2.tabIndex=-1
    input2.onchange = function(){refresh()}
    input2Label.appendChild(input2);

    const span = document.createElement("span");
    span.className="slider round";
    input2Label.appendChild(span);
    input2Column.appendChild(input2Label);
    row.appendChild(input2Column);

    const inputDw = document.createElement("input");
    inputDw.type="radio";
    inputDw.id="dw"+children;
    inputDw.name

    const input3Column = document.createElement("td");
    const input3 = document.createElement("input");
    input3.type = "number";
    input3.min = "0"
    input3.id = "angleTable"+children;
    input3.addEventListener("keyup", function (event){startDrawing(event)})
    input3Column.appendChild(input3)
    row.appendChild(input3Column);

    tableBody.appendChild(row)
    input1.focus()
    return tableBody
}

/**
 * The function that draws stirrup after pressing Enter, if the fields have input
 * @param event the event number
 */
function startDrawing(event){
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();

        window.event.keyCode = 9;

        // Trigger the button element with a click
        const container = document.getElementById("parameters");
        const children = container.childElementCount+1
        if (lastInputPresent()){
            if (checkIfInputPresent(children)){
                addFieldsToTable()
            }
        }
        else {
            if(checkIfInputPresent(children-1)){
                refresh()
            }
        }
    }
}


/**
 * Function that checks if the last input is present
 * @returns {boolean} true if is present and false if not
 */
function lastInputPresent(){
    const container = document.getElementById("parameters");
    let children = container.childElementCount
    let length = document.getElementById("lengthTable"+(children)).value
    let angle = document.getElementById("angleTable"+(children)).value

    if (length.replaceAll(' ','')!==""){
        if (angle.replaceAll(' ','')!==""){
            return true
        }
    }
    return false
}


/**
 * Function that checks if the input in the rows 1 to children nr is present
 * @param children indicates how many rows should be checked
 * @returns {boolean} true if the rows have inputs and false if not
 */
function checkIfInputPresent(children){
    for (let i=1; i<=children; i++){
        let length = document.getElementById("lengthTable"+(children-1)).value
        let angle = document.getElementById("angleTable"+(children-1)).value
        if (length.replaceAll(' ','')!==""){
            if (angle.replaceAll(' ','')!==""){
                return true
            }
        }
    }
    return false
}

/**
 * Function that controls if the rows have correct input
 * @param children number of rows that have to be controlled
 * @returns {boolean} true if inputs are correct, false if not
 */
function everythingRight(children){
    for (let i=1; i<=children; i++){
        if(!controlRow(i)){
            return false
        }
    }
    return true
}

/**
 * Function for controlling if circle input is correct
 * @param length is length of arc
 * @param angle is radios of the circle
 * @param children is number of the input row
 * @returns {boolean} true,if input is correct, false if incorrect
 */
function controlCircleRow(length, angle, children) {
    if(length<0){
        alert("Arc length must be positive integer in line "+ children);
        return false
    }
    else if (!Number.isInteger(length)){
        alert("Arc length must be integer in line "+ children);
        return false
    }

    if(angle<0){
        alert("Radius must be positive integer in line "+ children);
        return false
    }
    else if (!Number.isInteger(length)){
        alert("Radius must be integer in line "+ children);
        return false
    }

    if(length>2*Math.PI*angle){
        alert("Arc length can't be bigger than circle length"+ children);
        return false
    }
    return true
}

/**
 * Function for controlling if line input is correct
 * @param length is length of the line
 * @param angle is angle of the line
 * @param children is the number of the row
 * @returns {boolean} true,if input is correct, false if incorrect
 */
function controlLineRow(length, angle, children) {
    if(length<0){
        alert("Length must be positive integer in line "+ children);
        return false
    }
    else if (!Number.isInteger(length)){
        alert("Length must be integer in line "+ children);
        return false
    }

    if(angle>180){
        alert("Angle must be smaller or equal 180 in line "+ children);
        return false
    }
    else if(angle<0){
        alert("Angle must be bigger or equal 0 in line "+ children)
        return false
    }
    else if(!Number.isInteger(angle)){
        alert("Angle must be integer in line "+ children)
        return false
    }
    return true
}

/**
 * Function for deciding if row is for circle or for line
 * @param children number of the row
 * @returns {boolean} true, if inputs are correct
 */
function controlRow(children){

    //Check if length and angle are positive integers
    let length = document.getElementById("lengthTable"+(children)).value
    let angle = document.getElementById("angleTable"+(children)).value
    let circle = document.getElementById("radius"+(children)).checked

    length = stringToNumber(length)
    angle = stringToNumber(angle)

    if(circle){
        return controlCircleRow(length, angle, children)
    }
    else{
        return controlLineRow(length, angle, children)
    }
}

/** Function that formats input string to number
 * @param number is String that needs to be a number
 * @returns {number|*}
 */
function stringToNumber(number){
    if(parseInt(number)!==null){
        return parseInt(number)}
    else if(number.includes(".")){
        return parseFloat(number)
    }

    else{
        return number
    }
}

/**
 * Function that adds items to price inquiry modal
 */
function addToPriceInquiry(){
    let table = document.getElementById("priceInquiryItems")
    let nrOfRows = table.childElementCount
    let nrOfPieces = document.getElementById("numberOfPiecesInput").value

    let numberBtn = document.getElementById("priceInquiryBtn")
    numberBtn.textContent = "|||" + (nrOfRows+1)

    let tableRow = document.createElement("tr")
    let name = document.createElement("td")
    name.textContent = "Detail " + (nrOfRows+1)
    name.className = "collapsible"
    tableRow.appendChild(name)
    let description = document.createElement("td")
    description.textContent = getDescription()
    tableRow.appendChild(description)
    let piecesItem = document.createElement("td")
    let pieces = document.createElement("input")
    pieces.type = "number"
    pieces.value = nrOfPieces
    pieces.min = "0"
    pieces.id = "pieces" + (nrOfRows+1)
    piecesItem.appendChild(pieces)
    tableRow.appendChild(piecesItem)
    let deleteItem = document.createElement("td")
    let deleteBtn = document.createElement("button")
    deleteBtn.textContent = "x"
    deleteBtn.onclick = function () { deleteItemRow(tableRow, table)}
    deleteItem.appendChild(deleteBtn)
    tableRow.appendChild(deleteItem)
    table.appendChild(tableRow)
}

/**
 * Function that deletes item from item inquiry modal
 * @param tableRow
 */
function deleteItemRow(tableRow, table){
    table.removeChild(tableRow)
    let table1 = document.getElementById("priceInquiryItems")
    let nrOfRows = table1.childElementCount
    document.getElementById("priceInquiryBtn").textContent = "|||"+ nrOfRows.toString()
}

/**
 * Function for displaying and making calculations
 * @param addedFields
 */
function makeCalculations(addedFields){
    displayCalculations()
    let singleWeight = document.getElementById("singleWeight")
    let singlePrice = document.getElementById("singlePrice")
    let singleLength = document.getElementById("singleWireLength")
    let bendingMandrel = document.getElementById("bendingMandrel")

    let allWeight = document.getElementById("allWeight")
    let allPrice = document.getElementById("allPrice")
    let allLength = document.getElementById("allWireLength")

    let nrOfPieces = document.getElementById("numberOfPiecesInput").value

    let wire = getWireFromBackend()
    let price = getPriceFromBackend()


    let wireLength

    //FIN
    if(document.getElementById("standardCheckbox").checked){
        wireLength = calculateWireLength(wire["fin_length_per_degree"],addedFields)
        bendingMandrel.textContent = wire["fin_standard_roll"].toString()
    }
    //EN
    else{
        wireLength = calculateWireLength(wire["en_length_per_degree"],addedFields)
        bendingMandrel.textContent = wire["en_standard_roll"].toString()
    }
    singleLength.textContent = wireLength.toString() + " mm"
    allLength.textContent = (wireLength*nrOfPieces).toString()

    let weight = calculateWeight(wireLength, wire["weight"])
    singleWeight.textContent = Math.round(weight).toString() + " kg"
    allWeight.textContent = (Math.round(weight*nrOfPieces)).toString()

    singlePrice.textContent = (Math.round(weight*price)).toString() +" €"
    allPrice.textContent = (Math.round(weight*nrOfPieces*price)).toString() + " €"
}

/**
 * Function for displaying calculations
 */
function displayCalculations() {
    let div = document.getElementById("calculate");
    div.style.display = "block";
}

/**
 * Function for hiding calculations
 */
function hideCalculations(){
    let div = document.getElementById("calculate");
    div.style.display = "none";
}

/**
 * Function for getting description
 * @returns {string}
 */
function getDescription(){
    let description = ""
    description += "D:" + getChosenDiameter() + ";"
    description += "BM: " + getChosenBendingMandrel() + ";"
    let table = document.getElementById("table")
    let inputs = table.getElementsByTagName('input');

    let lastRow


    if(checkIfInput()){
        lastRow=0
    }
    else{
        lastRow = 4
    }

    let row = 1
    let index;
    for (index = 0; index < inputs.length-lastRow; index = index+4) {
        description += row
        if(inputs[index].checked){
            description += "Arc:"
        }
        else {
            description += "Line:"
        }
        description += inputs[index+1].value + ","
        if (inputs[index+2].checked){
            description += "up,"
        }
        else{
            description += "dw,"
        }
        description += inputs[index+3].value + ";"
        row +=1
    }

    return description
}

/**
 * Function that closes price inquiry modal and opens form modal
 */
function openForm(){
    $('#modalItemList').modal('hide')
    $('#inquiryFormModal').modal('show')
}

/**
 * Function that refreshes drawing
 */
function refresh(){
    const container = document.getElementById("parameters");
    const children = container.childElementCount

    //If input incorrect display notification and don't add row
    if (everythingRight(children-1)){
        drawShape(false)
    }
}



