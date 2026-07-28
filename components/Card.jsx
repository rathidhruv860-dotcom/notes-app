import { motion } from 'framer-motion'
import { MdDelete, MdPushPin, MdEdit, MdAccessTime } from 'react-icons/md'
import { playNoteDeleteSound, playSketchSound } from '../src/utils/sounds'

export default function Card({ title, desc, deleteNote, pinNote, isPinned, editNote, id }) {
  const handleDelete = () => {
    playNoteDeleteSound()
    deleteNote(id)
  }

  return (
    <motion.div 
      className={`card ${isPinned ? 'pinned' : ''}`}
      layout
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, y: -20 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      whileHover={{ y: -5, boxShadow: '0 12px 25px rgba(0,0,0,0.15)' }}
      onMouseEnter={() => playSketchSound()}
    >
      {isPinned && <div className="pin-badge"><MdPushPin /></div>}
      
      <div className="card-header">
        <motion.button 
          className="card-action pin-btn"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => pinNote(id)}
          title="Pin/Unpin"
        >
          <MdPushPin style={{ color: isPinned ? '#f59e0b' : '#999' }} />
        </motion.button>
        <motion.button 
          className="card-action edit-btn"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => editNote(id)}
          title="Edit"
        >
          <MdEdit />
        </motion.button>
        <motion.button 
          className="card-action del-btn"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleDelete}
          title="Delete"
        >
          <MdDelete />
        </motion.button>
      </div>
      
      <div className="card-body">
        <motion.div 
          className="title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {title}
        </motion.div>
        <div className="desc">{desc}</div>
      </div>
      
      {id && (
        <div className="card-footer">
          <MdAccessTime className="time-icon" />
          <span className="note-id">#{id.slice(-4)}</span>
        </div>
      )}
    </motion.div>
  )
}