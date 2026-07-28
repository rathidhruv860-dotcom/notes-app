import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { playToggleSound } from '../src/utils/sounds'

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields')
      return
    }
    if (isSignUp && password.length < 4) {
      setError('Password must be at least 4 characters')
      return
    }
    setError('')
    playToggleSound()
    const stored = localStorage.getItem('noteX_users')
    const users = stored ? JSON.parse(stored) : []
    
    if (isSignUp) {
      const exists = users.find(u => u.username === username)
      if (exists) {
        setError('Username already exists')
        return
      }
      users.push({ username, password })
      localStorage.setItem('noteX_users', JSON.stringify(users))
      localStorage.setItem('noteX_user', username)
      onLogin(username)
    } else {
      const found = users.find(u => u.username === username && u.password === password)
      if (!found) {
        setError('Invalid username or password')
        return
      }
      localStorage.setItem('noteX_user', username)
      onLogin(username)
    }
  }

  return (
    <div className="login-page">
      <motion.div 
        className="login-card"
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 15 }}
      >
        <motion.div 
          className="login-logo"
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="logo-icon">✎</span>
          <h1>NoteX</h1>
        </motion.div>
        <p className="login-subtitle">Your Creative Space</p>

        <AnimatePresence mode="wait">
          <motion.form 
            key={isSignUp ? 'signup' : 'login'}
            onSubmit={handleSubmit}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -30, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="input-group">
              <label>Username</label>
              <input 
                type="text" 
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <motion.p 
                className="login-error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >{error}</motion.p>
            )}
            <motion.button 
              className="login-btn"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
            >
              {isSignUp ? 'Create Account' : 'Login'}
            </motion.button>
          </motion.form>
        </AnimatePresence>

        <motion.p 
          className="toggle-auth"
          whileHover={{ scale: 1.02 }}
          onClick={() => { setIsSignUp(!isSignUp); setError(''); playToggleSound() }}
        >
          {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
        </motion.p>

        <div className="sketch-decoration">
          {['/', '\\', '/', '\\', '~', '-', '_'].map((char, i) => (
            <motion.span 
              key={i}
              className="sketch-char"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 3, delay: i * 0.4, repeat: Infinity }}
            >{char}</motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}