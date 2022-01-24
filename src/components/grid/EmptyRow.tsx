import { Cell } from './Cell'

type Props = {
  wordLength: number
}

export const EmptyRow =  ({ wordLength }: Props) => {
  const emptyCells = Array.from(Array(wordLength))

  return (
    <div className="flex justify-center mb-1">
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
