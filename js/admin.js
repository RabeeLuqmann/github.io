// Default admin password (change this for security)
const ADMIN_PASSWORD = "admin123";

// Login function
function login() {
  const input = document.getElementById('adminPassword').value;
  if (input === ADMIN_PASSWORD) {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('adminContent').style.display = 'block';
    loadData(); // Load existing data into form fields
  } else {
    alert("Incorrect password!");
  }
}

// Load data.json and fill form fields
function loadData() {
  fetch('data.json')
    .then(res => res.json())
    .then(data => {
      document.getElementById('profilePhotoInput').value = data.profilePhoto;
      document.getElementById('twitterInput').value = data.social.twitter;
      document.getElementById('facebookInput').value = data.social.facebook;
      document.getElementById('instagramInput').value = data.social.instagram;
      document.getElementById('amazonInput').value = data.social.amazon;
    })
    .catch(err => console.error(err));
}

// Update profile photo
function updateProfilePhoto() {
  const url = document.getElementById('profilePhotoInput').value;
  fetchAndUpdate({ profilePhoto: url });
}

// Update social links
function updateSocial() {
  const social = {
    twitter: document.getElementById('twitterInput').value,
    facebook: document.getElementById('facebookInput').value,
    instagram: document.getElementById('instagramInput').value,
    amazon: document.getElementById('amazonInput').value
  };
  fetchAndUpdate({ social: social });
}

// Add new book
function addBook() {
  const title = document.getElementById('bookTitle').value;
  const desc = document.getElementById('bookDesc').value;
  const cover = document.getElementById('bookCover').value;
  const link = document.getElementById('bookLink').value;

  if (!title || !desc) {
    alert("Please fill in title and description");
    return;
  }

  fetch('data.json')
    .then(res => res.json())
    .then(data => {
      const newBook = {
        id: Date.now(),
        title: title,
        description: desc,
        cover: cover || "https://via.placeholder.com/150x200",
        link: link || "#"
      };
      data.books.push(newBook);
      saveData(data);
      alert("Book added!");
      document.getElementById('bookTitle').value = '';
      document.getElementById('bookDesc').value = '';
      document.getElementById('bookCover').value = '';
      document.getElementById('bookLink').value = '';
    })
    .catch(err => console.error(err));
}

// Export data.json
function exportData() {
  fetch('data.json')
    .then(res => res.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.json';
      a.click();
    })
    .catch(err => console.error(err));
}

// Import data.json
function importData() {
  const file = document.getElementById('importFile').files[0];
  if (!file) { alert("Please select a file!"); return; }

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      saveData(data);
      alert("Data imported successfully!");
    } catch(err) {
      alert("Invalid JSON file!");
    }
  };
  reader.readAsText(file);
}

// Utility: fetch data.json, update keys, and save
function fetchAndUpdate(updateObj) {
  fetch('data.json')
    .then(res => res.json())
    .then(data => {
      const newData = { ...data, ...updateObj };
      saveData(newData);
      alert("Updated successfully!");
    })
    .catch(err => console.error(err));
}

// Save data.json (on GitHub Pages, this cannot actually write files; you would need server or manual edit)
function saveData(data) {
  // On GitHub Pages, we cannot save automatically.
  // For real functionality, use export button to download and manually replace data.json
  console.log("Data ready to save:", data);
  alert("Data updated in memory! Use Export to save changes to your computer.");
}
