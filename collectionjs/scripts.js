document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("grid");

  // Array of card data (placeholders)
  const cardData = [
    { title: "Nature", description: "Explore the beauty of nature with stunning landscapes and vibrant ecosystems.", category: "nature" },
    { title: "Technology", description: "Discover the latest in technology, from gadgets to innovative solutions.", category: "technology" },
    { title: "People", description: "Capture the essence of human experiences through diverse and impactful portraits.", category: "people" },
    { title: "Architecture", description: "Marvel at the incredible designs that define modern and historical architecture.", category: "architecture" },
    { title: "Food", description: "Indulge in a visual feast of delicious creations from around the world.", category: "food" },
    { title: "Travel", description: "Embark on a journey to explore breathtaking destinations and unforgettable adventures.", category: "travel" },
    { title: "Animals", description: "Encounter the fascinating world of animals, from the wild to the domesticated.", category: "animals" },
    { title: "Fashion", description: "Stay ahead of the trends with the latest in fashion, style, and design.", category: "fashion" },
    { title: "Sports", description: "Experience the thrill of sports through action-packed imagery.", category: "sports" }
    // Add more categories as needed
  ];

  // Fetch images from Unsplash API and update card images
  fetchImages();

  async function fetchImages() {
    try {
      // Iterate over cardData to find the category of the current card
      for (const card of cardData) {
        const response = await fetch(`https://api.unsplash.com/search/photos?client_id=x57tYEOquk_mNhbJoCSZOfyGanLWmU_SfrB9sSlZDlU&query=${card.category}`);
        const data = await response.json();
        // Create card element and append it to the grid
        const gridItem = createCardElement(data.results[0].urls.regular, card.title, card.description, card.category);
        grid.appendChild(gridItem);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  }

  // Helper function to create a card element
  function createCardElement(imageUrl, title, description, category) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");

    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = title;
    img.classList.add("image");

    const content = document.createElement("div");
    content.classList.add("content");

    const heading = document.createElement("h2");
    heading.textContent = title;

    const para = document.createElement("p");
    para.textContent = description;

    const button = document.createElement("button");
    button.textContent = "View Collection";
    button.setAttribute("data-query", category);

    content.appendChild(heading);
    content.appendChild(para);
    content.appendChild(button);
    gridItem.appendChild(img);
    gridItem.appendChild(content);

    return gridItem;
  }

  // Function to store the search query in local storage and redirect to results page
  function initiateSearch(query) {
    localStorage.setItem('searchQuery', query);
    window.open('resultpage.html', '_blank');
  }

  // Add click event listener to the grid container
  grid.addEventListener("click", event => {
    if (event.target.tagName === 'BUTTON' && event.target.hasAttribute('data-query')) {
      const query = event.target.getAttribute('data-query');
      initiateSearch(query);
    }
  });
});
