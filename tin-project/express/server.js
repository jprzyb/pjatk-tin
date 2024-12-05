const express = require('express')
const session = require('express-session');
const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));
app.use(express.json());

app.use(session({
    secret: 'this-is-the-key-11',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// EndPoints

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

app.get('/', (req, res) => {
    res.redirect('/login');
})

app.get('/login', (req, res) => {
    res.render('pages/login', {error: ''});
})

app.get('/index', (req, res) => {
    if (req.session.user) {
        // console.log('[/index] Req session usr.: ', req.session.user);
        res.render('pages/index', { user: req.session.user });
    } else {
        res.redirect('/login');
    }
})

app.get('/campaigns', async (req, res) => { // Dodajemy async do funkcji, aby używać await
    if (req.session.user) {
        // console.log('[/campaigns] Req session usr.: ', req.session.user);
        try {
            const campaigns = await fetchCampaigns(req.session.user.id);
            // console.log('[/campaigns] Campaigns: ', campaigns);
            res.render('pages/campaigns', { user: req.session.user, campaigns: JSON.stringify(campaigns) });
        } catch (error) {
            // console.error('Error fetching campaigns:', error);
            res.status(500).send('Error fetching campaigns');
        }
    } else {
        res.redirect('/login');
    }
});

app.get('/new_campaign', async (req, res) => {
    if (req.session.user) {
        // console.log('[/new_campaign] Req session usr.: ', req.session.user);
        const clients = await fetchClients();
        res.render('pages/new_campaign', { user: req.session.user, clients: JSON.stringify(clients) });
    } else {
        res.redirect('/login');
    }
})

app.get('/user', async (req, res) => {
    if (req.session.user) {
        // console.log('[/user] Req session usr.: ', req.session.user);
        res.render('pages/user', { user: req.session.user });
    } else {
        res.redirect('/login');
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/index');
        }
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
});

//API communication

app.get('/api/login', async (req, res) => {
    const { login, password } = req.query;

    try {
        const response = await fetch(`http://localhost:8080/api/login?login=${encodeURIComponent(login)}&password=${encodeURIComponent(password)}`);

        if (response.ok) {
            const userData = await response.json();
            req.session.user = await fetchEmployee(userData.empId);
            res.json({ message: 'Valid login', user: req.session.user });
        } else {
            res.status(401).send('Invalid login!');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server Error');
    }
});

//fetch functions

const fetchEmployee = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/api/employee?id=${encodeURIComponent(id)}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

const fetchCampaigns = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/api/campaigns?id=${encodeURIComponent(id)}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

const fetchClients = async () => {
    try {
        const response = await fetch(`http://localhost:8080/api/clients`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};