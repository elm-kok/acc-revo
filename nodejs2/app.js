var mysql = require('mysql');
const express = require('express');
const app = express();
const path = require('path');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "quotation_accrevo"
});
var ans0, ans1 = [];
con.query("SELECT DISTINCT customers.cus_id,customers.cus_name,customers.cus_company,customers.tel,customers.email,quotation.path FROM customers,quotation where customers.cus_id=quotation.cus_id order by customers.cus_id", function (err, result, fields) {
  if (err) throw err;
  ans0 = JSON.stringify(result);
  var j=0;
  for (var i = 0; i < result.length; ++i) {
    con.query("SELECT DISTINCT answers.Q_id, questions.question,answers.ans_content,choices.content FROM answers,questions,choices WHERE answers.cus_id=" + result[j].cus_id + " and answers.Q_id=questions.Q_id and answers.C_id=choices.C_id order by answers.Q_id", function (err, result0, fields) {
      if (err) throw err;
      ans1.push(JSON.stringify(result0));
    });
    j++;
  }
});
app.get('/', (req, res) => {
  res.render('index', {y:ans1,x:ans0});
});
app.listen('3000', () => {
  console.log('port 3000');
});