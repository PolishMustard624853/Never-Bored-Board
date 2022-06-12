import React from "react";
import { Link } from "react-router-dom";

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
    <div>
      {showTitle && <h3>{title}</h3>}
      {locations &&
        locations.map((location) => (
          <div key={location._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${location.locationAuthor}`}
                >
                  {location.locationAuthor} <br />
                  <span style={{ fontSize: "1rem" }}>
                    saved this location on {location.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: "1rem" }}>
                    You saved this location on {location.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{location.locationText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/locations/${location._id}`}
            >
              Click for details.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default LocationList;
