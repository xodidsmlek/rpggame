import { useState } from 'react'
import Footer from './components/common/Footer'
import Ability from './components/Ability'
import './assets/styles/css/App.css'

function App() {
  const [count, setCount] = useState(0)
  const [menu, setMenu] = useState("main");

  const changeMenu = (value) => {
    setMenu(value);
  };

  const mainScreen = () =>{
    switch(menu){
      case "main":
        return(
          <></>
        )
      case "battle":
        return(
          <></>
        )
      case "ability":
        return(
          <><Ability/></>
        )
      case "skill":
        return(
          <></>
        )
    }
  }

  return (
    <>
      <div>
        {menu}
        {mainScreen()}
        <Footer menu={menu} setMenu={setMenu}/>
      </div>
      
    </>
  )
}

export default App
