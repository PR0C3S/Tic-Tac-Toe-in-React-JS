import { Grid } from "@mui/material";
import Game from "./Game";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import SelectPlayers from "./SelectPlayers";
import NoMatch from "./NoMatch";

export default function App() {
  return (
    <Grid container justifyContent={"center"} alignItems={"center"}>
      <Grid item xs={10} mt={5}>
        <img
          src="/logo2.png"
          alt="logo"
          style={{
            maxWidth: "100%",
            height: "auto",
            display: "block",
            margin: "0 auto",
          }}
        />
      </Grid>

      <Grid item xs={10}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/select-players" element={<SelectPlayers />} />
            <Route path="/play" element={<Game />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </BrowserRouter>
      </Grid>
    </Grid>
  );
}
/*
 <Typography
          variant="h2"
          color={"primary"}
          fontFamily={"Fredoka"}
          fontWeight={"bold"}
          textAlign={"center"}
        >
          TIC TAC TOE
        </Typography>
*/
