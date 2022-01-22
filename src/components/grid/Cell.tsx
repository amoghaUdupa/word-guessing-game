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
        'w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold rounded dark:text-white',
        {
            'bg-white border-slate-200 dark:bg-slate-900': !status,
            'bg-slate-400 text-white border-slate-400': status === 'absent',
            'bg-green-500 text-white border-green-500': status === 'correct',
            'bg-orange-500 text-white border-orange-500': status === 'present',
            'bg-blue-500 text-white border-blue-500': status === 'inplace',

    },
      {
          'border-white-200': !swaraStatus,
          'border-slate-400': swaraStatus === 'absent',
          'border-green-500': swaraStatus === 'correct',
          'border-yellow-500': swaraStatus === 'present',
          'border-blue-500': swaraStatus === 'inplace',
      }
  )
  return <div className={classes}>{value}</div>
}
