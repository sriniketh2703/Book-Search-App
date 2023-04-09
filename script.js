"use strict";

// Necessary variables required for the project
const inputArea = document.querySelector(".inputArea");
const book_container = document.querySelector(".book-details_container");
const btn = document.querySelector("button");
const book_name = document.querySelector(".book-name");
const author_name = document.querySelector(".author-name");
const publisher_name = document.querySelector(".publisher-name");
const Category = document.querySelector(".category");
const page_count = document.querySelector(".page-count");
const rating = document.querySelector(".rating");
const image = document.querySelector("img");

// Adds the "Active" class (starts the animation)
inputArea.addEventListener("input", () => {
  inputArea.classList.add("active");
});

function start(inputData) {
  // Fetching API using Fetch() method
  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${inputData}&filter=ebooks&printType=books&orderBy=relevance&maxResults=1&key=AIzaSyDLsJuC_wPAMErWoJYq1Ayhe7x8zNpMDbA`
  )
    .then((response) => response.json())
    .then((data) => {
      // Storing Data in a variable
      const book = data.items[0];
      const title = book.volumeInfo.title;
      const author = book.volumeInfo.authors[0];
      const page_Count = book.volumeInfo.pageCount;
      const publication = book.volumeInfo.publisher;
      const category = book.volumeInfo.categories;
      const averageRating = book.volumeInfo.averageRating;
      const thumbnail = book.volumeInfo.imageLinks.thumbnail;

      // Displays the data which was stored in a variable
      book_name.textContent = "Book: " + title;
      author_name.textContent = "Author: " + author;
      page_count.textContent = "Page Count: " + page_Count;
      publisher_name.textContent = "Publisher: " + publication;
      Category.textContent = "Category: " + category;
      rating.textContent = "Average Rating: " + "⭐".repeat(averageRating);
      image.src = thumbnail;
      image.alt = "This is the cover of " + book_name.textContent;
      book_container.classList.remove("hide");
    })
    .catch((error) => console.log("Error: " + error.message));
}

btn.addEventListener("click", () => {
  // calls the Start function
  start(inputArea.value);

  // Removes the "Active" class (removes animation)
  inputArea.classList.remove("active");

  // Make the input value empty
  inputArea.value = "";
});
