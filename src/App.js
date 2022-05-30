import { useEffect, useState } from "react";
import "./App.css";
import AddItemForm from "./components/AddItemForm";
import ShoppingItem from "./components/ShoppingItem";
import { nanoid } from "nanoid";

function App() {
  const [items, setItems] = useState(() => {
    const shoppingCart = localStorage.getItem("shopping-cart");
    if (shoppingCart) {
      return JSON.parse(shoppingCart);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(items));
  }, [items]);

  function increase(id) {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, amount: item.amount + 1 };
      } else {
        return item;
      }
    });
    if (newItems.reduce((a, b) => a + b.amount * b.price, 0) <= 30) {
      setItems(newItems);
    }
  }

  function decrease(id) {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, amount: item.amount - 1 };
      } else {
        return item;
      }
    });
    if (!newItems.find((item) => item.amount < 0)) {
      setItems(newItems);
    }
  }

  function deleteItem(id) {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  }

  function addItem(name, price) {
    const newItems = [...items, { name, price, amount: 0, id: nanoid() }];
    setItems(newItems);
  }

  const total = items.reduce((a, b) => a + b.amount * b.price, 0);

  return (
    <div className="App">
      <header>
        <h1>Shopping Cart</h1>
      </header>
      <main>
        <p>The total amount is: {total} €</p>
        <p>You have: {30 - total} € left</p>
        {items.map((item) => (
          <ShoppingItem
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            increase={() => increase(item.id)}
            decrease={() => decrease(item.id)}
            deleteItem={() => deleteItem(item.id)}
          />
        ))}
        <AddItemForm addItem={addItem} />
      </main>
    </div>
  );
}

export default App;
