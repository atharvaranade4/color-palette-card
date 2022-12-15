$(document).ready(function() {
	const form = document.querySelector('.search');
	form.addEventListener('submit', customSearch);
	const spinner = document.querySelector('.js-spinner');
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
		spinner.classList.add('hidden'); // add timeout function
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
		e.target.parentNode.remove();

		e.target.style="position:absolute()";	
	}

	function displayResults(responseJson) {

		let randomNumber = 1 //should be user input

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
		console.log(imagesToDisplay)
		
		let resultLen = responseJson.results.length
		let randomResult = Math.floor(Math.random()*resultLen)		
		console.log(randomResult)
		
		let randomImage = responseJson.results[randomResult].urls.small
		console.log(randomImage)		
		
		let imageEl = document.createElement('img')
		imageEl.width = (Math.random()+0.50)*150
		console.log(imageEl.width)
		imageEl.src = responseJson.results[randomResult].urls.small
		imageEl.addEventListener('click', (e) => {
			console.log(e.target)
			e.target.style="z-index:1";
			console.log(e.target)
			e.target.parentNode.parentNode.firstsibling.style="z-index:null";
		});	
			
		
		deleteDiv.append(deleteWord, imageEl)
		deleteDiv.classList.add("element")
		
		singlePhotoContainer.append(deleteDiv)
		imagesToDisplay.prepend(singlePhotoContainer)
		
		var draggable = $('.draggable');
		// var resizable = $('.resizable');
		var element = $('.element');
		// element.each( setRandomSize );
		// element.each( setRandomPosition );
					
			draggable.draggable({
				cursor: "move",
				containment: ".canvas",
				stack: ".draggable element",
			});
		}
		
		function cardBackground(responseJson) {	
			const cardbackground = document.getElementById('iam-the-card');
			console.log(cardbackground)
			
			let randomImage = responseJson.results[5].urls.thumbnail
			console.log(randomImage)
			cardbackground.style.backgroundImage = `url(${randomImage})`
		}
	
});