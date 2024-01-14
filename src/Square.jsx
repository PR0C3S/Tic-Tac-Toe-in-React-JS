import { TableCell, Typography } from "@mui/material";
import React from "react";
import { getColorSkin } from "./board";

export default function Square({ text, onClick }) {
  return (
    <TableCell onClick={onClick} width={100} height={100} sx={{ border: 1 }}>
      <Typography
        variant="h1"
        color={() => getColorSkin(text)}
        fontFamily={"Fredoka"}
        fontWeight={"bold"}
        textAlign={"center"}
      >
        {text}
      </Typography>
    </TableCell>
  );
}
