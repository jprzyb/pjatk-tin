let express = require('express');
const cors = require('cors');
const res = require("express/lib/response");
let app = express();

app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', function(req, res) {
    res.render('pages/index');
});

app.get('/taska', (req, res) => {
    res.render('pages/taska');
});

app.get('/taskb', (req, res) => {
    res.render('pages/taskb');
});

//backend task a
app.post('/taska_submit', (req, res) => {

    let {valid, error} = validateWithPhone(req.body.name, req.body.email, req.body.age, req.body.phone);

    if(valid){
        res.json({ message: 'Gen. ID: ' + generateId(req.body.name, req.body.email, req.body.age, req.body.phone) });
    }
    else res.json({message: error})
});

function generateId(name='a', email='a', age='0', phone='000-000-000') {
    let id = "";

    id += name.toUpperCase().charAt(0);

    id += email.split('@')[0].charAt(0);
    id += email.split('.')[1].charAt(0);

    id += "-"+age+"-";

    id += phone.split("-")[0].charAt(0);
    id += phone.split("-")[1].charAt(1);
    id += phone.split("-")[2].charAt(2);

    let date = Date.now().toString();

    id += '-'+date.charAt(date.length-1);
    id += date.charAt(date.length-2);

    return id;
}
function validate(name, email, age) {
    let error = "";
    let valid = true;

    name = String(name || "");
    if (name.length < 3) {
        valid = false;
        console.log("name error" + valid + " " + name)
        error += "name_too_short_should_be_longer_than_3_characters AND ";
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    email = String(email || "");

    if (!regex.test(email)) {
        valid = false;
        console.log("email error: " + valid+ " " + email);
        error += "invalid_email_format AND ";
    }

    if (age < 18 || age > 120) {
        valid = false;
        console.log("age error: " + valid)
        error += "invalid_age_should_be_between_18_and_120 AND "
    }
    return { valid, error };
}
function validateWithPhone(name, email, age, phone) {

    let {valid, error} = validate(name, email, age);

    const p_regex = /^\d{3}-\d{3}-\d{3}$/;
    if (!p_regex.test(phone)) {
        valid = false;
        console.log("phone error: " + valid)
        error += "invalid_phone_number_should_be_like_111-222-333"
    }
    return {valid, error};
}

app.listen(3000);
app.listen(8080);
console.log('Server is listening on port 3000 and 8080');