// get a random index of an unset array cell
function getFreeIndex(array) {
    let index;
    do {
        index = getRandomInt(0, array.length - 1);
    } while (array[index])
    array[index] = true;
    return index;
}

// get a random integer inclusively
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { getFreeIndex };