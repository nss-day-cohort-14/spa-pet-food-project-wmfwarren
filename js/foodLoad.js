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
}

function printDogFood () { //print the dog food object
	var dogPrintZone = document.getElementById("dogFood");
	
	for(let i = 0; i < dogFoods.dog_brands.length; i++)	{//main loop for printing head info
		dogPrintZone.innerHTML += `
		<h2>${dogFoods.dog_brands[i].name}</h2>
		<h3>Type and Pricing</h3>
		`
		for(let j = 0; j < dogFoods.dog_brands[i].types.length; j++){//second loop to print type of food
			dogPrintZone.innerHTML += `
				<h4 class=typeOfFood">${dogFoods.dog_brands[i].types[j].type}</h4>
			`
			for(let k = 0; k < dogFoods.dog_brands[i].types[j].volumes.length; k++){//third loop to print pricing and other info
				dogPrintZone.innerHTML += `
					<p class="foodVolume">${dogFoods.dog_brands[i].types[j].volumes[k].name}</p>
					<p class="priceForVolume">$${dogFoods.dog_brands[i].types[j].volumes[k].price}</p>
				`
			}
		}
	}
}

function printCatFood () { //print the cat food object
	var catPrintZone = document.getElementById("catFood");

}

requestDogFood.addEventListener("load", loadFoodRequest); //add a load listener to the requestDogFood 
requestCatFood.addEventListener("load", loadFoodRequest);

requestDogFood.open("GET", "../json/dogFoods.json"); //give information on retrieving the data to foodRequest
requestCatFood.open("GET", "../json/catFoods.json"); //give information on retrieving the data to foodRequest
requestDogFood.send(); //send data request
requestCatFood.send(); //send data request

