import { Button, Grid, Radio, TextField, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React from "react";
import { useNavigate } from "react-router-dom";
import { TURNS } from "./constant";
import { useForm } from "react-hook-form";
import { getColorSkin } from "./board";

export default function SelectPlayers() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      skinSelected: TURNS.X,
      player1Name: "player1",
      player2Name: "player2",
    },
  });

  const validateFields = () => {
    const player1 = watch("player1Name");
    const player2 = watch("player2Name");

    return player1 !== player2 || "Names must not be equals.";
  };

  function onSubmit(data, e) {
    e.preventDefault();
    const skinSelected2 = data.skinSelected === TURNS.X ? TURNS.O : TURNS.X;
    navigate("/play", {
      state: {
        skinSelected: data.skinSelected,
        player1: { name: data.player1Name, win: 0, skin: data.skinSelected },
        player2: { name: data.player2Name, win: 0, skin: skinSelected2 },
      },
    });
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container justifyContent={"center"} rowSpacing={2} mt={1}>
        <Grid item xs={12}>
          <Typography variant="h5" textAlign={"center"} fontWeight={"bold"}>
            Pick your side:
          </Typography>
        </Grid>

        <Grid item container xs={10} justifyContent={"space-around"}>
          <Grid item>
            <Typography
              variant="h1"
              color={() => getColorSkin(TURNS.X)}
              fontFamily={"Fredoka"}
              fontWeight={"bold"}
            >
              {TURNS.X}
            </Typography>
            <Radio
              name={TURNS.X}
              value={TURNS.X}
              checked={watch("skinSelected") === TURNS.X}
              {...register("skinSelected")}
            />
          </Grid>

          <Grid item>
            <Typography
              variant="h1"
              color={() => getColorSkin(TURNS.O)}
              fontFamily={"Fredoka"}
              fontWeight={"bold"}
            >
              {TURNS.O}
            </Typography>
            <Radio
              name={TURNS.O}
              value={TURNS.O}
              checked={watch("skinSelected") === TURNS.O}
              {...register("skinSelected")}
            />
          </Grid>
        </Grid>

        <Grid item xs={10}>
          <TextField
            label="Player1 Name"
            fullWidth
            {...register("player1Name", {
              required: {
                value: true,
                message: "This field must be not empty",
              },
            })}
            error={!!errors.player1Name}
            helperText={errors.player1Name?.message}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            label="Player2 Name"
            fullWidth
            {...register("player2Name", {
              required: {
                value: true,
                message: "This field must be not empty",
              },
              validate: validateFields,
            })}
            error={!!errors.player2Name}
            helperText={errors.player2Name?.message}
          />
        </Grid>
        <Grid item container xs={10} justifyContent={"right"} spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              startIcon={<ArrowBackIosNewIcon />}
              onClick={() => navigate("/")}
            >
              Go back
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              endIcon={<ArrowForwardIosIcon />}
              type="submit"
            >
              Continue
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
