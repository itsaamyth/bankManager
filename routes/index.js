var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var customers = require("../modules/customers");
var profileModel = require("../modules/profile");
var transactions = require("../modules/transaction");
var moment = require("moment");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Digital Banking" });
});

router.get("/customers", function (req, res, next) {
  customers.find({}).exec((err, data) => {
    if (err) throw err;
    res.render("customers", { title: "Customers", records: data });
  });
});

router.get("/transfer", function (req, res, next) {
  profileModel.find({}).exec((err, profiledata) => {
    if (err) throw err;
    customers.find({}).exec((err, customerdata) => {
      if (err) throw err;
      res.render("transfer", {
        title: "Transfer Money",
        profile: profiledata,
        customer: customerdata,
      });
      console.log(profiledata);
    });
  });
});

router.post("/transfer", function (req, res, next) {
  var account = req.body.account;
  var amount = req.body.amount;
  var remarks = req.body.remarks;
  var myBalance = { $inc: { accBalance: -amount } };
  var custBalance = { $inc: { balance: amount } };
  //Amit Kumar is the loggedin user already present in the DB
  profileModel.updateOne({ name: "Amit Kumar" }, myBalance, (err, data) => {
    customers.updateOne({ accNumber: account }, custBalance, (err, data) => {
      profileModel.find({}).exec((err, profiledata) => {
        customers.find({ accNumber: account }).exec((err, customerdata) => {
          customerdata.forEach(function(row){
            var accName = row.name
            var accNumber = row.accNumber
            var transactionDetails = new transactions({
              accountName: accName,
              accountNumber:accNumber,
              amount: amount,
              remarks: remarks,
            });
            transactionDetails.save((err, data) => {
              if (err) throw err;
              res.render("success", {
                title: "Transfer Money",
                amount: amount,
                remarks: remarks,
                profile: profiledata,
                customer: customerdata,
              });
            });
          });
        });
      });
    });
  });
});

router.get("/transactions", function (req, res, next) {
  profileModel.find({}).exec((err, profiledata) => {
    if (err) throw err;
    transactions.find({}).exec((err, transactiondata) => {
      if (err) throw err;
      res.render("transactions", {
        title: "Transactions",
        profile: profiledata,
        transaction: transactiondata,
      });
    });
  });
});

// router.post('/transfer', function(req, res, next) {
//   profile = new profileModel(req.body)
//   profile.save((err,data)=>{
//     if(err){
//       return res.status(400).json({
//           err:"Not able to save user to DB"
//       })
//   }
//   res.json({message:"profile Added Successfully",data})
//   })
// });

module.exports = router;
