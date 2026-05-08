import './Categorias.css'

import { useState } from 'react'

function Categorias() {

  const [nome, setNome] = useState('')

  const [categorias, setCategorias] = useState([])

  function cadastrarCategoria(){

    if(nome === '') return

    const novaCategoria = {

      id: Date.now(),
      nome

    }

    setCategorias([

      ...categorias,
      novaCategoria

    ])

    setNome('')

  }

  function excluirCategoria(id){

    const filtradas = categorias.filter(

      (categoria) => categoria.id !== id

    )

    setCategorias(filtradas)

  }

  return (

    <div className='categorias-page'>

      <div className='categorias-box'>

        <h1>Categorias</h1>

        <input
          type='text'
          placeholder='Digite a categoria'
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <button onClick={cadastrarCategoria}>
          CADASTRAR
        </button>

        <div className='lista-categorias'>

          {

            categorias.map((categoria) => (

              <div
                className='categoria-item'
                key={categoria.id}
              >

                <h3>{categoria.nome}</h3>

                <button
                  onClick={() => excluirCategoria(categoria.id)}
                >
                  EXCLUIR
                </button>

              </div>

            ))

          }

        </div>

      </div>

    </div>

  )

}

export default Categorias