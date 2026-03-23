import { useState } from 'react'
import './App.css'
import { useScore } from './store/storeScore'

function App() {

  const [board,setBoard] = useState(Array(5).fill().map(row => new Array(5).fill("")))
  const colorsTab = ["red","blue","yellow","green","orange"]
  const [color, setColor] = useState(colorsTab[Math.floor(Math.random() * colorsTab.length)])
  const [isX, setIsX]=useState(true)
  const [cptShoot, setCptShoot] = useState(2)

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
    let subCase = true
    for(let val = 0;val<board.length;val++){ //Vérification colonne
      if(board[val][j]===board[i][j])
        cpt++
      else
        if(cpt<3)
          cpt=0}
    if(cpt<3)
      cpt=0
    if(cpt!=0){
      for(let x =0;x<cpt-2;x++){
        if(isX){
          increaseScoreX()
          subCase = false}
        else
          increaseScoreY()}
      let k = i-1
      while(k >= 0 && board[k][j]===board[i][j]){
        board[k][j]= null
        k--}
      k = i+1
      while(k < 5 && board[k][j]===board[i][j]){
        board[k][j]= null
        k++}
    }


    cpt=0
    for(let val = 0;val<board.length;val++){ //Vérification ligne
      if(board[i][val]===board[i][j])
        cpt++
      else
        if(cpt<3)
          cpt=0}
    if(cpt<3)
      cpt=0
    if(cpt!=0){
      subCase = false
      for(let x =0;x<cpt-2;x++){
        if(isX)
          increaseScoreX()
          
        else
          increaseScoreY()}
      let k = j-1
      while(k>=0 && board[i][k]===board[i][j]){
        console.log(i,k)
        board[i][k]= null
        k--}
      k = j+1
      while(k<5 && board[i][k]===board[i][j]){
        console.log(i,k)
        board[i][k]= null
        k++}
    }

    if (!subCase) {
      board[i][j] = null
      setCptShoot(cptShoot + 1)
      console.log("couille", cptShoot)
    }
  }
  
  function handleClick(e,i,j){
    if (cptShoot != 0) {  // On verifie qui joue en fonction du compteur de tour, chaque joueur a droit à 2 tir par tour
      const newBoard=[...board]
      newBoard[i][j]=color
      setBoard(newBoard)
      changeColor()
      checkCombination(i,j)
      setCptShoot(cptShoot-1)
      console.log("bapt", cptShoot)
    } 
  }
  if (cptShoot === 0 ) {
    setIsX(!isX)
    setCptShoot(2)
    console.log("cosmique", cptShoot)
  }

  return (
    <>
      <h1>Chain Reaction</h1>

      <p>Score Joueur 1 : {scoreX}<br/>Score Joueur 2 : {scoreY}</p>
      <div className="board">
        {board.map((cell,i)=>(cell.map((cell2,j)=>
          <button disabled={board[i][j] ? true : false} name="pad" key={j} className={`cell ${board[i][j]}`} onClick={(e)=>handleClick(e,i,j)}>
          
          </button>
        )))}
        <p>{isX ? <span>Joueur 1</span> : <span>Joueur 2</span>} joue la couleur : {color}</p>
      </div>
    </>
  )
}

export default App
