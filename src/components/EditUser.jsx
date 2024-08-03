import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

import { getUserByid, editUser } from "../services/api";

const FormContainer = styled(Box)`
  width: 50%;
  margin: 10px auto 0 auto;
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

const EditUser = () => {
  const [user, setUser] = useState(initialValue);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getUserDetail();
  }, []);

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const getUserDetail = async () => {
    const response = await getUserByid(id);
    const userDetail = response.data.userRs;
    setUser({
      ...user,
      name: userDetail.name,
      username: userDetail.username,
      email: userDetail.email,
      phone: userDetail.phone,
    });
  };

  const handleEditUserDetail = async () => {
    await editUser(user, id);
    navigate("/");
  };

  return (
    <FormContainer>
      <FormGroup>
        <Typography variant="h4">Edit User</Typography>
        <FormControl>
          <InputLabel>Name</InputLabel>
          <Input onChange={onValueChange} name="name" value={user.name}></Input>
        </FormControl>
        <FormControl>
          <InputLabel>UserName</InputLabel>
          <Input
            onChange={onValueChange}
            name="username"
            value={user.username}
          ></Input>
        </FormControl>
        <FormControl>
          <InputLabel>Email</InputLabel>
          <Input
            onChange={onValueChange}
            name="email"
            value={user.email}
          ></Input>
        </FormControl>
        <FormControl>
          <InputLabel>Phone</InputLabel>
          <Input
            onChange={onValueChange}
            name="phone"
            value={user.phone}
          ></Input>
        </FormControl>
        <FormControl>
          <Button variant="contained" onClick={handleEditUserDetail}>
            Edit User
          </Button>
        </FormControl>
      </FormGroup>
    </FormContainer>
  );
};

export default EditUser;
