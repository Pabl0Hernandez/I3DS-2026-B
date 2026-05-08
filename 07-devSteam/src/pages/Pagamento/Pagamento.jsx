import './Pagamento.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Pagamento({ cart, setCart }) {  // <- recebe setCart para limpar o carrinho
  const [cardNumber, setCardNumber] = useState('')
  const navigate = useNavigate()

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const handlePurchase = () => {
    if(cart.length === 0){
      alert('O carrinho está vazio! Adicione itens antes de finalizar a compra.')
      return
    }

    if(cardNumber.length < 16){
      alert('Número de cartão inválido!')
      return
    }

    // Mensagem de resumo da compra
    let message = `Compra finalizada com sucesso!\n\nItens:\n`
    cart.forEach(item => {
      message += `${item.title} x${item.quantity} - R$${(item.price * item.quantity).toFixed(2)}\n`
    })
    message += `\nTotal: R$${total.toFixed(2)}`
    message += `\nCartão usado: **** **** **** ${cardNumber.slice(-4)}`

    alert(message)

    // Limpar o carrinho após a compra
    setCart([])

    // Redirecionar para Home
    navigate('/')
  }

  return (
    <div className='pagamento-page'>
      <div className='pagamento-box'>
        <h1>Pagamento</h1>

        {cart.length === 0 && <p style={{color: 'white', marginBottom: '15px'}}>Seu carrinho está vazio.</p>}

        <div className='cart-items'>
          {cart.map(item => (
            <div key={item.id} className='cart-item'>
              <span>{item.title} x{item.quantity}</span>
              <span>R${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <h2>Total: R${total.toFixed(2)}</h2>

        <input
          type='text'
          placeholder='Número do cartão'
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          maxLength={16}
        />

        <button onClick={handlePurchase}>Confirmar Compra</button>
      </div>
    </div>
  )
}

export default Pagamento