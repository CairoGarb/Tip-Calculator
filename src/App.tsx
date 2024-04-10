import './App.css'
import { Calculator } from './components/Calculator'

export function App() {
  return (
    <div className='appContainer'>
      <div className="logo">
        <img src='./logo.svg' alt='logo' />
      </div>
      <Calculator />
    </div>
  )
}