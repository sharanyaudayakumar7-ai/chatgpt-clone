# 🤖 ChatGPT Clone (Next.js + OpenRouter)

A modern ChatGPT-style AI chat application built using **Next.js**, **TypeScript**, and **Tailwind CSS**.
This project allows users to interact with an AI model in real-time with a clean and responsive UI.

---

## ✨ Features

* 💬 Interactive Chat Interface (ChatGPT-like UI)
* ⚡ Real-time AI responses using OpenRouter
* 🧠 Supports free AI models (LLaMA 3, OpenChat, etc.)
* ✨ Markdown rendering (bold, lists, headings, code)
* 📜 Auto-scrolling chat experience
* 🎨 Clean and modern UI with Tailwind CSS
* 📱 Responsive design (mobile + desktop)

---

## 🛠️ Tech Stack

### Frontend

* ⚛️ Next.js (App Router)
* ⚛️ React
* 🟦 TypeScript

### AI Integration

* 🤖 OpenRouter API (LLM provider)

### Styling

* 🎨 Tailwind CSS

---

## 📂 Project Structure

```
src/
 ├── app/
 │   ├── api/chat/route.ts   # AI API route
 │   ├── page.tsx            # Chat UI
 │   ├── layout.tsx          # Layout
 │   └── globals.css         # Styling
 └── types/
     └── chat.ts             # Message types
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/sharanyaudayakumar7-ai/chatgpt-clone.git
cd chatgpt-clone
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Add environment variables

Create a `.env.local` file:

```env
OPENAI_API_KEY=your_openrouter_api_key
```

👉 Get your API key from: https://openrouter.ai

---

### 4️⃣ Run the app

```bash
npm run dev
```

Open in browser:

```
http://localhost:3000
```

---

## 🧪 Example Prompts

* What is Artificial Intelligence?
* Explain machine learning in simple terms
* Write a short story about a robot
* Give a React example

---

## 🚀 Live Demo

👉 https://chatgpt-clone-ten-pi.vercel.app

---

## 📚 What I Learned

* Building AI-powered web applications
* Integrating LLM APIs (OpenRouter)
* Rendering Markdown in React
* Designing chat-based UI systems
* Using Next.js App Router effectively

---

## 🔮 Future Improvements

* ⚡ Streaming responses (typing effect)
* 💾 Chat history storage
* 📋 Copy button for code blocks
* 🔐 User authentication
* 🌍 Multi-model support

---

## 🙌 Author

**Sharanya Udayakumar**
GitHub: https://github.com/sharanyaudayakumar7-ai

---

