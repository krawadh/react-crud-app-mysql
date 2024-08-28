// GlobalModal.js
import React from "react";
import { Modal, Box } from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const GlobalModal = ({ isOpen, content, onClose }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={modalStyle}>{content}</Box>
    </Modal>
  );
};

export default GlobalModal;
