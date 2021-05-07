/**
 * Function that checks if input is right
 * @returns {boolean} true if is and false if not
 */
function checkIfInput(){

    const container = document.getElementById("parameters");
    const children = container.childElementCount

    if(everythingRight(children-1)){
        //check last row
        let length = document.getElementById("lengthTable"+(children)).value
        let angle = document.getElementById("angleTable"+(children)).value
        length = stringToNumber(length)
        angle = stringToNumber(angle)
        if(!Number.isInteger(length)){
            return false
        }
        else if(!Number.isInteger(angle)){
            return false
        }
        return true;
    }
}

/**
 * Function that converts for degrees to radians
 * @param degrees
 * @returns {number} converted radian
 */
function toRadians(degrees){
    return degrees * Math.PI / 180
}

/**
 * Function that draws non standard shape
 * @param addedFields true if fields were added and false if not
 * @param canvas is canvas which will display drawing
 */
function drawShape(addedFields,canvas){
    makeCalculations(addedFields)
    deleteCanvas()

    let inputs, index;
    let table = document.getElementById("table")
    inputs = table.getElementsByTagName('input');
    const myCanvas = document.getElementById("myCanvas")
    canvas = new fabric.Canvas("myCanvas")
    canvas.clear()
    canvas.setHeight(myCanvas.height/1.5);
    canvas.setWidth(myCanvas.width/1.5);

    const canvasWidth = canvas.width-16;
    const canvasHeight = canvas.height-16;
    let xAxis = canvasWidth/2
    let yAxis = canvasHeight/2
    let group = new fabric.Group()
    let lastRow = 4
    let coords = [xAxis,yAxis]
    let allAngles = 0

    let lineThickness = getChosenDiameter()
    let bendingMandrel = getChosenBendingMandrel()

    let lastAngle = [0,0,0]
    let previousLineCoords = [0,0,0,0]
    let previousLength = 0

    if(!addedFields){
        if(checkIfInput()){
            lastRow=0
        }
        else{
            lastRow = 4
        }
    }

    for (index = 0; index < inputs.length-lastRow; index = index+4) {

        if(inputs[index].checked){
            let length = inputs[index+1].value
            let radius = inputs[index+3].value
            let angle = (360*length)/(2*Math.PI*radius)
            let direction = inputs[index+2].checked
            if (!direction){
                angle=-angle
            }
            coords = drawCircle(radius, angle, group, coords, lineThickness)
        }
        else{
            let length = inputs[index+1].value
            let angle = inputs[index+3].value
            if(!inputs[index+2].checked){
                angle = -angle
            }
            allAngles+=angle
            previousLineCoords = [previousLineCoords[2], previousLineCoords[3], coords[0], coords[1]]
            coords = drawLine(group, coords, angle, length, lastAngle,previousLineCoords, previousLength, lineThickness)
            coords = drawCircle(bendingMandrel, angle, group, coords, lineThickness)
            previousLength = length
            lastAngle=angle
        }
    }
    matchSizeToCanvas(group,canvasHeight,canvasWidth, canvas)
    //group.selectable = false
    canvas.add(group);
    group.center()

}

/**
 * Function that gets the coordinates of the last line
 * @param group is the group where we want to find last added lines coordinates
 * @returns {*[]} coordinates ([x,y])
 */
function getLastLineCoords(group){

    let lastLine = group.item(group.size()-1)

    let top = lastLine.top
    let left = lastLine.left
    let point = new fabric.Point(left,top)

    let matrix = group.calcTransformMatrix()
    let transformedPoint = fabric.util.transformPoint(point, matrix)

    return [transformedPoint["x"], transformedPoint["y"]]
}

/**
 * Function that clears the canvas
 */
function deleteCanvas(){
    let parent = document.getElementById("draw")

    while (parent.firstChild) {
        parent.firstChild.remove()
    }
    let canvas = document.createElement("canvas")
    canvas.id="myCanvas"
    canvas.width=600
    canvas.height=300
    parent.appendChild(canvas)
}

/**
 * Function that calculates the group size
 * @param group
 * @returns {number[]} size of the group [width, height]
 */
function getGroupSize(group){
    let coordinates = group.calcACoords()
    let width = Math.max(coordinates.tl["x"],coordinates.tr["x"],coordinates.bl["x"],coordinates.br["x"])-
        Math.min(coordinates.tl["x"],coordinates.tr["x"],coordinates.bl["x"],coordinates.br["x"])
    let height = Math.max(coordinates.tl["y"],coordinates.tr["y"],coordinates.bl["y"],coordinates.br["y"])
        -Math.min(coordinates.tl["y"],coordinates.tr["y"],coordinates.bl["y"],coordinates.br["y"])
    return [width,height]
}

/**
 * Function that checks is line overlaps some other existing line
 * @param line
 * @param group from which the overlapping lines will be searched
 * @returns {boolean} true if overlapping and false if not
 */
function checkIfOverlapping(line, group, strokeThickness) {
    let groupObjects = group._objects

    for(let i=0; i<groupObjects.length; i++){
        if(groupObjects[i].type === "line"){
            //We should check if two lines overlap

            let coordinates = groupObjects[i]._getCoords()
            let topLeft = coordinates.tl
            let topRight = coordinates.tr
            let matrix = group.calcTransformMatrix()
            let transformedTopLeft = fabric.util.transformPoint(topLeft, matrix)
            let transformedTopRight = fabric.util.transformPoint(topRight, matrix)

            //New line is always horisontal so that we need to check if other line is horizontal
            //that means that if other line top left y and top right y
            // is the same as new lines top left y and top right y

            let lineCoords = line._getCoords()

            if(Math.abs(lineCoords.tl.y-transformedTopLeft.y)<1){
                if(Math.abs(lineCoords.tr.y-transformedTopRight.y)<1){
                    console.log("OVERLAPING " + i)
                    return true
                }
            }

            //then next will be circle
            //we don't need to see if it intersects with circle,
            // because line can't overlap with circle
            i+=1
        }
    }
    return false
}

/**
 * Function that draws straight line
 * @param group to which it will be added
 * @param coords coordinates of the last line
 * @param angle how many degrees the line with the group will be rotated
 * @param length is the length of the wire
 * @param lastRotation how many degrees the last line with a group was rotated
 * @param previousLineCoords coordinates of the previous line
 * @param previousLength length of the previous line
 * @param strokeThickness width of the line
 * @returns {*[]} coordinates where the line ends [x,y]
 */
function drawLine(group, coords, angle, length, lastRotation, previousLineCoords, previousLength, strokeThickness){
    let arcRadius = 16
    let line = new fabric.Line([coords[0], coords[1], coords[0]-parseFloat(length), coords[1]],{
        stroke: 'black',
        strokeWidth: strokeThickness
    });

    //Check if it would overlap
    if(checkIfOverlapping(line, group,strokeThickness)){
        //should remake previous lines (arc and line) so that this line would start higher and wouldn't overlap

        //line that we need to change
        let previousLine = group._objects[group._objects.length-2]
        let lastArc = group._objects[group._objects.length-1]
        //coordinates without rotation
        //lines are drawn from right to left

        let updatedPreviousLine

        group.rotate(0)
        console.log("rotation " + 0)

        group.remove(previousLine)
        group.remove(lastArc)

        //check if it would overlap, if line would be higher
        line = new fabric.Line([coords[0], coords[1]-strokeThickness*2, coords[0]-parseFloat(length), coords[1]-strokeThickness*2],{
            stroke: 'black',
            strokeWidth: strokeThickness
        });
        if(checkIfOverlapping(line, group, strokeThickness)){
            //if yes
            //check if it would overlap, if line would be lower

            line = new fabric.Line([coords[0], coords[1]+strokeThickness, coords[0]-parseFloat(length), coords[1]+strokeThickness],{
                stroke: 'black',
                strokeWidth: strokeThickness
            });
            if(checkIfOverlapping(line, group, strokeThickness)){
                //if yes
                //check if it would overlap, if it would be right above
                line = new fabric.Line([coords[0], coords[1]-strokeThickness, coords[0]-parseFloat(length), coords[1]-strokeThickness],{
                    stroke: 'black',
                    strokeWidth: strokeThickness
                });
                if(checkIfOverlapping(line, group, strokeThickness)){
                    //if yes
                    //check if it would overlap, if it would be right below of the line
                    line = new fabric.Line([coords[0], coords[1]+strokeThickness, coords[0]-parseFloat(length), coords[1]+strokeThickness],{
                        stroke: 'black',
                        strokeWidth: strokeThickness
                    });
                    if(checkIfOverlapping(line, group, strokeThickness)){
                        ////if yes
                        //draw it in the middle of two lines
                        updatedPreviousLine = new fabric.Line([previousLineCoords[0], previousLineCoords[1], previousLineCoords[0]-previousLength-0.5*strokeThickness, previousLineCoords[1]],{
                            stroke: 'black',
                            strokeWidth: strokeThickness
                        });
                    }
                    else{
                        // draw it right below of the line
                        updatedPreviousLine = new fabric.Line([previousLineCoords[0], previousLineCoords[1], previousLineCoords[0]-previousLength+strokeThickness, previousLineCoords[1]],{
                            stroke: 'black',
                            strokeWidth: strokeThickness
                        });
                    }
                }
                else{
                    //draw it right above (previous is longer )
                    updatedPreviousLine = new fabric.Line([previousLineCoords[0], previousLineCoords[1], previousLineCoords[0]-previousLength-strokeThickness, previousLineCoords[1]],{
                        stroke: 'black',
                        strokeWidth: strokeThickness
                    });
                }
            }
            else{
                //draw it lower (previous is shorter)
                updatedPreviousLine = new fabric.Line([previousLineCoords[0], previousLineCoords[1], previousLineCoords[0]-previousLength+2*strokeThickness, previousLineCoords[1]],{
                    stroke: 'black',
                    strokeWidth: strokeThickness
                });
            }
        }
        else{
            //draw it higher (previous is longer)
            updatedPreviousLine = new fabric.Line([previousLineCoords[0], previousLineCoords[1], previousLineCoords[0]-previousLength-2*strokeThickness, previousLineCoords[1]],{
                stroke: 'black',
                strokeWidth: strokeThickness
            });
        }

        group.addWithUpdate(updatedPreviousLine)
        let updatedCoords = getLastLineCoords(group)
        let lastCoords = drawCircle(arcRadius, lastRotation, group, updatedCoords, strokeThickness)

        //Now we can draw line
        group.addWithUpdate(new fabric.Line([lastCoords[0], lastCoords[1], lastCoords[0]-parseFloat(length), lastCoords[1]],{
            stroke: 'black',
            strokeWidth: strokeThickness
        }))
        coords = getLastLineCoords(group)
        return coords
    }
    else{
        group.addWithUpdate(line)
        //group.rotate(-angle)
        coords = getLastLineCoords(group)

        return coords
    }
}

/**
 * Function that checks if arcs are overlapping
 * @param arc
 * @param group
 * @returns {boolean} true if is and false if not
 */
function checkIfArcOverlapping(arc, group) {
    let groupObjects = group._objects

    for(let i=0; i<groupObjects.length; i++){
        if(groupObjects[i].type === "circle"){
            //We should check if two lines overlap

            let center = groupObjects[i].getCenterPoint()
            let matrix = group.calcTransformMatrix()
            let transformedCenter = fabric.util.transformPoint(center, matrix)


            let arcCenter= arc.getCenterPoint()

            //if circles have same center and same radius then they overlap
            //for arc we need to also watch if arcs overlap
            if(Math.abs(arcCenter.x-transformedCenter.x)<1){
                if(Math.abs(arcCenter.y-transformedCenter.y)<1){
                    //angle sum >360
                    if(Math.abs(groupObjects[i].endAngle-groupObjects[i].startAngle) + Math.abs(arc.endAngle-arc.startAngle)>2*Math.PI){
                        console.log("OVERLAPING " + i)
                        return true
                    }
                }
            }

        }
    }
    return false
}

/**
 * Function that draws arcs
 * @param radius of the arc
 * @param angle how many degrees it is rotated
 * @param group is the group to which the arc wil be added
 * @param coords coordinates of the end of the last line
 * @param strokeThickness is the width of the line
 * @returns {*[]} end coordinates[x,y] of the arc
 */
function drawCircle(radius, angle, group, coords, strokeThickness){

    if(angle<0){

        let arc = new fabric.Circle({
            radius: radius,
            left: coords[0]-radius -0.5*strokeThickness,
            top: coords[1],
            startAngle: toRadians(-90),
            endAngle: toRadians(-90)-toRadians(angle),
            stroke: '#000',
            strokeWidth: strokeThickness,
            fill: ""
        });

        arc.rotate(angle)

        if(checkIfArcOverlapping(arc, group)){
            let arc = new fabric.Circle({
                radius: radius,
                left: coords[0]-radius+strokeThickness*2,
                top: coords[1],
                startAngle: toRadians(-90),
                endAngle: toRadians(-90)-toRadians(angle),
                stroke: '#000',
                strokeWidth: strokeThickness,
                fill: ""
            });

            arc.rotate(angle)
            group.addWithUpdate(arc)
            group.rotate(-angle)

            coords = getLastLineCoords(group)

            return [coords[0]+parseInt(radius)+strokeThickness*2,coords[1]]

        }

        else {
            group.addWithUpdate(arc)
            group.rotate(-angle)

            coords = getLastLineCoords(group)

            return [coords[0]+parseInt(radius)+0.5*strokeThickness,coords[1]]
        }


    }
    else{

        let arc = new fabric.Circle({
            radius: radius,
            left: coords[0]-radius-0.5*strokeThickness,
            top: coords[1]-2*radius,
            startAngle: toRadians(90)-toRadians(angle),
            endAngle: toRadians(90),
            stroke: '#000',
            strokeWidth: strokeThickness,
            fill: ""
        });

        if(checkIfArcOverlapping(arc, group)){
            let arc = new fabric.Circle({
                radius: radius,
                left: coords[0]-radius-strokeThickness*2,
                top: coords[1]-2*radius,
                startAngle: toRadians(90)-toRadians(angle),
                endAngle: toRadians(90),
                stroke: '#000',
                strokeWidth: strokeThickness,
                fill: ""
            });

            arc.rotate(angle)
            group.addWithUpdate(arc)
            group.rotate(-angle)
            coords = getLastLineCoords(group)

            return [coords[0]+parseInt(radius)+strokeThickness*2,coords[1]+parseInt(radius)*2]
        }

        else{
            arc.rotate(angle)
            group.addWithUpdate(arc)
            group.rotate(-angle)
            coords = getLastLineCoords(group)
            return [coords[0]+parseInt(radius)+0.5*strokeThickness,coords[1]+parseInt(radius)*2]
        }
    }
}

/**
 * Function that draws standard shapes
 * @param angles set of angles and symbols that represent angles
 * @param rotate if the shape should be rotated at the end
 * @param canvas canvas to which the shape should be placed
 */
function drawStandardShape(angles, rotate, canvas){
    deleteCanvas()

    let inputs, index;
    let table = document.getElementById("table")
    const myCanvas = document.getElementById("myCanvas")
    canvas = new fabric.Canvas("myCanvas")
    canvas.clear()
    canvas.setHeight(myCanvas.height/1.5);
    canvas.setWidth(myCanvas.width/1.5);

    inputs = table.getElementsByTagName('input');

    const canvasWidth = canvas.width-16;
    const canvasHeight = canvas.height-16;
    let xAxis = canvasWidth/2
    let yAxis = canvasHeight/2
    let group = new fabric.Group()
    let coords = [xAxis,yAxis]

    let strokeThickness = getChosenDiameter()

    let lastAngle;
    let aIndex = 0

    let previousLineCoords = [0,0,0,0]
    let previousLength = 0


    for (index = inputs.length-1; index > -1; index--) {
        let length = inputs[index].value
        let angle = angles[aIndex]

        //then it input+1 is angle not length
        if (angle === "+"){
            angle = inputs[index-1].value
            index-=1
        }
        else if(angle === "-"){
            angle = -inputs[index-1].value
            index-=1
        }
        else if(angle === "l"){
            angle = lastAngle
        }
        else if(angle === "-l"){
            angle = -lastAngle
        }
        else if(angle === "-n"){
            angle = -stringToNumber(inputs[index-2].value)
        }

        previousLineCoords = [previousLineCoords[2], previousLineCoords[3], coords[0], coords[1]]
        coords = drawLine(group, coords, angle, length, 0, previousLineCoords, length, strokeThickness)
        group.rotate(-angle)
        coords = getLastLineCoords(group)

        previousLength = length

        aIndex+=1
        lastAngle=angle
    }
    if(rotate){
        if(!isNaN(stringToNumber(angles[angles.length-2]))){
            group.rotate(angles[angles.length-2])
        }
        else{
            group.rotate(stringToNumber(inputs[1].value))
        }
    }
    matchSizeToCanvas(group,canvasHeight,canvasWidth, canvas)
    canvas.add(group);
    group.center()
}

/**
 * Function which resizes stirrup, so that it would fit into the canvas
 * @param group
 * @param canvasHeight height of the canvas
 * @param canvasWidth width of the canvas
 * @param canvas
 */
function matchSizeToCanvas(group, canvasHeight, canvasWidth, canvas){
    let canvasRatio = canvasWidth/canvasHeight
    let groupSize = getGroupSize(group)

    //Rotated
    //GOES IN
    if(Math.round(groupSize[0]*1000)!==Math.round(group.getScaledWidth()*1000)){

        //In diagonal
        //GOES IN
        if(groupSize[0]!==group.getScaledHeight()){

            //GOES IN
            if(groupSize[0]/groupSize[1]<canvasRatio){
                group.scaleToHeight(canvasHeight*group.getScaledHeight()/groupSize[1])
            }
            else{
                //GOES IN
                group.scaleToWidth(group.getScaledWidth()/groupSize[0]*canvasWidth)
            }
        }

        //In diagonal
        else if(groupSize[1]!==group.getScaledWidth()){
            if(groupSize[0]/groupSize[1]<canvasRatio){
                group.scaleToWidth(canvasHeight*(group.getScaledWidth()/groupSize[0]))
            }
            else{
                group.scaleToHeight(canvasWidth*(group.getScaledHeight()/groupSize[1]))
            }
        }

        //GOES IN if 90 degrees
        else if(groupSize[0]/groupSize[1]<canvasRatio){
            group.scaleToWidth(canvasHeight)
            getGroupSize(group)
        }
        //GOES IN
        else{
            group.scaleToHeight(canvasWidth)
            getGroupSize(group)
        }
    }

        //GOES IN
    //Is not rotated
    else{
        //GOES IN
        if(groupSize[0]/groupSize[1]<canvasRatio){
            group.scaleToHeight(canvasHeight)
            getGroupSize(group)
        }
        else{
            //GOES IN
            group.scaleToWidth(canvasWidth)
            getGroupSize(group)
        }
    }
}

/**
 * Function that gets the chosen diameter
 * @returns {number|*} diameter
 */
function getChosenDiameter(){
    return stringToNumber($("#diameters option:selected").text());
}

/**
 * Function that gets chosen bending mandrel
 * @returns {*} bending mandrel diameter
 */
function getChosenBendingMandrel(){
    let wire = getWireFromBackend()
    //FIN
    if(document.getElementById("standardCheckbox").checked){
        return wire["fin_standard_roll"]
    }
    //EN
    else{
        return wire["en_standard_roll"]
    }
}