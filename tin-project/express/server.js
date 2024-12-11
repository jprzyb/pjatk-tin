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
        res.render('pages/index', { user: req.session.user });
    } else {
        res.redirect('/login');
    }
})

app.get('/campaigns', async (req, res) => { // Dodajemy async do funkcji, aby używać await
    if (req.session.user) {
        try {
            const campaigns = await fetchCampaigns(req.session.user.id);
            res.render('pages/campaigns', { user: req.session.user, campaigns: JSON.stringify(campaigns) });
        } catch (error) {
            res.status(500).send('Error fetching campaigns');
        }
    } else {
        res.redirect('/login');
    }
});

app.get('/campaignDetails', async (req, res) => {
    const id = req.query.id;
    if (req.session.user) {
        try {
            const campaign = await fetchCampaign(id);
            const creations = await fetchCreations(campaign.id);
            res.render('pages/campaign', { user: req.session.user, campaign:campaign, creations: JSON.stringify(creations) });
        } catch (error) {
            res.status(500).send('Error fetching campaign');
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

app.get('/new_creation', async (req, res) => {
    const id = req.query.id;
    if (req.session.user) {
        res.render('pages/new_creation', { user: req.session.user, id: id });
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

app.post('/api/campaign', async (req, res) => {
    try {
        // console.log("/api/campaign got: ", req.body);
        // console.log("/api/campaign sends: ", JSON.stringify(req.body));

        // Forward the request body to the backend service
        const response = await fetch(`http://localhost:8080/api/campaign`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // console.log("/api/campaign response: ",data);

        res.json(data); // Send the response back to the client
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message }); // Send error response
    }
});

app.post('/api/create_creation', async (req, res) => {
    // console.log("/api/campaign input: ", req.body);
    // console.log("/api/campaign output: ", JSON.stringify(req.body));
    try {
        const response = await fetch(`http://localhost:8080/api/create_creation`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // console.log("/api/campaign response: ", JSON.stringify(data));
        res.json(data);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/update_campaign', async (req, res) => {
    console.log("/api/update_campaign input: ", req.body);
    console.log("/api/update_campaign output: ", JSON.stringify(req.body));
    try {
        const response = await fetch(`http://localhost:8080/api/update_campaign`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("/api/update_campaign response: ", JSON.stringify(data));
        res.json(data);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
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

const fetchCampaign = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/api/campaign?id=${encodeURIComponent(id)}`, {
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

const fetchCreations = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/api/creations_by_camp_id?id=${encodeURIComponent(id)}`, {
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
}