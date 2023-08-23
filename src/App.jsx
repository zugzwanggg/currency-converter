import { useEffect, useRef, useState } from 'react'
import './App.scss'
import axios from 'axios'
import Block from './components/Block'

function App() {

  const [fromCurrency ,setFromCurrency] = useState('KZT')
  const [toCurrency, setToCurrency] = useState('RUB')
  const [fromValue, setFromValue] = useState(0)
  const [toValue, setToValue] = useState(1)


  const ratesRef = useRef({})


  useEffect(()=>{
    axios.get('http://data.fixer.io/api/latest?access_key=ea7130f08116b331af3d6c4482185c62&format=1')
    .then(res => {
      ratesRef.current = res.data.rates;
      onChangeToValue(100)
    })
  }, [])

  useEffect(()=>{
    onChangeFromValue(fromValue)
  }, [fromCurrency])


  useEffect(()=>{
    onChangeToValue(toValue)
  }, [toCurrency])


  function onChangeFromValue(value) {
    const price = value / ratesRef.current[fromCurrency]
    const result = price * ratesRef.current[toCurrency]
    setToValue(result.toFixed(4))
    setFromValue(value)
  }

  function onChangeToValue(value) {
    const price = value / ratesRef.current[toCurrency]
    const result = price * ratesRef.current[fromCurrency]
    setFromValue(result.toFixed(4))
    setToValue(value)
  }

  return (
    <div className='container'>
      <Block value={fromValue} onChangeValue={onChangeFromValue} currency={fromCurrency} onChangeCurrency={setFromCurrency}/>
      <Block value={toValue} onChangeValue={onChangeToValue} currency={toCurrency} onChangeCurrency={setToCurrency}/>
    </div>
  )
}

export default App
