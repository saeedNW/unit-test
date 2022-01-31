const {callbackFilter, promiseFilter} = require("../app/module");
const assert = require("assert");

describe('array filter', () => {
    it('callback array filter', function (done) {
        let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let filter = (item) => item % 2 === 0;

        callbackFilter(array, filter, (result) => {
            assert.deepEqual(result, [2, 4, 6, 8]);
            done();
        });
    });

    it('promise array filter', function () {
        let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let filter = (item) => item % 2 === 0;

        return promiseFilter(array, filter).then(result => {
            assert.deepEqual(result, [2, 4, 6, 8]);
        })
    });

    it('async array filter', async function () {
        let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let filter = (item) => item % 2 === 1;

        const result = await promiseFilter(array, filter);

        assert.deepEqual(result, [1, 3, 5, 7, 9]);
    });
});