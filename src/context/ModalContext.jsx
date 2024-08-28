// ModalContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import GlobalModal from "../components/GlobalModal";
import GlobalDialog from "../components/GlobalDialog";
import { getUsers } from "../services/api";
import { useAuth } from "./AuthContext";

const ModalContext = createContext();

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("ModalContext was use outside the ModalProvider.");
  }
  return context;
};
const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    content: null,
  });
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    content: null,
  });

  const [users, setUsers] = useState([]); // Add a new state to store users
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      // Fetch users from API at the first time
      console.log("hello in modal context");
      setIsLoading(true);
      const fetchUsers = async () => {
        try {
          const response = await getUsers();
          console.log(response);
          setUsers(response.data.usersRs);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      };
      fetchUsers();
    }
  }, [isAuthenticated]);

  const openModal = (content) => setModalState({ isOpen: true, content });
  const closeModal = () => setModalState({ isOpen: false, content: null });

  const openDialog = (content) => setDialogState({ isOpen: true, content });
  const closeDialog = () => setDialogState({ isOpen: false, content: null });

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
        openDialog,
        closeDialog,
        //addUserState,
        users,
        setUsers,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
      <GlobalModal
        isOpen={modalState.isOpen}
        content={modalState.content}
        onClose={closeModal}
      />
      <GlobalDialog
        isOpen={dialogState.isOpen}
        content={dialogState.content}
        onClose={closeDialog}
      />
    </ModalContext.Provider>
  );
};

export default ModalProvider;
