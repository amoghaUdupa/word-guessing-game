const gameState5Key = 'gameState5'
const gameState4Key = 'gameState4'
const wordLengthKey = 'wordLength'

type StoredGameState = {
  guesses: string[]
  solution: string
}


export const saveGameStateToLocalStorage = (gameState: StoredGameState, wordLength : number) => {
  localStorage.setItem(wordLengthKey, JSON.stringify(wordLength))
  if(wordLength === 4) {
    localStorage.setItem(gameState4Key, JSON.stringify(gameState))
  }
  else {
    localStorage.setItem(gameState5Key, JSON.stringify(gameState))
  }
}

export const getWordLengthFromLocalStorage = () => {
  const state = localStorage.getItem(wordLengthKey)
  return state ? (JSON.parse(state) as number) : null
}

export const loadGameStateFromLocalStorage = (wordLength : number) => {
  var key = gameState5Key
  if(wordLength === 4) {
    key = gameState4Key
  }
  const state = localStorage.getItem(key)
  return state ? (JSON.parse(state) as StoredGameState) : null
}
