const form = document.querySelector('.js-form');
form.addEventListener('submit', customSearch);
const nextBtn = document.querySelector('.js-next');
const prevBtn = document.querySelector('.js-prev');
let resultStats = document.querySelector('.js-result-stats');
const spinner = document.querySelector('.js-spinner');
let totalResults;
let currentPage = 1;
let searchQuery;

const apiKey = "QWHKA4I1zmxxYKZIPSYgadjNjfziHrZd99tcetDInJc";

async function fetchResults(searchQuery) {
	spinner.classList.remove('hidden');
	try {
    const endpoint = `https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=30&page=${currentPage}&client_id=${apiKey}`;
    const response = await fetch(endpoint);

    const responseJson = await response.json(); // result
		console.log(responseJson);

		displayResults(responseJson); // display results

	} catch(err) {
		console.log(err);
		alert('Failed to search Unsplash');
	}
	spinner.classList.add('hidden');
} 

function customSearch(e) {
	e.preventDefault();
	currentPage = 1;
	const inputValue = document.querySelector('.js-search-input').value;
	searchQuery = inputValue.trim();
	console.log(searchQuery);
	fetchResults(searchQuery);
}

function displayResults(responseJson) {

  let imageToDisplay = document.querySelector('.imageToDisplay')
  console.log(imageToDisplay)
  let randomNumber = Math.floor(Math.random()* 10)

  let allImages = responseJson.results[randomNumber]
  let randomImage = allImages.urls.small
  console.log(randomImage)
  imageToDisplay.src = randomImage

	const searchResults = document.querySelector('.search-results');
	searchResults.textContent = '';
	responseJson.results.forEach(result => {
		const url = result.urls.small;
		const unsplashLink = result.links.html;
		const photographer = result.user.name;
		const photographerPage = result.user.links.html;
		searchResults.insertAdjacentHTML(
			'beforeend',
			`<div>
				<a href="${unsplashLink}" target="_blank">
					<div class="result-item" style="background-image: url(${url});"></div>
				</a>
				<p class="photographer-name">
					<a href="${photographerPage}" target="_blank" style="color: black; text-decoration: none;">Photo by ${photographer}</a>
				</p>
			</div>`
		);	
	});
};