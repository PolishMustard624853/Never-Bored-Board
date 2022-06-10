export const getSavedRestaurantIds = () => {
  const savedRestaurantIds = localStorage.getItem("saved_restaurant")
    ? JSON.parse(localStorage.getItem("saved_restaurant"))
    : [];

  return savedRestaurantIds;
};

export const saveRestaurantIds = (restaurantIdArr) => {
  if (restaurantIdArr.length) {
    localStorage.setItem("saved_restaurant", JSON.stringify(restaurantIdArr));
  } else {
    localStorage.removeItem("saved_restaurant");
  }
};

export const removeRestaurantId = (restaurantId) => {
  const savedRestaurantIds = localStorage.getItem("saved_restaurant")
    ? JSON.parse(localStorage.getItem("saved_restaurants"))
    : null;

  if (!savedRestaurantIds) {
    return false;
  }

  const updatedSavedRestaurantIds = savedRestaurantIds?.filter(
    (savedRestaurantId) => savedRestaurantId !== restaurantId
  );
  localStorage.setItem(
    "saved_restaurants",
    JSON.stringify(updatedSavedRestaurantIds)
  );

  return true;
};
