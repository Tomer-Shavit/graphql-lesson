import { gql } from "apollo-boost";
import {
  addItemToCart,
  getCartItemCount,
  getCartTotalCost,
  clearItemFromCart,
  removeItemFromCart,
} from "./cart.utils";

export const typeDefs = gql`
  extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItemToCart(item: Item!): [Item]
    RemoveItemFromCart(item: Item!): [Item]
    ClearItemFromCart(item: Item!): [Item]
  }
  extend type Item {
    quantity: Int
  }
`;

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;

const GET_ITEM_COUNT = gql`
  {
    itemCount @client
  }
`;

const GET_TOTAL_COST = gql`
  {
    totalCost @client
  }
`;

export const resolvers = {
  Mutation: {
    toggleCartHidden: (_root, _args, { cache }) => {
      const { cartHidden } = cache.readQuery({
        query: GET_CART_HIDDEN,
      });

      cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: { cartHidden: !cartHidden },
      });

      return !cartHidden;
    },
    addItemToCart: (_root, { item }, { cache }) => {
      const cartItems = cache.readQuery({ query: GET_CART_ITEMS });
      const newCartItems = addItemToCart(cartItems, item);

      cache.writeQuery({
        query: GET_ITEM_COUNT,
        data: { itemCount: getCartItemCount(newCartItems) },
      });

      cache.writeQuery({
        query: GET_TOTAL_COST,
        data: { totalCost: getCartTotalCost(newCartItems) },
      });

      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: { cartItems: newCartItems },
      });

      return newCartItems;
    },

    removeItemFromCart: (_root, { item }, { cache }) => {
      const cartItems = cache.readQuery({ query: GET_CART_ITEMS });
      const newCartItems = removeItemFromCart(cartItems, item);

      cache.writeQuery({
        query: GET_TOTAL_COST,
        data: { totalCost: getCartTotalCost(newCartItems) },
      });

      cache.writeQuery({
        query: GET_ITEM_COUNT,
        data: { itemCount: getCartItemCount(newCartItems) },
      });

      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: { cartItems: newCartItems },
      });

      return newCartItems;
    },

    clearItemFromCart: (_root, { item }, { cache }) => {
      const cartItems = cache.readQuery({ query: GET_CART_ITEMS });
      const newCartItems = clearItemFromCart(cartItems, item);

      cache.writeQuery({
        query: GET_TOTAL_COST,
        data: { totalCost: getCartTotalCost(newCartItems) },
      });

      cache.writeQuery({
        query: GET_ITEM_COUNT,
        data: { itemCount: getCartItemCount(newCartItems) },
      });

      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: { cartItems: newCartItems },
      });

      return newCartItems;
    },
  },
};
