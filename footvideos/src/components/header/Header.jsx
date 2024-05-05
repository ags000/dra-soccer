import { Link } from "react-router-dom"
import './Header.css'

const Header = () => {
  return (
    <header>
      <nav>
        <Link className="header-link" to="/plays">Plays</Link>
        <Link className="header-link" to="/laliga">LaLiga</Link>
      </nav>
    </header>
  )
}

export default Header;