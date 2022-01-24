
import {
  InformationCircleIcon,
  ChartBarIcon,
  SunIcon,
} from '@heroicons/react/outline'

//import { InformationCircleIcon, MenuIcon } from '@heroicons/react/outline'

import { useState, useEffect } from 'react'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { AboutModal } from './components/modals/AboutModal'
import { InfoModal } from './components/modals/InfoModal'

import { StatsModal } from './components/modals/StatsModal'
import {
  GAME_TITLE,
  WIN_MESSAGES,
  GAME_COPIED_MESSAGE,
  ABOUT_GAME_MESSAGE,
  NOT_ENOUGH_LETTERS_MESSAGE,
  WORD_NOT_FOUND_MESSAGE,
  CORRECT_WORD_MESSAGE,
} from './constants/strings'
import { addStatsForCompletedGame, loadStats } from './lib/stats'

//import { WinModal } from './components/modals/WinModal'
import {isWordInWordList, isWinningWord, solution, setWordOfDay} from './lib/words'

import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from './lib/localStorage'
import {knTokenize} from "./lib/kannada";
import {isValid} from "./lib/statuses";
import {SettingsModal} from "./components/modals/SettingsModal";

import './App.css'
import {MenuIcon} from "@heroicons/react/solid";

const ALERT_TIME_MS = 2000

function App() {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches

  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isWinModalOpen, setIsWinModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme')
      ? localStorage.getItem('theme') === 'dark'
      : prefersDarkMode
      ? true
      : false
  )
  const [successAlert, setSuccessAlert] = useState('')
  const [shareComplete, setShareComplete] = useState(false)
  const [shiftPressed, setShiftPresser] = useState(false)
  const [wordLength, setWordLength] = useState(5)
  const [enabled, setEnabled] = useState(true)

  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
      if(loaded?.wordLength === 4 || loaded?.wordLength === 5) {
          setWordLength(loaded?.wordLength)
          setWordOfDay(loaded?.wordLength)
      }
    if (loaded?.solution !== solution) {
      return []
    }
    const gameWasWon = loaded.guesses.includes(solution)
    if (gameWasWon) {
      setIsGameWon(true)
    }
    if (loaded.guesses.length === 6 && !gameWasWon) {
      setIsGameLost(true)
    }
    return loaded.guesses
  })

  const [stats, setStats] = useState(() => loadStats())

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution, wordLength })
  })

  useEffect(() => {
    if (isGameWon) {
      setSuccessAlert(
        WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
      )
      setTimeout(() => {
        setSuccessAlert('')
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS)
    }
    if (isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS)
    }
  }, [isGameWon, isGameLost])

  const onChar = (value: string) => {
    if (knTokenize(currentGuess.concat(value)).length <= wordLength && guesses.length < 8 && isValid(currentGuess, value)) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  const onChange = () => {
      setEnabled(!enabled)
  }

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  const onShift = () => {
      setShiftPresser(!shiftPressed)
  }

  const clearGuesses = () => {
      guesses.length = 0
      setIsGameWon(false)
      setIsGameLost(false)
  }

  const onEnter = () => {

    if (isGameWon || isGameLost) {
      return
    }
    if (!(currentGuess.length === 5)) {
      setIsNotEnoughLetters(true)
      return setTimeout(() => {
        setIsNotEnoughLetters(false)
      }, ALERT_TIME_MS)
    }


      console.log("Hitting enter")
    if (!isWordInWordList(currentGuess, wordLength) && enabled) {

      setIsWordNotFoundAlertOpen(true)
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false)
      }, ALERT_TIME_MS)
    }

    const winningWord = isWinningWord(currentGuess)

    if (knTokenize(currentGuess).length === wordLength && guesses.length < 8 && !isGameWon) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')

      if (winningWord) {
        setStats(addStatsForCompletedGame(stats, guesses.length))
        return setIsGameWon(true)
      }

      if (guesses.length === 7) {
        setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        setIsGameLost(true)
      }
    }
  }

  return (
    <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">

      <div className="flex w-80 mx-auto items-center mb-8 mt-12">
        <h1 className="text-xl grow font-bold dark:text-white">{GAME_TITLE}</h1>
        <SunIcon
          className="h-6 w-6 cursor-pointer dark:stroke-white"
          onClick={() => handleDarkMode(!isDarkMode)}
        />

      <Alert message="ವರ್ಡಲ್ಲ" isOpen={isWordNotFoundAlertOpen} />
      <Alert
        message={`ತಪ್ಪು, ಇವತ್ತಿನ ಪದ " ${solution} "`}
        isOpen={isGameLost}
      />
      <Alert
        message="ಕಾಪಿ ಮಾಡಲಾಗಿದೆ"
        isOpen={shareComplete}
        variant="success"
      />

        <InformationCircleIcon
          className="h-6 w-6 cursor-pointer dark:stroke-white"
          onClick={() => setIsInfoModalOpen(true)}
        />

        <ChartBarIcon
          className="h-6 w-6 cursor-pointer dark:stroke-white"
          onClick={() => setIsStatsModalOpen(true)}
        />

          <MenuIcon
              className="h-6 w-6 cursor-pointer"
              onClick={() => setIsSettingsModalOpen(true)}
          />

      </div>
      <Grid guesses={guesses} currentGuess={currentGuess} wordLength={wordLength} />
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        onShift={onShift}
        shiftPressed={shiftPressed}
        guesses={guesses}
        currentGuess={currentGuess}
      />
      <SettingsModal
        isOpen={isSettingsModalOpen}
        handleClose={() => {setIsSettingsModalOpen(false); setWordOfDay(wordLength)}}
        enabled={enabled}
        onChange={onChange}
        wordLength={wordLength}
        setWordLength={setWordLength}
        clearGuesses={clearGuesses}
      />

      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
      />
      <StatsModal
        isOpen={isStatsModalOpen}
        handleClose={() => setIsStatsModalOpen(false)}
        guesses={guesses}
        gameStats={stats}
        isGameLost={isGameLost}
        isGameWon={isGameWon}
        wordLength={wordLength}
        handleShare={() => {
          setSuccessAlert(GAME_COPIED_MESSAGE)
          return setTimeout(() => setSuccessAlert(''), ALERT_TIME_MS)
        }}
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        handleClose={() => setIsAboutModalOpen(false)}
      />

      <button
        type="button"
        className="mx-auto mt-8 flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 select-none"
        onClick={() => setIsAboutModalOpen(true)}
      >
        {ABOUT_GAME_MESSAGE}
      </button>

      <button
          type="button"
          className="mx-auto mt-8 flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={ () => window.open("https://alar.ink")}
      >
        ನಿಘಂಟು
      </button>
      <Alert message={NOT_ENOUGH_LETTERS_MESSAGE} isOpen={isNotEnoughLetters} />
      <Alert
        message={WORD_NOT_FOUND_MESSAGE}
        isOpen={isWordNotFoundAlertOpen}
      />
      <Alert message={CORRECT_WORD_MESSAGE(solution)} isOpen={isGameLost} />
      <Alert
        message={successAlert}
        isOpen={successAlert !== ''}
        variant="success"
      />
    </div>
  )
}

export default App;