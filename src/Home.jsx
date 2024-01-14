import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

export default function Home() {
  const [showHowToPlay, setShowToPlay] = useState(false);
  const handleCloseHowToPlay = () => setShowToPlay(false);
  const navigate = useNavigate();
  return (
    <Grid container rowSpacing={5} mt={5} justifyContent={"center"}>
      <Grid item xs={10}>
        <Button
          variant={"contained"}
          onClick={() => navigate("/select-players")}
          fullWidth
        >
          PLAY GAME
        </Button>
      </Grid>
      <Grid item xs={10}>
        <Button
          variant={"contained"}
          fullWidth
          onClick={() => setShowToPlay(true)}
        >
          HOW TO PLAY
        </Button>
      </Grid>
      <Modal open={showHowToPlay} onClose={handleCloseHowToPlay}>
        <Grid item container spacing={2} justifyContent={"center"}>
          <Grid item xs={10}>
            <Typography variant="h2" textAlign={"center"}>
              How to play
            </Typography>
          </Grid>
          <Grid item container spacing={1} xs={10}>
            <Grid item xs={12}>
              <Typography variant={"body1"} component="div">
                Tic Tac Toe is a simple and classic two-player game that is
                played on a 3x3 grid. The goal is to get three of your symbols
                (either "X" or "O") in a row, either horizontally, vertically,
                or diagonally.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant={"body1"}
                fontWeight={"fontWeightMedium"}
                component="div"
              >
                Here's a step-by-step guide on how to play Tic Tac Toe:
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant={"body1"} component="div">
                <Box fontWeight={"fontWeightMedium"} display="inline">
                  1. Setup:{" "}
                </Box>
                Draw a 3x3 grid. Players decide who is "X" and who is "O"
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant={"body1"} component="div">
                <Box fontWeight={"fontWeightMedium"} display="inline">
                  2. Taking Turns:{" "}
                </Box>
                Players take turns placing their symbol ("X" or "O") in an empty
                spot on the grid.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant={"body1"} component="div">
                <Box fontWeight={"fontWeightMedium"} display="inline">
                  3. Winning:{" "}
                </Box>
                The first player to get three of their symbols in a row
                (horizontally, vertically, or diagonally) wins.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant={"body1"} component="div">
                <Box fontWeight={"fontWeightMedium"} display="inline">
                  4. Ending the Game:{" "}
                </Box>
                If the entire grid is filled, and no one has three in a row, the
                game is a draw.
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Button variant={"outlined"} onClick={handleCloseHowToPlay}>
              Cerrar
            </Button>
          </Grid>
        </Grid>
      </Modal>
    </Grid>
  );
}
