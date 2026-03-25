import { useState } from 'react'
import './App.css'
import { useScore } from './store/storeScore'

function App() {

  const [board,setBoard] = useState(() => Array(5).fill().map(() => new Array(5).fill("")))
  const colorsTab = ["red","blue","yellow","green","orange"]
  const [color, setColor] = useState(colorsTab[Math.floor(Math.random() * colorsTab.length)])
  const [isX, setIsX]=useState(true)
  const [cptShoot, setCptShoot] = useState(2)
  const [isBot, setIsBot] = useState(false)

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
      subCase = false
      for(let x =0;x<cpt-2;x++){
        if(isX)
          increaseScoreX()
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
        board[i][k]= null
        
        k--}
      k = j+1
      while(k<5 && board[i][k]===board[i][j]){
        board[i][k]= null
        k++}
    }

    if (!subCase) {
      board[i][j] = null
      // setCptShoot(cptShoot + 1)
    }
    return subCase
  }
  
  function calcFreeCase(){
    //Fonction qui met dans un tableau l'ensemble des cases vides du board
    let tab = [...board]
    let tabFreeCase=[]
    for(let i = 0 ;i<tab.length; i++){
      for(let j =0; j<tab.length;j++){
        if(!tab[i][j])
          tabFreeCase.push([i,j])
      }
    }
    let shot = tabFreeCase[Math.floor(Math.random() * tabFreeCase.length)]
    const newBoard=[...board]
    newBoard[shot[0]][shot[1]]=colorsTab[Math.floor(Math.random() * colorsTab.length)]
    setBoard(newBoard)
    changeColor()
    return checkCombination(shot[0],shot[1])
  }

  async function botTurn(){
    // Fonction qui établi le tour de l'ordinateur
    let i =0
    setCptShoot(2)
    while(i<2){
      let trueFalse=false
      trueFalse = calcFreeCase()
      if (trueFalse) {
        i++
      }
    }
    setIsX(true)
    setCptShoot(2)
  }

  function handleClick(e,i,j){
    if (cptShoot != 0) {  // On verifie qui joue en fonction du compteur de tour, chaque joueur a droit à 2 tir par tour
      const newBoard=[...board]
      newBoard[i][j]=color
      setBoard(newBoard)
      changeColor()
      let trueFalse = checkCombination(i,j)
      if (trueFalse) {
        setCptShoot(cptShoot => cptShoot-1)
      }
    } 
  }
  if (cptShoot === 0 ) {
    setIsX(!isX)
    setCptShoot(2)
    if(isX && isBot){
      botTurn()}
  }
  function reset() {
    setBoard(() => Array(5).fill().map(() => new Array(5).fill("")))
    resetX()
    resetY()
    setCptShoot(2)
    setIsX(true)
  }
  function passTurn() {
    setIsX(!isX)
    setCptShoot(2)
  }

  function playerBot(){
    setIsBot(!isBot)
  }

  function shakeBoard(){   // fonction pour reset le board si toute les case sont prises et que aucun bloc de 3 est disponible
    let isComplet = true
    for(let i = 0;i<board.length; i++){
      for (let j = 0; j < board.length; j++) {
            if (board[i][j] === "") {
              isComplet = false
            }        
      }
    }
    if (isComplet) {
      setBoard(() => Array(5).fill().map(() => new Array(5).fill("")))
    }
  }

  return (
    <>
      <h1>Chain Reaction</h1>

      <p>Score Joueur 1 : {scoreX}<br/>Score {isBot?"Ordinateur":"Joueur 2"} : {scoreY}</p>
      <div className='btn-div'>
        <button className='game-mode' onClick={()=>reset()}>Reset</button>
        <button className='game-mode' onClick={()=>playerBot()}>{isBot?"Contre un joueur":"Contre un bot"}</button>
      </div>
      <div className="board">
        {board.map((cell,i)=>(cell.map((cell2,j)=>
          <button disabled={board[i][j] ? true : false} name="pad" key={j} className={`cell ${board[i][j]}`} onClick={(e)=>handleClick(e,i,j)}>
          
          </button>
        )))}
      </div>
        <p>{isX ? <span>Joueur 1</span> : <span>{isBot?"Ordinateur":"Joueur 2"}</span>} tire la couleur : {color}</p>
        <button className='game-mode' onClick={()=> passTurn()}>Passer le tour</button>

    </>
  )
}

export default App
