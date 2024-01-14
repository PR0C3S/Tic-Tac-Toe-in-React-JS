import React from "react";
import { Dialog, DialogContent } from "@mui/material";

export default function Modal({ open, onClose, children }) {
  return (
    <Dialog
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      open={open}
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          onClose();
        }
      }}
    >
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
