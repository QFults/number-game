// generates new random number by computer
let getComputer = _ => Math.floor(Math.random() * 1000)

// initial evaluation of computer number
let computer

// user variables
let firstNum
let secondNum
let thirdNum
let gameOver
let guesses

// initialize all resets and initial values
const init = _ => {
  guesses = 5
  document.querySelector('#guesses').textContent = guesses
  resetUser()
  resetComputer()
  resetInfo()
  computer = getComputer()
  gameOver = false
}

// resets user variables and dom
const resetUser = _ => {
  firstNum = undefined
  secondNum = undefined
  thirdNum = undefined
  document.querySelector('#num1').textContent = ''
  document.querySelector('#num2').textContent = ''
  document.querySelector('#num3').textContent = ''
}

// reset computer dom
const resetComputer = _ => {
  document.querySelector('#computer').textContent = ''
}

// reset info dom
const resetInfo = _ => {
  document.querySelector('#info').textContent = ''
  document.querySelector('#result').textContent = ''
}

// compare user's guess to computer's choice
const evaluate = _ => {
  // brings numbers together as string then parses as integer
  let fullNumber = parseInt(`${firstNum}${secondNum}${thirdNum}`)

  // checks result
  if (fullNumber === computer) {
    // displays winning scenario
    document.querySelector('#result').textContent = 'You Win!'
    document.querySelector('#computer').textContent = `Computer Chose: ${computer}`
    document.querySelector('#info').textContent = 'Want to play again? Press the Spacebar!'

    // toggles gameOver value
    gameOver = true

    // non-winning scenarios
  } else {
    // decrement guesses amount
    guesses--

    // display new guesses value
    document.querySelector('#guesses').textContent = guesses

    // displays losing scenarios
    if (guesses === 0) {
      document.querySelector('#result').textContent = 'Oh no! You Lost!'
      document.querySelector('#computer').textContent = `Computer Chose: ${computer}`
      document.querySelector('#info').textContent = 'Want to play again? Press the Spacebar!'

      // toggles gameOver value
      gameOver = true

      // displays wrong guess scenarios
    } else {
      document.querySelector('#result').textContent = 'Wrong, keep guessing!'

      // reset user variables before next num
      resetUser()
    }
  }
}

// assigning which digit is being added by key event
const numUpdate = number => {
  if (!firstNum) {
    // set num1 value and dom, clear results dom
    firstNum = number
    document.querySelector('#num1')
      .textContent = number
    document.querySelector('#result').textContent = ''
  } else if (!secondNum) {
    // set num2 value and dom
    secondNum = number
    document.querySelector('#num2').textContent = number
  } else if (!thirdNum) {
    // set num3 value and dom
    thirdNum = number
    document.querySelector('#num3').textContent = number
  }
}

// removes number from user guess
const removeNum = _ => {
  if (thirdNum) {
    // reset num3 and dom
    thirdNum = undefined
    document.querySelector('#num3').textContent = ''
  } else if (secondNum) {
    // reset num2 and dom
    secondNum = undefined
    document.querySelector('#num2').textContent = ''
  } else if (firstNum) {
    // reset num1 and dom
    firstNum = undefined
    document.querySelector('#num1').textContent = ''
  }
}

// three digit tracker
// store firstNum, secondNum, and thirdNum
// track when the number input is done
// track delete to rewrite number
document.onkeyup = ({ key, keyCode }) => {
  switch (keyCode) {
    // when enter key press
    case 13:
      // check to make sure game isn't finished
      if (!gameOver) {
        evaluate()
      }
      break
    // when backspace key press
    case 8:
      // check to make sure game isn't finished
      if (!gameOver) {
        removeNum()
      }
      break
    // when spacebar key press
    case 32:
      // check to make sure game is finished
      if (gameOver) {
        // reset all values
        init()
      }
      break
    // any key press
    default:
      // check to see if key is num and game isn't finished
      if (keyCode >= 48 && keyCode <= 57 && !gameOver) {
        // update user number with value
        numUpdate(parseInt(key))
      }
      break
  }
}

// initial variable set on page load
init()
