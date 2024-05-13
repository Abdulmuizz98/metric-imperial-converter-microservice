function ConvertHandler() {
  let inputRgx = /^([0-9\/\.]*)?([A-Za-z]+)?$/;

  let unitRgx = /^(gal|L|mi|km|lbs|kg)$/i;
  let numRgx = /^(\d+(?:\.\d+)?(?:\/\d+(?:\.\d+)?)*)$/;
  let units = {
    gal: "L",
    L: "gal",
    mi: "km",
    km: "mi",
    lbs: "kg",
    kg: "lbs",
  };
  let spellOutUnits = {
    gal: "gallons",
    L: "liters",
    mi: "miles",
    km: "kilometers",
    lbs: "pounds",
    kg: "kilograms",
  };

  this.getNum = function (input) {
    let result, num, unit;
    let match = input.match(inputRgx);

    if (!match) throw new Error("invalid number and unit");
    // console.log(match);
    num = match[1] || "1";
    num = num.match(numRgx)[0] || null;

    // numSplit = num.split("/");
    console.log("num: ", num);

    unit = match[2] || "";
    unit = unit.match(unitRgx);

    if (!unit && (!num || num.split("/").length > 2))
      throw new Error("invalid number and unit");
    if (!unit) throw new Error("invalid unit");
    if (!num || num.split("/").length > 2) throw new Error("invalid number");

    num = num.split("/");
    if (num.length == 1) result = Number(num[0]);
    else result = Number(num[0]) / Number(num[1]);

    return result;
  };

  this.getUnit = function (input) {
    let match = input.match(inputRgx);

    if ((match[2] === "l") | (match[2] === "L")) return "L";

    return match[2].toLowerCase();
  };

  this.getReturnUnit = function (initUnit) {
    return units[initUnit];
  };

  this.spellOutUnit = function (unit) {
    return spellOutUnits[unit];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    switch (initUnit) {
      case "gal":
        return Number((initNum * galToL).toFixed(5));
      case "L":
        return Number((initNum / galToL).toFixed(5));
      case "lbs":
        return Number((initNum * lbsToKg).toFixed(5));
      case "kg":
        return Number((initNum / lbsToKg).toFixed(5));
      case "mi":
        return Number((initNum * miToKm).toFixed(5));
      case "km":
        return Number((initNum / miToKm).toFixed(5));
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    // return '3.1 miles converts to 4.98895 kilometers';
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

// function validateInput (input){

// }
module.exports = ConvertHandler;
