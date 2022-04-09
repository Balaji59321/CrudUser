import { Box } from "@mui/system";
import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { baseURL } from "./route";
import { TextField, Button, Typography } from "@mui/material";
import { ImageListItem } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import faker from "@faker-js/faker";

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const value = location.state;
  const [val, setVal] = useState([
    {
      name: value.name,
      age: value.age,
      mail: value.mail,
      phone: value.phone,
      avatar: value.avatar,
    },
  ]);

  const [load, setLoad] = useState(null);

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
      newState[0][e.target.name] = e.target.value;
      return [...newState];
    });
  };

  const submitHandler = async () => {
    await axios.put(`${baseURL}crud/${value.id}`, {
      name: val[0]["name"],
      age: val[0]["age"],
      mail: val[0]["mail"],
      phone: val[0]["phone"],
      avatar: val[0]["avatar"],
    });
    navigate(-1);
  };

  const Backdrop = () => {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          backgroundColor: "rgba(1,1,1,0.5)",
          top: 0,
        }}
      ></Box>
    );
  };

  const Overlay = () => {
    return (
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          zIndex: 999,
          width: { xs: "90%", sm: "90%", md: "60%", lg: "40%" },
          borderRadius: 3,
        }}
        bgcolor={"white"}
        px={{ xs: 1, sm: 1, md: 5, lg: 14 }}
        py={3}
      >
        <h3>Update User</h3>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ flex: 0.4 }}>
            <label>Name</label>
          </Typography>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            name="name"
            style={{ flex: 0.6 }}
            value={val[0].name}
            onChange={changeHandler}
            sx={{ flex: 0.6 }}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ flex: 0.4 }}>
            <label>Age</label>
          </Typography>
          <TextField
            id="outlined-basic"
            label="Age"
            variant="outlined"
            name="age"
            style={{ flex: 0.6 }}
            value={val[0].age}
            sx={{ flex: 0.4 }}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ flex: 0.4 }}>
            <label>Mail</label>
          </Typography>
          <TextField
            id="outlined-basic"
            label="Mail"
            variant="outlined"
            name="mail"
            style={{ flex: 0.6 }}
            value={val[0].mail}
            sx={{ flex: 0.4 }}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ flex: 0.4 }}>
            <label>Phone</label>
          </Typography>
          <TextField
            id="outlined-basic"
            label="Phone"
            variant="outlined"
            name="phone"
            style={{ flex: 0.6 }}
            value={val[0].phone}
            sx={{ flex: 0.4 }}
          />
        </Box>
        <Button variant="contained" onClick={imageHandler}>
          Generate Image
        </Button>

        {load && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <strong>Preview Image</strong>
            <ImageListItem sx={{ width: 250, height: 250 }}>
              <img src={`${val[0]["avatar"]}`} alt="" />
            </ImageListItem>
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 5,
          }}
          mt={2}
        >
          <Button variant="contained" color="error" onClick={submitHandler}>
            Save
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate(-1)}
            color="error"
          >
            Cancel
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ position: "relative" }}>
      {ReactDOM.createPortal(<Backdrop />, document.getElementById("backdrop"))}
      {ReactDOM.createPortal(<Overlay />, document.getElementById("overlay"))}
    </Box>
  );
};

export default Edit;
