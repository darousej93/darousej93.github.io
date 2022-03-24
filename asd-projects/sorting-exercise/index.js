/* IMPORTANT VALUES

This section contains a list of all variables predefined for you to use (that you will need)

The CSS ids you will work with are:

1. bubbleCounter -- the container for the counter text for bubble sort
2. quickCounter  -- the container for the counter text for quick sort

*/

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES BELOW HERE /////////////////////
///////////////////////////////////////////////////////////////////////

// TODO 2: Implement bubbleSort
async function bubbleSort(array) {
    // var sorted = false
    // while (!sorted){
    //sorted = true
    for (var i = 0; i < array.length - 1; i++) {
        for (var j = array.length - 1; j > i; j--) {
            if (array[j].value > array[j - 1].value) {
                swap(j, j - 1, array)
                updateCounter(bubbleCounter);
                await sleep();
                //sorted = false
            }
        }

    }
    //}
}

// TODO 3: Implement quickSort
async function quickSort(array,low,high) {
    if(array.length < 1){
        return 
    }
    if (low < high) {
        pivotIndex = await partition(low, high, array)

        await quickSort( array,pivotIndex + 1, high)
        await quickSort( array,low, pivotIndex - 1)
    }



}

// TODOs 4 & 5: Implement partition
async function partition(low, high, array) {
    pivot = array[high].value;

    i = (low - 1)

    for (j = low; j <= high - 1; j++) {
        if (array[j].value < pivot) {
            i++;
            swap(i, j, array)
            updateCounter(quickCounter);
            await sleep();
        }
    }
    swap(i + 1, high, array)
    updateCounter(quickCounter);
    await sleep();
    return (i + 1)
}

// TODO 1: Implement swap
function swap(x, y, array) {
    var temp = array[x]
    array[x] = array[y]
    array[y] = temp
    drawSwap(array, x, y)

}


///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES ABOVE HERE /////////////////////
///////////////////////////////////////////////////////////////////////

//////////////////////////// HELPER FUNCTIONS /////////////////////////

// this function makes the program pause by SLEEP_AMOUNT milliseconds whenever it is called
function sleep() {
    return new Promise(resolve => setTimeout(resolve, SLEEP_AMOUNT));
}

// This function draws the swap on the screen
function drawSwap(array, i, j) {
    let element1 = array[i];
    let element2 = array[j];

    let temp = parseFloat($(element1.id).css("top")) + "px";

    $(element1.id).css("top", parseFloat($(element2.id).css("top")) + "px");
    $(element2.id).css("top", temp);
}

// This function updates the specified counter
function updateCounter(counter) {
    $(counter).text("Move Count: " + (parseFloat($(counter).text().replace(/^\D+/g, '')) + 1));
}