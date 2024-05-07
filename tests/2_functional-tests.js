const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  this.timeout(5000);
  suite("Integration tests with chai-http", function () {
    // #1
    test("Test Convert a valid input such as 10L: GET /api/convert ", function (done) {
      chai
        .request(server)
        .keepOpen()
        .get("/api/convert?input=10L")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(res.body.initNum, "10");
          assert.equal(res.body.initUnit, "L");
          assert.approximately(Number(res.body.returnNum), 2.64172, 0.0005);
          assert.equal(res.body.returnUnit, "gal");
          assert.equal(
            res.body.string,
            `${res.body.initNum} liters converts to ${res.body.returnNum} gallons`
          );
          done();
        });
    });

    // #2
    test("Test Convert an invalid input such as 32g: GET /api/convert ", function (done) {
      chai
        .request(server)
        .keepOpen()
        .get("/api/convert?input=32g")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid unit");
          done();
        });
    });

    // #3
    test("Test Convert an invalid input such as 3/7.2/4kg: GET /api/convert ", function (done) {
      chai
        .request(server)
        .keepOpen()
        .get("/api/convert?input=3/7.2/4kg")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid num");
          done();
        });
    });

    // #4
    test("Test Convert an invalid input such as 3/7.2/4kilomegagram: GET /api/convert ", function (done) {
      chai
        .request(server)
        .keepOpen()
        .get("/api/convert?input=3/7.2/4kilomegagram")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid num and unit");
          done();
        });
    });

    // #5
    test("Test Convert with no number such as kg: GET /api/convert ", function (done) {
      chai
        .request(server)
        .keepOpen()
        .get("/api/convert?input=kg")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(res.body.initNum, "1");
          assert.equal(res.body.initUnit, "kg");
          assert.approximately(Number(res.body.returnNum), 2.20462, 0.0005);
          assert.equal(res.body.returnUnit, "lbs");
          assert.equal(
            res.body.string,
            `${res.body.initNum} kilograms converts to ${res.body.returnNum} pounds`
          );
          done();
        });
    });
  });
});
