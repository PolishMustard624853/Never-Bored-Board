import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
// imgs
import Paris from "../images/paris.jpg";
import Bangkok from "../images/bangkok.jpg";
import London from "../images/london.jpg";
import NewYork from "../images/newyork.jpg";
import Dubai from "../images/dubai.jpg";
import "../pages/index.css";
import { searchRestaurants } from "../utils/api";
import LocationList from "../components/LocationList";
import LocationForm from "../components/LocationForm";
import {
  saveRestaurantIds,
  getSavedRestaurantIds,
} from "../utils/localStorage";
import { QUERY_LOCATIONS } from "../utils/queries";
import Auth from "../utils/auth";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";

const Home = () => {
  const { loading, data } = useQuery(QUERY_LOCATIONS);
  const locations = data?.locations || [];
  const [searchedRestaurants, setSearchedRestaurants] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [savedRestaurantIds, setSavedRestaurantIds] = getSavedRestaurantIds();

  // useEffect(() => {
  //   return () => saveRestaurantIds(savedRestaurantIds);
  // });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchRestaurants(searchInput);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const {
        results: { data },
      } = await response.json();
      console.log(data);
      const restaurantData = data.map((restaurant) => ({
        restaurantId: restaurant.id,
        // authors: book.volumeInfo.authors || ['No author to display'],
        // title: book.volumeInfo.title,
        name: restaurant.name,
        description: restaurant.description,
        address: restaurant.address,
        photo: restaurant.photo.images.small.url,
        // is_closed: restaurant.hours.is_closed,

        // image: book.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setSearchedRestaurants(restaurantData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

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
      const response = await searchRestaurants(restaurantToSave, token);

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
              <Card
                style={{ backgroundColor: "white" }}
                key={restaurant.restaurantId}
                border="dark"
              >
                {restaurant.image ? (
                  <Card.Img
                    src={restaurant.image}
                    alt={`The cover for ${restaurant.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{restaurant.name}</Card.Title>
                  <p className="small">Address: {restaurant.address}</p>
                  <Card.Text>{restaurant.description}</Card.Text>
                  {/* <Card.Text>{restaurant.is_closed.toString()}</Card.Text> */}
                  <img src={restaurant.photo}></img>
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

      <main>
        <div className="flex-row justify-center">
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: "1px dotted #1a1a1a" }}
          >
            <LocationForm />
          </div>
          <div className="col-12 col-md-8 mb-3">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <LocationList
                locations={locations}
                title="Some Feed for Location(s)..."
              />
            )}
          </div>
        </div>
        <div className="top">
          <div className="img">
            Paris
            <ul>
              <img src={Paris} alt="" className="i-img"></img>
            </ul>
          </div>

          <div className="img">
            Bangkok
            <ul>
              <img src={Bangkok} alt="" className="i-img"></img>
            </ul>
          </div>

          <div className="img">
            London
            <ul>
              <img src={London} alt="" className="i-img"></img>
            </ul>
          </div>

          <div className="img">
            New York
            <ul>
              <img src={NewYork} alt="" className="i-img"></img>
            </ul>
          </div>

          <div className="img">
            Dubai
            <ul>
              <img src={Dubai} alt="" className="i-img"></img>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
