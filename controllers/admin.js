//const Master = require('../models/adminmodels/master');
const sequelize = require('../util/database');
const Master = require('../models/master');
const Location = require('../models/adminmodels/location');
const Stock = require('../models/adminmodels/stock');
const User = require('../models/user');
const Cost = require('../models/adminmodels/try');
const Branch = require('../models/adminmodels/branch');
const Uom = require('../models/adminmodels/uom');
const Recode = require('../models/adminmodels/recode');
const Blackmarket = require('../models/adminmodels/blackmarket');
const Detail = require('../models/adminmodels/details');
const Uploadcsv = require('../models/adminmodels/uploadcsv');
const fs = require('fs');
const path = require('path');
const fastcsv = require('fast-csv');
const csv = require('csv-parser');
const async = require('async');
var multer  = require('multer');
const { bulkCreate } = require('../models/master');
var upload = multer({ dest: 'upload/'});
let alert = require('alert');  
const readXlsxFile = require('read-excel-file/node');
const { QueryTypes } = require('sequelize');
const { models, Sequelize } = require('../util/database');
//const ExcelJS = require('exceljs');

//get route for the stock and master import page
exports.getIndex = (req,res,next)=>{
  res.render('adminviews/index');
};


//post route for the master import page to parse the csv file and import data into master table
exports.addMaster = (req,res,next)=>{

/* var seq = 01;

 var today = new Date();
var countName =  today.getFullYear()+'-'+(today.getMonth()+1);
console.log(countName+'-'+seq); */

 /* var dir = '202103-01';

 try {
  // first check if directory already exists
  if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      console.log("Directory is created.");
  } else {
      console.log("Directory already exists.");
  }
} catch (err) {
  console.log(err);
}

  fs.copyFile('data/database.sqlite', '202103-01/database.sqlite', (err) => {
    if (err) throw err;
    console.log('succesfully made a copy of db');
  });

  //make connection to the new database in the folder
  const sequelize1 = new Sequelize({
     dialect: 'sqlite',
     storage: '202103-01/database.sqlite'
  }); 

//making models and instances of models 
//creating the stock model
const Stock = sequelize1.define('stock',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true,
    defaultvalue:Sequelize.UUIDV4,
  },
  stockcountname: Sequelize.STRING,
  counttype: Sequelize.STRING,
  description: Sequelize.TEXT
});

//creating the Master model
const Master = sequelize1.define('master', {
  'id':{
    type: Sequelize.INTEGER,
    defaultvalue:Sequelize.UUIDV4,
    autoIncrement:true,
    allowNull:false,
    primaryKey: true
  },
  'Item': Sequelize.STRING,
  'Oracle Item': Sequelize.STRING,
  'Item Revision': Sequelize.STRING,
  'Item Description': Sequelize.STRING,
  'Warehouse': Sequelize.STRING,
  'Sales (Month to Date)': Sequelize.STRING,
  'Balance Available (Minus Unshipped ISO & all ABO Orders)': Sequelize.STRING,
  'Balance Available (Minus Unshipped ISO & Paid ABO Orders)': Sequelize.STRING,
  'EA in Pallet': Sequelize.STRING,
  'Net Weight': Sequelize.STRING,
  'EA in Multipack': Sequelize.STRING,
  'Pending Receiving WTO Qty': Sequelize.STRING,
  'In-Transit WTO Qty': Sequelize.STRING,
  'Open PO Qty': Sequelize.STRING,
  'Local Flag': Sequelize.STRING,
  'MTD PO/IR Receipts Qty': Sequelize.STRING,
  'Positive MTD Adj Qty': Sequelize.STRING,
  'Negative MTD Adj Qty': Sequelize.STRING,
  'Expense Line MTD Qty': Sequelize.STRING,
  'Yesterday ABO Shipped Qty': Sequelize.STRING,
  'Mortgaged ABO Qty': Sequelize.STRING,
  'Mortgaged ABO Qty PAID': Sequelize.STRING,
  'Mortgaged ABO Qty UNPAID': Sequelize.STRING,
  'BackOrdered ABO Order Qty': Sequelize.STRING,
  'Mortgaged WTO Qty': Sequelize.STRING,
  'Subinventory PICKLINE Qty': Sequelize.STRING,
  'Subinventory XREWK Qty': Sequelize.STRING,
  'Subinventory TEST Qty': Sequelize.STRING,
  'Subinventory ABGIL Qty': Sequelize.STRING,
  'Subinventory STORAGE Qty': Sequelize.STRING,
  'Subinventory STAGING Qty': Sequelize.STRING,
  'Subinventory DAMAGE Qty': Sequelize.STRING,
  'Subinventory BONDED Qty': Sequelize.STRING,
  'Subinventory NIR Qty': Sequelize.STRING,
  'Subinventory RIR Qty': Sequelize.STRING,
  'Subinventory OVERLABEL Qty': Sequelize.STRING,
  'Order Fixed Qty': Sequelize.STRING,
  'Mortgaged work order Qty': Sequelize.STRING,
  'In-transit Qurantine Qty': Sequelize.STRING,
  'In-transit Xrework Qty': Sequelize.STRING,
  'In-transit Approved Qty': Sequelize.STRING,
  'Total In-transit Qty': Sequelize.STRING,
  'Reference Old SKU': Sequelize.STRING,
  'Subinventory HOLD Qty': Sequelize.STRING,
  'Subinventory DISPLAY Qty': Sequelize.STRING,
  'Subinventory CAFE Qty': Sequelize.STRING,
  'Subinventory REPAIR Qty': Sequelize.STRING,
  'Subinventory VARIANCE Qty': Sequelize.STRING,
}); */


//process of inserting the data into database.

  var stockcountname = req.body.stockcountname;
  var counttype = req.body.counttype;
  var description = req.body.description;
  console.log(req.file.originalname);
  Stock.destroy({
    where: {},
    truncate: true
});
  Stock.create({stockcountname: stockcountname, counttype: counttype, description: description})
  .then(r => {
    console.log("worked till here");
  })
  .catch(err => console.log(err));
      const results = [];
  fs.createReadStream(req.file.path)
  .pipe(csv({skipLines: 9, skipComments: true|'***'}))
  .on('data', (data) => 
  results.push(data))
  .on('end', () => {
   //console.log(results);
   for(var i = 0; i<2; i++) {
   results.pop();
   }
   Master.destroy({
    where: {},
    truncate: true
  });
    Master.bulkCreate(results, {
      returning: true
    }).then(r => {
      res.redirect("/admin/dashboard");
      alert("successfully imported the data");
    })
    .catch(err => console.log(err));
  });   
};


//get route for the login page
exports.getLoginPage = (req,res,next)=> {
  //console.log(req.body.username);
   res.render('login');
};

//post route for the login page
exports.postLoginPage = (req,res,next)=> {
  var username = req.body.username;
  var password = req.body.password;

  //console.log(username);
  //console.log(password);

  User.findOne({where: {username: username}}).then(function(user) {
    if (!user) {
      alert("User not found!");
      res.render('login');
    } else {
      if(user) {
         if(user.password === password) {
             //alert("Username or password not match!");
             res.redirect('/admin/dashboard');
            //console.log('user password is '+user.get('password'));
         }
         else{
           alert("Incorrect password please check");
           res.render('login');
         }
      }
    }
 });
  //res.redirect('/admin/dashboard');
}; 


//get route for the signup page
exports.getSignupPage = (req,res,next)=> {
   res.render('signup');
};

//post route for the signup page 
exports.postSignupPage = (req,res,next)=> {
   var username = req.body.username;
   var password = req.body.password;

   User.create({username: username, password: password});
   alert("User successfully created");
   res.redirect('/admin/dashboard');
};

//get route for the single location create page
exports.getLocationPage = (req,res,next)=> {
   res.render('adminviews/location');
};

//get route for the list of location page
exports.getLocationListPage = (req,res,next)=> {
  //var join = await sequelize.query(' SELECT `a`.`Warehouse` AS `aWarehouse`, `a`.`OracleItem` AS `aOracleItem`, `a`.`SubInv` AS `aSubInv` , `a`.`Location` AS `aLocation` , `a`.`Qty` AS `aQty` , `b`.`Qty` AS `bQty` FROM `teamas` `a` LEFT JOIN `teambs` `b` on (`a`.`Warehouse` = `b`.`Warehouse` AND `a`.`OracleItem` = `b`.`OracleItem` AND `a`.`SubInv` = `b`.`SubInv` AND `a`.`Location` = `b`.`Location`) UNION ALL SELECT `b`.`Warehouse` AS `bWarehouse`, `b`.`OracleItem` AS `bOracleItem`, `b`.`SubInv` AS `bSubInv` , `b`.`Location` AS `bLocation` , `a`.`Qty` AS `aQty` , `b`.`Qty` AS `bQty` FROM `teambs` `b` LEFT JOIN `teamas` `a` on (`a`.`Warehouse` = `b`.`Warehouse` AND `a`.`OracleItem` = `b`.`OracleItem` AND `a`.`SubInv` = `b`.`SubInv` AND `a`.`Location` = `b`.`Location`) WHERE a.Qty IS NULL;',{type: QueryTypes.SELECT, mapToModel: true});
  //console.log(join);
  Location.findAll().then(function (newLocationItem){
    res.render('adminviews/locationlist', {newLocationItems: newLocationItem});
  });
};

//get route for the location import page with the csv file
exports.getLocationImportPage = (req,res,next)=> {
  res.render('adminviews/locationimport');
};


//post route for the single location create page
exports.postLocationPage = (req,res,next) => {
  var subinventory = req.body.subinventory;
  var location = req.body.location;

  Location.create({subinventory: subinventory, location: location})
  .then(r => {
    res.redirect("/admin/location/list");
    alert("Successfully added location");
  })
  .catch(err => console.log(err));
};

//post route for importing the location excel file
exports.postLocationImportPage = (req,res,next) => {
  readXlsxFile(req.file.path).then((rows) => {
     // skip header
     rows.shift();
     console.log(rows);
     let locations = [];
     rows.forEach((row) => {
        let location = {
          subinventory: row[0],
          location: row[1]
        };
      locations.push(location);  
     });

     Location.destroy({
      where: {},
      truncate: true
  });
     Location.bulkCreate(locations,{
       returning: true
     }).then(r => {
        res.redirect("/admin/location/list");
        alert("Successfully imported the data");
     })
     .catch(err => console.log(err));
  });
};

//get route for the activity list page(shows the list of previous counts that have been completed)
exports.getActivityListPage = (req,res,next) => {
   res.render('adminviews/activitylist');
};

//get route for the wto plan (shows the list of the master data imported)
exports.getWtoPlanPage = (req,res,next) => {
  Master.findAll().then(function (masters){
    res.render('adminviews/wtoplan', {newMasterItems: masters});
  });
};


//get route to show list of branches (uses find all to get the data from database and display)
exports.getBranchDataPage = (req,res,next) => {
  Branch.findAll().then(function (branches){
    //console.log(branches[1].Location);
    res.render('adminviews/branch', {newBranchItems: branches});
    //console.log("This is executed")
  });
};

//get route to show list of cost and class file that has been imported (uses find all to get the data from the database)
exports.getCostClassPage = (req,res,next) => {
    Cost.findAll().then(function (costs){
    res.render('adminviews/costclass', {newCostClassItems: costs});
  });
};

//get route of cost and class to display the view page to import excel file into the database
exports.getExcel = (req,res,next)=> {
  res.render('adminviews/excel');
};

//post route of cost and class to make the post request from the excel view page into the database(uses readXlsxFile npm package to parse the data)
exports.postExcelPage = (req,res,next)=> {
  readXlsxFile(req.file.path).then((rows) => {
    // skip header
   rows.shift();
    console.log(rows);
    let tutorials = [];

    rows.forEach((row) => {
      let tutorial = {
        Trim: row[0],
        WH: row[1],
        LOCATION: row[2],
        ITEM: row[3],
        DESC: row[4],
        PRICE: row[5],
        CLASS: row[6]
      }; 

      tutorials.push(tutorial);
    });

    console.log(tutorials);
    Cost.bulkCreate(tutorials, {
      returning: true
    }).then(r => {
      res.redirect("/admin/costclass");
      alert("successfully imported the data");
    })
    .catch(err => console.log(err));
  });
};

//get route of branch to display the view page to import excel file 
exports.getBranchImport = (req,res,next)=> {
  res.render('adminviews/branchimport');
};

//post route of branch to make the post request from the excel view page into the database(uses readXlsxFile npm package to parse the data)
exports.postBranchPage = (req,res,next)=> {
   //console.log(req.file.path);
    readXlsxFile(req.file.path).then((rows) => {
       //skip header
       rows.shift();
       console.log(rows);
       let branches = [];

       rows.forEach((row) => {
         let branch = {
          'Shop': row[0],
          'EBSCode': row[1],
          'Location': row[2],
          'Warehouse': row[3]
         };

         branches.push(branch);
       });
       //console.log(branches);
       Branch.bulkCreate(branches, {
          returning: true
       }).then(r => {
          res.redirect("/admin/branch");
          alert("successfully imported the data");
       })
       .catch(err => console.log(err));
    });
};

//get route of uom to display the view page to import excel file
exports.getUomImport = (req,res,next)=> {
   res.render('adminviews/uomimport');
};

//post route of uom to make the post request from the excel view page into the database(uses readXlsxFile npm package to parse the data)
exports.postUomPage = (req,res,next)=> {
  Uom.destroy({
    where: {},
    truncate: true
  });
  readXlsxFile(req.file.path).then((rows) => {
     rows.shift();
     let uoms = [];
     rows.forEach((row) => {
       let uom = {
         'prtnum': row[0],
         'lngdsc': row[1],
         'uomcod': row[2],
         'untqty': row[3]
       };
      uoms.push(uom);
     });
     //console.log(uoms);
     Uom.bulkCreate(uoms, {
       returning: true
     }).then(r => {
       res.redirect("/admin/uom/import");
       alert("successfully imported the data");
     })
     .catch(err => console.log(err));
  });
};

//get route to show list of uom file that has been imported (uses find all to get the data from the database)
exports.getUomListPage = (req,res,next) => {
  Uom.findAll().then(function (uoms){
  res.render('adminviews/uom', {newUomItems: uoms});
});
};

//get route of recode to display the view page to import excel file
exports.getRecodeImportPage = (req,res,next)=> {
  res.render('adminviews/recodeimport');
};

//post route of recode to make the post request from the excel view page into the database(uses readXlsxFile npm package to parse the data)
exports.postRecodeImportPage = (req,res,next)=> {
   readXlsxFile(req.file.path).then((rows) => {
       rows.shift();
       let recodes = [];
       rows.forEach((row) => {
          let recode = {
            'Seq': row[0],
            'SKU': row[1],
            'RecodeConfig': row[2]
          };
          recodes.push(recode);
       });
       //console.log(rows);
       Recode.bulkCreate(recodes, {
         returning: true
       }).then(r => {
         res.redirect("/admin/recode/list");
         alert("Successfully imported the data");
       })
       .catch(err => console.log(err));
   });
};

//get route to show list of recode file that has been imported (uses find all to get the data from the database)
exports.getRecodeListPage = (req,res,next) => {
  /*sequelize.query('SELECT * FROM "recodes" As Users', { type: sequelize.QueryTypes.SELECT})
  .then(result => {
    console.log(result);
  })*/
  Recode.findAll().then(function (recodes){
  res.render('adminviews/recodelist', {newRecodeItems: recodes});
});
};

exports.postUploadFolder = (req,res,next) => {

  //to get the directory name of the csv files
  const currDir = path.join(__dirname + '/../csvfiles/');
  console.log(currDir);

  //function to return the file names in the directory
  const readdir = (dirname) => {
    return new Promise((resolve, reject) => {
      fs.readdir(dirname, (error, filenames) => {
        if (error) {
          reject(error);
        } else {
          resolve(filenames);
        }
      });
    });
  };

  // checking if the files in the folder are csv files
  const filtercsvFiles = (filename) => {
    return filename.split('.')[1] === 'csv';
  };

  //using the above readdir function to loop over reading the files and posting them in the database

  readdir(currDir).then((filenames) => {
    filenames = filenames.filter(filtercsvFiles);
    console.log(filenames);
  
    for (let i = 0; i < filenames.length; i++) {
      let currFilePath = currDir + filenames[i];
  
      //Use fast-csv to parse the files
      let csvData = [];
      fs
        .createReadStream(currFilePath)
        .pipe(csv())
        .on('data', (data) => {
          console.log(data.Team);
          csvData.push(data);
        })
        .on('end', () => {
          Uploadcsv.bulkCreate(csvData, {
            returning: true
          }).then(r => {
            //res.redirect("/admin/wtoplan");
            console.log("successfully uploaded " + i + "th file");
          })
          .catch(err => console.log(err));
        });
    }
    alert("sucessfully uploaded csv folder");
    res.redirect("/admin/costclass");
  });
};

exports.getBlackMarketImportPage = (req,res,next) => {
  res.render('adminviews/blackmarketimport');
};

exports.getBlackMarketlistPage = (req,res,next) => {
 Blackmarket.findAll().then(function (markets){
 res.render('adminviews/blackmarketlist', {newBlackMarketItems: markets});
 });
};

exports.postBlackMarketImportPage = (req,res,next) => {
  //console.log(req.file.originalname);
  readXlsxFile(req.file.path).then((rows) => {
    //skip header 
    rows.shift();
    //console.log(rows);
    let markets = [];

    rows.forEach((row) => {
      let market = {
        'Seq': row[0],
        'SKU': row[1],
        'RecodeConfig': row[2]
      };

    markets.push(market);
    });
   //console.log(markets);
   Blackmarket.destroy({
     where: {},
     truncate: true
   });
   Blackmarket.bulkCreate(markets, {
     returning: true
   }).then(r => {
     res.redirect("/admin/blackmarket/list");
     alert("successfully imported the data");
   })
   .catch(err => console.log(err));
  });
};
