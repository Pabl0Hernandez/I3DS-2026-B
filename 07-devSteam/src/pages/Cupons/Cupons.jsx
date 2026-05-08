import './Cupons.css'

import { useState } from 'react'

function Cupons() {

  const [codigo, setCodigo] = useState('')
  const [desconto, setDesconto] = useState('')

  const [cupons, setCupons] = useState([])

  function cadastrarCupom(){

    if(codigo === '' || desconto === '') return

    const novoCupom = {

      id: Date.now(),
      codigo,
      desconto

    }

    setCupons([

      ...cupons,
      novoCupom

    ])

    setCodigo('')
    setDesconto('')

  }

  function excluirCupom(id){

    const filtrados = cupons.filter(

      (cupom) => cupom.id !== id

    )

    setCupons(filtrados)

  }

  return (

    <div className='cupons-page'>

      <div className='cupons-box'>

        <h1>Cupons</h1>

        <input
          type='text'
          placeholder='Código do cupom'
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />

        <input
          type='number'
          placeholder='Desconto'
          value={desconto}
          onChange={(e) => setDesconto(e.target.value)}
        />

        <button onClick={cadastrarCupom}>
          CADASTRAR
        </button>

        <div className='lista-cupons'>

          {

            cupons.map((cupom) => (

              <div
                className='cupom-item'
                key={cupom.id}
              >

                <div>

                  <h3>{cupom.codigo}</h3>

                  <p>{cupom.desconto}% OFF</p>

                </div>

                <button
                  onClick={() => excluirCupom(cupom.id)}
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

export default Cupons