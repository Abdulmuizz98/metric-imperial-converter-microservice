const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("Testing convertHandler function class", function () {
    // #1
    test("convertHandler should correctly read a whole number input", function () {
      assert.equal(convertHandler.getNum("1gal"), 1);
      assert.equal(convertHandler.getNum("120gal"), 120);
    });
    // #2
    test("convertHandler should correctly read a decimal number input.", function () {
      assert.equal(convertHandler.getNum("1.2lbs"), 1.2);
      assert.equal(convertHandler.getNum("7.24kg"), 7.24);
    });
    // #3
    test("convertHandler should correctly read a fractional input.", function () {
      assert.equal(convertHandler.getNum("1/2L"), 0.5);
      assert.equal(convertHandler.getNum("1/4km"), 0.25);
    });
    // #4
    test("convertHandler should correctly read a fractional input with a decimal.", function () {
      assert.equal(convertHandler.getNum("1.2/1.2L"), 1);
      assert.equal(convertHandler.getNum("1.5/3.0km"), 0.5);
    });
    // #5
    test("convertHandler should correctly return an error on a double-fraction.", function () {
      const callGetNumMethod1 = () => {
        convertHandler.getNum("3/2/3km");
      };
      const callGetNumMethod2 = () => {
        convertHandler.getNum("3/2/3k");
      };
      assert.throws(callGetNumMethod1, "invalid number");
      assert.throws(callGetNumMethod2, "invalid number and unit");
    });
    // #6
    test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.", function () {
      assert.equal(convertHandler.getNum("km"), 1);
      assert.equal(convertHandler.getNum("L"), 1);
    });

    // #7
    test("convertHandler should correctly read each valid input unit.", function () {
      assert.equal(convertHandler.getUnit("1gal"), "gal");
      assert.equal(convertHandler.getUnit("120GAL"), "gal");
      assert.equal(convertHandler.getUnit("1l"), "L");
      assert.equal(convertHandler.getUnit("120KM"), "km");
    });
    // #8
    test("convertHandler should correctly return an error for an invalid input unit.", function () {
      const callGetUnitMethod1 = () => {
        convertHandler.getNum("3/2/3k");
      };
      const callGetUnitMethod2 = () => {
        convertHandler.getNum("3/2g");
      };
      assert.throws(callGetUnitMethod1, "invalid number and unit");
      assert.throws(callGetUnitMethod2, "invalid unit");
    });
    // #9
    test("convertHandler should return the correct return unit for each valid input unit.", function () {
      assert.equal(convertHandler.getReturnUnit("gal"), "L");
      assert.equal(convertHandler.getReturnUnit("L"), "gal");
      assert.equal(convertHandler.getReturnUnit("mi"), "km");
      assert.equal(convertHandler.getReturnUnit("km"), "mi");
      assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
      assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
    });
    // #10
    test("convertHandler should correctly return the spelled-out string unit for each valid input unit.", function () {
      assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
      assert.equal(convertHandler.spellOutUnit("L"), "liters");
      assert.equal(convertHandler.spellOutUnit("mi"), "miles");
      assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
      assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
      assert.equal(convertHandler.spellOutUnit("lbs"), "pounds");
    });
    // #11
    test("convertHandler should correctly convert gal to L.", function () {
      assert.approximately(convertHandler.convert(20, "gal"), 75.7082, 0.0005);
    });
    // #12
    test("convertHandler should correctly convert L to gal.", function () {
      assert.approximately(convertHandler.convert(75.7082, "L"), 20, 0.0005);
    });
    // #13
    test("convertHandler should correctly convert mi to km.", function () {
      assert.approximately(convertHandler.convert(100, "mi"), 160.934, 0.0005);
    });
    // #14
    test("convertHandler should correctly convert km to mi.", function () {
      assert.approximately(convertHandler.convert(160.934, "km"), 100, 0.0005);
    });
    // #15
    test("convertHandler should correctly convert lbs to kg.", function () {
      assert.approximately(convertHandler.convert(200, "lbs"), 90.7185, 0.0005);
    });
    // #16
    test("convertHandler should correctly convert kg to lbs.", function () {
      assert.approximately(convertHandler.convert(90.7185, "kg"), 200, 0.0005);
    });
  });
});

// convertHandler should correctly convert lbs to kg.
// convertHandler should correctly convert kg to lbs.
