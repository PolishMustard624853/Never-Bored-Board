import React from "react";

// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

import { QUERY_SINGLE_LOCATION } from "../utils/queries";

const SingleLocation = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { locationId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_LOCATION, {
    // pass URL parameter
    variables: { locationId: locationId },
  });

  const location = data?.location || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {location.locationAuthor} <br />
        <span style={{ fontSize: "1rem" }}>
          had this location on {location.createdAt}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: "1.5rem",
            fontStyle: "italic",
            border: "2px dotted #1a1a1a",
            lineHeight: "1.5",
          }}
        >
          {location.locationText}
        </blockquote>
      </div>

      <div className="my-5">
        <CommentList comments={location.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: "1px dotted #1a1a1a" }}>
        <CommentForm locationId={location._id} />
      </div>
    </div>
  );
};

export default SingleLocation;
