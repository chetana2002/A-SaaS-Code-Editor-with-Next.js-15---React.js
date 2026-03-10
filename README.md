# 🚀 CodeCraft – Interactive Online Code Editor

![Next.js](https://img.shields.io/badge/Next.js-13-black?style=for-the-badge&logo=nextdotjs)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/TailwindCSS-38BDF8?style=for-the-badge&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

CodeCraft is a **modern web-based code editor** that allows developers to write, run, and manage code directly in the browser.

It supports multiple programming languages, real-time execution, authentication, and execution history — delivering an experience similar to professional online editors.


# ✨ Features

## 💻 Code Editor
- Monaco-powered code editor
- Multi-language support
- Syntax highlighting
- Adjustable font size
- Theme switching
- Auto-save functionality

## ⚡ Code Execution
- Run code directly from the browser
- Integrated with **Piston API**
- Output panel
- Error handling
- Execution time tracking
- Keyboard shortcut (`Ctrl + Enter`)

## 👤 User Features
- Authentication system
- Execution history
- Snippet management
- Profile dashboard

## 🎨 UI / UX
- Smooth animations
- Skeleton loading states
- Copy output button
- Clear output option
- Download code feature
- Responsive modern UI

---

# 🛠 Tech Stack

## Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion

## Editor
- Monaco Editor

## Backend
- Convex

## Authentication
- Clerk

## Code Execution
- Piston API

---

# 📂 Project Structure

```
CodeCraft
│
├── app
│   ├── (root)
│   │   ├── _components
│   │   ├── _constants
│   │   └── page.tsx
│
├── components
│   ├── Header.tsx
│   ├── RunButton.tsx
│   ├── OutputPanel.tsx
│   ├── LanguageSelector.tsx
│   ├── ThemeSelector.tsx
│
├── store
│   └── useCodeEditorStore.ts
│
├── convex
│   └── functions
│
└── README.md
```

---

# ⚙️ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/codecraft.git
```

### 2️⃣ Navigate to the Folder

```bash
cd codecraft
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Setup Environment Variables

Create a `.env.local` file in the root directory.

```
NEXT_PUBLIC_CONVEX_URL=your_convex_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_secret_key
```

### 5️⃣ Run the Development Server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

# 🧪 Supported Languages

- JavaScript
- TypeScript
- Python
- Java
- C++
- Go
- Rust

---

# 🔮 Future Improvements

- Shareable code links
- Real-time collaboration
- Input support for programs
- GitHub Gist export
- AI code assistant

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Submit a pull request

---

# 📜 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

**Chetana Dharavathu**

If you like this project, consider giving it a ⭐ on GitHub.
