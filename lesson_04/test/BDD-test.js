const {assert, expect} = require("chai");
const {sum, mul, firstItem, callbackFilter, promiseFilter} = require("../app/module");

describe('Calc test', () => {
    it('return 1 + 1 = 2', function () {
        expect(sum(1, 1)).to.equal(2);
    });

    it('return 50 * 0 != 50', function () {
        expect(mul(50, 0)).to.not.equal(50);
    });
});

describe('first Item', function () {
    it('return the first element of an array', () => {
        let result = firstItem([1, 2, 3]);

        expect(result).to.equal(1);
    });
});

describe('array filter', () => {
    it('callback array filter', function (done) {
        let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let filter = (item) => item % 2 === 0;

        callbackFilter(array, filter, (result) => {
            expect(result).to.deep.equal([2, 4, 6, 8]);
            expect(result).to.have.lengthOf(4);
            done();
        });
    });

    it('promise array filter', function () {
        let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let filter = (item) => item % 2 === 0;

        return promiseFilter(array, filter).then(result => {
            expect(result).to.deep.equal([2, 4, 6, 8]);
            expect(result).to.have.lengthOf(4);
        })
    });

    it('async array filter', async function () {
        let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let filter = (item) => item % 2 === 1;

        const result = await promiseFilter(array, filter);

        expect(result).to.deep.equal([1, 3, 5, 7, 9]);
        expect(result).to.have.lengthOf(5);
    });
});
