import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  Typography,
  styled,
} from "@mui/material";
import { addUser } from "../services/api"; // getUsers
import { useModal } from "../context/ModalContext";
import Spinner from "../ui/Spinner";

const FormContainer = styled(Box)`
  width: 50%;
  margin: 5px auto 0 auto;
  & > div {
    & > div {
      margin-top: 20px;
    }
  }
`;

const initialValue = {
  fname: "",
  lname: "",
  email: "",
  phone: "",
};

const AddUser = () => {
  const [user, setUser] = useState(initialValue);
  const { users, setUsers, closeModal, isLoading, setIsLoading } = useModal();
  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleAddUserDetail = async () => {
    try {
      setIsLoading(true);
      const newUser = await addUser(user);

      const ussr = { ...user, id: newUser.data.results.insertId };
      setUsers([...users, ussr]);
      setIsLoading(false);
      closeModal(); // Close the modal
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };
  if (isLoading) return <Spinner />;
  return (
    <FormContainer>
      <FormGroup>
        <Typography variant="h4">Add User</Typography>
        <FormControl>
          <InputLabel>First Name</InputLabel>
          <Input onChange={onValueChange} name="fname"></Input>
        </FormControl>
        <FormControl>
          <InputLabel>Last Name</InputLabel>
          <Input onChange={onValueChange} name="lname"></Input>
        </FormControl>
        <FormControl>
          <InputLabel>Email</InputLabel>
          <Input onChange={onValueChange} name="email"></Input>
        </FormControl>
        <FormControl>
          <InputLabel>Phone</InputLabel>
          <Input onChange={onValueChange} name="phone"></Input>
        </FormControl>
        <FormControl>
          <Button
            onClick={handleAddUserDetail}
            variant="contained"
            disabled={isLoading}
          >
            {isLoading ? "Submitting...." : "Add User"}
          </Button>
        </FormControl>
      </FormGroup>
    </FormContainer>
  );
};

export default AddUser;
