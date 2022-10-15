import { ThemeContext } from "@emotion/react";
import {
  AppBar as MuiAppBar,
  styled,
  Theme,
  Toolbar as MuiToolBar,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/system";
import { useContext } from "react";
import { NavButton } from ".";
import Link from "next/link";

export const AppBar = styled(MuiAppBar)(({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.palette.custom.background,
}));

export const Toolbar = styled(MuiToolBar)(({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.palette.custom.background,
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: theme.palette.custom.text,
  // minHeight: "48px",
  marginLeft: "15px",
  marginRight: "15px",
  justifyContent: "space-between",
}));

export interface SiteNavProps {
  authed: boolean;
}

export const SiteNav = ({ authed }: SiteNavProps) => {
  return (
    <AppBar>
      <Toolbar>
        <Link href="/">
          <Typography variant="h4" component="div">
            Pollz
          </Typography>
        </Link>
        {!authed && (
          <Link href="/login">
            <NavButton variant="contained">Login</NavButton>
          </Link>
        )}
        {authed && (
          <Link href="/dashboard">
            <NavButton variant="contained">Dashboard</NavButton>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};
