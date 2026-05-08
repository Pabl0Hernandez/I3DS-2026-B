import './Card.css'

function Card({ game, addToCart }) {

    return (

        <div className='card'>

            <img src={game.image} alt="" />

            <div className='card-info'>

                <span>OFERTA EXCLUSIVA</span>

                <div className='preco'>

                    <button>-50%</button>

                    <h3>
                        R${game.price}
                    </h3>

                </div>

                <button
                    className='btn-cart'
                    onClick={() => addToCart(game)}
                >
                    ADICIONAR AO CARRINHO
                </button>

            </div>

        </div>

    )
}

export default Card