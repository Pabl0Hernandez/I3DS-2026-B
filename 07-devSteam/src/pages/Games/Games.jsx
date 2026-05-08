import './Games.css'

import { useState } from 'react'

function Games() {

  const [titulo, setTitulo] = useState('')
  const [preco, setPreco] = useState('')

  const [games, setGames] = useState([])

  const [editandoId, setEditandoId] = useState(null)

  function salvarGame(){

    if(titulo === '' || preco === '') return

    if(editandoId){

      const gamesAtualizados = games.map((game) =>

        game.id === editandoId

        ? {
            ...game,
            titulo,
            preco
          }

        : game

      )

      setGames(gamesAtualizados)

      setEditandoId(null)

    }else{

      const novoGame = {

        id: Date.now(),
        titulo,
        preco

      }

      setGames([

        ...games,
        novoGame

      ])

    }

    setTitulo('')
    setPreco('')

  }

  function editarGame(game){

    setTitulo(game.titulo)
    setPreco(game.preco)

    setEditandoId(game.id)

  }

  function excluirGame(id){

    const filtrados = games.filter(

      (game) => game.id !== id

    )

    setGames(filtrados)

  }

  return (

    <div className='games-page'>

      <div className='games-box'>

        <h1>Games</h1>

        <input
          type='text'
          placeholder='Nome do game'
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <input
          type='number'
          placeholder='Preço'
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />

        <button onClick={salvarGame}>

          {
            editandoId
            ? 'SALVAR EDIÇÃO'
            : 'CADASTRAR'
          }

        </button>

        <div className='lista-games'>

          {

            games.map((game) => (

              <div
                className='game-item'
                key={game.id}
              >

                <div>

                  <h3>{game.titulo}</h3>

                  <p>R$ {game.preco}</p>

                </div>

                <div className='acoes'>

                  <button
                    className='editar-btn'
                    onClick={() => editarGame(game)}
                  >
                    EDITAR
                  </button>

                  <button
                    className='excluir-btn'
                    onClick={() => excluirGame(game.id)}
                  >
                    EXCLUIR
                  </button>

                </div>

              </div>

            ))

          }

        </div>

      </div>

    </div>

  )

}

export default Games