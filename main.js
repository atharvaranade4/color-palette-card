$(document).ready(function() {
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
		// cardBackground(responseJson) // display card

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

function Listener (e){		  
	//delete logic
	  if (e.target.className === 'delete-image') 
	  console.log(e.target.parentNode.parentNode)	
	  e.target.parentNode.remove();	
	  e.target.parentNode.parentNode.remove();
}

function displayResults(responseJson) {

	let randomNumber = 1 //should be user input

	let imagesToDisplay = document.querySelector('.imagesToDisplay')

	let singlePhotoContainer = document.createElement('div')
	singlePhotoContainer.classList.add("image-container")
	singlePhotoContainer.classList.add("draggable")
	singlePhotoContainer.style.display = 'inline-block';	
	
	let deleteDiv = document.createElement('div')
	deleteDiv.classList.add("resizable")
	let deleteWord = document.createElement('span')
	deleteWord.classList.add("delete-image")
	deleteWord.innerText = "delete"

	deleteWord.addEventListener('click', (e) => {
		Listener(e);
	});	
		
	console.log(imagesToDisplay)
	
	for (i = 0; i < randomNumber; i++){
		
		let randomImage = responseJson.results[i].urls.small
		console.log(randomImage)		
		
		let imageEl = document.createElement('img')
		imageEl.src = responseJson.results[i].urls.small
	
		deleteDiv.append(deleteWord, imageEl)
		deleteDiv.classList.add("element")
		
		singlePhotoContainer.append(deleteDiv)
		imagesToDisplay.append(singlePhotoContainer)
	}
	
	var draggable = $('.draggable');
	// var resizable = $('.resizable');
	var element = $('.element');
	// element.each( setRandomSize );
	// element.each( setRandomPosition );
				
		draggable.draggable({
			cursor: "move",
			containment: "#background",
			stack: ".element",
		});
		if(window.innerHeight > window.innerWidth){}
	}
	
	function cardBackground(responseJson) {	
		const cardbackground = document.getElementById('iam-the-card');
		console.log(cardbackground)
		
		let randomImage = responseJson.results[5].urls.small
		console.log(randomImage)
		cardbackground.style.backgroundImage = `url(${randomImage})`
	}
	
});