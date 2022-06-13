// ??
// let locationData = document.querySelector("#locationData");
// let generateSearch = document.querySelector("#search")
// let searchResult = ["https://worldwide-restaurants.p.rapidapi.com/typeahead?lat=${latNlonData[0].lat}&lon=${latNlonData[0].lon}&appid=${apiKey}"]

// document.getElementById("search").addEventListener("click", function () {
//   let text = document.querySelector("#text").value
//   searchOutput(text)

// });
// when the page loads I need to check local storage and see if I have cities saved
// if I do have cities saved I need to get those, change them from a string to a array and save that as the value of test Array
// using localstorage.getItem("storedCity") how do you un-stringify things
// let testArray = []
// let storedCity = localStorage.getItem("storedCity")
// if (storedCity) {
//   testArray = JSON.parse(storedCity);
// }
// for (let index = 0; index < testArray.length; index++) {
//   const searchedButton = document.createElement("button");
//   searchedButton.textContent = testArray[index];
//   searchedButton.addEventListener("click", function () {
//       dontSaveButton(this.textContent)

//   })
//   historyDisplay.append(searchedButton)
// }

// ********************** automatically render buttons when searching so you dont have to refresh page
// function savedSearch(text) {
//   let recentSearch = generateSearch.value;
//   testArray.push(text)
//   if (testArray.length >= 10) {
//       testArray.shift();
//   }
//   console.log(JSON.stringify(testArray));
//   localStorage.setItem("storedCity", JSON.stringify(testArray))

//   // let displayedHistory = document.createElement()
//   console.log(testArray) // we should only loop over this if test array is not stringified
//   // let element = document.createElement(tagName[, options]);
//   // for loop
//   // we are iterating over our array of cities
//   // I need to add the current city im in ony my forloop to that li (google how do I add text to a li using javascript)
//   // make sure you're creating an element, adding text to that element, then appending it to the right spot


// }
// function searchOutput(text) {
//   savedSearch(text)
//   dontSaveButton(text)
  
// }

export const searchRestaurants = (param) => {
  let encodedParams = new URLSearchParams();
  encodedParams.append("q", param);
  encodedParams.append("language", "en_US");

  let options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "a2fc1981a8mshec655d148fe3845p10f815jsn3ec993597989",
      "X-RapidAPI-Host": "worldwide-restaurants.p.rapidapi.com",
    },
    body: encodedParams,
  };

  return fetch(
    "https://worldwide-restaurants.p.rapidapi.com/typeahead",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response)
      let locationId = response.results.data[0].result_object.location_id
      encodedParams = new URLSearchParams();
      encodedParams.append("language", "en_US");
      encodedParams.append("limit", "30");
      // 43323 = Minneapolis location
      encodedParams.append("location_id", locationId);
      encodedParams.append("currency", "USD");

      options = {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key":
            "a2fc1981a8mshec655d148fe3845p10f815jsn3ec993597989",
          "X-RapidAPI-Host": "worldwide-restaurants.p.rapidapi.com",
        },
        body: encodedParams,
      };

      return fetch(
        "https://worldwide-restaurants.p.rapidapi.com/search",
        options
      );
      // ).then((response) => response.json());
      // .then((response) => console.log(response))
      // .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
};
