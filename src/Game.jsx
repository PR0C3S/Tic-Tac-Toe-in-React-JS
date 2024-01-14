import {
  Button,
  Chip,
  Grid,
  Table,
  TableBody,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import confetti from "canvas-confetti";
import Modal from "./Modal";
import { EMPTYBOARD } from "./constant";
import { checkEndGame, checkWinner, getColorSkin } from "./board";
import { useLocation, useNavigate } from "react-router-dom";
import Square from "./Square";

export default function Game() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [board, setBoard] = useState(EMPTYBOARD);
  const [player1, setPlayer1] = useState(state?.player1);
  const [player2, setPlayer2] = useState(state?.player2);
  const [turn, setTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [showWinner, setShowWinner] = useState(false);

  useEffect(() => {
    // Navigate to another page if state is null
    if (state === null) navigate("/select-players");
  }, [navigate, state]);

  const handleCloseWinner = () => setShowWinner(false);

  function handleReset() {
    setBoard(EMPTYBOARD);
    setPlayer1((prev) => ({ ...prev, win: 0 }));
    setPlayer2((prev) => ({ ...prev, win: 0 }));
    setWinner(null);
    if (showWinner) setShowWinner(false);
  }

  function handlePlayAgain() {
    setBoard(EMPTYBOARD);
    setWinner(null);
    if (showWinner) setShowWinner(false);
  }

  function handleUpdateBoard(index) {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn === true ? player1.skin : player2.skin;

    setBoard(newBoard);
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();

      let color = getColorSkin(newWinner);

      if (newWinner === player1.skin) {
        setPlayer1((prev) => ({ ...prev, win: prev.win + 1 }));
        setWinner({ ...player1, color });
      } else {
        setPlayer2((prev) => ({ ...prev, win: prev.win + 1 }));
        setWinner({ ...player2, color });
      }
      setShowWinner(true);
      return;
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
      setShowWinner(true);
    }

    setTurn((prev) => !prev);
  }

  function handleGoHome() {
    navigate("/");
  }

  return (
    <Grid container justifyContent={"center"} rowSpacing={1} spacing={2} mt={1}>
      <Grid
        item
        container
        spacing={1}
        xs={12}
        justifyContent={"center"}
        alignItems={"center"}
        mb={1}
      >
        <Grid item>
          <Typography textAlign={"right"} variant={"h5"}>
            {player1?.name}
          </Typography>
        </Grid>
        <Grid item>
          <Chip
            label={
              <Typography variant="h6">
                {`${player1?.win} - ${player2?.win}`}
              </Typography>
            }
          />
        </Grid>
        <Grid item>
          <Typography textAlign={"left"} variant={"h5"}>
            {player2?.name}
          </Typography>
        </Grid>
      </Grid>

      <Grid item>
        <Chip
          variant={"outlined"}
          color={"primary"}
          label={
            <Typography variant="h6">
              {`Turn: ${turn ? player1.name : player2.name}`}
            </Typography>
          }
        />
      </Grid>

      <Grid item container spacing={1} xs={12} mt={1}>
        <Table>
          <TableBody>
            <TableRow>
              <Square text={board.at(0)} onClick={() => handleUpdateBoard(0)} />
              <Square text={board.at(1)} onClick={() => handleUpdateBoard(1)} />
              <Square text={board.at(2)} onClick={() => handleUpdateBoard(2)} />
            </TableRow>
            <TableRow>
              <Square text={board.at(3)} onClick={() => handleUpdateBoard(3)} />
              <Square text={board.at(4)} onClick={() => handleUpdateBoard(4)} />
              <Square text={board.at(5)} onClick={() => handleUpdateBoard(5)} />
            </TableRow>
            <TableRow>
              <Square text={board.at(6)} onClick={() => handleUpdateBoard(6)} />
              <Square text={board.at(7)} onClick={() => handleUpdateBoard(7)} />
              <Square text={board.at(8)} onClick={() => handleUpdateBoard(8)} />
            </TableRow>
          </TableBody>
        </Table>
      </Grid>

      <Grid item container justifyContent={"center"} spacing={1}>
        <Grid item>
          <Button
            variant={"contained"}
            startIcon={<RestartAltIcon />}
            onClick={handleReset}
          >
            RESET GAME
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant={"contained"}
            startIcon={<MenuIcon />}
            onClick={handleGoHome}
          >
            Go to menu
          </Button>
        </Grid>
      </Grid>

      <Modal open={showWinner} onClose={handleCloseWinner}>
        <Grid container spacing={2} justifyContent={"center"}>
          <Grid item xs={12}>
            <Typography variant="h3" textAlign={"center"}>
              {winner === false ? "Draw" : `${winner?.name} is the winner`}
            </Typography>
          </Grid>
          {winner !== false && (
            <Grid item>
              <Typography
                variant="h1"
                fontFamily={"Fredoka"}
                fontWeight={"bold"}
                border={1}
                color={winner?.color}
              >
                {winner?.skin}
              </Typography>
            </Grid>
          )}
          <Grid item container justifyContent={"space-evenly"} spacing={1}>
            <Grid item xs={4}>
              <Button
                variant={"outlined"}
                onClick={handlePlayAgain}
                fullWidth
                startIcon={<PlayArrowIcon />}
              >
                Play again
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant={"outlined"}
                onClick={handleReset}
                fullWidth
                startIcon={<RestartAltIcon />}
              >
                Reset game
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant={"outlined"}
                onClick={handleGoHome}
                fullWidth
                startIcon={<MenuIcon />}
              >
                Go to menu
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    </Grid>
  );
}
