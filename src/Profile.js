import React, { useState } from "react";
import faker from "@faker-js/faker";
import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";
import { Avatar } from "@mui/material";
import { useContextProvider } from "./ContextProvider";

function Profile() {
  const [state, dispatch] = useContextProvider();

  const [val, setVal] = useState({
    name: state.profile.name,
    mail: state.profile.mail,
    phone: state.profile.phone,
  });

  const changeHandler = (e) => {
    setVal((prev) => {
      let newState = { ...prev };
      newState[e.target.name] = e.target.value;
      return { ...newState };
    });
  };

  const saveHandler = () => {
    dispatch({ type: "SAVE", value: val });
  };

  const cancelHandler = () => {
    setVal({
      name: state.profile.name,
      mail: state.profile.mail,
      phone: state.profile.phone,
    });
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          width: { xs: "90%", sm: "90%", md: "60%", lg: "40%" },
          gap: 2,
          margin: "auto",
        }}
        py={3}
        px={2}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <h3 style={{ flex: 0.3 }}>Your Name</h3>
          <TextField
            id="outlined-basic"
            label={state["profile"]["name"].length > 0 ? "" : "Name"}
            variant="outlined"
            name="name"
            sx={{ flex: 0.7 }}
            value={val["name"]}
            onChange={changeHandler}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <h3 style={{ flex: 0.3 }}>Your Mail</h3>
          <TextField
            id="outlined-basic"
            label={state["profile"]["mail"].length > 0 ? "" : "Mail"}
            variant="outlined"
            name="mail"
            sx={{ flex: 0.7 }}
            value={val["mail"]}
            onChange={changeHandler}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <h3 style={{ flex: 0.3 }}>Your Phone</h3>
          <TextField
            id="outlined-basic"
            label={state["profile"]["phone"].length > 0 ? "" : "Phone"}
            variant="outlined"
            name="phone"
            sx={{ flex: 0.7 }}
            value={val["phone"]}
            onChange={changeHandler}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: 3, justifyContent: "center" }}>
        <Button variant="contained" color="error" onClick={saveHandler}>
          Save
        </Button>
        <Button variant="contained" color="error" onClick={cancelHandler}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
}

export default Profile;
