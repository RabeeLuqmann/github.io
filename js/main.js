fetch('data.json')
  .then(response => response.json())
  .then(data => {
    document.getElementById('profilePic').src = data.profilePhoto;

    const socialLinks = document.getElementById('socialLinks');
    socialLinks.innerHTML = `
      <a href="${data.social.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>
      <a href="${data.social.facebook}" target="_blank"><i class="fab fa-facebook"></i></a>
      <a href="${data.social.instagram}" target="_blank"><i class="fab fa-instagram"></i></a>
      <a href="${data.social.amazon}" target="_blank"><i class="fab fa-amazon"></i></a>
    `;

    const booksContainer = document.getElementById('booksContainer');
    data.books.forEach(book => {
      const bookCard = document.createElement('div');
      bookCard.className = 'book-card';
      bookCard.innerHTML = `
        <img src="${book.cover}" class="book-cover" alt="${book.title}">
        <h3 class="book-title">${book.title}</h3>
        <p class="book-description">${book.description}</p>
        <a href="${book.link}" target="_blank" class="buy-btn">Buy Now</a>
      `;
      booksContainer.appendChild(bookCard);
    });
  })
  .catch(err => console.error('Error loading data.json:', err));
