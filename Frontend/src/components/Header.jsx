import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { PlusSquareOutlined } from "@ant-design/icons";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { auth } from "../firebase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function Header() {
	const [userName, setUserName] = useState("");
	const [image, setImage] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
    });
    console.log(
      "localStorage.getItem('profilePic')",
      localStorage.getItem("profilePic")
    );
    localStorage.getItem("profilePic") &&
      setImage(localStorage.getItem("profilePic"));
  }, []);

  const handlelogout = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        setUserName("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className={`container mx-auto px-10 pb-8 bg-white `}>
      <div className="inline-block w-full border-b border-blue-400 py-8 ">
        <div className=" float-left block ">
          <Link to="/">
            <span className=" cursor-pointer text-2xl font-bold  text-black md:text-4xl">
              AVIATO
            </span>
          </Link>
        </div>
        <div className="float-right block">
          {userName ? (
            <Stack direction="row" spacing={2}>
              <Link to="/newblog">
                <Button variant="outlined">
                  <PlusSquareOutlined /> New Blog
                </Button>
              </Link>
              <Avatar
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                {image ? (
                  <img src={image} alt="user" className="rounded-full" />
                ) : (
                  userName[0].toUpperCase()
                )}
              </Avatar>
            </Stack>
          ) : (
            <Stack spacing={2} direction="row">
              <Link to="/signUp">
                <Button variant="contained">Sign Up</Button>
              </Link>
              <Link to="/login">
                <Button variant="outlined">Login</Button>
              </Link>
            </Stack>
          )}
        </div>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Button variant="outlined" onClick={handlelogout}>
            Sign Out
          </Button>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default Header;
