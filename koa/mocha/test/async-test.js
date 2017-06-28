var assert = require('assert');
var asynctest = require('../async');

describe('#async.js', function () {
    describe('async test', function () {
        it('1 + (2 + 4) * (9 - 2) / 3 = 15', async() => {
            var r = await asynctest();
            assert.strictEqual(r, 15);
        })
    })
})