import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
  ImageListItem,
} from "@mui/material";
import { useState } from "react";
import { Box, height, width } from "@mui/system";
import axios from "axios";
import { baseURL } from "./route";
import CircularProgress from "@mui/material/CircularProgress";
import { faker } from "@faker-js/faker";
import { useNavigate } from "react-router";

const Create = () => {
  const [val, setVal] = useState([
    { name: "", age: "", mail: "", phone: "", avatar: "" },
  ]);
  const [load, setLoad] = useState(null);
  const navigate = useNavigate();

  const imageHandler = () => {
    setLoad(false);
    setVal((prev) => {
      let newState = [...prev];
      newState[0]["avatar"] = faker.image.image(640, 480, true);
      return [...newState];
    });
    setLoad(true);
  };

  const changeHandler = (e) => {
    setVal((prev) => {
      let newState = [...prev];
      newState[0][[e.target.name]] = e.target.value;
      return [...newState];
    });
  };

  const submitHandler = async () => {
    await axios.post(`${baseURL}crud`, val[0]);
    navigate(-1);
  };

  return (
    <FormControl
      sx={{
        display: "flex",
        gap: 3,
        alignItems: "center",
        backgroundColor: "#dfd2d2",
        width: { sm: "100%", md: "50%", lg: "37%" },
        margin: "auto",
        padding: { xs: 2, sm: 3, md: 5, lg: 10 },
        // marginTop: "100px",
        borderRadius: 5,
      }}
    >
      <h1>Create User</h1>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <label style={{ flex: 0.4 }}>Enter Your Name</label>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          name="name"
          style={{ flex: 0.6 }}
          onChange={changeHandler}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <label style={{ flex: 0.4 }}>Enter Your Age</label>
        <TextField
          id="outlined-basic"
          label="Age"
          variant="outlined"
          name="age"
          style={{ flex: 0.6 }}
          onChange={changeHandler}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <label style={{ flex: 0.4 }}>Enter Your Mail</label>
        <TextField
          id="outlined-basic"
          label="E-mail"
          variant="outlined"
          name="mail"
          style={{ flex: 0.6 }}
          onChange={changeHandler}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <label style={{ flex: 0.4 }}>Enter Your Phone Number</label>
        <TextField
          id="outlined-basic"
          label="Phone Number"
          variant="outlined"
          name="phone"
          style={{ flex: 0.6 }}
          onChange={changeHandler}
        />
      </Box>
      <Button variant="contained" onClick={imageHandler}>
        Generate Image
      </Button>

      {load && (
        <>
          <p>Preview Image (Wait for 2-3 seconds)</p>
          <ImageListItem sx={{ width: 250, height: 250 }}>
            <img src={`${val[0]["avatar"]}`} alt="" />
          </ImageListItem>
        </>
      )}
      <Button
        type="submit"
        variant="contained"
        onClick={submitHandler}
        sx={{ width: "100%" }}
      >
        Submit
      </Button>
      <Button
        variant="contained"
        onClick={() => navigate(-1)}
        sx={{ width: "100%" }}
      >
        Cancel
      </Button>
    </FormControl>
  );
};

export default Create;
