const cookieParser = require('cookie-parser');
const sequelize = require('../util/database');
const express = require('express');
const TeamA = require('../models/usermodels/teama');
const TeamB = require('../models/usermodels/teamb');
const Variance = require('../models/variance');
const Variancereport = require('../models/variancereport');
const BookCount = require('../models/bookcount');
const Location = require('../models/adminmodels/location');
const ShopCountMaster = require('../models/shopcountmaster');
const Shopbookcount = require('../models/shopbookcount');
const ShopCountVariance = require('../models/variancebookcount');
const Userlocation = require('../models/usermodels/userlocation');
const Details = require('../models/adminmodels/details');
const ShopCountTeamData = require('../models/usermodels/shopcountteamdata');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
var multer = require('multer');
var upload = multer({ dest: 'upload/'});
let alert = require('alert');
const { QueryTypes } = require('sequelize');
const router = require('../routes/admin');
//const cookieParser = require('cookie-parser');
const jsdom = require("jsdom");
const Master = require('../models/master');
const { seq } = require('async');
const Detail = require('../models/adminmodels/details');
const { JSDOM } = jsdom;
//const got = require("got");

const
 app = express();

app.use(cookieParser()); 
app.use(router);

exports.getListWtoPage = (req,res,next)=>{
    res.render('download');
};

exports.getShopCountDownload = (req,res,next)=> {
  res.render('userviews/shopdownload');
};

exports.getShopDownload = (req,res,next) => {
  //-------------------------------------------- Sending db file after the pre process of creating the shop count master data -------------------------
  const file = `./data/database.sqlite`;
  res.download(file); // Set disposition and send it.
};

exports.getDownload = async (req,res,next)=> {
  
  /*  fs.copyFile('202103-01/database.sqlite', '202103-01/database1.sqlite', (err) => {
        if (err) throw err;
        console.log('succesfully made a copy of db');
    });

  const { Sequelize } = require('sequelize');

  const sequelize2 = new Sequelize({
     dialect: 'sqlite',
     storage: '202103-01/database1.sqlite'
  });
     
  const Master2 = sequelize2.define('master', {
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
  });
  
 
 // Master2.findAll().then(console.log("some thing"));
   var warehouse = 'W39';
   var removeOtherWarehouse = await sequelize2.query('DELETE FROM masters WHERE Warehouse != '+warehouse+'',{type: QueryTypes.DELETE, mapToModel: true}); */

   

    const file = `./data/database.sqlite`;
    res.download(file); // Set disposition and send it.
};

exports.getUserUploadPage = (req,res,next) => {
    res.render('userviews/userupload');
}

exports.postUploadTeamCsv = async (req,res,next) => {
  var countType = await sequelize.query('SELECT CountType FROM details',{type: QueryTypes.SELECT, mapToModel: true});
  console.log(countType);
    console.log(req.file.originalname);
    const datas = [];
    fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => {
       datas.push(data);
    })
    .on('end', () => {
      console.log(datas);
   if(countType[0].CountType === "TeamCount")
   {
        var TeamName = datas[0].Team;
        if( TeamName === "A")
        {
            console.log("This data has to goto TeamA table");
            TeamA.destroy({
              where: {},
              truncate: true
          });
            TeamA.bulkCreate(datas, {
                returning: true
            }).then(r => {
               alert("Successfully imported the data");
               res.redirect("/user/teamcount");
            })
            .catch(err => console.log(err));
        } else if ( TeamName === "B")
        {
           TeamB.destroy({
            where: {},
            truncate: true
          });
            console.log("This data has to goto TeamB table");
            TeamB.bulkCreate(datas, {
                returning: true
            }).then(r => {
               alert("Successfully imported the data");
               res.redirect("/user/teamcount");
            })
            .catch(err => console.log(err));
        } else {
            console.log("Data not from either TeamA or TeamB");
        }
   }  
   else if(countType[0].CountType === "ShopCount")
   {
      /*console.log("This data is for shop count");
      ShopCountTeamData.bulkCreate(datas, {
         returning: true
      }).then(r => {
        alert("Successfully imported data");
      })*/
      BookCount.destroy({
        where: {},
        truncate: true
      }); 
      datas.forEach(function(newData){  
         BookCount.create({
            aWarehouse: newData.Warehouse,
            aOracleItem: newData.OracleItem,
            aSubInv: newData.SubInv,
            Quantity: newData.Qty
         });
      });
      alert("Successfully imported the data");
      res.redirect("/user/shopcount");
   }
   else{
     console.log("Not both the cases");
   }
    });
};

exports.getTeamCountPage = (req,res,next) => {
    Variancereport.findAll().then(function (variancedata){
        res.render('userviews/teamcount', {newVarianceDatas: variancedata});
     });
};


exports.getWtoDownloadPage = (req,res,next) => {
    res.render('userviews/wtodownload');
};


exports.getVarianceReport = async (req,res,next) => {
    Variance.destroy({
        where: {},
        truncate: true
    });
  var join = await sequelize.query(' SELECT `a`.`Warehouse` AS `aWarehouse`, `a`.`OracleItem` AS `aOracleItem`, `a`.`SubInv` AS `aSubInv` , `a`.`Location` AS `aLocation` , `a`.`Qty` AS `aQty` , `b`.`Qty` AS `bQty` FROM `teamas` `a` LEFT JOIN `teambs` `b` on (`a`.`Warehouse` = `b`.`Warehouse` AND `a`.`OracleItem` = `b`.`OracleItem` AND `a`.`SubInv` = `b`.`SubInv` AND `a`.`Location` = `b`.`Location`) UNION ALL SELECT `b`.`Warehouse` AS `bWarehouse`, `b`.`OracleItem` AS `bOracleItem`, `b`.`SubInv` AS `bSubInv` , `b`.`Location` AS `bLocation` , `a`.`Qty` AS `aQty` , `b`.`Qty` AS `bQty` FROM `teambs` `b` LEFT JOIN `teamas` `a` on (`a`.`Warehouse` = `b`.`Warehouse` AND `a`.`OracleItem` = `b`.`OracleItem` AND `a`.`SubInv` = `b`.`SubInv` AND `a`.`Location` = `b`.`Location`) WHERE a.Qty IS NULL;',{type: QueryTypes.SELECT, mapToModel: true});
  //console.log(join);
   var insertData = await Variance.bulkCreate(join, {returning: true});
   Variancereport.destroy({
    where: {},
    truncate: true
});
   var getDescription = await sequelize.query('SELECT DISTINCT aWarehouse, aOracleItem, masters.[Item Description], aSubInv, aLocation, aQty, bQty FROM variances, masters WHERE aOracleItem=masters.[Oracle Item]',{type: QueryTypes.SELECT, mapToModel: true});
   var insertDataWithDescription = await Variancereport.bulkCreate(getDescription, {returning: true});
   BookCount.destroy({
    where: {},
    truncate: true
});
  var bookCount = await sequelize.query('SELECT aWarehouse,  aOracleItem, aSubInv, [Item Description], SUM(aQty) as Quantity FROM variancereports WHERE aQty=bQty GROUP BY aWarehouse, aOracleItem, aSubInv;',{type: QueryTypes.SELECT, mapToModel: true});
  console.log(bookCount);
  var insertDataBookCount = await BookCount.bulkCreate(bookCount, {returning: true});
  var removeSameData = await sequelize.query('DELETE FROM variancereports WHERE aQty=bQty',{type: QueryTypes.DELETE, mapToModel: true});

  //------------------------------------------------------ Card data to display in front end --------------------------------------------------------------------
  var teamaCardData = await sequelize.query('SELECT count(DISTINCT OracleItem) as ItemCard, sum(qty) as SumQtyCard FROM teamas',{type: QueryTypes.SELECT, mapToModel: true});
  //console.log(teamaCardData); //[ { ItemCard: 1, SumQtyCard: 188 } ]
  var teambCardData = await sequelize.query('SELECT count(DISTINCT OracleItem) as ItemCard, sum(qty) as SumQtyCard FROM teambs',{type: QueryTypes.SELECT, mapToModel: true});
  //console.log(teambCardData);


  //---------------------------------------------------------- Width control in the card data---------------------------------------------------------------------

    if ((teamaCardData[0].SumQtyCard) > (teambCardData[0].SumQtyCard)) {
      var diff = (teamaCardData[0].SumQtyCard) - (teambCardData[0].SumQtyCard);
      var width = 100-((diff * 100) / (teamaCardData[0].SumQtyCard));
      var myWidth = width+"%";
      //document.getElementById('myWidth').style.width = myWidth;
  } else if ((teamaCardData[0].SumQtyCard) < (teambCardData[0].SumQtyCard)) { 
     var diff = (teambCardData[0].SumQtyCard) - (teamaCardData[0].SumQtyCard); 
     var width = 100-((diff * 100) / (teambCardData[0].SumQtyCard));
     var myWidth = width+"%";
    // document.getElementById('myWidth').style.width = myWidth;
 } else {
   var myWidth = 100+"%";
  // document.getElementById('myWidth').style.width = myWidth;
 } 
 console.log(myWidth); 


  //------------------------------------------------------ Updating the status of the flag column in the database ---------------------------------------------------
  var changeFlagStatus = await sequelize.query('update masters set flag="N"',{type: QueryTypes.UPDATE, mapToModel: true});
  console.log("Changed the flag status to -N- in the master table");
  var updateFlagStatus = await sequelize.query('update masters set flag="Y" WHERE [Oracle Item] IN (select distinct aOracleItem from masters wto inner join variancereports v on wto.[Oracle Item]=v.aOracleItem and wto.Warehouse=v.aWarehouse)', {type: QueryTypes.UPDATE, mapToModel: true});
  console.log("Updated the status of equal records for recount");

  //------------------------------------------------------ Deleting the location and inserting to change the data for not equal -------------------------------------

  Location.destroy({
    where: {},
    truncate: true
  });
  var SelectingNewData = await sequelize.query('select distinct aSubInv as subinventory, aLocation as location from variancereports', {type: QueryTypes.SELECT, mapToModel: true});

  console.log(SelectingNewData);

  Location.bulkCreate(SelectingNewData,{
    returning: true
  }).then(r => {
     console.log("Successfully updated the locations table");
  })
  .catch(err => console.log(err));

  
  Variancereport.findAll().then(function (variancedata){
    if(variancedata.length === 0) {
     res.render('userviews/shopcount', {teamaCardDatas: teamaCardData, teambCardDatas: teambCardData});
    } else {
     res.render('userviews/variance', {newVarianceDatas: variancedata, teamaCardDatas: teamaCardData, teambCardDatas: teambCardData, width: myWidth});
    };
  });
};


exports.getBookCountReport = async (req,res,next) => {
  BookCount.findAll().then(function (bookcountdata){
     res.render('userviews/bookcount', {newBookCountDatas: bookcountdata});
  });
};

exports.getSetUpPage = async (req,res,next) => {
  var warehouseList = await sequelize.query('SELECT DISTINCT Warehouse FROM masters ORDER BY Warehouse',{type: QueryTypes.SELECT, mapToModel: true});
  //console.log(warehouseList);
  res.render('userviews/setuppage', {newWarehouseLists: warehouseList});
};

exports.postSetUpPage = async (req,res,next) => {
  const obj = JSON.parse(JSON.stringify(req.body)); 
  console.log(obj);
  res.cookie("WarehouseName",obj, { maxAge: 900000, httpOnly: true });
  res.redirect("/user/wtodownload");
  alert("Successfully saved Warehouse");
};

exports.getStoredWarehouse =  (req,res,next) => {
  //console.log(res.cookies);
 //var somecookie = res.cookie('WarehouseName', {maxAge: 900000, httpOnly: false});
 var username = req.cookies['WarehouseName'];
 console.log(username);
}; 

exports.getShopRecountPage = (req,res,next) => {
  res.render('userviews/shopcount');
};

exports.getTeamVarianceReport = (req,res,next) => {
  Variancereport.findAll().then(function (variancedata){
  res.render('userviews/teamvariance', {newVarianceDatas: variancedata});
  });
};

exports.getShopVariancePage = (req,res,next) => {
  res.render('userviews/shopvariance');
};

exports.getShopBookCountPage = (req,res,next) => {
  Shopbookcount.findAll().then(function (shopBookCountData){
    res.render('userviews/shopbookcount', {newShopCountBookDatas: shopBookCountData});
  });
};

exports.getShopCountPage = (req,res,next) => {
  res.render('userviews/shopcountcalculate');
};

exports.getShopCountCalculate = async (req,res,next) => {
  Details.update({ CountType: "ShopCount" }, {
    where: {
      CountType: "TeamCount"
    }
  });
  /* ShopCountMaster.destroy({
    where: {},
    truncate: true
  });
  Master.findAll()
  .then((MasterDatas)=>{
    MasterDatas.forEach(function(MasterData){
      //--------------------------------------- Creating data for PICKLINE SUBINV ----------------------------------
      if (MasterData['Subinventory PICKLINE Qty'] > 0) {
        //console.log(MasterData.Item);
         ShopCountMaster.create({
          Item: MasterData.Item,
          OracleItem: MasterData['Oracle Item'],
          ItemDescription: MasterData['Item Description'],
          Warehouse: MasterData.Warehouse,
          SubInv: 'Pickline',
          MortgagedQty: MasterData['Mortgaged ABO Qty'],
          BookQty: ((MasterData['Subinventory PICKLINE Qty']) - (MasterData['Mortgaged ABO Qty']))
        }); 
      } else {
        console.log("Equal or less than zero");
      }
       //--------------------------------------- Creating data for XREWK SUBINV ----------------------------------
      if (MasterData['Subinventory XREWK Qty'] > 0) {
        ShopCountMaster.create({
          Item: MasterData.Item,
          OracleItem: MasterData['Oracle Item'],
          ItemDescription: MasterData['Item Description'],
          Warehouse: MasterData.Warehouse,
          SubInv: 'Xrewk',
          MortgagedQty: 0,
          BookQty: MasterData['Subinventory XREWK Qty']
        });
      } else {
        console.log("XREWK Qty is equal to 0");
      }
       //--------------------------------------- Creating data for TEST SUBINV ----------------------------------
      if (MasterData['Subinventory TEST Qty'] > 0) {
        ShopCountMaster.create({
          Item: MasterData.Item,
          OracleItem: MasterData['Oracle Item'],
          ItemDescription: MasterData['Item Description'],
          Warehouse: MasterData.Warehouse,
          SubInv: 'Test',
          MortgagedQty: 0,
          BookQty: MasterData['Subinventory TEST Qty']
        });
      } else {
        console.log("TEST Qty is equal to 0");
      }
       //--------------------------------------- Creating data for ABGIL SUBINV ----------------------------------
      if (MasterData['Subinventory ABGIL Qty'] > 0) {
        ShopCountMaster.create({
          Item: MasterData.Item,
          OracleItem: MasterData['Oracle Item'],
          ItemDescription: MasterData['Item Description'],
          Warehouse: MasterData.Warehouse,
          SubInv: 'Abgil',
          MortgagedQty: 0,
          BookQty: MasterData['Subinventory ABGIL Qty']
        });
      } else {
        console.log("ABGIL Qty is equal to 0");
      }
       //--------------------------------------- Creating data for OverLabel SUBINV ----------------------------------
       if (MasterData['Subinventory OVERLABEL Qty'] > 0) {
        ShopCountMaster.create({
          Item: MasterData.Item,
          OracleItem: MasterData['Oracle Item'],
          ItemDescription: MasterData['Item Description'],
          Warehouse: MasterData.Warehouse,
          SubInv: 'Over Label',
          MortgagedQty: 0,
          BookQty: MasterData['Subinventory OVERLABEL Qty']
        });
      } else {
        console.log("Overlabel Qty is equal to 0");
      }
       //--------------------------------------- Creating data for HOLD SUBINV ----------------------------------
       if (MasterData['Subinventory HOLD Qty'] > 0) {
        ShopCountMaster.create({
          Item: MasterData.Item,
          OracleItem: MasterData['Oracle Item'],
          ItemDescription: MasterData['Item Description'],
          Warehouse: MasterData.Warehouse,
          SubInv: 'Hold',
          MortgagedQty: 0,
          BookQty: MasterData['Subinventory HOLD Qty']
        });
      } else {
        console.log("Hold Qty is equal to 0");
      }
       //--------------------------------------- Creating data for Display SUBINV ----------------------------------
       if (MasterData['Subinventory DISPLAY Qty'] > 0) {
        ShopCountMaster.create({
          Item: MasterData.Item,
          OracleItem: MasterData['Oracle Item'],
          ItemDescription: MasterData['Item Description'],
          Warehouse: MasterData.Warehouse,
          SubInv: 'Display',
          MortgagedQty: 0,
          BookQty: MasterData['Subinventory DISPLAY Qty']
        });
      } else {
        console.log("Display Qty is equal to 0");
      }
       //--------------------------------------- Creating data for Cafe SUBINV ----------------------------------
       if (MasterData['Subinventory CAFE Qty'] > 0) {
        ShopCountMaster.create({
          Item: MasterData.Item,
          OracleItem: MasterData['Oracle Item'],
          ItemDescription: MasterData['Item Description'],
          Warehouse: MasterData.Warehouse,
          SubInv: 'Cafe',
          MortgagedQty: 0,
          BookQty: MasterData['Subinventory CAFE Qty']
        });
      } else {
        console.log("Cafe Qty is equal to 0");
      }
       //--------------------------------------- Creating data for Repair SUBINV ----------------------------------
       if (MasterData['Subinventory REPAIR Qty'] > 0) {
        ShopCountMaster.create({
          Item: MasterData.Item,
          OracleItem: MasterData['Oracle Item'],
          ItemDescription: MasterData['Item Description'],
          Warehouse: MasterData.Warehouse,
          SubInv: 'Repair',
          MortgagedQty: 0,
          BookQty: MasterData['Subinventory REPAIR Qty']
        });
      } else {
        console.log("Repair Qty is equal to 0");
      }
       //--------------------------------------- Creating data for Variance SUBINV ----------------------------------
       if (MasterData['Subinventory VARIANCE Qty'] > 0) {
        ShopCountMaster.create({
          Item: MasterData.Item,
          OracleItem: MasterData['Oracle Item'],
          ItemDescription: MasterData['Item Description'],
          Warehouse: MasterData.Warehouse,
          SubInv: 'Variance',
          MortgagedQty: 0,
          BookQty: MasterData['Subinventory VARIANCE Qty']
        });
      } else {
        console.log("Variance Qty is equal to 0");
      }
     //console.log("finished");
    });
    //next();
    console.log("finished");
    //var updateShopCountFlagStatus = await sequelize.query('update shopcountmasters SET flag = "N"',{type: QueryTypes.UPDATE, mapToModel: true});
    //console.log("Updated the flag status of shop count");
  }).then(result => {
    sequelize.query('update shopcountmasters SET flag = "N"',{type: QueryTypes.UPDATE, mapToModel: true});
    console.log("Updated the flag status of shop count");
  }); */



  //var updateShopCountFlagStatus = await sequelize.query('update shopcountmasters SET flag = "Y"', {type: QueryTypes.UPDATE, mapToModel: true});
  //console.log("Updated the Flag status of shopcount");
  var compareBookCountShopMasters = await sequelize.query('select  s.OracleItem, s.ItemDescription,s.Warehouse,s.SubInv,s.BookQty from shopcountmasters s, bookcounts b where  s.OracleItem=b.aOracleItem and s.Warehouse=b.aWarehouse and s.SubInv=b.aSubInv and s.BookQty=b.Quantity', {type: QueryTypes.SELECT, mapToModel: true});
  console.log(compareBookCountShopMasters);
  Shopbookcount.destroy({
    where: {},
    truncate: true
});
  Shopbookcount.bulkCreate(compareBookCountShopMasters, {
    returning: true
  }).then(r => {
     console.log("Successfully inserted data into shopbookcount table");
  })
  .catch(err => console.log(err));
  var dataNotEqual = await sequelize.query('select  s.OracleItem, s.ItemDescription,s.Warehouse,s.SubInv,s.BookQty,b.Quantity from shopcountmasters s, bookcounts b where  s.OracleItem=b.aOracleItem and s.Warehouse=b.aWarehouse and s.SubInv=b.aSubInv and s.BookQty!=b.Quantity', {type: QueryTypes.SELECT, mapToModel: true});
  console.log(dataNotEqual);
  ShopCountVariance.destroy({
    where: {},
    truncate: true
  });
  ShopCountVariance.bulkCreate(dataNotEqual, {
    returning: true
  }).then(r => {
    console.log("Inserted the not equal data into shop count varaiance table");
  })
  .catch(err => console.log(err));

    //------------------------------------------------------ Card data to display in front end --------------------------------------------------------------------
    var shopMasterCardData = await sequelize.query('SELECT count(DISTINCT OracleItem) as ItemCard, sum(BookQty) as SumQtyCard FROM shopcountmasters',{type: QueryTypes.SELECT, mapToModel: true});
    //console.log(teamaCardData); //[ { ItemCard: 1, SumQtyCard: 188 } ]
    var bookCountData = await sequelize.query('SELECT count(DISTINCT aOracleItem) as ItemCard, sum(Quantity) as SumQtyCard FROM bookcounts',{type: QueryTypes.SELECT, mapToModel: true});
    //console.log(teambCardData);
  
    //---------------------------------------------------------- Width control in the card data---------------------------------------------------------------------

    if ((shopMasterCardData[0].SumQtyCard) > (bookCountData[0].SumQtyCard)) {
      var diff = (shopMasterCardData[0].SumQtyCard) - (bookCountData[0].SumQtyCard);
      var width = 100-((diff * 100) / (shopMasterCardData[0].SumQtyCard));
      var myWidth = width+"%";
      //document.getElementById('myWidth').style.width = myWidth;
  } else if ((shopMasterCardData[0].SumQtyCard) < (bookCountData[0].SumQtyCard)) { 
     var diff = (shopMasterCardData[0].SumQtyCard) - (bookCountData[0].SumQtyCard); 
     var width = 100-((diff * 100) / (bookCountData[0].SumQtyCard));
     var myWidth = width+"%";
    // document.getElementById('myWidth').style.width = myWidth;
 } else {
   var myWidth = 100+"%";
  // document.getElementById('myWidth').style.width = myWidth;
 } 
 console.log(myWidth); 

  ShopCountVariance.findAll().then(function (shopcountvariancedata) {
    res.render('userviews/shopcountvariance', {newShopVarianceDatas: shopcountvariancedata, shopMasterCardDatas: shopMasterCardData, bookCountDatas: bookCountData, width: myWidth});
  });
};

exports.getShopReReCountPage = (req,res,next) => {
   res.render('userviews/shopcountvariance');
};

exports.getAddLocationPage = (req,res,next) => {
   res.render('userviews/addlocation');
};

exports.postAddLocationPage = (req,res,next) => {

  var subinventory = req.body.subinventory;
  var location = req.body.location;

  console.log(req.body);

  Userlocation.create({subinventory: subinventory, location: location})
  .then(r => {
    res.redirect("/user/addlocation");
    alert("Successfully added location");
  })
  .catch(err => console.log(err));

  //console.log("something"); 
};

exports.getEditBookCountPage = (req,res,next) => {
  const myId = req.params.id;
  //console.log(myId);
  BookCount.findOne({ where: {id: myId} }).then(function(bookcount) {
    res.render('userviews/editform', {newBookCountData: bookcount});
 });
};

exports.postEditBookCountPage = (req,res,next) => {
   const myId = req.body.id;
   const newQuantity = req.body.newQuantity;
   BookCount.update({Quantity: newQuantity},{where:{id:myId}}).then(result=>{
     res.redirect('/user/bookcountreport');
     alert("Successfully updated the record");
   });
};