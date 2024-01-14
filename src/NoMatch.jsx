import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function NoMatch() {
  const navigate = useNavigate();
  return (
    <Grid container justifyContent={"center"} alignItems={"center"} mt={5}>
      <Grid item xs={12}>
        <Typography
          variant="h1"
          color={"primary"}
          textAlign={"center"}
          fontWeight={"bold"}
        >
          404
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="h6"
          color={"primary"}
          textAlign={"center"}
          fontWeight={"bold"}
        >
          The page you’re looking for doesn’t exist.
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
          fullWidth
        >
          Back Home
        </Button>
      </Grid>
    </Grid>
  );
}
