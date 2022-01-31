const sum = (x, y) => {
    return x + y;
}

const mul = (x, y) => {
    return x * y
}

const firstItem = array => {
    if (array && array.length) {
        return array[0];
    }
}

const callbackFilter = (array, filter, callback) => {
    setTimeout(() => {
        callback(array.filter(filter));
    }, 1000)
}

const promiseFilter = (array, filter) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(array.filter(filter));
        }, 1000);
    });
}

module.exports = {
    sum,
    mul,
    firstItem,
    callbackFilter,
    promiseFilter
}