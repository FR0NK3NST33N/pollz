import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import {
  Badge,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
const Table = dynamic(() => import("@mui/material/Table/Table"), {
  ssr: false,
});
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { AppNav, PollFormDialog } from "../../components";
import { useMyPolls } from "../../hooks/useMyPolls";

const Dashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { handleDelete, handleSave, loading, open, polls, setOpen } =
    useMyPolls();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <div>
      <Head>
        <title>Pollz</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <AppNav session={session} />
        <Container sx={{ mt: "125px" }}>
          <Box sx={{ width: "100%" }}>
            <Paper
              sx={{
                width: "100%",
                mb: 2,
                pb: 2,
                backgroundColor: "custom.backgroundAlt",
                color: "custom.text",
              }}
            >
              <Toolbar sx={{ justifyContent: "space-between" }}>
                <Typography variant="h5">My Pollz</Typography>
                <Button variant="outlined" onClick={() => setOpen(true)}>
                  New Poll
                </Button>
              </Toolbar>
              {loading && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    m: 4,
                  }}
                >
                  <CircularProgress />
                </Box>
              )}
              {!loading && (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableCell sx={{ color: "custom.text" }}>
                        Question
                      </TableCell>
                      <TableCell sx={{ color: "custom.text" }}>
                        Options
                      </TableCell>
                      <TableCell></TableCell>
                    </TableHead>
                    {polls.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell>{p.question}</TableCell>
                        <TableCell>
                          {p.options.map((o) => (
                            <Badge
                              key={o.id}
                              color="secondary"
                              badgeContent={o._count.votes || "0"}
                              max={999}
                              sx={{ mr: 3 }}
                            >
                              <Chip
                                sx={{
                                  backgroundColor: "custom.background",
                                  color: "custom.text",
                                }}
                                label={`${o.name}`}
                              />
                            </Badge>
                          ))}
                        </TableCell>
                        <TableCell sx={{ textAlign: "end" }}>
                          <Link href={`/poll/${p.id}`}>
                            <IconButton
                              aria-label="view"
                              sx={{ color: "custom.text" }}
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </Link>
                          <IconButton aria-label="delete" color="error">
                            <DeleteIcon onClick={() => handleDelete(p.id)} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </Table>
                </TableContainer>
              )}
            </Paper>
          </Box>
          {open && (
            <PollFormDialog
              open={open}
              handleCancel={() => setOpen(false)}
              handleSave={handleSave}
            />
          )}
        </Container>
      </main>
    </div>
  );
};

export default Dashboard;
