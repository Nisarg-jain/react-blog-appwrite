# 🚀 React Blog App (Production-Grade)

A full-featured, high-performance blogging application built with **React**, **Vite**, and **Redux Toolkit**, powered by an open-source **Appwrite Cloud** backend. This project focuses on professional architecture patterns, strict environment variable security, clean form handling, and real-time state synchronization.

---

## 🛠️ Tech Stack & Architecture

### Front-End Core
* **Framework:** React 18 (via Vite for blazing-fast builds)
* **State Management:** Redux Toolkit (`@reduxjs/toolkit` & `react-redux`) for global authentication and post tracking status.
* **Routing:** React Router DOM v6 for dynamic, secure client-side navigation.
* **Styling:** Tailwind CSS for a modern, fully responsive user interface.

### Advanced Utilities
* **Form Management:** `react-hook-form` for high-performance, zero-re-render input validation.
* **Rich Text Editing:** TinyMCE (`@tinymce/tinymce-react`) integrating a full visual dashboard editor.
* **Content Parsing:** `html-react-parser` to safely inject and render saved rich-text HTML database payloads back into JSX elements.

### Backend-as-a-Service (BaaS)
* **Appwrite Cloud:** Handles user authentication sessions, relational JSON document databases for posts, and object storage buckets for featured images.

---

## ✨ Features

* 🔒 **Full Authentication:** Secure sign-up, login, and multi-session tracking using Appwrite Auth.
* 📝 **Rich-Text Post Editor:** Create visual articles with bold text, headings, alignments, and lists.
* 📸 **Image Upload & Storage:** Full CRUD support for uploading, updating, and rendering featured images via Appwrite Buckets.
* 🔗 **Automated Slug Generation:** Real-time interceptors that transform titles into lower-case, URL-safe dashboard slugs automatically as you type.
* 🛡️ **Conditional Authorization:** Content modification security that dynamically renders Edit/Delete tools only if the logged-in user matches the post author profile.
* ⚙️ **Environment Isolation:** Zero public exposure of backend endpoints using structured Vite environment tracking.

---

## 🚀 Getting Started
