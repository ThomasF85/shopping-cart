import React, { useState } from "react";
import "./ShoppingItem.css";

function ShoppingItem({ name, price, amount, increase, decrease, deleteItem }) {
  return (
    <section className="item">
      <h2>{name}</h2>
      <p>price: {price} €</p>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
      <p>amount: {amount} </p>
      <p>total: {price * amount} </p>
      <button onClick={deleteItem} className="item__delete-button">
        x
      </button>
    </section>
  );
}

export default ShoppingItem;
