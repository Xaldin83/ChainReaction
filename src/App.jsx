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
    // Fonction qui change la couleur de la constante globale
    setColor(colorsTab[Math.floor(Math.random() * colorsTab.length)])

  }

  function checkCombination(i,j){
    // Fonction qui vérifie les différentes combinaisons afin de vérifier s'il y a un une combinaison
    let cpt = 0
    for(let val = 0;val<board.length;val++) //Vérification ligne
      if(board[val][j]===board[i][j])
        cpt++
      else
        if(cpt<3)
          cpt=0
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
