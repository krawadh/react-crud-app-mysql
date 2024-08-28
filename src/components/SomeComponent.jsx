import React from "react";
import { useModal } from "./ModalContext";
import { Button } from "@mui/material";

const SomeComponent = () => {
  const { openModal, openDialog } = useModal();

  return (
    <div>
      <Button onClick={() => openModal(<div>Modal Content</div>)}>
        Open Modal
      </Button>
      <Button onClick={() => openDialog(<div>Dialog Content</div>)}>
        Open Dialog
      </Button>
    </div>
  );
};

export default SomeComponent;
