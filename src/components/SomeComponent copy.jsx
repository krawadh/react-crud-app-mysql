import React from "react";
import { useModal } from "../context/ModalContext";
import AddUser from "./AddUser";

const SomeComponent = () => {
  const { openModal, openDialog } = useModal();

  const handleOpenModal = () => {
    openModal(<AddUser />);
  };

  const handleOpenDialog = () => {
    openDialog({
      title: "Dialog Title",
      body: <div>Dialog Content Here</div>,
    });
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Open Modal</button>
      <button onClick={handleOpenDialog}>Open Dialog</button>
    </div>
  );
};

export default SomeComponent;
