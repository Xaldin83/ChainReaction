import { useState } from 'react'
import './App.css'
import { useScore } from './store/storeScore'

function App() {

  const [board,setBoard] = useState(Array(5).fill().map(row => new Array(5).fill("")))
  const colorsTab = ["red","blue","yellow","green","orange"]
  const [color, setColor] = useState(colorsTab[Math.floor(Math.random() * colorsTab.length)])
  // Constante des scores
    const scoreX = useScore((state) => state.scoreX)
    const scoreY = useScore((state) => state.scoreY)
    const increaseScoreX = useScore((state) => state.increaseScoreX)
    const increaseScoreY = useScore((state) => state.increaseScoreY)
    const resetX = useScore((state) => state.resetScoreX)
    const resetY = useScore((state) => state.resetScoreY)

  function changeColor(){
    setColor(colorsTab[Math.floor(Math.random() * colorsTab.length)])

  }
  
  function handleClick(e,i,j){
    const newBoard=[...board]
    newBoard[i][j]=color
    setBoard(newBoard)
    changeColor()
  }

  return (
    <>
      <h1>Chain Reaction</h1>

      <div className="board">
        {board.map((cell,i)=>(cell.map((cell2,j)=>
          <button disabled={board[i][j] ? true : false} name="pad" key={j} className={`cell ${board[i][j]}`} onClick={(e)=>handleClick(e,i,j)}>
          
          </button>
        )))}
        <p>Vous jouer la couleur : {color}</p>
      </div>
    </>
  )
}

export default App
