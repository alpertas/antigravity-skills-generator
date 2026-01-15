# ⚡️ Antigravity Skill Architect

> **Generate production-ready Skill files for Google Antigravity IDE using Gemini AI.**
>
> *Unofficial, Open Source, and runs entirely in your browser.*


## 🚀 What is this?

**Antigravity Skill Architect** is a specialized tool designed to streamline the "Agent-First" development workflow. It automates the creation of `SKILL.md` files—the instruction sets that teach Google Antigravity agents how to behave, code, and adhere to strict project standards.

**Key Features:**

* **✍️ Text-to-Skill:** Simply describe your requirement (e.g., *"Next.js SaaS with Supabase and Tailwind"*), and get a perfectly structured, context-aware `.skill` file.
* **🧬 Reverse Engineering (Code-to-Skill):** Paste your existing high-quality code. The AI analyzes your coding style, naming conventions, and architecture to generate a skill that replicates your exact style.
* **🔒 Privacy First:** No backend. No database. Your Google API keys are stored strictly in your browser's **Local Storage**.
* **⚡️ Smart Context:** Automatically injects technical best practices for selected stacks (Next.js App Router, Python FastAPI, etc.).

---

## 🛠️ Installation & Setup

This project is built with **Next.js 14**, **Tailwind CSS**, and uses the **Google Gemini API** (Client-Side).

### Prerequisites

* Node.js 18+
* A [Google AI Studio](https://aistudio.google.com/) API Key.

### Steps

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/alpertas/antigravity-skills-generator.git
    cd antigravity-skills-generator
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 How to Use

### 1. Get Your API Key
This tool requires your own API key to function (BYOK - Bring Your Own Key).
1.  Go to [Google AI Studio](https://aistudio.google.com/).
2.  Click **"Get API Key"**.
3.  *Note: The free tier is sufficient for personal use.*

### 2. Configure the App
1.  Click the **Key Icon 🔑** in the application header.
2.  Paste your API key. It is saved locally to your browser.

### 3. Generate a Skill
* **Describe Mode:** Type your request naturally.
    * *Example:* "Create a Python script for web scraping using BeautifulSoup with error handling."
* **Reverse Engineer Mode:** Switch the tab, paste a code file, and let the AI extract the style rules.

### 4. Export
* **Copy:** Click the copy icon to use immediately.
* **Download:** Get the formatted `.skill` file. *(Optional: Support the project via Gumroad to unlock instant downloads).*

---

## 🧠 For AI Studio Users (Manual Setup)

If you prefer to build this agent yourself inside Google AI Studio instead of using this web UI:

1.  Create a new **Chat Prompt**.
2.  Set the **System Instructions** to:
    > You are the Antigravity Skill Architect. Your sole purpose is to convert user requests into robust, secure, and production-ready SKILL.md files following the official format. You must output only the raw Markdown content.
3.  Use **Gemini 1.5 Flash** (Recommended for speed) or **Pro**.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

**Roadmap Ideas:**
* [ ] Add more "Tech Stack" presets.
* [ ] Improve the Linter/Validator logic.
* [ ] Add a "Diff View" to compare versions.

---

## ☕️ Support

This project is free and open-source. If it saves you time or helps you build better agents, you can support the development:

[![Support on Gumroad](https://img.shields.io/badge/Support%20on-Gumroad-ff90e8?style=for-the-badge&logo=gumroad&logoColor=black)](https://alpertas6.gumroad.com/l/alpertas)

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

*Disclaimer: This project is a community tool and is not affiliated with Google.*