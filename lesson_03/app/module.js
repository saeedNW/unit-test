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
    callbackFilter,
    promiseFilter
}