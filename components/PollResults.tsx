import { Box, List, ListItem, Paper, Typography } from "@mui/material";

export const Results = ({
  totalVotes,
  poll,
}: {
  totalVotes: number;
  poll: any;
}) => {
  return (
    <>
      <List sx={{ pb: 4 }}>
        {poll.options.map((o) => (
          <ListItem key={o.id}>
            <Paper
              elevation={3}
              sx={{
                display: "flex",
                color: "custom.text",
                backgroundColor: "custom.backgroundAlt",
                width: "100%",
                p: 4,
                justifyContent: "space-between",
              }}
            >
              <Typography>{o.name}</Typography>
              <Typography>
                {o.voteCount
                  ? `${((o.voteCount / totalVotes) * 100).toFixed(1)}%`
                  : `${0}%`}
              </Typography>
            </Paper>
          </ListItem>
        ))}
      </List>
      <Box display="flex" justifyContent="space-between">
        <Typography sx={{ mb: 4 }}>Total Votes: {totalVotes}</Typography>
        <Typography sx={{ mb: 4 }}>Thank you!</Typography>
      </Box>
    </>
  );
};

export default Results;
