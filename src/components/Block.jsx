import React from 'react'

export default function Block(props) {
  const defaultCurrencies = ['KZT','RUB','EUR','USD']
  return (
    <div className='block-container'>
      <ul>
        {defaultCurrencies.map(x => <li onClick={()=>props.onChangeCurrency(x)} className={props.currency == x ? 'active' : ''}>{x}</li>)}
      </ul>
      <input onChange={(e)=>props.onChangeValue(e.target.value)} type="number" placeholder={props.value}/>
    </div>
  )
}
