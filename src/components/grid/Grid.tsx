import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'

type Props = {
  guesses: string[]
  currentGuess: string
}

export const Grid = ({ guesses, currentGuess }: Props) => {
  const empties =
    guesses.length < 7 ? Array.from(Array(7 - guesses.length)) : []

  return (
    <div className="pb-9">
      {guesses.map((guess, i) => (
        <CompletedRow key={i} guess={guess} />
      ))}
      {guesses.length < 8 && <CurrentRow guess={currentGuess} />}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </div>
  )
}
