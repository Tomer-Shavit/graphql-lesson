import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import CollectionsOverview from "./collections-overview.component";
import Spinner from "../spinner/spinner.component";

const GET_COLLECTIONS = gql`
  {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const CollectionsOverviewContainer = () => (
  <Query query={GET_COLLECTIONS}>
    {({ loading, error, data }) => {
      return loading ? (
        <Spinner />
      ) : (
        <CollectionsOverview
          collections={data.collections}
        ></CollectionsOverview>
      );
    }}
  </Query>
);

export default CollectionsOverviewContainer;
