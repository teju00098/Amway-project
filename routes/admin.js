const path = require('path');
const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

//admin dashboard
router.get('/dashboard',adminController.getIndex);

//admin-PostCSV file
router.post('/upload',adminController.addMaster);

//admin login page
router.get('/',adminController.getLoginPage);
router.post('/login',adminController.postLoginPage);

//admin signup page
router.get('/signup',adminController.getSignupPage);
router.post('/signup/post',adminController.postSignupPage);

//admin location page
router.get('/location',adminController.getLocationPage);
router.get('/location/list',adminController.getLocationListPage);
router.get('/location/import',adminController.getLocationImportPage);
router.post('/location/post',adminController.postLocationPage);
router.post('/location/import/post',adminController.postLocationImportPage);

//admin activity list page
router.get('/activitylist',adminController.getActivityListPage);

//admin wto plan page
router.get('/wtoplan',adminController.getWtoPlanPage);

//admin branch data page
router.get('/branch',adminController.getBranchDataPage);

//admin cost class page
router.get('/costclass',adminController.getCostClassPage);

//admin excel file
router.get('/excel',adminController.getExcel);
router.post('/excel/post',adminController.postExcelPage);

//admin branch import and post
router.get('/branch/import',adminController.getBranchImport);
router.post('/branch/post',adminController.postBranchPage);

//admin uom import and post
router.get('/uom/import',adminController.getUomImport);
router.post('/uom/post',adminController.postUomPage);

//admin uom list page
router.get('/uom/list',adminController.getUomListPage);

//admin recode import and post
router.get('/recode/import',adminController.getRecodeImportPage);
router.post('/recode/import/post',adminController.postRecodeImportPage);

//admin uom list page
router.get('/recode/list',adminController.getRecodeListPage);

//admin post route for uploading the folder with csv file
router.post('/uploadfolder/post',adminController.postUploadFolder);

//admin get and post routes for black market import 
router.get('/blackmarket/import',adminController.getBlackMarketImportPage);
router.get('/blackmarket/list',adminController.getBlackMarketlistPage);
router.post('/blackmarket/import/post',adminController.postBlackMarketImportPage);

module.exports = router;
