import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(6);
  const [numberallowed, setNumberAllowed] = useState(false);
  const [symbolallowed, setSymbolAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberallowed) chars += "0123456789";
    if (symbolallowed) chars += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let pas = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      pas += chars[randomIndex];
    }
    setPassword(pas);
  }, [length, numberallowed, symbolallowed]);

  const copypassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, length); 
    document.execCommand("copy");
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword, length, numberallowed, symbolallowed]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <div className="w-full max-w-lg shadow-lg rounded-xl p-6 bg-gray-800/80 backdrop-blur-md border border-gray-700">
        
        <h1 className="text-2xl font-bold text-center mb-6 text-cyan-400">
          Password Generator
        </h1>

        {/* Password field */}
        <div className="flex shadow-md rounded-lg overflow-hidden mb-5">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-3 text-gray-200 bg-gray-900"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 px-4 py-2 text-white font-semibold"
            onClick={copypassword}
          >
            Copy
          </button>
        </div>

        {/* Controls */}
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={6}
              max={30}
              value={length}
              className="cursor-pointer accent-cyan-500"
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <label className="select-none text-gray-300">Length: {length}</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={numberallowed}
              id="numberallowed"
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="accent-blue-500"
            />
            <label htmlFor="numberallowed" className="select-none text-gray-300">
              Include Numbers
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={symbolallowed}
              id="symbolallowed"
              onChange={() => setSymbolAllowed((prev) => !prev)}
              className="accent-purple-500"
            />
            <label htmlFor="symbolallowed" className="select-none text-gray-300">
              Include Symbols
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
