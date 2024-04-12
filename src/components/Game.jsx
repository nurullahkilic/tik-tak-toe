import { useEffect, useState } from "react";
const Game = ({ unitSize = 3 }) => {
  const [board, setBoard] = useState(
    Array.from(Array(unitSize), () => new Array(unitSize).fill(null))
  );
  const [gameCount, setGameCount] = useState(0);
  const [player, setPlayer] = useState();

  useEffect(() => {
    setPlayer(findPlayerChar(gameCount % 2 == 0));
    if (gameCount % (unitSize * unitSize) === 0) reset();
  }, [gameCount]);

  useEffect(() => {
    checkAllBoard();
  }, [player]);

  useEffect(() => {
    setBoard(Array.from(Array(unitSize), () => new Array(unitSize).fill(null)));
  }, [unitSize]);

  const findPlayerChar = (value) => {
    if (value === true) return "X";
    if (value === false) return "O";
    return null;
  };

  const isClickedButton = ({ x, y }) => {
    const value = getValueFromBoard({ x, y });
    if (value === true || value === false) return true;
    return false;
  };

  const selectButton = ({ x, y }) => {
    if (isClickedButton({ x, y })) return;
    setGameCount(gameCount + 1);
    setBoard(
      board.map((row, _x) =>
        row.map((item, _y) => {
          if (item === true || item === false) return item;
          if (_x == x && _y == y) return player === "X" ? true : false;
          return null;
        })
      )
    );
  };

  const reset = () => {
    setBoard(board.map((row) => row.fill(null)));
    setGameCount(0);
  };

  const getArrayValue = (arr, key) => {
    if (key < 0 || key >= arr?.length) return null;
    return arr?.[key];
  };

  const getValueFromBoard = ({ x, y }, xDistance = 0, yDistance = 0) => {
    return getArrayValue(getArrayValue(board, x + xDistance), y + yDistance);
  };

  const checkUnitWin = ({ x, y }) => {
    let CHECK_WIN_RESPONSE = {
      isWin: null,
      winner: null,
      coordinates: null,
    };

    if (getValueFromBoard({ x, y }) === null)
      return {
        ...CHECK_WIN_RESPONSE,
        isWin: false,
      };

    const player = findPlayerChar(getValueFromBoard({ x, y }));
    CHECK_WIN_RESPONSE.winner = player;

    const isVerticalWin =
      getValueFromBoard({ x, y }) === getValueFromBoard({ x, y }, 1, 0) &&
      getValueFromBoard({ x, y }, 1, 0) === getValueFromBoard({ x, y }, 2, 0);

    if (isVerticalWin) {
      return {
        ...CHECK_WIN_RESPONSE,
        isWin: isVerticalWin,
        coordinates: [
          { x, y },
          { x: x + 1, y },
          { x: x + 2, y },
        ],
      };
    }

    const isHorizantalWin =
      getValueFromBoard({ x, y }) === getValueFromBoard({ x, y }, 0, 1) &&
      getValueFromBoard({ x, y }, 0, 1) === getValueFromBoard({ x, y }, 0, 2);

    if (isHorizantalWin) {
      return {
        ...CHECK_WIN_RESPONSE,
        isWin: isHorizantalWin,
        coordinates: [
          { x, y },
          { x, y: y + 1 },
          { x, y: y + 2 },
        ],
      };
    }

    const isCrossWin =
      getValueFromBoard({ x, y }) === getValueFromBoard({ x, y }, 1, 1) &&
      getValueFromBoard({ x, y }, 1, 1) === getValueFromBoard({ x, y }, 2, 2);

    if (isCrossWin) {
      return {
        ...CHECK_WIN_RESPONSE,
        isWin: isCrossWin,
        coordinates: [
          { x, y },
          { x: x + 1, y: y + 1 },
          { x: x + 2, y: y + 2 },
        ],
      };
    }

    const isCrossReverseWin =
      getValueFromBoard({ x, y }) === getValueFromBoard({ x, y }, 1, -1) &&
      getValueFromBoard({ x, y }, 1, -1) === getValueFromBoard({ x, y }, 2, -2);

    if (isCrossReverseWin) {
      return {
        ...CHECK_WIN_RESPONSE,
        isWin: isCrossReverseWin,
        coordinates: [
          { x, y },
          { x: x + 1, y: y - 1 },
          { x: x + 2, y: y - 2 },
        ],
      };
    }

    return {
      ...CHECK_WIN_RESPONSE,
      isWin: false,
      winner: null,
    };
  };

  const checkAllUnits = () => {
    let response = false;

    board.some((row, x) => {
      return row.some((unit, y) => {
        const result = checkUnitWin({ x, y });
        if (result.isWin === true) {
          response = result;
          return true;
        }
      });
    });

    return response;
  };

  const checkAllBoard = () => {
    if (checkAllUnits()?.isWin) {
      console.log(checkAllUnits());
      confirm(checkAllUnits()?.winner + " player won!") && reset();
    }
  };

  return (
    <div className="text-white flex flex-col items-center justify-center gap-4">
      <div className="text-white text-3xl flex flex-col items-center justify-center gap-1">
        {board.map((item, _x) => (
          <div
            key={_x}
            className="flex flex-row items-center justify-center gap-1"
          >
            {item.map((item, _y) => (
              <button
                key={_y}
                className={`w-12 h-12
              ${item === null && "bg-red-500"}
              ${item !== null && "bg-green-600"}`}
                onClick={() => {
                  selectButton({
                    x: _x,
                    y: _y,
                  });
                }}
              >
                {/* <h6 className="text-sm">{JSON.stringify({ x: _x, y: _y })}</h6> */}
                {findPlayerChar(item)}
              </button>
            ))}
          </div>
        ))}
      </div>
      {/* <code>
        <pre>{JSON.stringify({ player, gameCount, winner }, null, 2)}</pre>
      </code> */}
      <button className="bg-zinc-800 px-2 py-0 rounded" onClick={() => reset()}>
        reset
      </button>
    </div>
  );
};

export default Game;
