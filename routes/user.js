const path = require('path');
const express = require('express');

const userController = require('../controllers/user');
const { route } = require('./admin');

const router = express.Router();

//user download page
router.get('/listwto',userController.getListWtoPage);
router.get('/wtodownload',userController.getWtoDownloadPage);

//user download the database for team count and shop count
router.get('/download',userController.getDownload);
router.get('/shop/download',userController.getShopDownload);
router.get('/shopcount/download',userController.getShopCountDownload);

//user get route for the team count and shop count calculate page
router.get('/teamcount',userController.getTeamCountPage);
router.get('/shopcount',userController.getShopCountPage);

//user upload the csv files to the system for comparison
router.get('/upload/teamcsv',userController.getUserUploadPage);
router.post('/upload/team/csv',userController.postUploadTeamCsv);

//user get route for variance report and team variance report
router.get('/variancereport',userController.getVarianceReport);
router.get('/teamvariance',userController.getTeamVarianceReport);

//user get route for book count report
router.get('/bookcountreport',userController.getBookCountReport);
router.get('/shopbookcount',userController.getShopBookCountPage);

//user get & post route for setup page and set cookie
router.get('/setuppage',userController.getSetUpPage);
router.post('/setuppage/post',userController.postSetUpPage);

//user get route to get the cookie stored 
router.get('/getcookie',userController.getStoredWarehouse);

//user get route for shop recount page
router.get('/shoprecount',userController.getShopRecountPage);
router.get('/shopvariance',userController.getShopVariancePage);

//user get route when clikced on calculate in shop count 
router.get('/shopcount/calculate',userController.getShopCountCalculate);

//user get the shop recount route
router.get('/shoprerecount',userController.getShopReReCountPage);

//user get and post route for add location page
router.get('/addlocation',userController.getAddLocationPage);
router.post('/addlocation/post',userController.postAddLocationPage);

//user get route for editing in the team book count report
router.get('/edit/teambookcount/:id',userController.getEditBookCountPage);
router.post('/edit/teambookcount',userController.postEditBookCountPage);
module.exports = router;