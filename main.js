screen = document.getElementById("Screen")
let amountOfBombs = 3
let playerMoney = 100
let possibleWinnings = 0 
let originalBet = 0
let hasbeenClicked = []
let multiplier = (1 + (0.025 * amountOfBombs))
run()

function run() {
    gameScreen = document.createElement("div")
    gameScreen.id = "gameScreen"
    screen.appendChild(gameScreen)
    createGameBoard()
    mines = createMines(amountOfBombs)
    console.log(mines)
    gameScreen.style.pointerEvents = "none"
}

//Draws up the gameboard
function createGameBoard() {
    updatePlayer()
    counter = 0
    //Creating 25 divs
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            square = document.createElement("div")
            square.classList.add("square")
            square.id = counter
            gameScreen.appendChild(square)
            counter ++ 

            //Triggers when a div is clicked on
            square.addEventListener("click", function() {
                clicked(this)
            })
        }
    }
}

//Randomly generates the mines the bombs will be on
function createMines(amountOfBombs) {
    mines = []
    for (let i = 0; i < amountOfBombs; i++) { 
        let tempMine = Math.floor(Math.random() * 25)

        while ((mines.indexOf(tempMine) >= 0)) {
            tempMine = Math.floor(Math.random() * 25)
        }
        mines.push(tempMine)
        
    }
    return mines
}

//Triggers when an object is clicked on
function clicked(obj) {
    betting = document.getElementById("betButton")
    cashingout = document.getElementById("cashoutButton")
    //Disables the player from betting further after starting to play
    betting.disabled = true
    cashingout.disabled = false
    //Checks to see if the square the player has clicked on is a mine or not
    if (mines.indexOf(parseInt(obj.id)) >=0) {
        cashingout.disabled = true
        console.log("bomb")
        //Sets the square to red to show the user they've lost


        obj.style.backgroundColor = "#E20016"
        gameScreen.style.pointerEvents = "none"

        //Creates a reset button to allow the user to reset the game so they can try again
        resetDiv = document.getElementById("Reset")
        console.log(resetDiv)
        resetButton = document.createElement("button")
        resetButton.innerHTML = "RESET"
        resetButton.id = "resetButton"
        resetDiv.appendChild(resetButton)
        gameScreen = document.getElementById("gameScreen")

        squares = gameScreen.querySelectorAll('.square')
        console.log(squares)

        squares.forEach((square) => {
            if (mines.indexOf(parseInt(square.id)) >= 0) {
                console.log(square.id)
                charcoal = document.createElement("IMG")
                charcoal.setAttribute("src", "charcoal.webp")
                charcoal.setAttribute("width", "70")
                charcoal.setAttribute("height", "70")
                square.appendChild(charcoal)
                square.style.backgroundColor = "#E20016"
            }
            
        });
            
        



        //Triggers when reset button is clicked
        resetButton.addEventListener("click", function() {
            reset()
        })
    } else {
        //If the square is not a bomb it will make it green and increase the possibleWinnings
        obj.style.backgroundColor = "#51E885"
        emerald_icon = document.createElement("IMG")
        emerald_icon.setAttribute("src", "emerald.webp")
        emerald_icon.setAttribute("width", "70")
        emerald_icon.setAttribute("height", "70")
        obj.appendChild(emerald_icon)
        console.log(hasbeenClicked.indexOf(obj.id))
        obj.style.pointerEvents = "none"
        if (hasbeenClicked.indexOf(obj.id) < 0) {
            possibleWinnings = possibleWinnings * multiplier
            potentialWinnings()
            hasbeenClicked.push(obj.id)
        } 
    }
}

//Resets the gameboard for the next round
function reset() {
    console.log("REESAESRTITNG")
    cashingout = document.getElementById("cashoutButton")
    gameScreen = document.getElementById("gameScreen")
    resetDiv = document.getElementById("Reset")
    console.log(gameScreen)
    gameScreen.innerHTML = ""
    resetDiv.innerHTML = ""
    possibleWinnings = 0
    originalBet = 0
    potentialWinnings()
    createGameBoard()
    hasbeenClicked = []
    mines = createMines(amountOfBombs)
    gameScreen.style.pointerEvents = "none"
    cashingout.disabled = true
    console.log(mines)
}

//Updates the player div at the top i.e. players money and the bet button
function updatePlayer() {
    playerDiv = document.getElementById("Player")
    playerDiv.innerHTML = ""
    
    //Player money
    moneyDisplay = document.createElement("div")
    money = document.createElement("h1")
    money.innerHTML = "Player Money: " + playerMoney.toFixed(2)
    moneyDisplay.appendChild(money)
    playerDiv.appendChild(moneyDisplay)

    //Bet button
    betButtonDiv = document.createElement("div")
    betButton = document.createElement("button")
    betButton.id = "betButton"
    betButton.innerHTML = "BET"
    betButtonDiv.appendChild(betButton)
    playerDiv.appendChild(betButtonDiv)

    //Trigger for bet button
    betButton.addEventListener("click", function() {
        bet()
    })
}

//Updates the winnings div at the top i.e. possibleWinnings and cashoutButton
function potentialWinnings() {
    winningsDiv = document.getElementById("Winnings")
    winningsDiv.innerHTML = ""

    //possibleWinnings display
    winningsDisplay = document.createElement("div")
    winnings = document.createElement("h1")
    winnings.innerHTML = "Potential Winnings: " + possibleWinnings.toFixed(2)
    winningsDisplay.appendChild(winnings)
    winningsDiv.appendChild(winningsDisplay)

    //cashout Button 
    cashoutDiv = document.createElement("div")
    cashoutButton = document.createElement("button")
    cashoutButton.innerHTML = "CASHOUT"
    cashoutButton.id = "cashoutButton"
    cashoutDiv.appendChild(cashoutButton)
    winningsDiv.appendChild(cashoutDiv)

    //Trigger for cashout button
    cashoutButton.addEventListener("click", function() {
        cashout()
    })
}

//Bet function, allows the user to bet on the game in increments of 20
function bet() {
    playerMoney = playerMoney - 20
    originalBet = originalBet + 20
    possibleWinnings = originalBet
    gameScreen.style.pointerEvents = "auto"
    potentialWinnings()
    updatePlayer()
    console.log("BETTING")
}

//Cashout button allows the user to withdraw their money and fully resets the game 
function cashout() {
    console.log("CASHING OUT")
    playerMoney = playerMoney + possibleWinnings

    multi = document.getElementById("multi")
    multi.innerHTML = ""
    multi.style.visibility = "visible"
    console.log(multi)
    multiplierDisplay = document.createElement("h1")
    multiplierDisplay.innerHTML = (possibleWinnings / originalBet).toFixed(2) + "x"
    multi.appendChild(multiplierDisplay)
    moneywonDisplay = document.createElement("h2")
    moneywonDisplay.innerHTML = "$"+possibleWinnings.toFixed(2)
    multi.appendChild(moneywonDisplay)

    setTimeout(clearMulti, 2000)

    function clearMulti() {
        multi.style.visibility = "hidden"
    }
    

    reset()
}

