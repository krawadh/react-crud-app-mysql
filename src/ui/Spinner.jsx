import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";

export default function Spinner() {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={true}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    </Backdrop>
  );
}
// async function login(email, password) {
//   try {
//     const response = await loginApi();
//     dispatch({ type: "login", payload: response.data.user });
//   } catch (error) {
//     console.log(error);
//   }
// }
