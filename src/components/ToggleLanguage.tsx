import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import i18n from "i18next";

export function ToggleLanguage() {
  const [language, setLanguage] = useState("de");

  function handleChange(newLanguage: string) {
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  }

  return (
    <ToggleButtonGroup
      color="primary"
      value={language}
      exclusive
      onChange={(e) => handleChange(e.target.value)}
    >
      <ToggleButton value="de">DE</ToggleButton>
      <ToggleButton value="en">EN</ToggleButton>
    </ToggleButtonGroup>
  );
}
