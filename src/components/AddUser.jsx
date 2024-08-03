//import styled from "@emotion/styled";
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
import { useState } from "react";

import { addUser } from "../services/api";
import { useNavigate } from "react-router-dom";

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
  name: "",
  username: "",
  email: "",
  phone: "",
};
const AddUser = () => {
  const [user, setUser] = useState(initialValue);
  const navigate = useNavigate();

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleAddUserDetail = async () => {
    await addUser(user);
    navigate("/");
  };

  return (
    <FormContainer>
      <FormGroup>
        <Typography variant="h4">Add User</Typography>
        <FormControl>
          <InputLabel>Name</InputLabel>
          <Input onChange={onValueChange} name="name"></Input>
        </FormControl>
        <FormControl>
          <InputLabel>UserName</InputLabel>
          <Input onChange={onValueChange} name="username"></Input>
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
          <Button variant="contained" onClick={handleAddUserDetail}>
            Add
          </Button>
        </FormControl>
      </FormGroup>
    </FormContainer>
  );
};
export default AddUser;
