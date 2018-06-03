var mysql = require('mysql');
const express = require('express');
const app = express();
const path = require('path');
bodyParser= require('body-parser');
app.use(express.json());       
app.use(express.urlencoded());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "quotation_accrevo"
});
var ans0,ans1;

  con.query("SELECT DISTINCT customers.cus_id,customers.cus_name FROM customers", function (err, result, fields) {
    if (err) throw err;
    ans0=JSON.stringify(result);
  });

app.get('/', (req, res)=> {
  res.render('index',{x:ans0,y:ans0})
});
app.post('/', function(req, res) {
  //console.log(req.body._id);
  var _id=req.body._id;
  con.query("SELECT DISTINCT customers.email FROM customers WHERE customers.cus_id="+_id, function (err, result, fields) {
    if (err) throw err;
    ans1=JSON.stringify(result);
    res.send(JSON.stringify({ y: ans1 }));
  });
});
app.listen('3000', () => {
  console.log('port 3000');
});