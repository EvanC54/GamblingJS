// CHECKLIST / THOUGHT PROCESS
// 1. Deposit some money to work with 
// 2. Determine number of lines user wants to bet on
// 3. Collect a betting amount 
// 4. Spin the slot machine 
// 5. Check to see if the user won 
// 6. Give the user their winnings or take their bet if they lost 
// 7. Play again or a situation if they have no money left 

//importing package to get user input 
const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3; 

const SYMBOLS_COUNT = {   //this allows us to have keys mapped to different values for the slot machine (number of keys in the array Ex. there are 2 A keys, 4 B keys etc.)
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}

const SYMBOL_VALUES = {    //this is the multiplier per each symbol 
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
}


//deposit function 
const deposit = () => {

    while(true){  //do this forever until we get a valid amount then we return the number deposited amount 
    const depositAmount = prompt("Enter a deposit amount: ");
 //converting the string from user to int. That way we can add/subtract and see if they entered a valid number and not something like -100 
    const numberDepositAmount = parseFloat(depositAmount);
 //checking to see if the number entered is a valid number:  isNaN = is not a number
    if(isNaN(numberDepositAmount) || numberDepositAmount <= 0){
        console.log("Invalid deposit amount, please try again.")
      } else{
        return numberDepositAmount; 
      }
    }
};

const getNumberOfLines = () => {
    while(true){  //do this forever until we get a valid amount then we return the number deposited amount 
        const lines = prompt("Enter the number of lines you'd like to bet on: (1-3) ");
        const numberOfLines = parseFloat(lines);
     //checking to see if the number entered is a valid number, less than or 0, and more than 3 lines
        if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
            console.log("Invalid number of lines, please try again.")
          } else {
            return numberOfLines; 
          }
        }
};

//we have balance parameter becuase a user cant have a bet that is more than their balance and now in this function we can use this balance variable to determine what the max bet is 
const getBet = (balance, lines) =>{
    while(true){  //do this forever until we get a valid amount then we return the number deposited amount 
        const bet = prompt("Enter the bet per line: ");
        const numberBet = parseFloat(bet);
     //checking to see if the number entered is a valid number, less than or 0, and their balance / number of lines since their bet is affected by the number of lines there can be 
        if(isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines){
            console.log("Invalid bet, please try again.")
          } else {
            return numberBet; 
          }
        }
};

//generating an array of all the avaiable symbols we can pick from 
const spin = () =>{
    const symbols = [];
    for(const [symbol, count] of Object.entries(SYMBOLS_COUNT)){   //looping through all the entries within SYMBOL_COUNT and will give use the smybol(key) and the count 
        for(let i = 0; i < count; i++){    //add however many symbols we have into our symbols array 
            symbols.push(symbol);          //we add them by pushing them into our array (inserting essentially) 
        }                                  //the point of this is now being able to randomly select elements from our symbols array we made at the start 
    }
//creating an array that has all of the different possible reels 
    const reels = [];  
    for(let i = 0; i < COLS; i++){         // for every column we have we have to generate what is inside of it 
        reels.push([]);                    //this just adds however many reels or (columns) we have into the reels[] at the top
        const reelSymbols = [...symbols];  //this just copies the symbols we have avaiable for each reel into the array. So once ones taken and added to the reel, its removed from the avaiable symbols array
        for(let j = 0; j < ROWS; j++){     //then we have to pick the row elements that are inside that column
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);  //MATH.random generates a random number between 0-1, then multiply it by the length of our symbols so the max number this expression is going to generate is however many symbols we have. Then MATH.floor is rounded them down to the nearest whole number because we dont want to round up and get an index outside of the array 
            const selectedSymbol = reelSymbols[randomIndex];   //we can then use that to select the element from our realSymbols array 
            reels[i].push(selectedSymbol);  //adding it into this array 
            reelSymbols.splice(randomIndex, 1); //then removing it so it cant be selected again 
        }
    } 
    return reels
};

/* 
 right now this is how the arrays look 
    [[A B C] [D D D] [A A A]]

 but we need to transpose them by rows so we can see which row is winning if that makes sense (essentially transposing a matrix)
   [A D A]
   [B D A]
   [C D A]
*/
/* To transpose we're going to create a for loop that goes through the number of rows that we have. 
   For each row 0,1,2 we are going to collect all the elements from each column and push that into the rows array
*/
const transpose = (reels) => {           
    const rows = [];

    for(let i = 0; i < ROWS; i++){
        rows.push([]);
        for(let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

//printing our rows out for the user below

/*
so what we'll be getting here is for instance 
["A", "B", "C"]
index 0 = A
index 1 = B
index 2 = C
*/
const printRows = (rows) =>{
    for(const row of rows){
        let rowString ="";
        for(const [i, symbol] of row.entries()){
            rowString += symbol       // += adds elements into the string (concadinating)
            if(i != row.length - 1){
                rowString += " | "
            }
        }
        console.log(rowString);
    }
};

//we need the rows, their bet, and the lines to determine if they have won or not 
const getWinnings = (rows, bet, lines) => {  
    let winnings = 0;
    for(let row = 0; row < lines; row++){
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }
        if(allSame){
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        }
    } 
    return winnings;
};

//GAME
const game = () =>{
    let balance = deposit();
//CORE LOGIC 
    while(true){
        console.log("You have a balance of: " + balance);
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);
balance -= bet * numberOfLines;
const reels = spin();
const rows = transpose(reels);
printRows(rows);
const winnings = getWinnings(rows, bet, numberOfLines)
balance += winnings;
console.log("You won, $" + winnings.toString());

if(balance <= 0){
    console.log("You ran out of money!! ");
    break;
}
const playAgain = prompt("Do you want to play again? (y/n) ");
if(playAgain != "y") break;
  }
};

game();








