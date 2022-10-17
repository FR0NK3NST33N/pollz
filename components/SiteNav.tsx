import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

export interface SiteNavProps {
  authed: boolean;
}

export const SiteNav = ({ authed }: SiteNavProps) => {
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
        <Link href="/">
          <Typography variant="h4" component="div">
            Pollz
          </Typography>
        </Link>
        {!authed && (
          <Link href="/login">
            <Button variant="contained">Login</Button>
          </Link>
        )}
        {authed && (
          <Link href="/dashboard">
            <Button variant="contained">Dashboard</Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};
