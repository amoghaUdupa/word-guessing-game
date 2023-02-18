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
  // January 1, 2022 Game Epoch IST
  const epoch = new Date(2022, 0)
  const start = new Date(epoch)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  let index = 0
  while (start < today) {
    index++
    start.setDate(start.getDate() + 1)
  }
  return (index - 22) % 371
}

export const getTomorrow = () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const nextDay = new Date(today)
  nextDay.setDate(today.getDate() + 1)
  return nextDay.valueOf()
}

export const getWordOfDay = () => {
  return solution
}

export const setWordOfDay = (wordLength:number) => {
  solution = wordLength===5?WORDS[solutionIndex]:WORDS4[solutionIndex]
}

export const solutionIndex = getWordOfDayIndex()
export var solution = WORDS[solutionIndex]
export const tomorrow = getTomorrow()

