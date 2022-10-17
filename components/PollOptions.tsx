import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

export const PollOptions = ({
  poll,
  setVoted,
  vote,
  voted,
  handleVote,
  handleVoteChange,
}) => {
  return (
    <>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={vote}
        onChange={handleVoteChange}
        sx={{ pb: 4 }}
      >
        {poll?.options &&
          poll?.options.map((o) => (
            <FormControlLabel
              key={o.id}
              value={o.id}
              control={<Radio />}
              label={o.name}
            />
          ))}
      </RadioGroup>
      <Box display="flex" justifyContent="space-between">
        <Button
          disabled={!vote || voted}
          variant="contained"
          onClick={handleVote}
        >
          Submit
        </Button>
        <Button color="secondary" onClick={() => setVoted(true)}>
          See Results
        </Button>
      </Box>
    </>
  );
};
