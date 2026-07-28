import { motion } from 'framer-motion'
import { MdDarkMode, MdLightMode, MdLogout, MdSearch } from 'react-icons/md'
import { playToggleSound } from '../src/utils/sounds'

export default function Navbar({ darkMode, setDarkMode, user, onLogout, searchQuery, setSearchQuery }) {
  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="nav-left">
        <motion.div 
          className="logo"
          whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.3 }}
        >
          ✎ NoteX
        </motion.div>
        <div className="search-container">
          <MdSearch className="search-icon" />
          <input 
            type="text" 
            className="search-input"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <ul className="nav-right">
        <li className="user-badge">{user}</li>
        <li>
          <motion.button 
            className="icon-btn"
            whileHover={{ scale: 1.1, rotate: darkMode ? -360 : 360 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => { setDarkMode(!darkMode); playToggleSound() }}
            title="Toggle Theme"
          >
            {darkMode ? <MdLightMode /> : <MdDarkMode />}
          </motion.button>
        </li>
        <li>
          <motion.button 
            className="icon-btn logout-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => { onLogout(); playToggleSound() }}
            title="Logout"
          >
            <MdLogout />
          </motion.button>
        </li>
      </ul>
    </motion.nav>
  )
}