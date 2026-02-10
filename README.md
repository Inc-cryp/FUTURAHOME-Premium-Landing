# Futurahome Premium Landing Page

<div align="center">
  <h3>Visualize Your Future Sanctuary</h3>
  <p>A high-end, futuristic real estate landing page featuring interactive 3D models and AI-powered architectural visualization.</p>
</div>

## ✨ Features

- **Immersive Hero Section**: Interactive hotspots with 3D model previews using `<model-viewer>`.
- **Visionary Tool**: AI-powered architectural concept generator using **Google Gemini 2.0 Flash**.
- **Modern UI/UX**: Sleek, dark-themed design with smooth animations and glassmorphism effects.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS
- **AI Integration**: Google GenAI SDK (`@google/genai`)
- **3D Rendering**: Google `<model-viewer>`
- **Icons**: Lucide React & Custom SVGs

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Inc-cryp/Futurahome-premium-landing.git
   cd Futurahome-premium-landing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```
   > You can get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## 📦 Deployment

This project is optimized for deployment on **Vercel**.

1. Install Vercel CLI: `npm i -g vercel`
2. Run deployment command:
   ```bash
   vercel
   ```
3. **Important**: Add your `GEMINI_API_KEY` in the Vercel Project Settings > Environment Variables.

## 📄 License

This project is licensed under the MIT License.
