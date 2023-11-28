# JavaScript-Slot-Machine
The game follows a set of rules and logic to simulate the experience of playing a slot machine. Players can deposit money, choose the number of lines to bet on, set a bet amount per line, spin the slot machine, and check if they win. The game provides feedback on winnings and allows players to play again or exit when they run out of money.


Checklist / Thought Process
1. Deposit some money to work with
Players can deposit money at the beginning of the game. The deposit function ensures that the entered amount is valid (a positive number).

2. Determine the number of lines the user wants to bet on
Players can choose the number of lines they want to bet on (between 1 and 3).

3. Collect a betting amount per line
Players set a bet amount per line. The game ensures that the entered bet is valid (a positive number) and does not exceed the balance divided by the number of lines.

4. Spin the slot machine
The slot machine randomly generates symbols for each reel, creating a matrix of symbols.

5. Check to see if the user won
The game checks if any row contains identical symbols, and calculates winnings based on the bet amount and symbol values.

6. Give the user their winnings or take their bet if they lost
Players receive winnings if they have a winning combination. The game subtracts the bet amount from the balance.

7. Play again or handle the situation if they have no money left
After each round, players can choose to play again or exit the game. If the balance is zero, the game ends.

8. How to Play
Open the terminal and navigate to the project directory.
Run the game by executing the command: node filename.js

9. Screenshots
![Screenshot 2023-11-28 170137](https://github.com/EvanC54/GamblingJS/assets/64505599/06ca275f-59eb-48a5-8ad4-8e103544a779)
![Screenshot 2023-11-28 170307](https://github.com/EvanC54/GamblingJS/assets/64505599/d1dca363-cd8a-41f1-a4d4-68673f280291)
exceptions 
![Screenshot 2023-11-28 170334](https://github.com/EvanC54/GamblingJS/assets/64505599/5f3eead6-5d99-4c97-9fc3-33c6d3c6f28c)
