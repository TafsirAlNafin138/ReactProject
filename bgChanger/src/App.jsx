import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [color, setColor] = useState("Magenta");

  const COLORS = [
    { name: "Red", color: "red", text: "text-white" },
    { name: "Green", color: "green", text: "text-white" },
    { name: "Blue", color: "blue", text: "text-white" },
    { name: "Olive", color: "olive", text: "text-white" },
    { name: "Gray", color: "gray", text: "text-white" },
    { name: "Yellow", color: "yellow", text: "text-black" },
    { name: "Pink", color: "pink", text: "text-black" },
    { name: "Purple", color: "purple", text: "text-white" },
    { name: "Lavender", color: "lavender", text: "text-black" },
    {
      name: "White",
      color: "white",
      text: "text-black border border-gray-300",
    },
    { name: "Black", color: "black", text: "text-white" },
  ];

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center transition-colors duration-300"
      style={{ background: `linear-gradient(135deg, ${color}, #f0f4f8 80%)` }}
    >
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Background Changer</h1>
        <p className="text-lg text-gray-600 mt-2">
          Pick a color to change the background
        </p>
      </header>
      <div className="fixed bottom-12 inset-x-0 flex justify-center px-2">
        <div className="flex flex-wrap gap-3 bg-black/80 px-6 py-4 rounded-3xl border border-gray-200 shadow-2xl">
          {COLORS.map(({ name, color: btnColor, text }) => (
            <button
              key={name}
              onClick={() => setColor(btnColor)}
              className={`px-5 py-2 rounded-full font-semibold shadow hover:scale-110 transition ${text} ${
                color === btnColor ? "ring-4 ring-yellow-400 scale-110" : ""
              }`}
              style={{ backgroundColor: btnColor }}
              aria-pressed={color === btnColor}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
