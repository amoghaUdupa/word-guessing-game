import { getGuessStatuses } from './statuses'
import { solutionIndex } from './words'
import { GAME_TITLE } from '../constants/strings'
import {knTokenize} from "./kannada";

export const shareStatus = (guesses: string[], lost: boolean) => {
  navigator.clipboard.writeText(
    `${GAME_TITLE} ${solutionIndex} ${lost ? 'X' : guesses.length}/8\n\n` +
      generateEmojiGrid(guesses)
  )
}

export const generateEmojiGrid = (guesses: string[]) => {
    console.log(guesses)
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess)
      return knTokenize(guess)
        .map((letter, i) => {
            console.log(letter)
          switch (status[i]) {
            case 'correct':
              return '🟩'
            case 'present':
              return '🟨'
            case 'inplace':
              return '🟦'
            case 'absent':
              return '⬛'
            default:
              return '⬜'
          }
        })
        .join('')
    })
    .join('\n')
}
