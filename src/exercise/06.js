// useDebugValue: useMedia
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

function useMedia(query, initialState = false) {
  const [state, setState] = React.useState(initialState)

  /**
   * Example using the 2nd param, custom format function
   * his is only really useful for situations where computing the 
   * debug value is computationally expensive (and therefore you only 
   * want it calculated when the DevTools are open and not when your 
   * users are using the app).
  */

//  const formatCountDebugValue = ({initialCount, step}) =>
//   `init: ${initialCount}; step: ${step}`

//   function useCount({initialCount = 0, step = 1} = {}) {
//     React.useDebugValue({initialCount, step}, formatCountDebugValue)
//     const [count, setCount] = React.useState(0)
//     const increment = () => setCount(c => c + 1)
//     return [count, increment]
//   }


  React.useDebugValue(
    `\`${query}\` => ${state}`,
  )

  React.useEffect(() => {
    let mounted = true
    const mql = window.matchMedia(query)
    function onChange() {
      if (!mounted) {
        return
      }
      setState(Boolean(mql.matches))
    }

    mql.addListener(onChange)
    setState(mql.matches)

    return () => {
      mounted = false
      mql.removeListener(onChange)
    }
  }, [query])

  return state
}

function Box() {
  const isBig = useMedia('(min-width: 1000px)')
  const isMedium = useMedia('(max-width: 999px) and (min-width: 700px)')
  const isSmall = useMedia('(max-width: 699px)')
  const color = isBig ? 'green' : isMedium ? 'yellow' : isSmall ? 'red' : null

  return <div style={{width: 200, height: 200, backgroundColor: color}} />
}

function App() {
  return <Box />
}

export default App
