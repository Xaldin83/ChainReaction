import { useState } from 'react'
import './App.css'
import { useScore } from './store/storeScore'

function App() {

  const [board,setBoard] = useState(Array(5).fill().map(row => new Array(5).fill("")))
  const [isDisable,setIsDisable]=useState(false)
  const couleurs = ["red","blue","yellow","green","orange"]
  const [colors, setColor] = useState(couleurs[Math.floor(Math.random() * couleurs.length)])
  // Constante des scores
    const scoreX = useScore((state) => state.scoreX)
    const scoreY = useScore((state) => state.scoreY)
    const increaseScoreX = useScore((state) => state.increaseScoreX)
    const increaseScoreY = useScore((state) => state.increaseScoreY)
    const resetX = useScore((state) => state.resetScoreX)
    const resetY = useScore((state) => state.resetScoreY)

  function changeColor(){
    setColor(couleurs[Math.floor(Math.random() * couleurs.length)])

  }
  
  function handleClick(e,i,j){
    e.target.className=colors
    e.target.disabled=true
    const newBoard=[...board]

    newBoard[i][j]=colors

    setBoard(newBoard)
    console.log("Click",i,j)
    console.log(newBoard)
    changeColor()
  }

  return (
    <>
      <h1>Chain Reaction</h1>

      <div className="board">
        {board.map((cell,i)=>(cell.map((cell2,j)=>
          <button disabled={isDisable} name="pad" key={j} className={`cell`} onClick={(e)=>handleClick(e,i,j)}>
          
          </button>
        )))}
        <p>Vous jouer la couleur : {colors}</p>
      </div>
    </>
  )
}

export default App
