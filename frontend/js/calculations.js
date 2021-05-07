/**
 * Function that calculates wire weight
 * @param wireLength
 * @param weight
 * @returns {number}
 */
function calculateWeight(wireLength, weight){
    return wireLength*weight/1000
}

/**
 * Function for calculating wire length
 * @param lengthPerDegree
 * @param addedFields
 * @returns {number}
 */
function calculateWireLength(lengthPerDegree, addedFields){

    let inputsRow = getInputs(addedFields)
    let inputs = inputsRow[0]
    let lastRow = inputsRow[1]
    let length = 0

    for (let index = 0; index < inputs.length-lastRow; index = index+4) {

        if(inputs[index].checked){
            //CIRCLE
            length+=stringToNumber(inputs[index+1].value)
        }
        else{
            //LINE
            let angle = stringToNumber(inputs[index+3].value)
            length+=stringToNumber(inputs[index+1].value)+lengthPerDegree*angle
        }
    }
    return length
}

/**
 * Function that gets inputs from row
 * @param addedFields
 * @returns {(HTMLCollectionOf<HTMLElementTagNameMap[string]>|number)[]}
 */
function getInputs(addedFields) {
    let table = document.getElementById("table")
    let inputs = table.getElementsByTagName('input');

    if(!addedFields){
        if(checkIfInput()){
            return [inputs, 0]
        }
    }
    return [inputs, 4]
}