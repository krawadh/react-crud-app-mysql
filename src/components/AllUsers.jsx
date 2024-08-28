import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";

//import { useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteUser } from "../services/api"; //getUsers,
import { useModal } from "../context/ModalContext";
import EditUser from "./EditUser";
import Spinner from "../ui/Spinner";

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
  const { users, setUsers, openModal, isLoading, setIsLoading } = useModal();
  const deleteUserData = async (id) => {
    try {
      setIsLoading(true);
      const deletedRs = await deleteUser(id);
      if (deletedRs && deletedRs.status === 200) {
        const usersAfterDeleted = users.filter((e) => e.id !== Number(id));
        setUsers(usersAfterDeleted);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      throw new Error(error);
    }
  };

  const handleOpenUpdateUserModal = (id) => {
    setIsLoading(true);
    openModal(<EditUser id={id} />);
    setIsLoading(false);
  };
  if (isLoading) return <Spinner />;
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
        {users.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell component="th" scope="row">
              {++index /* {row.id} */}
            </TableCell>
            <TableCell>{row.fname}</TableCell>
            <TableCell>{row.lname}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.phone}</TableCell>
            <TableCell>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginRight: 10 }}
                onClick={() => handleOpenUpdateUserModal(row.id)}
                //component={Link}
                //to={`/edit/${row.id}`}
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
