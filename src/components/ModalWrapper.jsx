// components/ModalContext.jsx (Modal)
import { Modal, Box } from "@mui/material";

return (
  <Modal open={isOpen} onClose={closeModal}>
    <Box sx={{ bgcolor: "background.paper", p: 4 }}>{modalContent}</Box>
  </Modal>
);
