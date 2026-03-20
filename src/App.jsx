import { useState } from 'react'
import './App.css'
import { useScore } from './store/storeScore'

function App() {

  const [board,setBoard] = useState(Array(5).fill().map(row => new Array(5).fill("")))
  const [isDisable,setIsDisable]=useState(false)
  const couleurs = ["red","blue","yellow","green","orange"]
  const [colors, setColor] = useState("white")
  // Constante des scores
    const scoreX = useScore((state) => state.scoreX)
    const scoreY = useScore((state) => state.scoreY)
    const increaseScoreX = useScore((state) => state.increaseScoreX)
    const increaseScoreY = useScore((state) => state.increaseScoreY)
    const resetX = useScore((state) => state.resetScoreX)
    const resetY = useScore((state) => state.resetScoreY)

  function changeColor(i,j){
    const newBoard = [...board]
    setColor(couleurs[Math.floor(Math.random() * couleurs.length)])
    console.log(newBoard[i][j])
    setBoard(newBoard)
  }
  
  function handleClick(i,j){
    console.log("Click",i,j)
    
    changeColor(i,j)
  }

  return (
    <>
      <h1>Chain Reaction</h1>

      <div className="board">
        {board.map((cell,i)=>(cell.map((cell2,j)=>
          <button disabled={isDisable} name="pad" key={j} className={`cell ${colors}`} onClick={()=>handleClick(i,j)}>
          {board[i][j]}
          </button>
        )))}
      </div>
    </>
  )
}

export default App
