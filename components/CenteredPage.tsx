import { Box, styled, Theme } from "@mui/material";

export const CenteredPage = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: "flex",
  flexDirection: "row",
  minWidth: "100vw",
  minHeight: "calc(100vh - 68px)",
  marginTop: "0px",
  justifyContent: "center",
  alignItems: "center",
  //gap: "48px",
}));
