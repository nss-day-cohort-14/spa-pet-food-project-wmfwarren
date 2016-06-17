var requestDogFood = new XMLHttpRequest();
var requestCatFood = new XMLHttpRequest();
var Foods = null;

function loadFoodRequest (event) { //load the JSON
	Foods = JSON.parse(event.target.responseText);

	printFood();
}

function printFood () { //print the  food object need second function because of breeds. 
	var PrintZone = document.getElementById("food");
	
	for(let i = 0; i < Foods.brands.length; i++)	{//main loop for printing head info
		var brandName = Foods.brands[i].name;
		PrintZone.innerHTML += `
		<h1>Food</h1>
		<h2 class="brandName">${brandName}</h2>`;

		if (Foods.brands[i].breeds.length !== undefined) {
			PrintZone.innerHTML += `<h3>Breeds</h3>`;
			for(let j = 0; j < Foods.brands[i].breeds.length; j++){//second loop to print breeds of s
			var currentFoodBreeds = Foods.brands[i].breeds[j];
			currentFoodBreeds = currentFoodBreeds.replace(/_/, ' '); //replace underscore with space

			currentFoodBreeds = currentFoodBreeds.charAt(0).toUpperCase() + currentFoodBreeds.slice(1); //make first char uppercase
			
			
			PrintZone.innerHTML += `
				<h4 class=foodForBreed">${currentFoodBreeds}</h4>`;
			}
		}

		PrintZone.innerHTML += `<h3>Types and Pricing</h3>`;

		for(let l = 0; l < Foods.brands[i].types.length; l++ ){ //print the food types
			var currentFoodType = Foods.brands[i].types[l].type;
			currentFoodType = currentFoodType.replace(/_/, ' '); //replace underscore with space

			currentFoodType = currentFoodType.charAt(0).toUpperCase() + currentFoodType.slice(1); //make first char uppercase

			PrintZone.innerHTML += `
				<h4 class=typeOfFood">${currentFoodType}</h4>
			`
			for(let k = 0; k < Foods.brands[i].types[l].volumes.length; k++){//third loop to print pricing and other info
				var volName = Foods.brands[i].types[l].volumes[k].name;
				var volPrice = Foods.brands[i].types[l].volumes[k].price;
				PrintZone.innerHTML += `
					<p class="foodVolume">${volName}</p>
					<p class="priceForVolume">$${volPrice}</p>
				`
			}
		}
	}
}

requestDogFood.addEventListener("load", loadFoodRequest); //add a load listener to the requestFood 
requestCatFood.addEventListener("load", loadFoodRequest);

requestDogFood.open("GET", "../json/dogFoods.json"); //give information on retrieving the data to foodRequest
requestCatFood.open("GET", "../json/catFoods.json"); //give information on retrieving the data to foodRequest
requestDogFood.send(); //send data request
requestCatFood.send(); //send data request

