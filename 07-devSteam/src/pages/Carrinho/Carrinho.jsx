import "./Carrinho.css";

function Carrinho({ cart, removeFromCart }) {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="page carrinho-page">
      <h1>Carrinho</h1>

      {cart.length === 0 ? (
        <p className="empty-message">Seu carrinho está vazio.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.title} />
                <div className="item-details">
                  <h3>{item.title}</h3>
                  <span>R${item.price.toFixed(2)}</span>
                  <p>Quantidade: {item.quantity}</p>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  REMOVER
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Total</h2>
            <span>R${total.toFixed(2)}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default Carrinho;
