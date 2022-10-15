import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import {
  Divider,
  IconButton,
  InputBase,
  InputLabel,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export interface PollFormDialogProps {
  open: boolean;
  handleCancel?: () => void;
  handleSave?: (question: string, options: string[]) => Promise<void>;
}

export default function PollFormDialog({
  open,
  handleCancel,
  handleSave,
}: PollFormDialogProps) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const handleRemoveOption = (index: number) => {
    let _options = [...options];
    console.log(index);
    console.log(_options);
    _options.splice(index, 1);
    setOptions(_options);
  };

  const handleOptionChange = (e: any, index: number) => {
    let _options = [...options];
    _options[index] = e.target.value;
    setOptions(_options);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleCancel} sx={{ color: "custom.text" }}>
        <DialogTitle
          sx={{ backgroundColor: "custom.backgroundAlt", color: "custom.text" }}
        >
          New Poll
        </DialogTitle>
        <DialogContent
          sx={{ backgroundColor: "custom.backgroundAlt", color: "custom.text" }}
        >
          <TextField
            autoFocus
            margin="dense"
            id="question"
            label="Question"
            type="text"
            fullWidth
            variant="filled"
            color="secondary"
            InputLabelProps={{
              sx: {
                color: "custom.text",
              },
            }}
            InputProps={{
              sx: {
                color: "custom.text",
                mb: 2,
              },
            }}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          {/* <Divider
            orientation="horizontal"
            sx={{ width: "100%", backgroundColor: "custom.text", my: 2 }}
          /> */}
          {options.map((option: string, index: number) => (
            <Paper
              key={`option-${index}`}
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
                backgroundColor: "custom.backgroundAlt",
                color: "custom.text",
                mb: 2,
                height: 48,
              }}
            >
              <InputLabel sx={{ color: "custom.text" }}>{`Option ${
                index + 1
              }: `}</InputLabel>
              <InputBase
                sx={{ ml: 1, flex: 1, color: "custom.text" }}
                placeholder={`Option ${index + 1}`}
                inputProps={{ "aria-label": `Option ${index}` }}
                value={options[index]}
                onChange={(e) => handleOptionChange(e, index)}
              />
              {index > 1 && (
                <>
                  <Divider
                    sx={{ height: 28, m: 0.5, backgroundColor: "custom.text" }}
                    orientation="vertical"
                  />
                  <IconButton
                    color="error"
                    sx={{ p: "10px" }}
                    aria-label="directions"
                    onClick={() => handleRemoveOption(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </Paper>
          ))}
          <Button
            variant="outlined"
            fullWidth
            disabled={options.length === 4}
            onClick={() => setOptions([...options, ""])}
          >
            Add Option
          </Button>
        </DialogContent>
        <DialogActions
          sx={{ backgroundColor: "custom.backgroundAlt", color: "custom.text" }}
        >
          <Button color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              handleSave ? handleSave(question, options) : undefined
            }
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
