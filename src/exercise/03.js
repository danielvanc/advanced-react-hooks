// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
// You could also import the below extraction to a seperate module and
// include like so:
// import { CountProvider, useCount } from '../myCountCountextFile


const CountContext = React.createContext()

function CountProvider(props) {
  const [count, setCount] = React.useState(0);
  const value = [count, setCount]
  
  return <CountContext.Provider value={value} {...props} />
}

function useCount(props) {
  const context = React.useContext(CountContext)
  if (!context) {
    throw new Error(`useCount must be used within the CountProvider`)
  }

  return context
}

function CountDisplay() {
  // const [count] = React.useContext(CountContext)
  const [count] = useCount()
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  // const [,setCount] = React.useContext(CountContext)
  const [, setCount] = useCount()
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>Increment count</button>
}

function App() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
      </CountProvider>
        <Counter />
    </div>
  )
}

export default App
