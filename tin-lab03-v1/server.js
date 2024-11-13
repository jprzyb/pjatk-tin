var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

app.get('/', function(req, res) {
    res.render('pages/index');
});

app.get('/taska', function(req, res) {
    res.render('pages/taska');
});

app.get('/taskb', function(req, res) {
    res.render('pages/taskb');
});

app.get('/taskc', function(req, res) {
    res.render('pages/taskc');
});

app.get('/taskd', function(req, res) {
    res.render('pages/taskd');
});

app.get('/taskE', function(req, res) {
    res.render('pages/taske');
});

app.get('/form_results_taskb', (req, res) => {
    const { name, email, age } = req.query;

    res.render('pages/form_results_taskb', { name, email, age });
});

app.get('/form_results_taskc', (req, res) => {
    const { name, email, age } = req.query;

    let error = "";
    let valid = true;

    if (name.length < 3) {
        valid = false;
        error += "name_too_short_should_be_longer_than_3_characters AND ";
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        valid = false;
        error  += "invalid_email_format AND ";
    }

    if (age < 18 || age > 120) {
        valid = false;
        error += "invalid_age_should_be_between_18_and_120 AND "
    }

    if (valid) {
        res.render('pages/form_results_taskb', { name, email, age });

    }
    else{
        res.render('pages/results_form_error', { error });
    }
});

app.get('/form_results_taskd', (req, res) => {
    const { name, email, age, phone } = req.query;

    let error = "";
    let valid = true;

    if (name.length < 3) {
        valid = false;
        error += "name_too_short_should_be_longer_than_3_characters AND ";
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        valid = false;
        error  += "invalid_email_format AND ";
    }

    if (age < 18 || age > 120) {
        valid = false;
        error += "invalid_age_should_be_between_18_and_120 AND "
    }

    const p_regex = /^\d{3}-\d{3}-\d{3}$/;
    if (!p_regex.test(phone)) {
        valid = false;
        error += "invalid_phone_number_should_be_like_111-222-333"
    }

    if (valid) {

        let id ="";

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

        res.render('pages/form_results_taskd', { id });

    }
    else{
        res.render('pages/results_form_error', { error });
    }
});

app.listen(3000);
app.listen(8080);
console.log('Server is listening on port 3000 and 8080');