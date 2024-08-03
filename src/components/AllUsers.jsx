import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers, deleteUser } from "../services/api";

const TableConatiner = styled(Table)`
  width: 90%;
  margin: 50px auto 0 auto;
`;
const THead = styled(TableHead)`
  & > tr {
    background: #000;
    & > th {
      color: #fff;
      font-size: 18px;
    }
  }
`;
const TBody = styled(TableBody)`
  & > tr {
    & > td {
      font-size: 15px;
      margin 5px auto 0 auto;
    }
  }
`;

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsersDetail();
  }, []);

  const getUsersDetail = async () => {
    const response = await getUsers();
    setUsers(response.data.usersRs);
  };

  const deleteUserData = async (id) => {
    await deleteUser(id);
    getUsersDetail();
  };
  return (
    <TableConatiner>
      <THead>
        <TableRow>
          <TableCell>Id</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>UserName</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </THead>
      <TBody>
        {users.map((row) => (
          <TableRow key={row.id}>
            <TableCell component="th" scope="row">
              {row._id}
            </TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.username}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.phone}</TableCell>
            <TableCell>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginRight: 10 }}
                component={Link}
                to={`/edit/${row.id}`}
              >
                Update
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  deleteUserData(row.id);
                }}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TBody>
    </TableConatiner>
  );
};
export default AllUsers;
