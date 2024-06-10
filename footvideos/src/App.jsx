import Videos from './scenes/Videos/Videos'
import LaLiga from './scenes/LaLiga/LaLiga'
import Landing from './scenes/Landing/Landing'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import CreateTeam from './scenes/CreateTeam/CreateTeam';
import TeamList from './scenes/TeamList/TeamList';
import EditTeam from './scenes/EditTeam/EditTeam';
import Players from './scenes/Players/Players';
import CreatePlayer from './scenes/CreatePlayer/CreatePlayer';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/laliga" element={<LaLiga />} />
        <Route path="/plays" element={<Videos />} />
        <Route path="/create-team" element={<CreateTeam />} />
        <Route path="/teams" element={<TeamList />} />
        <Route path="/edit-team" element={<EditTeam />} />
        <Route path="/team-players" element={<Players />} />
        <Route path="/create-player" element={<CreatePlayer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
