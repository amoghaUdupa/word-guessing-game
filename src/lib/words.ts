import { WORDS } from '../constants/wordlist'
import { WORDS4 } from '../constants/wordlist4'
import { VALIDGUESSES } from '../constants/validGuesses'
import { VALIDGUESSES4 } from '../constants/validGuesses4'

export const isWordInWordList = (word: string, wordLength: number) => {
  return (
    wordLength===5?VALIDGUESSES.includes(word):VALIDGUESSES4.includes(word)
  )
}

export const isWinningWord = (word: string) => {
  return solution === word
}

export const getWordOfDayIndex = () => {
  // January 1, 2022 Game Epoch IST 5am
  const epochMs = 1641013200000 - 19800000
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  return index
}

export const getWordOfDay = () => {
  return solution
}

export const setWordOfDay = (wordLength:number) => {
  solution = wordLength===5?WORDS[solutionIndex]:WORDS4[solutionIndex]
}

export const solutionIndex = getWordOfDayIndex()
export var solution = WORDS[solutionIndex]

