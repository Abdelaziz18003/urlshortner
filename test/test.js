var expect = require("chai").expect;
var shorten = require("../functions/shorten");

// test the function that generate the short Url from a counter
describe('shorten', () => {
    it('should return a string', () => {
        expect(shorten(10)).to.be.a("string");
    });

    it('shoud convert 20 to k', () => {
        expect(shorten(20)).to.equal('k');
    });

    it('should convert 1000 to g8', () => {
        expect(shorten(1000)).to.equal("g8");
    });
});