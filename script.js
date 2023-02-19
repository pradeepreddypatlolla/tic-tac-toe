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
const mapper = {0:"00",1:"01",2:"02",3:"10",4:"11",5:"12",6:"20",7:"21",8:"22"}
document.getElementById("your-wins").innerHTML=humanWins
document.getElementById("computer-wins").innerHTML=computerWins
document.getElementById('turn').innerHTML=turn

const resetGame = function(){
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
        let firstTurn = Math.floor(Math.random()*10)
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
const generatepossibleHumanPairs = function(humanMoves,possibleHumanPairs){
    console.log("Human Moves - ",humanMoves)
    
   // console.log("possible Human pairs - ",possibleHumanPairs)
    for(let i=0;i<humanMoves.length-1;i++){

        for(let j=i+1;j<humanMoves.length;j++){

        

        let a=humanMoves[i]
        let b=humanMoves[j]
        console.log(a,b)
        if(a===0){
            if([1,2,3,4,6,8].indexOf(b)!==-1 && possibleHumanPairs.indexOf(""+a+b)===-1  ){
                
                possibleHumanPairs.push(""+a+b)
            }
        }
        else if(a===1){
            if([2,4,7].indexOf(b)!==-1 && possibleHumanPairs.indexOf(""+a+b)===-1){
                possibleHumanPairs.push(""+a+b)
            }
        }
        else if(a===2){
            if([4,5,7,8].indexOf(b)!==-1 && possibleHumanPairs.indexOf(""+a+b)===-1){
                possibleHumanPairs.push(""+a+b)
            }
        }
        else if(a===3){
            if([4,5,6].indexOf(b)!==-1 && possibleHumanPairs.indexOf(""+a+b)===-1){
                possibleHumanPairs.push(""+a+b)
            }
        }
        else if(a===4){
            if([5,6,7,8].indexOf(b)!==-1 && possibleHumanPairs.indexOf(""+a+b)===-1){
                possibleHumanPairs.push(""+a+b)
            }
        }
        else if(a===5){
            if(b===8 && possibleHumanPairs.indexOf(""+a+b)===-1){
                possibleHumanPairs.push(""+a+b)
            }
        }
    }
}
return possibleHumanPairs
    
}



const generatepossibleComputerPairs = function(computerMoves,possibleComputerPairs){
    
   // console.log("Computer Moves - ",computerMoves)
   // console.log("possible Computer pairs - ",possibleComputerPairs)
    for(let i=0;i<computerMoves.length-1;i++){

        for(let j=i+1;j<computerMoves.length;j++){

        

        let a=computerMoves[i]
        let b=computerMoves[j]
     //   console.log(a,b)
        if(a===0){
            if([1,2,3,4,6,8].indexOf(b)!==-1 && possibleComputerPairs.indexOf(""+a+b)===-1  ){
                
                possibleComputerPairs.push(""+a+b)
            }
        }
        else if(a===1){
            if([2,4,7].indexOf(b)!==-1 && possibleComputerPairs.indexOf(""+a+b)===-1){
                possibleComputerPairs.push(""+a+b)
            }
        }
        else if(a===2){
            if([4,5,7,8].indexOf(b)!==-1 && possibleComputerPairs.indexOf(""+a+b)===-1){
                possibleComputerPairs.push(""+a+b)
            }
        }
        else if(a===3){
            if([4,5,6].indexOf(b)!==-1 && possibleComputerPairs.indexOf(""+a+b)===-1){
                possibleComputerPairs.push(""+a+b)
            }
        }
        else if(a===4){
            if([5,6,7,8].indexOf(b)!==-1 && possibleComputerPairs.indexOf(""+a+b)===-1){
                possibleComputerPairs.push(""+a+b)
            }
        }
        else if(a===5){
            if(b===8 && possibleComputerPairs.indexOf(""+a+b)===-1){
                possibleComputerPairs.push(""+a+b)
            }
        }
    }
}

   // console.log(possibleComputerPairs)
    return possibleComputerPairs
}



const getNextMove = function(){

    for(let i=0;i<9;i++){ // checking if we can win in next move
        if(humanMoves.indexOf(i)===-1 && computerMoves.indexOf(i)===-1){

            if(checkIsGameOver(i,possibleComputerPairs)){
                console.log("Hello1")
                return i;
            }            
        }
    }

    for(let i=0;i<9;i++){ // checking if 
        if(humanMoves.indexOf(i)===-1 && computerMoves.indexOf(i)===-1){

            if(checkIsGameOver(i,possibleHumanPairs)){
                console.log("Hello0")
                return i;
            }
            
            
        }

    }

   

    for(let i=0;i<9;i++){
        console.log("i- ",i)
        if(humanMoves.indexOf(i)===-1 && computerMoves.indexOf(i)===-1){
                let tempComputerMoves = [...computerMoves]
                
                tempComputerMoves.push(i)

                console.log("Temp Com moves - ",tempComputerMoves)
               // console.log("Temp com moves - ",tempComputerMoves)
                let tempPossibleComputerPairs = generatepossibleComputerPairs(tempComputerMoves,[])
                console.log("Temp Poss com moves ",tempPossibleComputerPairs)
                if(tempPossibleComputerPairs.length===0){
                    continue;
                }
                for(let j of humanMoves){
                    console.log("j - ",j)
                    console.log(checkIsGameOver(j,tempPossibleComputerPairs))
                    let tempPossibleComputerPairs2 = generatepossibleComputerPairs([i,j].sort(),[])
                    console.log(tempPossibleComputerPairs2)
                    if(!checkIsGameOver(j,tempPossibleComputerPairs) && tempPossibleComputerPairs2.length!==0 ){
                        console.log("Hello2")
                      //  console.log("Temp com moves - ",tempComputerMoves)
                      //  console.log(" com moves - ",computerMoves)
                      console.log("Res - ",i)
                        return i
                    }
                }
                      
        }

    }


    let remainingMoves = [0,1,2,3,4,5,6,7,8].filter((a)=>{
            if(humanMoves.indexOf(a)===-1){
                return true
            }
    
        
    })
    console.log("Remaining moves -",remainingMoves)
    return remainingMoves[Math.floor(Math.random()*10)%remainingMoves.length]
    // for(let i=0;i<9;i++){
    //     if(humanMoves.indexOf(i)===-1 && computerMoves.indexOf(i)===-1){
           
    //         return i
    //     }
    // }

    // for(let i=0;i<9;i++){
    //     if(humanMoves.indexOf(i)===-1){
    //         console.log("Hello4")
    //         return i;
    //     }
    // }

}

const checkIsGameOver = function(newOption,possibleHumanPairs){

    if(possibleHumanPairs.length===0){
        return false
    }

    for(let i=0;i<possibleHumanPairs.length;i++){
        let temp=""+newOption+possibleHumanPairs[i]
        temp=temp.split("").sort().join("")
        if(winningPatterns.indexOf(temp)!==-1){
            isGameOver=true
            
            return true
        }

    }
    return false
    
}
document.getElementById("cell00").addEventListener('click',function(){

    humanMoves.push(0)
    document.getElementById("cell00").innerHTML = humanSymbol
    humanMoves.sort()
    if(checkIsGameOver(0,possibleHumanPairs)){
        alert("Game Over! Won by You")
        humanWins+=1
        winner='human'
        return
        
    }
    possibleHumanPairs= generatepossibleHumanPairs(humanMoves,[...possibleHumanPairs])
    console.log(possibleHumanPairs)
    let computerNextMove = getNextMove()
    
    computerMoves.push(computerNextMove)
    document.getElementById("cell"+mapper[computerNextMove]).innerHTML = computerSymbol
   
    computerMoves.sort()
    if(checkIsGameOver(computerNextMove,possibleComputerPairs)){
        alert("Game Over! Won by computer")
        computerWins+=1
        winner="computer"
        return

    }
   // console.log("Computer moves",computerMoves)
    possibleComputerPairs= generatepossibleComputerPairs(computerMoves,[...possibleComputerPairs])
})


document.getElementById("cell01").addEventListener('click',function(){
    document.getElementById("cell01").innerHTML = humanSymbol
    humanMoves.push(1)
    humanMoves.sort()
    if(checkIsGameOver(1,possibleHumanPairs)){
        alert("Game Over! Won by You")
        humanWins+=1
        winner='human'
        return

    }
   possibleHumanPairs= generatepossibleHumanPairs(humanMoves,[...possibleHumanPairs])
   console.log(possibleHumanPairs)

    let computerNextMove = getNextMove()
    document.getElementById("cell"+mapper[computerNextMove]).innerHTML = computerSymbol
    computerMoves.push(computerNextMove)
    computerMoves.sort()
    if(checkIsGameOver(computerNextMove,possibleComputerPairs)){
        alert("Game Over! Won by computer")
        computerWins+=1
        winner="computer"
        return
    }
    possibleComputerPairs= generatepossibleComputerPairs(computerMoves,[...possibleComputerPairs])
})


document.getElementById("cell02").addEventListener('click',function(){
    document.getElementById("cell02").innerHTML = humanSymbol
    humanMoves.push(2)
    humanMoves.sort()
    if(checkIsGameOver(2,possibleHumanPairs)){
        alert("Game Over! Won by You")
        humanWins+=1
        winner='human'
        return
    }
    possibleHumanPairs= generatepossibleHumanPairs(humanMoves,[...possibleHumanPairs])
    console.log(possibleHumanPairs)

    let computerNextMove = getNextMove()
    document.getElementById("cell"+mapper[computerNextMove]).innerHTML = computerSymbol
    computerMoves.push(computerNextMove)
    computerMoves.sort()
    if(checkIsGameOver(computerNextMove,possibleComputerPairs)){
        alert("Game Over! Won by computer")
        computerWins+=1
        winner="computer"
        return
    }
    possibleComputerPairs= generatepossibleComputerPairs(computerMoves,[...possibleComputerPairs])
})


document.getElementById("cell10").addEventListener('click',function(){
    document.getElementById("cell10").innerHTML = humanSymbol
    humanMoves.push(3)
    humanMoves.sort()
    if(checkIsGameOver(3,possibleHumanPairs)){
        alert("Game Over! Won by You")
        humanWins+=1
        winner='human'
        return
    }
    possibleHumanPairs= generatepossibleHumanPairs(humanMoves,[...possibleHumanPairs])
    console.log(possibleHumanPairs)
    let computerNextMove = getNextMove()
    document.getElementById("cell"+mapper[computerNextMove]).innerHTML = computerSymbol
    computerMoves.push(computerNextMove)
    computerMoves.sort()
    if(checkIsGameOver(computerNextMove,possibleComputerPairs)){
        alert("Game Over! Won by computer")
        computerWins+=1
        winner="computer"
        return
    }
    possibleComputerPairs= generatepossibleComputerPairs(computerMoves,[...possibleComputerPairs])
})


document.getElementById("cell11").addEventListener('click',function(){
    document.getElementById("cell11").innerHTML = humanSymbol
    humanMoves.push(4)
    humanMoves.sort()
    if(checkIsGameOver(4,possibleHumanPairs)){
        alert("Game Over! Won by You")
        humanWins+=1
        winner='human'
        return
    }
    possibleHumanPairs= generatepossibleHumanPairs(humanMoves,[...possibleHumanPairs])
    console.log(possibleHumanPairs)

    let computerNextMove = getNextMove()
    document.getElementById("cell"+mapper[computerNextMove]).innerHTML = computerSymbol
    computerMoves.push(computerNextMove)
    computerMoves.sort()
    if(checkIsGameOver(computerNextMove,possibleComputerPairs)){
        alert("Game Over! Won by computer")
        computerWins+=1
        winner="computer"
        return
    }
    possibleComputerPairs= generatepossibleComputerPairs(computerMoves,[...possibleComputerPairs])
})


document.getElementById("cell12").addEventListener('click',function(){
    document.getElementById("cell12").innerHTML = humanSymbol
    humanMoves.push(5)
    humanMoves.sort()
    if(checkIsGameOver(5,possibleHumanPairs)){
        alert("Game Over! Won by You")
        humanWins+=1
        winner='human'
        return
    }
    possibleHumanPairs= generatepossibleHumanPairs(humanMoves,[...possibleHumanPairs])
    console.log(possibleHumanPairs)

    let computerNextMove = getNextMove()
    document.getElementById("cell"+mapper[computerNextMove]).innerHTML = computerSymbol
    computerMoves.push(computerNextMove)
    computerMoves.sort()
    if(checkIsGameOver(computerNextMove,possibleComputerPairs)){
        alert("Game Over! Won by computer")
        computerWins+=1
        winner="computer"
        return

    }
    possibleComputerPairs= generatepossibleComputerPairs(computerMoves,[...possibleComputerPairs])
})



document.getElementById("cell20").addEventListener('click',function(){
    document.getElementById("cell20").innerHTML = humanSymbol
    humanMoves.push(6)
    humanMoves.sort()
    if(checkIsGameOver(6,possibleHumanPairs)){
        alert("Game Over! Won by You")
        humanWins+=1
        winner='human'
        return
    }
    possibleHumanPairs= generatepossibleHumanPairs(humanMoves,[...possibleHumanPairs])
    console.log(possibleHumanPairs)

    let computerNextMove = getNextMove()
    document.getElementById("cell"+mapper[computerNextMove]).innerHTML = computerSymbol
    computerMoves.push(computerNextMove)
    computerMoves.sort()
    if(checkIsGameOver(computerNextMove,possibleComputerPairs)){
        alert("Game Over! Won by computer")
        computerWins+=1
        winner="computer"
        return
    }
    possibleComputerPairs= generatepossibleComputerPairs(computerMoves,[...possibleComputerPairs])
})


document.getElementById("cell21").addEventListener('click',function(){
    document.getElementById("cell21").innerHTML = humanSymbol
    humanMoves.push(7)
    humanMoves.sort()
    if(checkIsGameOver(7,possibleHumanPairs)){
        alert("Game Over! Won by You")
        humanWins+=1
        winner='human'
        return
    }
    possibleHumanPairs= generatepossibleHumanPairs(humanMoves,[...possibleHumanPairs])
    console.log(possibleHumanPairs)

    let computerNextMove = getNextMove()
    document.getElementById("cell"+mapper[computerNextMove]).innerHTML = computerSymbol
    computerMoves.push(computerNextMove)
    computerMoves.sort()
    if(checkIsGameOver(computerNextMove,possibleComputerPairs)){
        alert("Game Over! Won by computer")
        computerWins+=1
        winner="computer"
        return
    }
    possibleComputerPairs= generatepossibleComputerPairs(computerMoves,[...possibleComputerPairs])
})


document.getElementById("cell22").addEventListener('click',function(){
    document.getElementById("cell22").innerHTML = humanSymbol
    humanMoves.push(8)
    humanMoves.sort()
    if(checkIsGameOver(8,possibleHumanPairs)){
        alert("Game Over! Won by You")
        humanWins+=1
        winner='human'
        return
    }
    possibleHumanPairs= generatepossibleHumanPairs(humanMoves,[...possibleHumanPairs])
    console.log(possibleHumanPairs)

    let computerNextMove = getNextMove()
    document.getElementById("cell"+mapper[computerNextMove]).innerHTML = computerSymbol
    computerMoves.push(computerNextMove)
    computerMoves.sort()
    if(checkIsGameOver(computerNextMove,possibleComputerPairs)){
        alert("Game Over! Won by computer")
        computerWins+=1
        winner="computer"
        return
    }
   possibleComputerPairs= generatepossibleComputerPairs(computerMoves,[...possibleComputerPairs])
})
