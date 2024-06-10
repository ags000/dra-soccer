import { Link } from "react-router-dom"
import './Header.css'

const Header = () => {
  return (
    <header>
      <nav>
        <Link className="header-link" to="/plays">Plays</Link>
        <Link className="header-link" to="/laliga">LaLiga</Link>
        <Link className="header-link" to="/teams">Teams</Link>
        <Link className="header-link" to="/create-team">Create Team</Link>
        <Link className="header-link" to="/create-player">Create Player</Link>
      </nav>
    </header>
  )
}

export default Header;