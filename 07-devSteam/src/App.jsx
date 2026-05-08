import "./App.css";
import AppRoutes from "./routes/AppRoutes.jsx";
import { useState } from "react";

import Lol from "./assets/LoL.png";
import Dota from "./assets/Dota2.png";
import Valorant from "./assets/Valorant.png";
import Cs from "./assets/Cs.png";

function App() {
  const [cart, setCart] = useState([]);

  const games = [
    { id: 1, title: "League Of Legends", image: Lol, price: 99.9 },
    { id: 2, title: "Dota 2", image: Dota, price: 99.9 },
    { id: 3, title: "Valorant", image: Valorant, price: 99.9 },
    { id: 4, title: "Counter Strike", image: Cs, price: 99.9 },
  ];

  // Adicionar ao carrinho
  const addToCart = (game) => {
    const gameExists = cart.find((item) => item.id === game.id);
    if (gameExists) {
      const updatedCart = cart.map((item) =>
        item.id === game.id ? { ...item, quantity: item.quantity + 1 } : item,
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...game, quantity: 1 }]);
    }
  };

  // Remover produto do carrinho completamente
  const removeFromCart = (gameId) => {
    setCart(cart.filter((item) => item.id !== gameId));
  };

  return (
    <AppRoutes
      cart={cart}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      games={games}
    />
  );
}

export default App;
