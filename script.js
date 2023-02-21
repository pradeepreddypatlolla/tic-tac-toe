let isGameOver = false;
let winner=null
let humanWins=0
let computerWins = 0
let turn="You"
let humanSymbol = "X"
let computerSymbol = "O"
let humanMoves = []
let computerMoves=[]
let possibleHumanPairs = []
let possibleComputerPairs=[]
const winningPatterns = ["012","345","678","036","147","258","048","246"]
wonByPattern  = ""
const mapper = {0:"00",1:"01",2:"02",3:"10",4:"11",5:"12",6:"20",7:"21",8:"22"}


document.getElementById("your-wins").innerHTML=humanWins
document.getElementById("computer-wins").innerHTML=computerWins
document.getElementById('turn').innerHTML=turn

const resetGame = function(){
    isGameOver=false
    humanMoves=[]
    computerMoves=[]
    possibleComputerPairs=[]
    possibleHumanPairs=[]
    for(let i in mapper){
        document.getElementById('cell'+mapper[i]).innerHTML=""
    }
    isGameOver = false
    if(turn==="You"){
        turn = "Computer"
        let firstTurn = (Math.floor(Math.random()*1000))%9
        computerMoves.push(firstTurn)
        document.getElementById("cell"+mapper[firstTurn]).innerHTML=computerSymbol
        }
    else if(turn=="Computer"){
        turn ="You"

    }

    document.getElementById("your-wins").innerHTML=humanWins
    document.getElementById("computer-wins").innerHTML=computerWins
    document.getElementById('turn').innerHTML=turn

}

document.getElementById('reset').addEventListener('click',()=>{
    resetGame()
})


const generatePossiblePairs = function(moves,possiblePairs){
     for(let i=0;i<moves.length-1;i++){
 
         for(let j=i+1;j<moves.length;j++){
 
         let a=moves[i]
         let b=moves[j]
         
         if(a===0){
             if([1,2,3,4,6,8].indexOf(b)!==-1 && possiblePairs.indexOf(""+a+b)===-1  ){
                 
                 possiblePairs.push(""+a+b)
             }
         }
         else if(a===1){
             if([2,4,7].indexOf(b)!==-1 && possiblePairs.indexOf(""+a+b)===-1){
                possiblePairs.push(""+a+b)
             }
         }
         else if(a===2){
             if([4,5,6,7,8].indexOf(b)!==-1 && possiblePairs.indexOf(""+a+b)===-1){
                possiblePairs.push(""+a+b)
             }
         }
         else if(a===3){
             if([4,5,6].indexOf(b)!==-1 && possiblePairs.indexOf(""+a+b)===-1){
                possiblePairs.push(""+a+b)
             }
         }
         else if(a===4){
             if([5,6,7,8].indexOf(b)!==-1 && possiblePairs.indexOf(""+a+b)===-1){
                possiblePairs.push(""+a+b)
             }
         }
         else if(a===5){
             if(b===8 && possiblePairs.indexOf(""+a+b)===-1){
                possiblePairs.push(""+a+b)
             }
         }
         else if(a===6){
            if([7,8].indexOf(b)!==-1 && possiblePairs.indexOf(""+a+b)===-1){
                possiblePairs.push(""+a+b)
            }
         }
         else if(a===7){
            if(b===8 && possiblePairs.indexOf(""+a+b)===-1){
                possiblePairs.push(""+a+b)
            }
         }
     }
 }
 return possiblePairs
}




const getNextMove = function(){

    for(let i=0;i<9;i++){ // checking if computer can win in next move
        if(humanMoves.indexOf(i)===-1 && computerMoves.indexOf(i)===-1){

            if(checkIsGameOver(i,possibleComputerPairs)){
                console.log("Computer winning possibility")
                return i;
            }            
        }
    }

    for(let i=0;i<9;i++){ // checking if human can win in next move so that the computer makes the same move to stop human from winning
        if(humanMoves.indexOf(i)===-1 && computerMoves.indexOf(i)===-1){

            if(checkIsGameOver(i,possibleHumanPairs)){
                console.log("Human Winning Possibility")
                return i;
            }
            
            
        }

    }

   
    
    for(let i=0;i<9;i++){ // iterating through all the possible cells to make a best move
        if(humanMoves.indexOf(i)===-1 && computerMoves.indexOf(i)===-1){ 
                let tempComputerMoves = [...computerMoves]
                tempComputerMoves.push(i) // taking i into temporary computer moves and if it is the best move it will be returned
                tempComputerMoves.sort()
                console.log(tempComputerMoves)


                // generating possible pairs of computer moves after adding i to the computer moves. 
                //With these generated pairs we will combine with each of the human moves and check if the game is over with this combination of computer pair and human move. 
                //If game can be finished with combination of computer pair and a human move then it is not a correct move for the computer. 
                let tempPossibleComputerPairs = generatePossiblePairs(tempComputerMoves,[])
                if(tempPossibleComputerPairs.length===0){ 
                    continue; // if there are no possible pairs after taking i as next move then it is not correct move for computer as it cannot win the using this move
                }
                let flag=true // initial value true
                for(let j of humanMoves){
                    
                    console.log(j,tempPossibleComputerPairs, checkIsGameOver(j,tempPossibleComputerPairs));
                    if(checkIsGameOver(j,tempPossibleComputerPairs)){
                        flag=false // we are making flag to false it means we cant use this value of i
                        break
                    }

                    let tempPossibleComputerPairs2 = generatePossiblePairs([i,j].sort(),[])
                    if(tempPossibleComputerPairs2.length===0){
                        flag=false // we are making flag to false it means we cant use this value of i
                        break
                    }

                }
                console.log(flag);
                if(flag){
                    return i
                }

                      
        }

    }

    // Generating a random move for computer from remaining moves. This is generally for the first time
    let remainingMoves = [0,1,2,3,4,5,6,7,8].filter((a)=>{
            if(humanMoves.indexOf(a)===-1 && computerMoves.indexOf(a)===-1 ){
                return true
            }
    
        
    })
    return remainingMoves[Math.floor(Math.random()*10)%remainingMoves.length]
    
}

const checkIsGameOver = function(newOption,possiblePairs){

    if(possiblePairs.length===0){
        return false
    }

    for(let i=0;i<possiblePairs.length;i++){
        let temp=""+newOption+possiblePairs[i]
        temp=temp.split("").sort().join("")

        if(winningPatterns.indexOf(temp)!==-1){
            console.log(temp)
            wonByPattern=temp
            return true
        }

    }
    return false
    
}

const glowCells = function(){
    for(let i of wonByPattern){
        document.getElementById("cell"+mapper[Number.parseInt(i)]).style.display = "none"
    }
    for(let i of wonByPattern){
        document.getElementById("cell"+mapper[Number.parseInt(i)]).style.display = "flex"
    }
}
const userMadeMove = function(cell){
    
    if(isGameOver || humanMoves.indexOf(cell)!==-1 || computerMoves.indexOf(cell)!==-1 ){ // If user clicks the cell which is already filled then we return without 
        return
    }

    document.getElementById("cell"+mapper[cell]).innerHTML = humanSymbol
    humanMoves.push(cell)
    humanMoves.sort()
    if(checkIsGameOver(cell,possibleHumanPairs)){
        isGameOver=true
        alert("Game Over! Won by You")
        humanWins+=1
        winner='human'
        glowCells()
        
        return
        
    }
    possibleHumanPairs= generatePossiblePairs(humanMoves,[...possibleHumanPairs])
    console.log("Human Moves - ",humanMoves)
    console.log("Possible Human moves", possibleHumanPairs)
    let computerNextMove = getNextMove()
    
    computerMoves.push(computerNextMove)
    document.getElementById("cell"+mapper[computerNextMove]).innerHTML = computerSymbol
   
    computerMoves.sort()
    if(checkIsGameOver(computerNextMove,possibleComputerPairs)){
        isGameOver=true
        alert("Game Over! Won by computer")
        computerWins+=1
        glowCells()
        winner="computer"
        return

    }
   // console.log("Computer moves",computerMoves)
    possibleComputerPairs= generatePossiblePairs(computerMoves,[...possibleComputerPairs])
    console.log("Computer Moves - ",computerMoves)
    console.log("Possible Computer moves - ",possibleComputerPairs)
}

document.getElementById("cell00").addEventListener('click',function(){
   userMadeMove(0)
})


document.getElementById("cell01").addEventListener('click',function(){
    userMadeMove(1)
})


document.getElementById("cell02").addEventListener('click',function(){
   userMadeMove(2)
})


document.getElementById("cell10").addEventListener('click',function(){
   userMadeMove(3)
})


document.getElementById("cell11").addEventListener('click',function(){
   userMadeMove(4)
})


document.getElementById("cell12").addEventListener('click',function(){
   userMadeMove(5)
})



document.getElementById("cell20").addEventListener('click',function(){
    userMadeMove(6)
})


document.getElementById("cell21").addEventListener('click',function(){
   userMadeMove(7)
})


document.getElementById("cell22").addEventListener('click',function(){
    userMadeMove(8)
})
