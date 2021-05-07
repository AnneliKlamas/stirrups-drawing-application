/**
 * Function that adds wire diameters to the front page selection
 */
$(document).ready(function (){
    const Url='http://localhost:8080/wires'
    $.ajax({
        url: Url,
        type:"GET",
        success: function(result){
            let wire;
            let resultList = result["_embedded"]["wireEntityDTOList"]
            for (let i = 0; i < resultList.length; i++) {
                let dropDownList = document.getElementById("diameters")
                const diameter = document.createElement("option");
                wire = resultList[i]
                diameter.value = wire["id"]
                diameter.text = wire["diameter"]
                dropDownList.appendChild(diameter)
            }
            console.log(result)
        },
        error:function(error){
            console.log(error)
        }
    })
})


$(document).ready(function () {

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });

});

//opens and closes company details
$(document).ready(function () {

    $('.form-check-input').click(function () {
        if ($(this).attr('value') === "option2") {
            $("#companyDetails").hide('slow');
        }
        if ($(this).attr("value") === "option1") {
            $("#companyDetails").show('slow');
        }
    });

    $('.form-check-input').trigger('click');  // trigger the event
});

//hides calculations
$(document).ready(function (){
    hideCalculations()
})

