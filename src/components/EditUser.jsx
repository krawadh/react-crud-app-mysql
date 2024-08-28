import { useState, useEffect } from "react";
//import { useParams } from "react-router-dom"; //useNavigate,
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

import { editUser } from "../services/api";
import { useModal } from "../context/ModalContext";
import Spinner from "../ui/Spinner";

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
  fname: "",
  lname: "",
  email: "",
  phone: "",
};

const EditUser = (props) => {
  const { users, setUsers, closeModal, isLoading, setIsLoading } = useModal();
  const [user, setUser] = useState(initialValue);
  //const navigate = useNavigate();
  //const { id } = useParams();
  const id = props.id;

  useEffect(() => {
    getUserDetail();
  }, []);

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const getUserDetail = async () => {
    try {
      // const response = await getUserByid(id);
      // console.log(response.data.userRs);
      // const userDetail = response.data.userRs;
      const userDetail = users.filter((e) => e.id === Number(id));
      setUser({
        ...user,
        fname: userDetail[0].fname,
        lname: userDetail[0].lname,
        email: userDetail[0].email,
        phone: userDetail[0].phone,
      });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  const handleEditUserDetail = async () => {
    try {
      setIsLoading(true);
      await editUser(user, id);

      const updatedUsers = users.map((e) =>
        e.id === Number(id)
          ? {
              ...e,
              fname: user.fname,
              lname: user.lname,
              email: user.email,
              phone: user.phone,
            }
          : e
      );

      setUsers(updatedUsers);
      //setIsLoading(false);
      closeModal(); // Close the modal
      //navigate("/users", { replace: true });
    } catch (error) {}
  };
  if (isLoading) return <Spinner />;
  return (
    <FormContainer>
      <FormGroup>
        <Typography variant="h4">Edit User</Typography>
        <FormControl>
          <InputLabel>First Name</InputLabel>
          <Input
            onChange={onValueChange}
            name="fname"
            value={user.fname}
          ></Input>
        </FormControl>
        <FormControl>
          <InputLabel>Last Name</InputLabel>
          <Input
            onChange={onValueChange}
            name="lname"
            value={user.lname}
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
