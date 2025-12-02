// Fetch data from data.json and populate the page
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Set profile photo
    const profilePhoto = document.getElementById('profilePhoto');
    profilePhoto.src = data.profilePhoto;

    // Set social links
    const socialLinksDiv = document.getElementById('socialLinks');
    socialLinksDiv.innerHTML = '';
    for (const [key, url] of Object.entries(data.social)) {
      const iconClass = {
        twitter: 'fab fa-twitter',
        facebook: 'fab fa-facebook',
        instagram: 'fab fa-instagram',
        amazon: 'fab fa-amazon'
      }[key] || 'fas fa-link';

      const a = document.createElement('a');
      a.href = url;
      a.target = "_blank";
      a.className = 'social-icon';
      a.innerHTML = `<i class="${iconClass}"></i>`;
      socialLinksDiv.appendChild(a);
    }

    // Display books
    const booksGrid = document.getElementById('booksGrid');
    booksGrid.innerHTML = '';
    data.books.forEach(book => {
      const div = document.createElement('div');
      div.className = 'book-card';
      div.innerHTML = `
        <img src="${book.cover}" alt="${book.title}">
        <h3>${book.title}</h3>
        <p>${book.description}</p>
        <a href="${book.link}" target="_blank" class="buy-btn">Buy Now</a>
      `;
      booksGrid.appendChild(div);
    });
  })
  .catch(err => console.error('Error loading data:', err));
