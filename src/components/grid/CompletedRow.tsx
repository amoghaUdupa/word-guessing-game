import { getGuessStatuses } from '../../lib/statuses'
import { Cell } from './Cell'
import {knTokenize} from "../../lib/kannada";

type Props = {
  guess: string
}

export const CompletedRow = ({ guess }: Props) => {
  const statuses = getGuessStatuses(guess)

  return (
    <div className="flex justify-center mb-1">
      {knTokenize(guess).map((letter, i) => (
        <Cell key={i} value={letter.slice(1).join('')} status={statuses[i]} />
      ))}
    </div>
  )
}
