import './Carti.css'

function Carti({ game, addToCart }) {

    return (

        <div className='carti'>

            <img src={game.image} alt="" />

            <div className='carti-info'>

                <h3>{game.title}</h3>

                <p>Ação, Estratégia, Multijogador.</p>

                <h2>
                    R${game.price}
                </h2>

            </div>

            <button
                onClick={() => addToCart(game)}
            >
                ADICIONAR AO CARRINHO
            </button>

        </div>

    )
}

export default Carti