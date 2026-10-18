# 🌙 Pip's Midnight Dream OS

> **"I build the dreams you fall asleep inside."**  
> An interactive cozy character portfolio built for the official [haX.baby](https://hax.baby) **Baby's First Website: Meet the Baby** Hackathon (Track 1: Pip).

---

## 🌟 Concept Overview

**Pip's Midnight Dream OS** is an immersive bedtime nursery operating system portfolio. It imagines entering a tiny forgotten workstation floating high above the Midnight Nursery inside a fluffy cloud at 12:00 AM. 

The website belongs to **Pip**, a sleepy Junior Dream Engineer who crafts dreams, lullabies, nightlights, and bedtime stories for neighborhood creatures who find sleep hard to reach.

---

## ✨ Features & Hackathon Requirements

### 1. Identity & Canon Character Profile
- **Canonical Character Integrity**: Pip's smooth round skull face, cozy starry nightcap with pink bow, glowing amber eye pinpricks, and gentle demeanor are strictly preserved.
- **Character Sheet Card**: Details name, species, profession, personality, tagline, favorite bedtime snacks, quirks, and midnight quotes.
- **Interactive Eye/Head Tracking**: Gentle parallax reaction following desktop cursor pointer or subtle floating loop on touch devices.

### 2. Four Working Showcase Projects
1. **The Lullaby Lab (`Lullaby_Lab.exe`)**:
   - Synthesizes soothing procedural melodies (Gentle Hum, Dreamy Drift, Starlight Chime) using the **Web Audio API** (100% original synthesis, zero copyright).
   - Interactive 7-key star chime mini-synthesizer keyboard (`Do`, `Re`, `Mi`, `Fa`, `Sol`, `La`, `Ti`).
   - Global sound mute toggle compliance and visual "Now Playing" audio pulse waves.
2. **The Nightlight Collection (`Nightlights.exe`)**:
   - 6 magical bedtime glow options (Moonbeam, Starlight, Aurora, Sunset Blush, Ocean, Firefly).
   - Dynamic real-time room lighting preview chamber with brightness slider and dark-room simulator.
3. **Dream Delivery Routes (`Dream_Routes.map`)**:
   - Vector-illustrated midnight map of the neighborhood (Cloud Bakery, Moon Garden, Star Station, Sleepy Ghost Cottage, Midnight Nursery, Lullaby Lake).
   - Clickable destination pins, animated vector flight delivery routes, courier animation, and destination dream dossiers.
4. **Bedtime Storybook (`Storybook.pdf`)**:
   - Original 4-scene bedtime tale: *"The Little Star That Forgot How to Shine"*.
   - Page-turn controls, progress dots, custom CSS atmospheric scene illustrations, and keyboard arrow key navigation.

### 3. Origin Story Journey
- Scroll-triggered animated timeline unfolding Pip's 5-stage origin:
  1. *A Very Sleepy Beginning* (Waking up in a cloud)
  2. *The Problem With Silence* (Discovering creatures who can't sleep)
  3. *The First Little Dream* (Wrapping sound inside starlight)
  4. *The Midnight Mission* (First delivery run)
  5. *Every Pillow Holds a Universe* (Pip's lifelong purpose)

### 4. Interactive Magic & Bonus Quests
- **Dream OS Desktop**: Retro 2000s desktop with executable icons, taskbar, status monitor, and humorous trash bin tooltip.
- **Dream Guestbook**: LocalStorage-backed notebook with name, character counter, input sanitization, and persistent entries.
- **Retro Visitor Counter**: Odometer digit display tracking visits locally in browser storage.
- **Secret Easter Egg**: Tapping the hidden sleeping moon 5 times reveals Pip's classified dream vault with canvas confetti.
- **Sparkle Cursor Trail**: Lightweight canvas starlight trailing mouse movements.
- **Settings & Accessibility**: Full control over Day/Night mode, Sound on/off, Reduced Motion toggle, Cursor Sparkles, and Retro Chaos Mode.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Standard CSS with CSS Custom Properties (Design Tokens)
- **Icons**: Lucide React
- **Audio Engine**: Web Audio API (Native browser oscillator and gain synthesis)
- **Effects**: canvas-confetti

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation
```bash
# Clone or navigate into the directory
cd Pips-Midnight-Dream-OS

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
Open your browser at the local URL (usually `http://localhost:5173`).

### Production Build
```bash
npm run build
```
Generates an optimized bundle ready for deployment in `dist/`.

### Preview Build Locally
```bash
npm run preview
```

---

## ☁️ Deployment

The project is zero-configuration ready for **Vercel** or **Netlify**:
1. Push repository to GitHub.
2. Import repository on Vercel or Netlify.
3. Build Command: `npm run build`
4. Output Directory: `dist`

---

## 📜 Credits & Official Assets

- **Official Character & Assets**: haX.baby Track 1 (Pip)
- **Official Asset Directory**: `https://hax.baby/baby/assets/`
- **Asset Bundle**: `pip_avatar_cloud.png`, `pip_portrait.png`, `pip_lullaby_box.png`, `pip_dream_lantern.png`
- **Original Code & Design**: Built for haX.baby Baby's First Website Hackathon 2026
