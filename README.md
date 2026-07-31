# NoteX ✎

A beautiful, feature-rich notes application built with React and Vite. NoteX provides a clean, intuitive interface for creating, organizing, and managing your notes with support for dark mode, search, pinning, and more.

![NoteX App](https://img.shields.io/badge/NoteX-v1.0.0-c97b5e?style=flat-square)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)

## ✨ Features

- **📝 Note Management** — Create, edit, delete, and organize your notes effortlessly
- **📌 Pin Notes** — Pin important notes to keep them at the top
- **🔍 Search** — Quickly find notes by title or content
- **🌙 Dark Mode** — Toggle between light and dark themes
- **🔐 User Authentication** — Simple login/signup system with local storage
- **🎵 Sound Effects** — Delightful audio feedback for interactions (Web Audio API)
- **🎨 Smooth Animations** — Fluid transitions and animations powered by Framer Motion
- **📱 Responsive Design** — Works seamlessly on desktop and mobile devices
- **💾 Persistent Storage** — Notes are saved locally in your browser

## 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| [React 19](https://react.dev/) | UI Framework |
| [Vite 8](https://vitejs.dev/) | Build Tool & Dev Server |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [React Icons](https://react-icons.github.io/react-icons/) | Icon Library |
| [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) | Sound Effects |

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rathidhruv860-dotcom/notes-app.git
   cd notes-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📖 Usage

1. **Sign Up** — Create a new account with a username and password
2. **Login** — Log in to your existing account
3. **Create Notes** — Use the form to add notes with a title and description
4. **Manage Notes** — Pin, edit, or delete notes using the action buttons on each card
5. **Search** — Use the search bar to filter through your notes
6. **Dark Mode** — Toggle dark mode using the theme button in the navbar

## 📁 Project Structure

```
notes-app/
├── components/
│   ├── Card.jsx          # Note card component
│   ├── Login.jsx         # Login/Signup component
│   └── Navbar.jsx        # Navigation bar component
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── utils/
│   │   └── sounds.js     # Web Audio API sound effects
│   ├── App.css           # Application styles
│   ├── App.jsx           # Main application component
│   ├── index.css         # Global styles
│   └── main.jsx          # Application entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using React & Vite