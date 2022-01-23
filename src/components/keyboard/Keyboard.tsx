import { KeyValue } from '../../lib/keyboard'
import {getStatuses, enToKnMap, enToKnVowelMap, vowelToVowelMap} from '../../lib/statuses'
import { Key } from './Key'
import { useEffect } from 'react'

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  onShift: () => void
  shiftPressed: boolean
  guesses: string[]
  currentGuess: string
}

export const Keyboard = ({ onChar, onDelete, onEnter, onShift, shiftPressed, guesses, currentGuess }: Props) => {
  const charStatuses = getStatuses(guesses)

  const onClick = (value: KeyValue) => {
    if (value === 'ENTER') {
      onEnter()
    } else if (value === 'DELETE') {
      onDelete()
    }else if (value === 'SHIFT') {
      onShift()
    }else {
      if(!(currentGuess.length===0))
      {
        value = vowelToVowelMap.has(value)?vowelToVowelMap.get(value) : value
      }
      onChar(value)
    }
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter()
      } else if (e.code === 'Backspace') {
        onDelete()
      } else if ((e.code === 'ShiftLeft' || e.code === 'ShiftRight')) {
        onShift()
      } else {
        const key = e.key
        if ((key >= "a" && key <= "z") || (key >= "A" && key <= "Z")) {
          if(currentGuess.length===0) {
            if(enToKnVowelMap.has(e.key)) {
              onChar(enToKnVowelMap.get(e.key))
              return
            }
            onChar(enToKnMap.get(e.key))
          }
          else {
            onChar(enToKnMap.get(e.key))
          }
        }
      }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete, onChar, onShift, guesses, currentGuess])

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
    if ((e.code === 'ShiftLeft' || e.code === 'ShiftRight')) {
        onShift()
      }
    }
    window.addEventListener('keydown', listener)
    return () => {
      window.removeEventListener('keydown', listener)
    }
  }, [onShift])
  return (
    <div>
      <div className="flex justify-center mb-1">
        <Key value={shiftPressed ? "ಠ" : "ಟ"} onClick={onClick} status={charStatuses[shiftPressed ? "ಠ" : "ಟ"]} />
        <Key value={shiftPressed ? "ಢ" : "ಡ"} onClick={onClick} status={charStatuses[shiftPressed ? "ಢ" : "ಡ"]} />
        <Key value={shiftPressed ? "ಏ" : "ಎ"} onClick={onClick} status={charStatuses[shiftPressed ? "ಏ" : "ಎ"]} />
        <Key value={shiftPressed ? "ಋ" : "ರ"} onClick={onClick} status={charStatuses[shiftPressed ? "ಋ" : "ರ"]} />
        <Key value={shiftPressed ? "ಥ" : "ತ"}  onClick={onClick} status={charStatuses[shiftPressed ? "ಥ" : "ತ"]} />
        <Key value={shiftPressed ? "ಐ": "ಯ"} onClick={onClick} status={charStatuses[shiftPressed ? "ಐ" : "ಯ"]} />
        <Key value={shiftPressed ? "ಊ": "ಉ"} onClick={onClick} status={charStatuses[shiftPressed ? "ಊ" : "ಉ"]} />
        <Key value={shiftPressed ? "ಈ" : "ಇ"} onClick={onClick} status={charStatuses[shiftPressed ? "ಈ" : "ಇ"]} />
        <Key value={shiftPressed ? "ಓ" : "ಒ"} onClick={onClick} status={charStatuses[shiftPressed ? "ಓ" : "ಒ"]} />
        <Key value={shiftPressed ? "ಫ" : "ಪ"} onClick={onClick} status={charStatuses[shiftPressed ? "ಫ" : "ಪ"]} />
      </div>
      <div className="flex justify-center mb-1">
        <Key width={65.4} value="SHIFT" onClick={onClick} status={shiftPressed?'absent':undefined}>
          Shift
        </Key>
        <Key value={shiftPressed ? "ಆ":"ಅ"} onClick={onClick} status={charStatuses[shiftPressed ? "ಆ":"ಅ"]} />
        <Key value={shiftPressed ? "ಶ":"ಸ"} onClick={onClick} status={charStatuses[shiftPressed ? "ಶ":"ಸ"]} />
        <Key value={shiftPressed ? "ಧ":"ದ"} onClick={onClick} status={charStatuses[shiftPressed ? "ಧ":"ದ"]} />
        <Key value={shiftPressed ? "್":"್"} onClick={onClick} status={charStatuses[shiftPressed ? "‌್":"‌್"]} />
        <Key value={shiftPressed ? "ಘ":"ಗ"} onClick={onClick} status={charStatuses[shiftPressed ? "ಘ":"ಗ"]} />
        <Key value={shiftPressed ? "ಃ":"ಹ"} onClick={onClick} status={charStatuses[shiftPressed ? "ಃ":"ಹ"]} />
        <Key value={shiftPressed ? "ಝ":"ಜ"} onClick={onClick} status={charStatuses[shiftPressed ? "ಝ":"ಜ"]} />
        <Key value={shiftPressed ? "ಖ":"ಕ"} onClick={onClick} status={charStatuses[shiftPressed ? "ಖ":"ಕ"]} />
        <Key value={shiftPressed ? "ಳ":"ಲ"} onClick={onClick} status={charStatuses[shiftPressed ? "ಳ":"ಲ"]} />
        <Key width={65.4} value="SHIFT" onClick={onClick} status={shiftPressed?'absent':undefined}>
          Shift
        </Key>
      </div>
      <div className="flex justify-center">
        <Key width={65.4} value="ENTER" onClick={onClick}>
          Enter
        </Key>
        <Key value={shiftPressed ? "ಙ":"ಞ"} onClick={onClick} status={charStatuses[shiftPressed ? "ಙ":"ಞ"]} />
        <Key value={shiftPressed ? "ಷ":"ಷ"} onClick={onClick} status={charStatuses[shiftPressed ? "ಷ":"ಷ"]} />
        <Key value={shiftPressed ? "ಛ":"ಚ"} onClick={onClick} status={charStatuses[shiftPressed ? "ಛ":"ಚ"]} />
        <Key value={shiftPressed ? "ಔ":"ವ"} onClick={onClick} status={charStatuses[shiftPressed ? "ಔ":"ವ"]} />
        <Key value={shiftPressed ? "ಭ":"ಬ"} onClick={onClick} status={charStatuses[shiftPressed ? "ಭ":"ಬ"]} />
        <Key value={shiftPressed ? "ಣ":"ನ"} onClick={onClick} status={charStatuses[shiftPressed ? "ಣ":"ನ"]} />
        <Key value={shiftPressed ? "ಂ":"ಮ"} onClick={onClick} status={charStatuses[shiftPressed ? "ಂ":"ಮ"]} />
        <Key width={65.4} value="DELETE" onClick={onClick}>
          Delete
        </Key>
      </div>
    </div>
  )
}
