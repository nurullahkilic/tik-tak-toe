import { useState } from "react";
import Game from "./components/Game";

function App() {
  const [unitSize, setUnitSize] = useState(3);
  const [number, setNumber] = useState(0);
  return (
    <div className="bg-zinc-700 min-w-full min-h-full flex flex-col items-center justify-center gap-4 overflow-scroll p-24">
      <div className="bg-zinc-700 flex flex-row items-center justify-center gap-4">
        <Game unitSize={Number(unitSize + number)} />
      </div>
      <div className="absolute top-3 left-3 flex flex-row items-center justify-center gap-4 bg-black/70 p-3">
        <button
          className="bg-white px-2 py-0"
          onClick={() => setNumber(number + 1)}
        >
          +
        </button>
        <h3 className="text-white text-xl font-bold">
          {Number(unitSize + number)}
        </h3>
        <button
          className="bg-white px-2 py-0"
          onClick={() => setNumber(number - 1)}
        >
          -
        </button>
      </div>
    </div>
  );
}

export default App;
