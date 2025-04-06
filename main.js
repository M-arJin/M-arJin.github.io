screen = document.getElementById("Screen")
let amountOfBombs = 3
let playerMoney = 100
let possibleWinnings = 0 

run()

function run() {
    gameScreen = document.createElement("div")
    gameScreen.id = "gameScreen"
    screen.appendChild(gameScreen)
    createGameBoard()
    mines = createMines(amountOfBombs)
    console.log(mines)
}

function createGameBoard() {
    updatePlayer()
    counter = 0
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            square = document.createElement("div")
            square.classList.add("square")
            square.id = counter
            gameScreen.appendChild(square)
            counter ++ 

            
            square.addEventListener("click", function() {
                clicked(this)
            })
        }
    }
}

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


function clicked(obj) {
    betting = document.getElementById("betButton")
    betting.disabled = true




    if (mines.indexOf(parseInt(obj.id)) >=0) {
        cashingout = document.getElementById("cashoutButton")
        cashingout.disabled = true
        console.log("bomb")
        obj.style.backgroundColor = "red"
        gameScreen.style.pointerEvents = "none"


        resetDiv = document.getElementById("Reset")
        console.log(resetDiv)
        resetButton = document.createElement("button")
        resetButton.innerHTML = "RESET"
        resetDiv.appendChild(resetButton)


        resetButton.addEventListener("click", function() {
            reset()
        })
    } else {
        obj.style.backgroundColor = "#51E885"
        possibleWinnings = possibleWinnings * (1 + (0.025 * amountOfBombs))
        potentialWinnings()
    }
}

function reset() {
    console.log("REESAESRTITNG")
    gameScreen = document.getElementById("gameScreen")
    resetDiv = document.getElementById("Reset")
    console.log(gameScreen)
    gameScreen.innerHTML = ""
    resetDiv.innerHTML = ""
    gameScreen.style.pointerEvents = "auto"
    possibleWinnings = 0
    potentialWinnings()
    createGameBoard()
}

function updatePlayer() {
    playerDiv = document.getElementById("Player")
    playerDiv.innerHTML = ""
    
    moneyDisplay = document.createElement("div")
    money = document.createElement("h1")
    money.innerHTML = "Player Money: " + playerMoney
    moneyDisplay.appendChild(money)
    playerDiv.appendChild(moneyDisplay)

    betButtonDiv = document.createElement("div")
    betButton = document.createElement("button")
    betButton.id = "betButton"
    betButton.innerHTML = "BET"
    betButtonDiv.appendChild(betButton)
    playerDiv.appendChild(betButtonDiv)

    betButton.addEventListener("click", function() {
        bet()
    })
}


function potentialWinnings() {
    winningsDiv = document.getElementById("Winnings")
    winningsDiv.innerHTML = ""

    winningsDisplay = document.createElement("div")
    winnings = document.createElement("h1")
    winnings.innerHTML = "Potential Winnings: " + possibleWinnings
    winningsDisplay.appendChild(winnings)
    winningsDiv.appendChild(winningsDisplay)


    cashoutDiv = document.createElement("div")
    cashoutButton = document.createElement("button")
    cashoutButton.innerHTML = "CASHOUT"
    cashoutButton.id = "cashoutButton"
    cashoutDiv.appendChild(cashoutButton)
    winningsDiv.appendChild(cashoutDiv)

    cashoutButton.addEventListener("click", function() {
        cashout()
    })
}

function bet() {
    playerMoney = playerMoney - 20
    possibleWinnings = possibleWinnings + 20

    potentialWinnings()
    updatePlayer()
    console.log("BETTING")
}

function cashout() {
    console.log("CASHING OUT")
    playerMoney = playerMoney + possibleWinnings
    reset()
}

