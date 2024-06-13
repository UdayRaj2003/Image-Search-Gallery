const container = document.getElementById("image-container");
const form = document.getElementById("search-form");
const input = document.getElementById("search-input");

const showmorebtn = document.getElementById("showmorebtn");
let keyword = localStorage.getItem('searchQuery');
let page = 1;
var maxpages = 3;

const apiEndpoint = "https://api.unsplash.com/search/photos";
const apiKey = "x57tYEOquk_mNhbJoCSZOfyGanLWmU_SfrB9sSlZDlU";

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
function capitalizeFirstLetter(str) {
    if (!str) return str; // Check if the string is empty
    return str.charAt(0).toUpperCase() + str.slice(1);
}
capitalizeFirstLetter(keyword);
document.querySelector('.head h1').textContent = `Free ${capitalizeFirstLetter(keyword)} Images`;

function fetchImages(query) {
    const url = `${apiEndpoint}?page=${page}&query=${query}&client_id=${apiKey}&per_page=12`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(result => {
                const img = document.createElement("img");
                img.setAttribute("src", result.urls.regular);
                img.classList.add('image');
                container.appendChild(img);

                img.onclick = () => {
                    document.querySelector('.popup-image').style.display = 'block';

                    document.querySelector('.navbar').style.display = 'none';
                    document.querySelector('.popup-image img').src = result.urls.regular;
                }
            });

            if (data.total_pages > page) {
                showmorebtn.style.display = "block";
            } else {
                showmorebtn.style.display = "none";
            }
        })
        .catch(error => console.error(error));
}

// Fetch initial images
fetchImages(keyword);


// Listen for clicks on the "Show More" button
showmorebtn.addEventListener("click", () => {

    maxpages += 3;
    page++;
    fetchImages(keyword);
});

// Close popup image
document.querySelector('.popup-image span').onclick = () => {
    document.querySelector('.popup-image').style.display = 'none';

    document.querySelector('.navbar').style.display = 'block';
}

// searchnav script

const searchButtons = document.querySelectorAll('.search-buttons button');

// Function to store the search query and redirect to results page
function initiateSearch(query) {
    localStorage.setItem('searchQuery', query);
    window.open('resultpage.html', '_blank');
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
// searchnav script end 


// Infinite scroll
window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
        // User has scrolled to the bottom of the page
        if (page <= maxpages) {
            page++;
            fetchImages(keyword);
        }
    }
});
// collection tab script
document.addEventListener("DOMContentLoaded", function () {
    // Extract category name from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    // Populate the search bar with the category name
    if (category) {
        document.getElementById('search-input').value = category;
    }
});
