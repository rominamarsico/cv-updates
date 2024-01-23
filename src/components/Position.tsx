import { useState } from "react";
import { useTranslation } from "react-i18next";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

type PositionProps = {
  positionCallback: (position: string) => void;
};

export function Position({ positionCallback }: PositionProps) {
  const { t } = useTranslation();
  const positions: string[] = t("position", { returnObjects: true });
  const [position, setPosition] = useState<string>("");

  function handleChange(value: string) {
    setPosition(value);
    positionCallback(value);
  }

  return (
    <>
      <ToggleButtonGroup
        color="primary"
        value={position}
        exclusive
        onChange={(e) => handleChange(e.target.value)}
      >
        {positions.map((entry, index) => (
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
    </>
  );
}
