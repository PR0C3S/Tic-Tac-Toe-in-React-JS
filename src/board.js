import { TURNS, WINNER_COMBOS } from "./constant";

export function checkWinner(newBoard) {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      newBoard[a] &&
      newBoard[a] === newBoard[b] &&
      newBoard[b] === newBoard[c]
    ) {
      return newBoard[a];
    }
  }
  return null;
}

export function checkEndGame(newBoard) {
  return newBoard.every((square) => square !== null);
}

export function getColorSkin(text) {
  let color;
  if (text === TURNS.X) {
    color = "skinRed";
  } else {
    color = "skinBlue";
  }
  return color;
}
