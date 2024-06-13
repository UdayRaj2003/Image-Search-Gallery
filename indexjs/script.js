// navbar scroll color transform script
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbara');
    if (window.scrollY > 0) {
        navbar.classList.add('colored');
        navbar.classList.remove('transparent');
        document.querySelector('#search-input').style.backgroundColor = " #202020";
        // document.querySelector('#search-input ').style.backgroundColor = "rgb(10, 20, 31)";

    }
    else if (window.scrollY == 0) {

        document.querySelector('#search-input').style.backgroundColor = "transparent";
        navbar.classList.add('transparent');
        navbar.classList.remove('colored');
    }
});

// Get the elements from the HTML document
const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const container = document.getElementById("image-container");
const showmorebtn = document.getElementById("showmorebtn");
var maxpages = 3;
const keyword = "random";
let page = 1;

// Define the Unsplash API endpoint and your API key
const apiEndpoint = "https://api.unsplash.com/search/photos";
const apiKey = "x57tYEOquk_mNhbJoCSZOfyGanLWmU_SfrB9sSlZDlU";

// Define a function to fetch and display images from the Unsplash API
function fetchImages(query) {
    // Build the API URL with the query and the API key as parameters
    const url = `${apiEndpoint}?page=${page}&query=${query}&client_id=${apiKey}&per_page=12`;
    // Use the fetch method to send a GET request to the API
    fetch(url)
        .then(response => response.json()) // Use the json method to parse the response
        .then(data => {
            // Use the forEach method to loop through the results
            data.results.forEach(result => {
                // Create an img element for each result
                const img = document.createElement("img");
                // Set the src attribute to the result's urls.regular property
                img.setAttribute("src", result.urls.regular);
                // Add a class to the img element
                img.classList.add('image');
                // Append the img element to the container
                container.appendChild(img);

                // Add onclick event to display popup image
                img.onclick = () => {
                    document.querySelector('.navbar').style.display = 'none';

                    document.querySelector('.popup-image').style.display = 'block';
                    document.querySelector('.popup-image img').src = result.urls.regular;
                }

            });

            // Show the "Show More" button if there are more images
            if (data.total_pages > page) {
                showmorebtn.style.display = "block";
            } else {
                showmorebtn.style.display = "none";
            }
        })
        .catch(error => console.error(error)); // Catch and log any errors
}

// Use the addEventListener method to listen for the submit event on the form
form.addEventListener("submit", event => {
    // Use the preventDefault method to prevent the default behavior of reloading the page
    event.preventDefault();
    // Get the value of the input element
    keyword = input.value;
    page = 1;
    container.innerHTML = ""; // Clear the previous images from the container
    // Call the fetchImages function with the query as an argument
    fetchImages(keyword);
});

// Listen for clicks on the "Show More" button
showmorebtn.addEventListener("click", () => {

    maxpages+=3;
    page++;
    fetchImages(keyword);
});

// Add onclick event to hide the popup image
document.querySelector('.popup-image span').onclick = () => {
    document.querySelector('.navbar').style.display = 'block';
    document.querySelector('.popup-image').style.display = 'none';
}
// Fetch images with the default query when the page loads
window.onload = () => {
    fetchImages(keyword);
}


// searchnav script

const searchButtons = document.querySelectorAll('.search-buttons button');

// Function to store the search query and redirect to results page
function initiateSearch(query) {
    if(query!=null){
    localStorage.setItem('searchQuery', query);
    window.open('resultpage.html', '_blank');}
}

// Event listener for form submission
form.addEventListener("submit", event => {
    event.preventDefault();
    const query = input.value;
    initiateSearch(query);
});

// Event listeners for search buttons
searchButtons.forEach(button => {
    button.addEventListener('click', () => {
        const query = button.getAttribute('data-query');
        input.value = query; // Optional: Update the input field with the query
        initiateSearch(query);
    });
});


// Infinite scroll
window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
        // User has scrolled to the bottom of the page
        if (page <= maxpages) {
            console.log(page);
            page++;
            fetchImages(keyword);
        }
    }
});

