import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

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
    <ToggleButtonGroup
      color="primary"
      value={position}
      exclusive
      onChange={(e: React.MouseEvent<Element, MouseEvent>) =>
        handleChange((e.target as HTMLInputElement).value)
      }
    >
      {positions?.map((entry, index) => (
        <ToggleButton key={index} value={entry}>
          {entry}
        </ToggleButton>
      ))}
      <ToggleButton value={""}>
        <CloseIcon />
      </ToggleButton>

      <div style={{ display: "flex", alignItems: "center" }}>
        <Tooltip title="Erscheint unter deinem Namen" placement="top">
          <IconButton>
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </div>
    </ToggleButtonGroup>
  );

  return <>{positions ? positionPicker : null}</>;
}
