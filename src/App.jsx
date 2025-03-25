import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Api from './Services/Api'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Api/> 
    </>
  )
}

export default App
