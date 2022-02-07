import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'

type Props = {
  value?: string
  status?: CharStatus
  swaraStatus?: CharStatus
}

export const Cell = ({ value, status, swaraStatus }: Props) => {
    if(swaraStatus !== 'correct')
    {
        swaraStatus = status
    }

    const classes = classnames(
        'w-14 h-14 border-solid border-4 flex items-center justify-center mx-0.5 text-lg font-bold rounded dark:text-white',
        {
            'bg-slate border-slate-200': !status,
            'bg-slate-400 text-white': status === 'absent',
            'bg-green-500 dark:bg-green-600 text-white': status === 'correct',
            'bg-yellow-500 dark:bg-orange-500 text-white': status === 'present',
            'bg-blue-500 text-white': status === 'inplace',

    },
      {
          'border-slate-200 dark:border-slate-500': !swaraStatus,
          'border-slate-400': swaraStatus === 'absent',
          'border-green-500 dark:border-green-600': swaraStatus === 'correct',
          'border-yellow-500 dark:border-orange-500': swaraStatus === 'present',
          'border-blue-500': swaraStatus === 'inplace',
      }
  )
  return <div className={classes}>{value}</div>
}
