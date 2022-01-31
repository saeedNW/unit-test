const sum = (x, y) => {
    return x + y;
}

const mul = (x, y) => {
    return x * y
}

const firstItem = array => {
    if(array && array.length) {
        return array[0];
    }
}

module.exports = {
    sum,
    mul,
    firstItem
}