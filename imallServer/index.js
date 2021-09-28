const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require('body-parser');
const User = require('./db/user');
const PendingUser = require('./db/pending-user');
const AccessHash = require('./db/access-hash');
const { sendConfirmationEmail, sendResetPasswordEmail } = require('./mailer');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "admin",
  database: "database",
});

db.connect((err) => {
  if (err) {
    console.log("These is error while connecting to db", err.stack);
  } else {
    console.log("Succeed and connection thread id is ", db.threadId);
  }
});
/*----------------------------------------------------------------------------------APIS-----------------------------*/

/*------------------------------------------------------------------------------------product------------------*/
 app.get('/test', (req, res) => {
  res.json({message: 'Hello World!'});
})

 
 

app.post("/insertProduct", (req, res) =>{
    
  // console.log("Test values in services req values :", req);
    
    const productname = req.body.productname;
    const productdesc = req.body.productdesc;
    const productqty = req.body.productqty;
    const productprice = req.body.productprice;
    const productimage = req.body.productimage;
    const categoryid = req.body.categoryid;
    const vendorid = req.body.vendorid;
    const vendorprice = req.body.vendorprice;
    const customerid = req.body.customerid;
    const productstatus = req.body.productstatus;
 
  const sql = `INSERT INTO PRODUCT(PRODUCT_NAME,PRODUCT_DESC,PRODUCT_QTY,PRODUCT_PRICE,PRODUCT_IMAGE,CATEGORY_ID,VENDOR_ID,VENDOR_PRICE,CUSTOMER_ID,CREATION_DATE,PRODUCT_STATUS) VALUES(?,?,?,?,?,?,?,?,?,current_date(),?)`;
 
   db.query(sql,[productname,productdesc,productqty,productprice,productimage,categoryid,vendorid,vendorprice,customerid,productstatus], (error, results) => {
   if (error) throw error;
 //db.execute("commit");
   res.send(results.rows);
 })

});

app.get("/getPRoductData", (req, res) =>{
    // console.log("Test values in services req values :", req);
    
  db.query("select * from PRODUCT", (error, results) => {
    if (error) throw error;
    res.send(results);
  })
});

/*----------------------------------------------------------------end-product------------------*/

/*---------------------------------------------------------------------vendor------------------*/

app.post("/insertvendor", (req, res) =>{
    
  // console.log("Test values in services req values :", req);

	const vendorname = req.body.vendorname;
	const vendorphone = req.body.vendorphone;
	const vendorgst = req.body.vendorgst;
	const vendoremail = req.body.vendoremail;
	const vendoraddress = req.body.vendoraddress;
	const vendorstatus = req.body.vendorstatus;
	const vendorbankacc = req.body.vendorbank_acc;
	const vendorbankname = req.body.vendorbank_name;
   
    const sql = `INSERT INTO VENDOR(VENDOR_NAME ,VENDOR_PHONE ,VENDOR_GST ,VENDOR_EMAIL ,VENDOR_ADDRESS ,VENDOR_STATUS ,VENDOR_BANK_ACC ,VENDOR_BANK_NAME ,CREATION_DATE)	 VALUES(?,?,?,?,?,?,?,?,current_date())`;
	
	 db.query(sql,[vendorname,vendorphone,vendorgst,vendoremail,vendoraddress,vendorstatus,vendorbankacc,vendorbankname], (error, results) => {
   if (error) throw error;
 //db.execute("commit");
   res.send(results.rows);
 })

});

app.get("/getVendorData", (req, res) =>{
    // console.log("Test values in services req values :", req);
    
  db.query("select * from VENDOR", (error, results) => {
    if (error) throw error;
    res.send(results);
  })
});

/*---------------------------------------------------------------end-vendor------------------*/

/*-----------------------------------------------------------------customer------------------*/

	app.post("/insertcustomer", (req, res) =>{
    
  // console.log("Test values in services req values :", req);

	const customername = req.body.customername;
	const customerphone = req.body.customerphone;
	const customeraddress = req.body.customeraddress;
	const customeremail = req.body.customeremail;
	const customerstatus = req.body.customerstatus;
	const customerpassword = req.body.customerpassword;
	
	 const sql = `INSERT INTO CUSTOMER(CUSTOMER_NAME ,CUSTOMER_PHONE ,CUSTOMER_ADDRESS ,CUSTOMER_EMAIL ,CUSTOMER_STATUS ,CREATION_DATE ,CUSTOMER_PASSWORD)	 VALUES(?,?,?,?,?,current_date(),?)`;
	
	 db.query(sql,[customername,customerphone,customeraddress,customeremail,customerstatus,customerpassword], (error, results) => {
   if (error) throw error;
 //db.execute("commit");
   res.send(results.rows);
 })

});

app.post("/validateUserDetails", (req, res) => {
  const customeremail = req.body.customeremail;

  db.query(
    `SELECT * FROM CUSTOMER WHERE CUSTOMER_EMAIL=?`,
    [customeremail],
    (error, results) => {
      if (error) throw error;           
      res.send(results);
    }
  );
});

app.post("/getCustomerEmailValidation", (req, res) => {
  const customeremail = req.body.customeremail;

  db.query(
    `SELECT COUNT(*) AS ROWCOUNT FROM CUSTOMER WHERE CUSTOMER_EMAIL=?`,
    [customeremail],
    (error, results) => {
      if (error) throw error;           
      res.send(results);
    }
  );
});


app.get("/getCustomerData", (req, res) =>{
    // console.log("Test values in services req values :", req);
    
  db.query("select * from CUSTOMER", (error, results) => {
    if (error) throw error;
    res.send(results);
  })
});	
	
	

	app.post('/resetPassword', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({email});
    if (!user) { return res.status(422).send("User doesn't exists!"); }

    const hasHash = await AccessHash.findOne({userId: user._id});
    if (hasHash) { return res.status(422).send("Email to reset password was already sent!"); }

    const hash = new AccessHash({userId: user._id});
    await hash.save();
    await sendResetPasswordEmail({toUser: user, hash: hash._id});
    return res.json({message: 'Please check your email to reset the password!'})
  } catch {
    return res.status(422).send('Ooops, something went wrong!');
  }
})


app.post('resetPassword/confirmation', async (req, res) => {
  const { password, hash } = req.body;

  try {
    const aHash = await AccessHash.findOne({_id: hash});
    if (!aHash || !aHash.userId) {
      return res.status(422).send('Cannot reset a password!');
    }

    const user = await User.findOne({_id: aHash.userId});
    if (!user) {
      return res.status(422).send('Cannot reset a password!');
    }

    await user.remove();
    await aHash.remove();
    const newUser = new User({...user, password});
    await newUser.hashPassword();
    await newUser.save();
    return res.json({message: 'Password has been reseted!'});
  } catch {
    return res.status(422).send('Ooops, something went wrong!');
  }
})

	
	
	
	
	
	
	
/*------------------------------------------------------------end-customer------------------*/

/*----------------------------------------------------------------category------------------*/

	app.post("/insertcategory", (req, res) =>{
    
  // console.log("Test values in services req values :", req);

	const categoryname = req.body.categoryname;
	const categorydescription = req.body.categorydescription;
	
	const sql = `INSERT INTO CATEGORY(CATEGORY_NAME,CATEGORY_DESCRIPTION ,CREATION_DATE)	 VALUES(?,?,current_date())`;

	db.query(sql,[categoryname,categorydescription], (error, results) => {
   if (error) throw error;
 //db.execute("commit");
   res.send(results.rows);
 })

});

app.get("/getCategoryData", (req, res) =>{
    // console.log("Test values in services req values :", req);
    
  db.query("select * from CATEGORY", (error, results) => {
    if (error) throw error;
    res.send(results);
  })
});

/*------------------------------------------------------------end-category------------------*/

/*-----------------------------------------------------------order details------------------*/

app.post("/insertorder_details", (req, res) =>{
    
  // console.log("Test values in services req values :", req);

	const customerid = req.body.customerid;
	const productid = req.body.productid;
	const productqty = req.body.productqty;
	const productprice = req.body.productprice;
	const vendorid = req.body.vendorid;
	const categoryid = req.body.categoryid;
	const orderdate = req.body.orderdate;
	const orderprice = req.body.orderprice;
	const ordertotalprice = req.body.ordertotalprice;
	const orderonline = req.body.orderonline;
	const ordertransactionid = req.body.ordertransactionid;
	const orderbankname = req.body.orderbankname;
	const ordermethod = req.body.ordermethod;

const sql = `INSERT INTO ORDER_DETAILS(CUSTOMER_ID ,PRODUCT_ID ,PRODUCT_QTY ,PRODUCT_PRICE ,VENDOR_ID ,CATEGORY_ID ,ORDER_DATE ,ORDER_PRICE ,ORDER_TOTAL_PRICE ,ORDER_ONLINE ,ORDER_TRANSACTION_ID ,ORDER_BANK_NAME ,ORDER_METHOD)   VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`;


db.query(sql,[customerid,productid,productqty,productprice,vendorid,categoryid,orderdate,orderprice,ordertotalprice,orderonline,ordertransactionid,orderbankname,ordermethod], (error, results) => { 
   if (error) throw error;
 //db.execute("commit");
   res.send(results.rows);
 })

});

app.get("/getOrderDetailsData", (req, res) =>{
    // console.log("Test values in services req values :", req);
    
  db.query("select * from ORDER_DETAILS", (error, results) => {
    if (error) throw error;
    res.send(results);
  })
});

/*--------------------------------------------------------end-order details------------------*/

/**-----------------------------------------------------end apis-----------------------------*/
app.listen(3004, () => {
  console.log("Server Is Up And Running On Port 3004");
});

 

module.exports = db;