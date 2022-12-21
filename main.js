const search = document.querySelector('.search');
let searchQuery;
let randomImage;
let randomImageArr = [];
let saveBtn = document.querySelector('.savebtn')

// const apiKey = // Paste API key

search.addEventListener('submit', customSearch);
async function fetchResults(searchQuery) {
	try {
		let currentPage = randomIntFromInterval(0, 2)
		const endpoint = `https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=30&page=${currentPage}&client_id=${apiKey}`;
		const response = await fetch(endpoint);
		
		const responseJson = await response.json(); // result	
		displayResults(responseJson); // display results
		
	} catch(err) {
		console.log(err);
		alert('Failed to search Unsplash');
	}
} 

function customSearch(e) {
	e.preventDefault();
	const inputValue = document.querySelector('.js-search-input').value;
	searchQuery = inputValue.trim();
	fetchResults(searchQuery);
}

function Listener (e){		  
	//delete logic
	if (e.target.className === 'delete-image') 
	e.target.parentNode.remove();
}

function displayResults(responseJson) {
		
	let imagesToDisplay = document.querySelector('.imagesToDisplay')
	
	let singlePhotoContainer = document.createElement('div')
	singlePhotoContainer.classList.add("image-container")
	singlePhotoContainer.classList.add("draggable")
	singlePhotoContainer.style.display = 'inline-block';	
	
	let deleteDiv = document.createElement('div')
	deleteDiv.classList.add("draggable")
	let deleteWord = document.createElement('span')
	deleteWord.classList.add("delete-image")
	deleteWord.innerText = "delete"
	
	deleteWord.addEventListener('click', (e) => {
		Listener(e);
	});
	
	let resultLen = responseJson.results.length
	let randomResult = Math.floor(Math.random()*resultLen)		
	
	randomImage = responseJson.results[randomResult].urls.small
	
	let imageEl = document.createElement('img')
	imageEl.width = (Math.random()+0.50)*150
	imageEl.src = responseJson.results[randomResult].urls.small
	imageEl.addEventListener('click', (e) => {
		e.target.style="z-index:1";
	});	
		
	deleteDiv.append(imageEl, deleteWord)
	deleteDiv.classList.add("element")
	
	singlePhotoContainer.append(deleteDiv)
	imagesToDisplay.prepend(singlePhotoContainer)
	
	// push url to array
	randomImageArr.push(randomImage)

	// remove url from array
	let deleteUrl = document.querySelector(".delete-image")
	deleteUrl.addEventListener("click", () => {
		let removeUrl = deleteUrl.previousSibling.src
		randomImageArr = randomImageArr.filter(e => e !== removeUrl);

		// print array
		// for (i=0; i<randomImageArr.length; i++){
		// 	console.log(randomImageArr[i])
		// };
	})	
	
	//image draggable logic using jQuery
	$(document).ready(function() {
		var draggable = $('.draggable');
		var element = $('.element');
		
		draggable.draggable({
			cursor: "move",
			containment: ".canvas",
			stack: ".draggable element",
		});
	})
	
}		

// Add event listeners
const title = document.getElementById('title')
const description = document.getElementById('description')
const validationForm = document.querySelector("#connect-form")
let currentElementIsValid = false;
let allValid  = true

function checkValidation(e){
	let currentElement = e.target
	currentElement.setCustomValidity("");
	if (currentElement.id === 'title' ||
	currentElement.id === 'description') {
		currentElementIsValid = currentElement.value.length >= 3
		if(!currentElementIsValid) {
			currentElement.classList.add('invalid')
			currentElement.setCustomValidity("Please use atleast 3 characters")
			currentElement.reportValidity()
		} else 
		{
			currentElement.classList.remove('invalid')
			// Add to local storage
			saveBtn.addEventListener("click", () => {
				localStorage.setItem(title.value, JSON.stringify(randomImageArr))
			})
		}
	}
}

title.addEventListener('input', checkValidation)
description.addEventListener('input', checkValidation)

// add Validation
validationForm.addEventListener("submit", (event) => {
	allValid = currentElementIsValid
	// console.log(allValid)
	
	if(!allValid) {
		alert('Please enter name and description before saving!')
		event.preventDefault()
	} else {
		console.log('Successfully updated local-storage!')
		event.preventDefault()
	}		
});


// set timeout for instructions
document.addEventListener("DOMContentLoaded", function(){
	const notice = document.querySelectorAll(".instruction")
    setTimeout(function() {
		notice.forEach(notice => notice.style.display = "none")
	},
	15000
    );
})

// change canvas background
let canvasBackground = document.querySelector(".canvas")
for (let index = 1; index <= 6; index++){
	document.querySelector(`#button${index}`).addEventListener("click", () => {
		canvasBackground.setAttribute('id', `button${index}`)
	})
}

function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}