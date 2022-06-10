export const searchRestaurants = () => {
  let encodedParams = new URLSearchParams();
  encodedParams.append("q", "band");
  encodedParams.append("language", "en_US");

  let options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "f4dc3fd3d3msh037fd1e63aa251cp13ad11jsnb3b66396915d",
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
            "f4dc3fd3d3msh037fd1e63aa251cp13ad11jsnb3b66396915d",
          "X-RapidAPI-Host": "worldwide-restaurants.p.rapidapi.com",
        },
        body: encodedParams,
      };

      return fetch(
        "https://worldwide-restaurants.p.rapidapi.com/search",
        options
      ).then((response) => response.json());
      // .then((response) => console.log(response))
      // .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
};
