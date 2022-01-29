import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="ಆಡುವುದು ಹೇಗೆ" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
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
   </BaseModal>
  )
}
