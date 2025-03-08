import { ChangeEvent, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

type PositionProps = {
  positionCallback: (position: string) => void;
  positions: string[] | undefined;
};

export function Position({ positionCallback, positions }: PositionProps) {
  const [position, setPosition] = useState<string>("");

  function handleChange(value: string) {
    setPosition(value);
    positionCallback(value);
  }

  const positionPicker = (
    <FormControl
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "start",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <FormLabel>Job Title</FormLabel>
        <RadioGroup
          defaultValue={position}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange((e.target as HTMLInputElement).value)
          }
        >
          {positions?.map((entry, index) => (
            <FormControlLabel
              key={index}
              value={entry}
              control={<Radio />}
              label={entry}
            />
          ))}
          <FormControlLabel
            key="none"
            value=""
            control={<Radio />}
            label="None"
          />
        </RadioGroup>
      </div>

      <Tooltip title="Erscheint unter deinem Namen" placement="bottom">
        <IconButton>
          <InfoIcon />
        </IconButton>
      </Tooltip>
    </FormControl>
  );

  return <>{positions ? positionPicker : null}</>;
}
