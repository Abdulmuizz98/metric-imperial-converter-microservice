function ConvertHandler() {
  // let inputRgx = /^([0-9\/\.]*)?([A-Za-z]+)?$/;
  let inputRgx = /^(\d+(?:\.\d+)?(?:\/\d+(?:\.\d+)?)?|)(gal|L|mi|km|lbs|kg)$/i;
  let numRgx = /^(\d+(?:\.\d+)?(?:\/\d+(?:\.\d+)?)?|)[a-z]*$/i;
  let unitRgx = /(gal|L|mi|km|lbs|kg)$/i;

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
    let num;
    let inputMatch = input.match(inputRgx);
    let numMatch = input.match(numRgx);
    let unitMatch = input.match(unitRgx);

    if (!inputMatch) {
      //Either num or unit is invalid or both
      if (!unitMatch && !numMatch) throw new Error("invalid number and unit");
      else if (!unitMatch) throw new Error("invalid unit");
      else if (!numMatch) throw new Error("invalid number");
      else throw new Error("invalid number and unit");
    }

    num = inputMatch[1] || "1";
    num = num.split("/");

    return num.length === 1 ? Number(num[0]) : Number(num[0]) / Number(num[1]);
  };

  this.getUnit = function (input) {
    let inputMatch = input.match(inputRgx);

    if ((inputMatch[2] === "l") | (inputMatch[2] === "L")) return "L";

    return inputMatch[2].toLowerCase();
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
