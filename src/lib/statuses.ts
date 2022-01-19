import { solution } from './words'
import {knTokenize, halantExp, vyanjanaExp, swaraExp, vowel_signsExp} from "./kannada";

export type CharStatus = 'absent' | 'present' | 'correct' | 'inplace'

export type CharValue =
  | 'ಟ' | 'ಠ'
  | 'ಡ' | 'ಢ'
  | 'ಎ' | 'ಏ'
  | 'ರ' | 'ಋ'
  | 'ತ' | 'ಥ'
  | 'ಯ'| 'ಐ'
  | 'ಉ'|'ಊ'
  | 'ಇ'|'ಈ'
  | 'ಒ'|'ಓ'
  | 'ಪ'|'ಫ'
  | 'ಅ'|'ಆ'
  | 'ಸ'|'ಶ'
  | 'ದ'|'ಧ'
  | '್'|'‌್'
  | 'ಗ'|'ಘ'
  | 'ಹ'|'ಃ'
  | 'ಜ'|'ಝ'
  | 'ಕ'|'ಖ'
  | 'ಲ'|'ಳ'
  | 'ಞ'| 'ಙ'
  | 'ಷ'| 'ಷ'
  | 'ಚ'| 'ಛ'
  | 'ವ'| 'ಔ'
  | 'ಬ'| 'ಭ'
  | 'ನ'| 'ಣ'
  | 'ಮ'| 'ಂ'

export const enToKnMap = new Map();
enToKnMap.set('R','ೃ')
enToKnMap.set('Y','ೈ')
enToKnMap.set('u','ು')
enToKnMap.set('U','ೂ')
enToKnMap.set('i','ಿ')
enToKnMap.set('I','ೀ')
enToKnMap.set('o','ೊ')
enToKnMap.set('O','ೋ')
enToKnMap.set('a','ಾ')
enToKnMap.set('A','ಾ')
enToKnMap.set('V','ೌ')
enToKnMap.set('e','ೆ' )
enToKnMap.set('E','ೇ')
enToKnMap.set('q','ಟ')
enToKnMap.set('Q','ಠ')
enToKnMap.set('w','ಡ' )
enToKnMap.set('W','ಢ')
enToKnMap.set('r','ರ' )
enToKnMap.set('t','ತ' )
enToKnMap.set('T','ಥ')
enToKnMap.set('y','ಯ')
enToKnMap.set('p','ಪ')
enToKnMap.set('P','ಫ')
enToKnMap.set('s','ಸ')
enToKnMap.set('S','ಶ')
enToKnMap.set('d','ದ')
enToKnMap.set('D','ಧ')
enToKnMap.set('f','್')
enToKnMap.set('F','‌್')
enToKnMap.set('g','ಗ')
enToKnMap.set('G','ಘ')
enToKnMap.set('h','ಹ')
enToKnMap.set('H','ಃ')
enToKnMap.set('j','ಜ')
enToKnMap.set('J','ಝ')
enToKnMap.set('k','ಕ')
enToKnMap.set('K','ಖ')
enToKnMap.set('l','ಲ')
enToKnMap.set('L','ಳ')
enToKnMap.set('z','ಞ')
enToKnMap.set('Z','ಙ')
enToKnMap.set('x','ಷ')
enToKnMap.set('X','ಷ')
enToKnMap.set('c','ಚ')
enToKnMap.set('C','ಛ')
enToKnMap.set('v','ವ')
enToKnMap.set('b','ಬ')
enToKnMap.set('B','ಭ')
enToKnMap.set('n','ನ')
enToKnMap.set('N','ಣ')
enToKnMap.set('m','ಮ')
enToKnMap.set('M','ಂ')


export const enToKnVowelMap = new Map();
enToKnVowelMap.set('a','ಅ')
enToKnVowelMap.set('A','ಆ')
enToKnVowelMap.set('i','ಇ')
enToKnVowelMap.set('I','ಈ')
enToKnVowelMap.set('u','ಉ')
enToKnVowelMap.set('U','ಊ')
enToKnVowelMap.set('R','ಋ')
enToKnVowelMap.set('e','ಎ' )
enToKnVowelMap.set('E','ಏ')
enToKnVowelMap.set('Y','ಐ')
enToKnVowelMap.set('o','ಒ')
enToKnVowelMap.set('O','ಓ')
enToKnVowelMap.set('V','ಔ')

export const volwelToVowelMap = new Map();
volwelToVowelMap.set('ಅ','ಾ')
volwelToVowelMap.set('ಆ','ಾ')
volwelToVowelMap.set('ಇ','ಿ')
volwelToVowelMap.set('ಈ','ೀ')
volwelToVowelMap.set('ಉ','ು')
volwelToVowelMap.set('ಊ','ೂ')
volwelToVowelMap.set('ಋ','ೃ')
volwelToVowelMap.set('ಎ' ,'ೆ')
volwelToVowelMap.set('ಏ','ೇ')
volwelToVowelMap.set('ಐ','ೈ')
volwelToVowelMap.set('ಒ','ೊ')
volwelToVowelMap.set('ಓ','ೋ')
volwelToVowelMap.set('ಔ','ೌ')

export const isValid = (
    currentGuess: string, character: string
): boolean => {
  const prev = currentGuess.at(-1)
  if(prev) {
    // If halant or vowel sign, previous must be a vyanjana
    if (character.match(halantExp) || character.match(vowel_signsExp)) {
      if(!prev.match(vyanjanaExp))
        return false
    }
  }else {
    // First character must be a swara or a vyanjana
    if(!(character.match(swaraExp) || character.match(vyanjanaExp))) {
      return false
    }
  }
  return true
}

export const getStatuses = (
  guesses: string[]
): { [key: string]: CharStatus } => {
  const charObj: { [key: string]: CharStatus } = {}
  const splitSolution = knTokenize(solution)
  const splitSolutionVyanjana  = getVyanjana(splitSolution)

  guesses.forEach((word) => {
    const splitGuessVyanjana = getVyanjana(knTokenize(word))
    splitGuessVyanjana.forEach((letter, i) => {
      if (!splitSolutionVyanjana.includes(letter)) {
        // make status absent
        return (charObj[letter] = 'absent')
      }
    })
    splitGuessVyanjana.forEach((letter, i) => {
      if (splitSolutionVyanjana.includes(letter)) {
        // make status absent
        return (charObj[letter] = 'present')
      }
    })
    splitGuessVyanjana.forEach((letter, i) => {
      if (splitSolutionVyanjana[i] === letter) {
        return (charObj[letter] = 'inplace')
      }
    })
    knTokenize(word).forEach((letter, i) => {
      if (letter.slice(1).join('') ===  splitSolution[i].slice(1).join('') ) {
        return (charObj[getVyanjana(new Array(letter))[0]] = 'correct')
      }
    })
  })
  return charObj
}

export const getVyanjana = (in_str: RegExpMatchArray[])
    : string[] => {
  let ret_str : string[] = [];
  in_str.forEach((regexMatch, i) => {
    regexMatch.forEach((partOfWord, str_idx) => {
      if(str_idx===0)
        return
      if(partOfWord) {
        if ((str_idx === 1 || str_idx === 3) && partOfWord.length > 0) {
          ret_str.push(partOfWord)
          return
        }
        if (str_idx === 2 && partOfWord.length > 0) {
          ret_str.push(partOfWord.at(0) || "")
          return
        }
      }
    })
    return
  })
  return ret_str
}

export const getGuessStatuses = (guess: string): CharStatus[] => {
  const splitSolution = knTokenize(solution)
  const splitGuess = knTokenize(guess)
  const splitSolutionVyanjana  = getVyanjana(splitSolution)
  const splitGuessVyanjana = getVyanjana(splitGuess)
  const statuses: CharStatus[] = Array.from(Array(splitGuess.length))
  let istatuses = Array<number>(splitGuess.length).fill(0);

  // handle all correct cases first
  splitGuess.forEach((letter, i) => {
    if (letter.slice(1).join('') === splitSolution[i].slice(1).join('')) {
      istatuses[i]+=1
      return
    }
  })

  splitGuessVyanjana.forEach((letter, i) => {
    if (letter) {
      if (letter === splitSolutionVyanjana[i]) {
        istatuses[i] += 1
        return
      }
    }
  })
  splitGuessVyanjana.forEach((letter, i) => {
    if (letter) {
      if (splitSolutionVyanjana.includes(letter)) {
        istatuses[i] += 1
        return
      }
    }
  })

  statuses.forEach((letter, i) => {
    if(istatuses[i] === 0) {
      statuses[i] = 'absent'
      return
    }
    if(istatuses[i] === 1) {
      statuses[i] = 'present'
      return
    }
    if(istatuses[i] === 2) {
      statuses[i] = 'inplace'
      return
    }
    if(istatuses[i] === 3) {
      statuses[i] = 'correct'
      return
    }

  })

  return statuses
}
