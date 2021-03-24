const cookieParser = require('cookie-parser');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const errorController = require('./controllers/error');
const fs = require('fs');
const csv = require('csv-parser');
var upload = multer({ dest: 'upload/'});

//import db
const sequelize = require('./util/database');
//const sequelize1 = require('./util/database');

//import models
const Master = require('./models/master');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({dest:'upload/'}).single('recfile'));

//app.use(adminRoutes);
app.use('/admin',adminRoutes);

//app.use(userRoutes);
app.use('/user',userRoutes);

app.use(errorController.get404);

sequelize
.sync()
//.sync({force:true})
 .then(result=>{
   //console.log(result);
   app.listen(8080);
 })
 .catch(err=>console.log(err));





 
