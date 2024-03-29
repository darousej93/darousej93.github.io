// set the square size (must match the CSS)
const SQUARE_SIZE = 20;

// set constants for the indexes of R, G, and B values
const RED = 0;
const GREEN = 1;
const BLUE = 2;

// the image data
var image = [
    ["rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(150, 150, 150)"],
    ["rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(50, 200, 50)",   "rgb(50, 200, 50)",   "rgb(50, 200, 50)",   "rgb(50, 200, 50)",   "rgb(50, 200, 50)",   "rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(150, 150, 150)"], 
    ["rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(50, 200, 50)",   "rgb(50, 200, 50)",   "rgb(50, 200, 50)",   "rgb(50, 200, 50)",   "rgb(50, 200, 50)",   "rgb(50, 200, 50)",   "rgb(50, 200, 50)",   "rgb(50, 200, 50)",   "rgb(50, 200, 50)",   "rgb(150, 150, 150)", "rgb(150, 150, 150)"], 
    ["rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(100, 50, 0)",    "rgb(100, 50, 0)",    "rgb(100, 50, 0)",    "rgb(255, 200, 150)", "rgb(255, 200, 150)", "rgb(0, 0, 0)",       "rgb(255, 200, 150)", "rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(150, 150, 150)"], 
    ["rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(100, 50, 0)",    "rgb(255, 200, 150)", "rgb(100, 50, 0)",    "rgb(255, 200, 150)", "rgb(255, 200, 150)", "rgb(255, 200, 150)", "rgb(0, 0, 0)",       "rgb(255, 200, 150)", "rgb(255, 200, 150)", "rgb(255, 200, 150)", "rgb(150, 150, 150)", "rgb(150, 150, 150)"], 
    ["rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(100, 50, 0)",    "rgb(255, 200, 150)", "rgb(100, 50, 0)",    "rgb(100, 50, 0)",    "rgb(255, 200, 150)", "rgb(255, 200, 150)", "rgb(255, 200, 150)", "rgb(0, 0, 0)",       "rgb(255, 200, 150)", "rgb(255, 200, 150)", "rgb(255, 200, 150)", "rgb(150, 150, 150)"], 
    ["rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(100, 50, 0)",    "rgb(100, 50, 0)",    "rgb(255, 200, 150)", "rgb(255, 200, 150)", "rgb(255, 200, 150)", "rgb(255, 200, 150)", "rgb(0, 0, 0)",       "rgb(0, 0, 0)",       "rgb(0, 0, 0)",       "rgb(0, 0, 0)",       "rgb(150, 150, 150)", "rgb(150, 150, 150)"], 
    ["rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(255, 200, 150)", "rgb(255, 200, 150)", "rgb(255, 200, 150)", "rgb(255, 200, 150)", "rgb(255, 200, 150)", "rgb(255, 200, 150)", "rgb(255, 200, 150)", "rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(150, 150, 150)"], 
    ["rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(50, 200, 50)",   "rgb(50, 200, 50)",   "rgb(0, 50, 180)",    "rgb(50, 200, 50)",   "rgb(50, 200, 50)",   "rgb(50, 200, 50)",   "rgb(50, 200, 50)",   "rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(150, 150, 150)"], 
    ["rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(50, 200, 50)",   "rgb(50, 200, 50)",   "rgb(50, 200, 50)",   "rgb(0, 50, 180)",    "rgb(50, 200, 50)",   "rgb(50, 200, 50)",   "rgb(0, 50, 180)",    "rgb(50, 200, 50)",   "rgb(50, 200, 50)",   "rgb(50, 200, 50)",   "rgb(150, 150, 150)", "rgb(150, 150, 150)"], 
    ["rgb(150, 150, 150)", "rgb(50, 200, 50)",   "rgb(50, 200, 50)",   "rgb(50, 200, 50)",   "rgb(50, 200, 50)",   "rgb(0, 50, 180)",    "rgb(0, 50, 180)",    "rgb(0, 50, 180)",    "rgb(0, 50, 180)",    "rgb(50, 200, 50)",   "rgb(50, 200, 50)",   "rgb(50, 200, 50)",   "rgb(50, 200, 50)",   "rgb(150, 150, 150)"], 
    ["rgb(150, 150, 150)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(50, 200, 50)",   "rgb(0, 50, 180)",    "rgb(255, 255, 0)",   "rgb(0, 50, 180)",    "rgb(0, 50, 180)",    "rgb(255, 255, 0)",   "rgb(0, 50, 180)",    "rgb(50, 200, 50)",   "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(150, 150, 150)"], 
    ["rgb(150, 150, 150)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(0, 50, 180)",    "rgb(0, 50, 180)",    "rgb(0, 50, 180)",    "rgb(0, 50, 180)",    "rgb(0, 50, 180)",    "rgb(0, 50, 180)",    "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(150, 150, 150)"], 
    ["rgb(150, 150, 150)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(0, 50, 180)",    "rgb(0, 50, 180)",    "rgb(0, 50, 180)",    "rgb(0, 50, 180)",    "rgb(0, 50, 180)",    "rgb(0, 50, 180)",    "rgb(0, 50, 180)",    "rgb(0, 50, 180)",    "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(150, 150, 150)"], 
    ["rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(0, 50, 180)",    "rgb(0, 50, 180)",    "rgb(0, 50, 180)",    "rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(0, 50, 180)",    "rgb(0, 50, 180)",    "rgb(0, 50, 180)",    "rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(150, 150, 150)"], 
    ["rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(100, 50, 0)",    "rgb(100, 50, 0)",    "rgb(100, 50, 0)",    "rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(100, 50, 0)",    "rgb(100, 50, 0)",    "rgb(100, 50, 0)",    "rgb(150, 150, 150)", "rgb(150, 150, 150)"], 
    ["rgb(150, 150, 150)", "rgb(100, 50, 0)",    "rgb(100, 50, 0)",    "rgb(100, 50, 0)",    "rgb(100, 50, 0)",    "rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(150, 150, 150)", "rgb(100, 50, 0)",    "rgb(100, 50, 0)",    "rgb(100, 50, 0)",    "rgb(100, 50, 0)",    "rgb(150, 150, 150)"]];

// this function uses jQuery to create the image on the screen based on the image data
function render(element, image){
    for (var r = 0; r < image.length; r++) {
        for (var c = 0; c < image[r].length; c++) {
            var color = image[r][c];
            
            $("<div>").appendTo(element)
                    .addClass("square")
                    .css('left', c * SQUARE_SIZE)
                    .css('top', r * SQUARE_SIZE)
                    .css('background-color', color)
        }
    }
}

// this function converts an RGB string into an array for easy manipulation
function rgbStringToArray(rgbStr) {
    var rgbArr = rgbStr
         .substring(4, rgbStr.length-1) // remove "rgb(" and ")"
         .replace(/ /g, '') // replace ' ' with ''
         .split(',');       // separate into Array
    
    rgbArr[RED] = Number(rgbArr[RED]);
    rgbArr[GREEN] = Number(rgbArr[GREEN]);
    rgbArr[BLUE] = Number(rgbArr[BLUE]);

    return rgbArr;
}

// this function converts an array into an RGB string
function rgbArrayToString(rgbArray) {
    return "rgb("+rgbArray[RED]+","+rgbArray[GREEN]+","+rgbArray[BLUE]+")"
}
