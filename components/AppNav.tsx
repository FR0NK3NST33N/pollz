import {
  AppBar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

export interface AppNavProps {
  session: Session | null;
}

export const AppNav = ({ session }: AppNavProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    signOut({ redirect: false });
  };
  return (
    <AppBar sx={{ backgroundColor: "custom.background" }}>
      <Toolbar
        sx={{
          backgroundColor: "custom.background",
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
          borderBottomColor: "custom.texu",
          marginLeft: "15px",
          marginRight: "15px",
          justifyContent: "space-between",
        }}
      >
        <Link href="/dashboard">
          <Typography variant="h4" component="div">
            Pollz
          </Typography>
        </Link>
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "user-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            alt={session?.user?.name ?? "User"}
            src={
              session?.user?.image ??
              "http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon"
            }
            sx={{ width: 42, height: 42 }}
          />
        </IconButton>
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          PaperProps={{
            elevation: 0,
            sx: {
              mt: 3,
            },
          }}
          MenuListProps={{
            "aria-labelledby": "user-button",
            sx: {
              paddingTop: 0,
              paddingBottom: 0,
            },
          }}
        >
          <MenuList
            sx={{
              backgroundColor: "custom.background",
              color: "custom.text",
              padding: "0 !important",
              border: `1px solid custom.text`,
              borderRadius: "4px",
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
