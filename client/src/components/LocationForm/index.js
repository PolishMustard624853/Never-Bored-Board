import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_LOCATION } from "../../utils/mutations";
import { QUERY_LOCATIONS, QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";

const LocationForm = () => {
  const [locationText, setLocationText] = useState("");

  const [characterCount, setCharacterCount] = useState(0);

  const [addLocation, { error }] = useMutation(ADD_LOCATION, {
    update(cache, { data: { addLocation } }) {
      try {
        const { locations } = cache.readQuery({ query: QUERY_LOCATIONS });

        cache.writeQuery({
          query: QUERY_LOCATIONS,
          data: { locations: [addLocation, ...locations] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, locations: [...me.locations, addLocation] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addLocation({
        variables: {
          locationText,
          locationAuthor: Auth.getProfile().data.username,
        },
      });

      setLocationText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "locationText" && value.length <= 280) {
      setLocationText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>Search Location</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? "text-danger" : ""
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="locationText"
                placeholder="Type location here..."
                value={locationText}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Save Location
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to see your saved trips{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default LocationForm;
