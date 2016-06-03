var requestDogFood = new XMLHttpRequest();
var requestCatFood = new XMLHttpRequest();
var dogFoods = null; 
var catFoods = null;

function loadFoodRequest () { //load the JSON
	dogFoods = JSON.parse(requestDogFood.responseText);
	catFoods = JSON.parse(requestCatFood.responseText);
	console.log("This is the dog food", dogFoods);
	console.log("This is the cat food", catFoods);

	printDogFood();
	printCatFood();
}

function printDogFood () { //print the dog food object
	var dogPrintZone = document.getElementById("dogFood");
	
	for(let i = 0; i < dogFoods.dog_brands.length; i++)	{//main loop for printing head info
		var brandName = dogFoods.dog_brands[i].name;
		dogPrintZone.innerHTML += `
		<h1>Dog Food</h1>
		<h2 class="brandName">${brandName}</h2>
		<h3>Types and Pricing</h3>
		`
		for(let j = 0; j < dogFoods.dog_brands[i].types.length; j++){//second loop to print type of food
				var currentFoodType = dogFoods.dog_brands[i].types[j].type;
				currentFoodType = currentFoodType.replace(/_/, ' '); //replace underscore with space
	
				currentFoodType = currentFoodType.charAt(0).toUpperCase() + currentFoodType.slice(1); //make first char uppercase
				
			dogPrintZone.innerHTML += `
				<h4 class=typeOfFood">${currentFoodType}</h4>
			`
			for(let k = 0; k < dogFoods.dog_brands[i].types[j].volumes.length; k++){//third loop to print pricing and other info
				var volName = dogFoods.dog_brands[i].types[j].volumes[k].name;
				var volPrice = dogFoods.dog_brands[i].types[j].volumes[k].price;
				dogPrintZone.innerHTML += `
					<p class="foodVolume">${volName}</p>
					<p class="priceForVolume">$${volPrice}</p>
				`
			}
		}
	}
}

function printCatFood () { //print the cat food object need second function because of breeds. 
	var catPrintZone = document.getElementById("catFood");
	
	for(let i = 0; i < catFoods.cat_brands.length; i++)	{//main loop for printing head info
		var brandName = catFoods.cat_brands[i].name;
		catPrintZone.innerHTML += `
		<h1> Cat Food</h1>
		<h2 class="brandName">${brandName}</h2>
		<h3>Breeds, Types, and Pricing</h3>
		`
			for(let j = 0; j < catFoods.cat_brands[i].breeds.length; j++){//second loop to print breeds of cats
			var currentFoodBreeds = catFoods.cat_brands[i].breeds[j];
			currentFoodBreeds = currentFoodBreeds.replace(/_/, ' '); //replace underscore with space

			currentFoodBreeds = currentFoodBreeds.charAt(0).toUpperCase() + currentFoodBreeds.slice(1); //make first char uppercase
			
			
			catPrintZone.innerHTML += `
				<h4 class=foodForBreed">${currentFoodBreeds}</h4>
			`
			}
		for(let l = 0; l < catFoods.cat_brands[i].types.length; l++ ){ //print the food types
				var currentFoodType = catFoods.cat_brands[i].types[l].type;
				currentFoodType = currentFoodType.replace(/_/, ' '); //replace underscore with space
	
				currentFoodType = currentFoodType.charAt(0).toUpperCase() + currentFoodType.slice(1); //make first char uppercase
	
			catPrintZone.innerHTML += `
				<h4 class=typeOfFood">${currentFoodType}</h4>
			`
			for(let k = 0; k < catFoods.cat_brands[i].types[l].volumes.length; k++){//third loop to print pricing and other info
				var volName = catFoods.cat_brands[i].types[l].volumes[k].name;
				var volPrice = catFoods.cat_brands[i].types[l].volumes[k].price;
				catPrintZone.innerHTML += `
					<p class="foodVolume">${volName}</p>
					<p class="priceForVolume">$${volPrice}</p>
				`
			}
		}
	}
}

requestDogFood.addEventListener("load", loadFoodRequest); //add a load listener to the requestcatFood 
requestCatFood.addEventListener("load", loadFoodRequest);

requestDogFood.open("GET", "../json/dogFoods.json"); //give information on retrieving the data to foodRequest
requestCatFood.open("GET", "../json/catFoods.json"); //give information on retrieving the data to foodRequest
requestDogFood.send(); //send data request
requestCatFood.send(); //send data request

