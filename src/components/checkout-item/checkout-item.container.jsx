import React from "react";
import { graphql } from "react-apollo";
import { gql } from "apollo-boost";
import { flowRight } from "lodash";

import CheckoutItem from "./checkout-item.component";

const REMOVE_ITEM_FROM_CART = gql`
  mutation RemoveItemFromCart($item: Item!) {
    removeItemFromCart(item: $item) @client
  }
`;
const CLEAR_ITEM_FROM_CART = gql`
  mutation ClearItemFromCart($item: Item!) {
    clearItemFromCart(item: $item) @client
  }
`;
const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart($item: Item!) {
    addItemToCart(item: $item) @client
  }
`;

const CheckoutItemContainer = ({
  clearItem,
  addItem,
  removeItem,
  ...otherProps
}) => {
  return (
    <CheckoutItem
      clearItem={(item) => clearItem({ variables: { item } })}
      addItem={(item) => addItem({ variables: { item } })}
      removeItem={(item) => removeItem({ variables: { item } })}
      {...otherProps}
    ></CheckoutItem>
  );
};

export default flowRight(
  graphql(REMOVE_ITEM_FROM_CART, { name: "removeItem" }),
  graphql(CLEAR_ITEM_FROM_CART, { name: "clearItem" }),
  graphql(ADD_ITEM_TO_CART, { name: "addItem" })
)(CheckoutItemContainer);
