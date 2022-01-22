import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Cell } from '../grid/Cell'
import { XCircleIcon } from '@heroicons/react/outline'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div className="absolute right-4 top-4">
                <XCircleIcon
                  className="h-6 w-6 cursor-pointer"
                  onClick={() => handleClose()}
                />
              </div>
              <div>
                <div className="text-center">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    ಆಡುವುದು ಹೇಗೆ
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      8 ಪ್ರಯತ್ನದಲ್ಲಿ ಸರಿಯಾದ ಪದ ಗುರುತಿಸಬೇಕು.  <a href="https://alar.ink">alar.ink</a>  ನಿಘಂಟಿನಲ್ಲಿ ಇರುವ ಪದಗಳನ್ನು ಮಾತ್ರ ಪರಿಗಣಿಸುತ್ತದೆ. ಕೆಳಗೆ ತಿಳಿಸಿರುವ ಹಾಗೆ, ಪ್ರತಿ ಬಣ್ಣವು ಒಂದು ಸುಳಿವು ನೀಡುತ್ತದೆ
                    </p>

                    <div className="flex justify-center mb-1 mt-4">
                      <Cell value="ಸ್ನಾ"  />
                      <Cell value="ತ" />
                      <Cell value="ಕೋ" status="correct"/>
                      <Cell value="ತ್ತ" />
                      <Cell value="ರ" />
                    </div>
                    <p className="text-sm text-gray-500">
                      3ನೇ ಮನೆಯಲ್ಲಿ ಸರಿಯಾದ ವ್ಯಂಜನವಿದೆ, ಒತ್ತು ಮತ್ತು ಕಾಗುಣಿತ ಕೂಡ ಸರಿಯಿದೆ
                    </p>

                    <div className="flex justify-center mb-1 mt-4">
                      <Cell value="ಅ" status="inplace" />
                      <Cell value="ನ" />
                      <Cell value="ವ"  />
                      <Cell value="ರ" />
                      <Cell value="ತ" />
                    </div>
                    <p className="text-sm text-gray-500">
                      1ನೇ ಮನೆಯಲ್ಲಿ ಇರುವ ಸ್ವರ/ವ್ಯಂಜನ ಸರಿ, ಅದರ ಒತ್ತು ಅಥವಾ ಕಾಗುಣಿತ ತಪ್ಪು
                    </p>

                    <div className="flex justify-center mb-1 mt-4">
                      <Cell value="ಕ" />
                      <Cell value="ವ" />
                      <Cell value="ಲು" />
                      <Cell value="ದಾ"status="present" />
                      <Cell value="ರಿ" />
                    </div>
                    <p className="text-sm text-gray-500">
                      4ನೇ ಮನೆಯಲ್ಲಿ ಇರುವ ವ್ಯಂಜನ ಪದದಲ್ಲಿ ಇದೆ ಆದರೆ ಆ ಮನೆಯಲ್ಲಿ ಅಲ್ಲ
                    </p>

                    <div className="flex justify-center mb-1 mt-4">
                      <Cell value="ದೇ" status="absent" swaraStatus="correct"/>
                      <Cell value="ಶ್ಯ" />
                      <Cell value="ಕಾಂ" status="present" swaraStatus="correct" />
                      <Cell value="ಭೋ"  />
                      <Cell value="ಜಿ" />
                    </div>
                    <p className="text-sm text-gray-500">
                      1ನೇ ಮನೆಯಲ್ಲಿ ಇರುವ ವ್ಯಂಜನ ಪದದಲ್ಲಿ ಇಲ್ಲ, ಆದರೆ ೇ-ಕಾರವು ಆ ಸ್ಥಾನದಲ್ಲಿದೆ.
                      3ನೇ ಮನೆಯಲ್ಲಿ ಇರುವ ವ್ಯಂಜನ ಪದದಲ್ಲ ಆ ಸ್ಥಾನದಲ್ಲಿ ಇಲ್ಲ. ಹಾಗೆ, ಆಂ ಕಾರವು ಆ ಸ್ಥಾನದಲ್ಲಿದೆ.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
