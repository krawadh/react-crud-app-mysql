import React from "react";
import { useModal } from "../context/ModalContext";
import { useNavigate } from "react-router-dom";
import AddUser from "./AddUser";

const SomeComponent = () => {
  const { openModal, closeModal } = useModal();
  const navigate = useNavigate();

  const handleOpenAddUserModal = () => {
    openModal(<AddUser onClose={handleCloseAddUserModal} />);
  };

  const handleCloseAddUserModal = () => {
    closeModal();
    navigate("/"); // Navigate to the desired route after closing the modal
  };

  return (
    <div>
      <button onClick={handleOpenAddUserModal}>Add User</button>
    </div>
  );
};

export default SomeComponent;
