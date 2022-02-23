// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads and is where you should call your functions.
$(document).ready(function () {
    const $display = $('#display');
    originalImage = JSON.parse(JSON.stringify(image))
    // Multiple TODOs: Call your apply function(s) here
    //applyFilter("reddify")
    document.getElementById("reddify").addEventListener("click",reddify)
    document.getElementById("blueify").addEventListener("click",decreaseBlue)
    document.getElementById("greenify").addEventListener("click",increaseGreenByBlue)
    document.getElementById("reset").addEventListener("click",reset)



    render($('#display'), image);

    
});

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

var originalImage 
// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter(filterFunction) {
    if (filterFunction == "reddify") {
        reddify(image)
    }
}
//rgbStringToArray
// TODO 7: Create the applyFilterNoBackground function


// TODO 5: Create the keepInBounds function
function keepInBounds(value) {
    return Math.min(Math.max(value,0),255)

}

// TODO 3: Create reddify function
function reddify(picture) {
    if(picture.x !== undefined){
        picture = image
    }
    var rbg = []
    for (let i = 0; i < picture.length; i++) {
        for (let j = 0; j < picture[i].length; j++) {
            rbg = rgbStringToArray(picture[i][j])
            rbg[RED] = keepInBounds(200)
            picture[i][j] = rgbArrayToString(rbg)
        }
    }
    render($('#display'), picture);
}

// TODO 6: Create more filter functions
function decreaseBlue(picture){
    if(picture.x !== undefined){
        picture = image
    }
    var rbg = []
    for (let i = 0; i < picture.length; i++) {
        for (let j = 0; j < picture[i].length; j++) {
            rbg = rgbStringToArray(picture[i][j])
            rbg[BLUE] = keepInBounds(rbg[BLUE] - 50)
            picture[i][j] = rgbArrayToString(rbg)
        }
    }
    render($('#display'), picture);
    
}


function increaseGreenByBlue(picture){
    if(picture.x !== undefined){
        picture = image
    }
    var rbg = []
    for (let i = 0; i < picture.length; i++) {
        for (let j = 0; j < picture[i].length; j++) {
            rbg = rgbStringToArray(picture[i][j])
            rbg[GREEN] = keepInBounds(rbg[BLUE] + rbg[GREEN])
            picture[i][j] = rgbArrayToString(rbg)
        }
    }
    render($('#display'), picture);
}

function reset(){
   //i refuse the challange since it took me forever to figure out how to deep copy an array. Pass by reference makes me so angy
    image = JSON.parse(JSON.stringify(originalImage))
    render($('#display'), image);
}


// CHALLENGE code goes below here

