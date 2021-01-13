import React from "react";
import { graphql } from "react-apollo";
import { gql } from "apollo-boost";
import { flowRight } from "lodash";

import CheckoutPage from "./checkout.component";

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

const GET_TOTAL_COST = gql`
  {
    totalCost @client
  }
`;

const CheckoutPageContainer = (props) => {
  return (
    <CheckoutPage
      cartItems={props.cartItems.cartItems}
      total={props.totalCost.totalCost}
    ></CheckoutPage>
  );
};

export default flowRight(
  graphql(GET_CART_ITEMS, { name: "cartItems" }),
  graphql(GET_TOTAL_COST, { name: "totalCost" })
)(CheckoutPageContainer);
