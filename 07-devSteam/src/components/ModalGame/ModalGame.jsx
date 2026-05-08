import './ModalGame.css'

function ModalGame({ game, closeModal }) {

    if(!game){

        return null
    }

    return (

        <div className='modal-overlay'>

            <div className='modal-game'>

                <img src={game.image} alt="" />

                <div className='modal-info'>

                    <h2>{game.title}</h2>

                    <p>
                        Um dos melhores jogos da plataforma DevSteam.
                    </p>

                    <span>
                        Categoria: Ação
                    </span>

                    <span>
                        Classificação: +16
                    </span>

                    <span>
                        Multiplayer Online
                    </span>

                    <h3>
                        R${game.price}
                    </h3>

                    <button onClick={closeModal}>
                        FECHAR
                    </button>

                </div>

            </div>

        </div>

    )
}

export default ModalGame