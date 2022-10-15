import { ThemeContext } from "@emotion/react";
import {
  AppBar as MuiAppBar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  MenuList as MuiMenuList,
  styled,
  Theme,
  Toolbar as MuiToolBar,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/system";
import { useContext, useState } from "react";
import { AppBar, NavButton, Toolbar } from ".";
import Link from "next/link";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

const MenuList = styled(MuiMenuList)(({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.palette.custom.background,
  color: theme.palette.custom.text,
  padding: "0 !important",
  border: `1px solid ${theme.palette.custom.text}`,
  borderRadius: "4px",
}));

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
    <AppBar>
      <Toolbar>
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
          <MenuList>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
