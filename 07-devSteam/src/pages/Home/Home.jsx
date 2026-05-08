import './Home.css'

import { useState } from 'react'

import NavBar from '../../components/Navbar/NavBar'
import Card from '../../components/Card/Cards'
import Carti from '../../components/Karti/Carti'
import Footer from '../../components/Footer/Footer'
import ModalGame from '../../components/ModalGame/ModalGame'

function Home({ cart, addToCart, removeFromCart, games }) {

  const [selectedGame, setSelectedGame] = useState(null)

  return (
    <div className='home'>

      <NavBar
        cart={cart}
        removeFromCart={removeFromCart}
      />

      <main>

        <section>
          <h2>PROMOÇÕES</h2>
          <div className='cards-area'>
            {games.slice(0,3).map((game) => (
              <div key={game.id} onClick={() => setSelectedGame(game)}>
                <Card
                  game={game}
                  addToCart={addToCart}
                />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>OUTROS JOGOS</h2>
          {games.map((game) => (
            <Carti
              key={game.id}
              game={game}
              addToCart={addToCart}
            />
          ))}
        </section>

      </main>

      <Footer />

      {selectedGame && (
        <ModalGame
          game={selectedGame}
          closeModal={() => setSelectedGame(null)}
        />
      )}

    </div>
  )
}

export default Home