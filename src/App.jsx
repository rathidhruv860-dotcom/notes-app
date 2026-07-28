import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './App.css'
import Navbar from './../components/Navbar'
import Card from './../components/Card'
import Login from './../components/Login'
import { playNoteAddSound, playToggleSound } from './utils/sounds'

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
}

function App() {
  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState({ title: '', desc: '' })
  const [editingId, setEditingId] = useState(null)
  const [user, setUser] = useState(null)
  const [darkMode, setDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Load user session
  useEffect(() => {
    const savedUser = localStorage.getItem('noteX_user')
    if (savedUser) setUser(savedUser)
  }, [])

  // Load notes when user changes
  useEffect(() => {
    if (!user) return
    const stored = localStorage.getItem(`noteX_notes_${user}`)
    if (stored) {
      try { setNotes(JSON.parse(stored)) } catch { setNotes([]) }
    } else {
      setNotes([])
    }
  }, [user])

  // Save notes whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`noteX_notes_${user}`, JSON.stringify(notes))
    }
  }, [notes, user])

  // Apply dark mode class
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode)
  }, [darkMode])

  // Load dark mode preference
  useEffect(() => {
    const saved = localStorage.getItem('noteX_darkMode')
    if (saved === 'true') setDarkMode(true)
  }, [])

  useEffect(() => {
    localStorage.setItem('noteX_darkMode', darkMode)
  }, [darkMode])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!currentNote.title.trim() && !currentNote.desc.trim()) {
      playToggleSound()
      return
    }
    if (editingId) {
      setNotes(notes.map(n => n.id === editingId ? { ...n, ...currentNote } : n))
      setEditingId(null)
    } else {
      const newNote = { ...currentNote, id: generateId(), pinned: false, createdAt: Date.now() }
      setNotes([newNote, ...notes])
      playNoteAddSound()
    }
    setCurrentNote({ title: '', desc: '' })
  }

  const handleChange = (e) => {
    setCurrentNote({ ...currentNote, [e.target.name]: e.target.value })
  }

  const deleteNote = (id) => {
    setNotes(notes.filter(item => item.id !== id))
  }

  const pinNote = (id) => {
    setNotes(notes.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n))
  }

  const editNote = (id) => {
    const note = notes.find(n => n.id === id)
    if (note) {
      setCurrentNote({ title: note.title, desc: note.desc })
      setEditingId(id)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setCurrentNote({ title: '', desc: '' })
  }

  const handleLogout = () => {
    localStorage.removeItem('noteX_user')
    setUser(null)
    setNotes([])
  }

  // Filter notes by search and sort (pinned first)
  const filteredNotes = notes
    .filter(n => 
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.desc.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
      return b.createdAt - a.createdAt
    })

  if (!user) {
    return <Login onLogin={(u) => setUser(u)} />
  }

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <Navbar 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        user={user} 
        onLogout={handleLogout}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <main className="main-content">
        <motion.div 
          className="form-container"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {editingId ? '✎ Edit Note' : '✎ Create Your Note'}
          </motion.h1>
          
          <motion.form 
            className="note-form" 
            onSubmit={handleSubmit}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
          >
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                value={currentNote.title}
                onChange={handleChange}
                type="text"
                name="title"
                id="title"
                placeholder="What's the title of your note?"
              />
            </div>
            <div className="form-group">
              <label htmlFor="desc">Description</label>
              <motion.textarea
                whileFocus={{ scale: 1.01 }}
                name="desc"
                id="desc"
                value={currentNote.desc}
                onChange={handleChange}
                placeholder="Write your thoughts here..."
              />
            </div>
            <div className="form-actions">
              <motion.button
                className="btn-submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
              >
                {editingId ? '✏️ Update Note' : '📝 Add Note'}
              </motion.button>
              {editingId && (
                <motion.button
                  className="btn-cancel"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={cancelEdit}
                >
                  ✖ Cancel
                </motion.button>
              )}
            </div>
          </motion.form>
        </motion.div>

        <section className="noteSection">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Your Notes {filteredNotes.length > 0 && `(${filteredNotes.length})`}
          </motion.h2>
          
          <div className="container">
            <AnimatePresence mode="popLayout">
              {filteredNotes.length > 0 ? (
                filteredNotes.map(note => (
                  <Card 
                    key={note.id}
                    id={note.id}
                    title={note.title}
                    desc={note.desc}
                    isPinned={note.pinned}
                    deleteNote={deleteNote}
                    pinNote={pinNote}
                    editNote={editNote}
                  />
                ))
              ) : (
                <motion.div 
                  className="empty-state"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {searchQuery ? (
                    <>
                      <span className="empty-icon">🔍</span>
                      <p>No notes match your search</p>
                    </>
                  ) : (
                    <>
                      <span className="empty-icon">📝</span>
                      <p>No notes yet. Create your first one above!</p>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App