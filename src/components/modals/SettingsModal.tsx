import { Switch, RadioGroup} from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/outline'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
  enabled: boolean
  onChange: () => void
  wordLength: number
  setWordLength: (arg0: number) => void
}

const plans = [
4,
5,
]

export const SettingsModal = ({ isOpen, handleClose, enabled, onChange, wordLength, setWordLength }: Props) => {
  return (
      <BaseModal title="ಸೆಟ್ಟಿಂಗ್ಸ್" isOpen={isOpen} handleClose={handleClose}>

            <div className="w-full px-4 py-16">
              <div className="w-full max-w-md mx-auto">
                <RadioGroup value={wordLength} onChange={(arg)=>{setWordLength(arg)}}>
                  <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                  <div className="space-y-2">
                    {plans.map((plan) => (
                        <RadioGroup.Option
                            key={plan}
                            value={plan}
                            className={({ active, checked }) =>
                                `${
                                    active
                                        ? 'ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60'
                                        : ''
                                }
                                ${
                                    checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'
                                }
                                relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
                            }
                        >
                          {({ active, checked }) => (
                              <>
                                <div className="flex items-center justify-between w-full">
                                  <div className="flex items-center">
                                    <div className="text-sm">
                                      <RadioGroup.Label
                                          as="p"
                                          className={`font-medium  ${
                                              checked ? 'text-white' : 'text-gray-900'
                                          }`}
                                      >
                                        {plan}
                                      </RadioGroup.Label>
                                      <RadioGroup.Description
                                          as="span"
                                          className={`inline ${
                                              checked ? 'text-sky-100' : 'text-gray-500'
                                          }`}
                                      >
                                      <span>
                                        {plan===4?"ನಾಲ್ಕು":"ಐದು"} ಅಕ್ಷರದ ಪದ
                                      </span>{' '}
                                      </RadioGroup.Description>
                                    </div>
                                  </div>
                                  {checked && (
                                      <div className="flex-shrink-0 text-white">
                                        <CheckIcon className="w-6 h-6" />
                                      </div>
                                  )}
                                </div>
                              </>
                          )}
                        </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>

          <span className={"dark:text-white"}>ನಿಘಂಟಿನಲ್ಲಿ ಇಲ್ಲದ ಪದ ಬಳಸಲು - ಆಫ್ ಮಾಡಿ</span>
          <div className="mt-2">
            <div className="py-8">
              <Switch
                  checked={enabled}
                  onChange={onChange}
                  className={`${enabled ? 'bg-teal-500' : 'bg-red-400'}
  relative inline-flex flex-shrink-0 h-[38px] w-[74px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span className="sr-only">Use setting</span>
                <span
                    aria-hidden="true"
                    className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
    pointer-events-none inline-block h-[34px] w-[34px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                />
              </Switch>
            </div>
          </div>


      </BaseModal>
  )
}
