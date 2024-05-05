import Videos from './scenes/Videos/Videos'
import LaLiga from './scenes/LaLiga/LaLiga'
import Landing from './scenes/Landing/Landing'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/laliga" element={<LaLiga />} />
        <Route path="/plays" element={<Videos />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
