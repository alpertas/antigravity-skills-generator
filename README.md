# ⚡️ Antigravity Skill Architect

> **Generate production-ready Skill files for Google Antigravity IDE using Gemini AI.**
>
> *Unofficial, Open Source, and runs entirely in your browser.*

![Project Preview](public/preview.png)

## 🚀 What is this?

**Antigravity Skill Architect** is a specialized tool designed to streamline the "Agent-First" development workflow. It automates the creation of `SKILL.md` files—the instruction sets that teach Google Antigravity agents how to behave, code, and adhere to strict project standards.

**Key Features:**

* **✍️ Text-to-Skill:** Simply describe your requirement (e.g., *"Next.js SaaS with Supabase and Tailwind"*), and get a perfectly structured, context-aware `.md` file.
* **🧬 Reverse Engineering (Code-to-Skill):** Paste your existing high-quality code. The AI analyzes your coding style, naming conventions, and architecture to generate a skill that replicates your exact style.
* **🔒 Privacy First:** No backend. No database. Your Google API keys are stored strictly in your browser's **Local Storage**.
* **⚡️ Smart Context:** Automatically injects technical best practices for selected stacks (Next.js App Router, Python FastAPI, etc.).

---

## 🛠️ Installation & Setup

This project is built with **Next.js 14** and uses the **Google Gemini API** directly from the client side.

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

### ⚙️ Configuration (API Key)

Since this is a client-side application, **you do not need to configure a `.env` file** to run the project.

Instead, the API key is handled via the UI:
1.  Launch the app.
2.  Click the **Key Icon 🔑** in the header.
3.  Enter your Gemini API Key.
4.  The key is saved to your browser's `localStorage` for future use.

---

## 🔑 How to Use

### 1. Get Your API Key
This tool requires your own API key to function (BYOK - Bring Your Own Key).
1.  Go to [Google AI Studio](https://aistudio.google.com/).
2.  Click **"Get API Key"**.
3.  *Note: The free tier is sufficient for personal use.*

### 2. Enter Key in App
* Paste your key into the settings menu (Key Icon) within the app.

### 3. Generate a Skill
* **Describe Mode:** Type your request naturally.
    * *Example:* "Create a Python script for web scraping using BeautifulSoup with error handling."
* **Reverse Engineer Mode:** Switch the tab, paste a code file, and let the AI extract the style rules.

### 4. Export
* **Copy:** Click the copy icon to use immediately.
* **Download:** Get the formatted `.md` file ready to be dropped into your `.antigravity/skills/` folder. *(Optional: Support the project via Gumroad to unlock instant downloads).*

---

## 🧠 Under the Hood (System Prompt)

Curious about how the AI thinks? We believe in full transparency.

You can view the exact **System Prompt** used to power this tool. Feel free to use it to create your own custom agents in Google AI Studio or other LLMs.

👉 **[View the System Prompt (SYSTEM_PROMPT.md)](./SYSTEM_PROMPT.md)**

---

## 🧠 For AI Studio Users (Manual Setup)

If you prefer to build this agent yourself inside Google AI Studio instead of using this web UI:

1.  Create a new **Chat Prompt**.
2.  Copy the content from [SYSTEM_PROMPT.md](./SYSTEM_PROMPT.md).
3.  Paste it into the **System Instructions** block.
4.  Use **Gemini 1.5 Flash** (Recommended for speed) or **Pro**.

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

## 🗺️ Roadmap & Todo

We have big plans for Antigravity Skill Architect! Here is what we are working on. Feel free to pick a task and open a PR.

### ✅ Completed
- [x] **Core:** Text-to-Skill Generation (Gemini 1.5).
- [x] **Core:** Reverse Engineering (Code-to-Skill).
- [x] **UX:** Shared URLs (Viral Loop).
- [x] **Architecture:** Client-side only (No backend required).

### 🚧 In Progress / Planned
- [ ] **Feature:** Support for **Local LLMs** (Ollama/Llama 3) for completely offline usage.
- [ ] **Feature:** "Diff Viewer" to compare generated skills with previous versions.
- [ ] **Feature:** Import code directly from a **GitHub URL** (instead of copy-pasting).
- [ ] **UI:** Syntax Highlighting for the Code Editor input.
- [ ] **Content:** Add more "Tech Stack" presets (Vue, Svelte, Go, Rust, Laravel).
- [ ] **Infra:** Migrate to **Gemini 2.0 Flash** (waiting for stable rate limits).

## ☕️ Support

This project is free and open-source. If it saves you time or helps you build better agents, you can support the development:

[![Support on Gumroad](https://img.shields.io/badge/Support%20on-Gumroad-ff90e8?style=for-the-badge&logo=gumroad&logoColor=black)](https://alpertas6.gumroad.com/l/alpertas)

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

*Disclaimer: This project is a community tool and is not affiliated with Google.*