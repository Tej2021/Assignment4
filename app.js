/*
Name: Tej Parekh
ID: 144914207
Email: tpparekh@myseneca.ca
*/
const express = require (`express`);
const exphbs = require (`express-handlebars`);
const bodyParser = require(`body-parser`);
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const mongoose = require(`mongoose`);
const methodOverride = require('method-override');

const bcrypt = require(`bcryptjs`);
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("B4c0/\/", salt);
const session = require(`express-session`);


require("dotenv").config({path:'./keys.env'});


const generalRoutes = require("./routes/General");


const app = express();


app.use(bodyParser.urlencoded({extended: false}));

app.use(methodOverride('_method'));


app.use(express.static(`public`));


app.use("/", generalRoutes);


app.engine(`handlebars`, exphbs());
app.set(`view engine`, `handlebars`);


const DBURL = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@cluster0-swotc.mongodb.net/${process.env.db_collection}?retryWrites=true&w=majority`;

mongoose.connect(DBURL, {useNewUrlParser: true, useUnifiedTopology: true})

.then(()=>{
    console.log(`Database is connected`)
})

.catch(err=>{
    console.log(`Something went wrong : ${err}`);
})

let Schema = mongoose.Schema;

let taskSchema = new Schema({
    userName: {
            type: String,
            required: true
    },
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    selectMonth: {
        type: String,
        required: true
    },
    selectDay: {
        type: Number,
        required : true
    },
    selectYear: {
        type: Number,
        required: true
    }
});


let Tasks = mongoose.model('Tasks', taskSchema);


app.get(`/room`, (req, res)=>{
    res.render(`room`);
})


app.get(`/reg`, (req, res)=>{
    res.render(`register`);
})


app.post(`/reg`, (req, res)=>{
    const errors = [];
    if(req.body.userName == "")
        errors.push(`Please enter username`);

    if(req.body.email == "")
        errors.push(`Please enter Email Address`);


    if(req.body.firstName == "")
        errors.push(`Please enter First Name`);

    if(req.body.lastName == "")
        errors.push(`Please enter Last Name`);

    if(req.body.password == "" || req.body.password.length < 6 || req.body.password.length > 12 || req.body.password !== req.body.passwordd)
        errors.push(`Please enter password between 6 to 12 characters only & password must be matching`);
    
    if(req.body.selectMonth == "Month" || req.body.selectDay == "Day" || req.body.selectYear == "Year")
        errors.push(`Incorrect Date input not allowed!`);

    if(errors.length > 0){
        res.render(`register`, {
        register:errors
        
        })
    }

    else {
       
        const formData ={
            userName:req.body.userName,
            email:req.body.email,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            password:req.body.password,
            selectMonth:req.body.selectMonth,
            selectDay:req.body.selectDay,
            selectYear:req.body.selectYear
        }
        
        
        const ta = new Tasks(formData);
        ta.save()
        .then(() => {
        console.log('Task was inserted into database')
        })

        .catch((err)=>{
            console.log(`Task was not inserted into the database because ${err}`)
        })




       
        const options = {
            auth: {
                api_key: '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'
            }
        }
        
        const mailer = nodemailer.createTransport(sgTransport(options));
        
        const email = {
            to: `${req.body.email}`,
            from: 'tejparekh2015@gmail.com',
            subject: `Registration is Successfully done! Room Booking is opened for you!`,
            text: `Dear ${req.body.firstName} ${req.body.lastName}, your email address: ${req.body.email} has been registered`,
            html: `Dear ${req.body.firstName} ${req.body.lastName}, your email address: ${req.body.email} has been registered`
        };
                 
        mailer.sendMail(email, (err, res)=> {
            if (err) { 
                console.log(err) 
            }
        
           console.log(res);
        });
        
        
        res.redirect("/dashboard");
    }
})


app.get(`/dashboard`, (req, res)=>{
    res.render("userDashboard");
    Tasks.find()
    .then ((products)=>{
        res.render("ProductListing",{
            lists:products
        });
    })
    .catch(err=> console.log(`Error: ${err}`));
})


app.get(`/login`, (req, res)=>{
    res.render(`login`);
})

app.post(`/login`, (req, res)=>{
    const errors = [];

    if(req.body.name == "" || req.body.pLogin == "")
        errors.push(`username OR password is incorrect`);

    if(errors.length > 0){
        res.render(`login`, {
        login:errors
        })
    }

    else {

        res.redirect("/login");
    }
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Room Booking Server is listening PORT: ${PORT}`);
})