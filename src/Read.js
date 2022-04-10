import React from "react";
import axios from "axios";
import { baseURL } from "./route";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";

const Read = () => {
  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState(true);
  const [edit, showEdit] = useState(false);
  const [obj, setObj] = useState([]);
  useEffect(() => {
    let resp = async () => {
      let response = await axios.get(baseURL + "crud");
      setLoader(false);
      return setUsers(response["data"]);
    };

    resp().catch("something went wrong");
  }, []);

  const DeleteHandler = (id) => {
    axios.delete(`${baseURL}crud/${id}`);
    setUsers((prev) => prev.filter((ele) => ele.id !== id));
  };

  return (
    <div className="App">
      <h2>Users List</h2>
      {loader ? (
        <CircularProgress
          color="secondary"
          thickness={4}
          size={80}
          // size={{ sx: 25, md: 35, lg: 100 }}
        />
      ) : (
        <Grid
          container
          m={"auto"}
          rowGap={3}
          columnGap={2}
          sx={{ justifyContent: "center" }}
        >
          {users.map((ele) => {
            return (
              <Grid
                item
                bgcolor={"#d2a3a3"}
                sx={{
                  flexBasis: "400px",
                  borderRadius: "10px",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                py={2}
                mx={1}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: 3,
                    flexDirection: { xs: "column", sm: "row", md: "row" },
                  }}
                  px={2}
                >
                  <img src={ele.avatar} alt="user profile" className="img" />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      textAlign: "left",
                      overflowX: "auto",
                    }}
                  >
                    <Typography>
                      <strong>Name:</strong> {ele.name}
                    </Typography>
                    <Typography>
                      <strong>Age:</strong> {ele.age}
                    </Typography>
                    <Typography>
                      <strong>E-Mail:</strong> {ele.mail}
                    </Typography>
                    <Typography>
                      <strong>Phone:</strong> {ele.phone}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 5,
                  }}
                  mt={3}
                >
                  <Link
                    to={`/update/${ele.id}`}
                    style={{ textDecoration: "none", color: "white" }}
                    state={ele}
                  >
                    <Button variant="contained">Edit</Button>
                  </Link>
                  <Button
                    variant="contained"
                    onClick={() => DeleteHandler(ele.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      )}
    </div>
  );
};

export default Read;
