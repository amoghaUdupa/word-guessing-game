import { Cell } from './Cell'
import {knTokenize} from "../../lib/kannada";

type Props = {
  guess: string
}

export const CurrentRow = ({ guess }: Props) => {
  const splitGuess = knTokenize(guess)
  const emptyCells = Array.from(Array(5 - splitGuess.length))

  return (
    <div className="flex justify-center mb-1">
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter.slice(1).join('')} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
