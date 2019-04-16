module.exports.getData = getData;

function getData(dataFile, filters = []) {
    if (filters['sortBy']) {
        delete filters['sortBy'];
    }
    if (dataFile) {
        return (filterArray(JSON.parse(dataFile), filters));
    }
    return 'requested data currently unavailable. please try again in a few minutes';
}

function filterArray(arr, filters) {
    const result = [...arr];
    if (filters != []) {
        for (let i = arr.length - 1; i > -1; i--) {
            for (filter in filters) {
                if (result[i][filter] != filters[filter]) {
                    result.splice(i, 1);
                    break;
                }
            }
        }
    }
    return result;
}