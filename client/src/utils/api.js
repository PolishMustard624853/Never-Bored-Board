export const searchRestaurants = () => {
  let encodedParams = new URLSearchParams();
  encodedParams.append("q", "band");
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
      encodedParams = new URLSearchParams();
      encodedParams.append("language", "en_US");
      encodedParams.append("limit", "30");
      encodedParams.append("location_id", "297704");
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
