import React from "react";
import { Link } from "react-router-dom";
import {Card, CardColumns, Container} from "react-bootstrap"

const LocationList = ({
  locations,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!locations.length) {
    return <h3> </h3>;
  }

  return (
    <Container>
        {/* <h2>
          {searchedRestaurants.length
            ? `Viewing ${searchedRestaurants.length} results:`
            : "Search for a restaurant to begin"}
        </h2> */}
        <CardColumns>
          {locations.map((restaurant) => {
            return (
              <Card
                style={{ backgroundColor: "lightblue", borderRadius: "10px" }}
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
                  <Card.Title><h1>{restaurant.name}</h1></Card.Title>
                  <p className="small">Address: {restaurant.address}</p>
                  <Card.Text>{restaurant.description}</Card.Text>
                  {/* <Card.Text>{restaurant.is_closed.toString()}</Card.Text> */}
                  <img src={restaurant.photo}></img>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
  );
};

export default LocationList;
