const assert = require('assert');
const {sum, mul, firstItem} = require("../app/modules");

describe('Calc test', () => {
    it('return 1 + 1 = 2', function () {
        assert.equal(sum(1,1), 2);
    });

    it('return 50 * 0 = 0', function () {
        assert.strictEqual(mul(50,0), 0);
    });
});

describe('first Item' , function() {
    it('return the first element of an array' , () => {
        let result = firstItem([1,2,3]);

        assert.equal(result , 1);
    });
});