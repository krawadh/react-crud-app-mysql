import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Box,
  Button,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  styled,
  Typography,
} from "@mui/material";

const FormContainer = styled(Box)`
  width: 25%;
  margin: 2rem auto 0 auto;
  background-color: #f5ecec;
  padding: 10px 10px;
  & > div {
    & > div {
      margin-top: 20px;
    }
  }
`;

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("krawadh@gmail.com");
  const [password, setPassword] = useState("password");

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!email && !password) return;
    login({ email, password });
  }

  useEffect(
    function () {
      //console.log("here....", isAuthenticated);
      if (isAuthenticated) navigate("/users", { replace: true });
    },
    [isAuthenticated, navigate]
  );
  if (isAuthenticated) {
    return navigate("/users", { replace: true });
  }

  return (
    <FormContainer>
      <FormGroup>
        <Typography variant="h4">Login</Typography>

        <FormControl>
          <InputLabel>Email</InputLabel>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            value={email}
          ></Input>
        </FormControl>
        <FormControl>
          <InputLabel>Password</InputLabel>
          <Input
            //type="password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            value={password}
          ></Input>
        </FormControl>
        <FormControl>
          <Button variant="contained" onClick={handleSubmit}>
            Login
          </Button>
          {/* <Button variant="contained">Login</Button> */}
        </FormControl>
      </FormGroup>
    </FormContainer>
  );
}
