// database.js

// Function to initialize the IndexedDB database
function initializeDatabase() {
    // Open or create a database
    let request = window.indexedDB.open('VendorDetailsDB', 1);
  
    // Handle database creation or upgrade
    request.onupgradeneeded = function(event) {
      let db = event.target.result;
  
      // Create an object store (table) to store vendor details
      let objectStore = db.createObjectStore('vendors', { keyPath: 'id', autoIncrement: true });
  
      // Define the structure of the data to be stored
      objectStore.createIndex('companyname', 'companyname', { unique: false });
      objectStore.createIndex('email', 'email', { unique: true });
      // Add more fields as needed
  
      console.log('Database setup complete.');
    };
  
    request.onerror = function(event) {
      console.error('Database error: ' + event.target.errorCode);
    };
  }
  
  // Function to save vendor details to the database
  function saveVendorDetails(details) {
    let request = window.indexedDB.open('VendorDetailsDB');
  
    request.onsuccess = function(event) {
      let db = event.target.result;
      let transaction = db.transaction(['vendors'], 'readwrite');
      let objectStore = transaction.objectStore('vendors');
  
      let addRequest = objectStore.add(details);
      
      addRequest.onsuccess = function(event) {
        console.log('Vendor details added to database.');
      };
  
      addRequest.onerror = function(event) {
        console.error('Error adding vendor details: ' + event.target.error);
      };
    };
  }
  
  // Call the function to initialize the database when the script is loaded
  initializeDatabase();
  