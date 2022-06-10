import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";

import Auth from "../utils/auth";
import { saveRestaurant, searchRestaurants } from "../utils/API";
import {
  saveRestaurantIds,
  getSavedRestaurantIds,
} from "../utils/localStorage";

let travelRestuarants = {
  apiKey: "f4dc3fd3d3msh037fd1e63aa251cp13ad11jsnb3b66396915d",
};

const SearchRestaurants = () => {
  const [searchedRestaurants, setSearchedRestaurants] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [savedRestaurantIds, setSavedRestaurantIds] = useState(
    getSavedRestaurantIds()
  );

  useEffect(() => {
    return () => saveRestaurantIds(savedRestaurantIds);
  });

  const handleSaveRestaurant = async (restaurantId) => {
    // find the book in `searchedBooks` state by the matching id
    const restaurantToSave = searchedRestaurants.find(
      (restaurant) => restaurant.restaurantId === restaurantId
    );

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await saveRestaurant(restaurantToSave, token);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      // if book successfully saves to user's account, save book id to state
      setSavedRestaurantIds([
        ...savedRestaurantIds,
        restaurantToSave.restaurantId,
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Search for Restaurants!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a restaurant"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedRestaurants.length
            ? `Viewing ${searchedRestaurants.length} results:`
            : "Search for a restaurant to begin"}
        </h2>
        <CardColumns>
          {searchedRestaurants.map((restaurant) => {
            return (
              <Card key={restaurant.restaurantId} border="dark">
                {restaurant.image ? (
                  <Card.Img
                    src={restaurant.image}
                    alt={`The cover for ${restaurant.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{restaurant.title}</Card.Title>
                  <p className="small">Authors: {restaurant.authors}</p>
                  <Card.Text>{restaurant.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedRestaurantIds?.some(
                        (savedRestaurantId) =>
                          savedRestaurantId === restaurant.restaurantId
                      )}
                      className="btn-block btn-info"
                      onClick={() =>
                        handleSaveRestaurant(restaurant.restaurantId)
                      }
                    >
                      {savedRestaurantIds?.some(
                        (savedRestaurantId) =>
                          savedRestaurantId === restaurant.restaurantId
                      )
                        ? "This restaurant has already been saved!"
                        : "Save this Restaurant!"}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default api;
