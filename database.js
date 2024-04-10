const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database
const db = new sqlite3.Database('./vendors.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the vendors database.');
    }
});

// Function to initialize the database
function initializeDatabase() {
    db.run(`CREATE TABLE IF NOT EXISTS vendors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        companyname TEXT,
        email TEXT UNIQUE
        -- Add more fields as needed
    )`, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Table "vendors" created successfully.');
        }
    });
}

// Function to save vendor details to the database
function saveVendorDetails(details) {
    const sql = `INSERT INTO vendors (companyname, email) VALUES (?, ?)`;
    const params = [details.companyname, details.email];

    db.run(sql, params, function(err) {
        if (err) {
            console.error('Error inserting vendor details:', err.message);
        } else {
            console.log(`Vendor details added to database with ID ${this.lastID}.`);
        }
    });
}

// Call the function to initialize the database
initializeDatabase();

// Example usage:
const vendorDetails = {
    companyname: 'Example Company',
    email: 'example@example.com'
    // Add more fields as needed
};

saveVendorDetails(vendorDetails);

// Close the database connection when done
process.on('exit', () => {
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Closed the database connection.');
    });
});
