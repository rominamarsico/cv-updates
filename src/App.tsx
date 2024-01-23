import "./App.css";
import { useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { MyDocument } from "./components/pdf-document.tsx";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import CircularProgress from "@mui/material/CircularProgress";
import { ToggleLanguage } from "./components/ToggleLanguage.tsx";
import { Position } from "./components/Position.tsx";
import { Availability } from "./components/Availability.tsx";
import { useTranslation } from "react-i18next";

function App() {
  const [position, setPosition] = useState<string>("");
  const [availabilityDate, setAvailabilityDate] = useState<string>("");
  const [availabilityHours, setAvailabilityHours] = useState<string>("");

  const { t } = useTranslation();

  function getDownloadButton(loading: boolean) {
    return (
      <Button variant="contained">
        {loading ? <CircularProgress /> : <DownloadIcon />}
        <span>Download CV</span>
      </Button>
    );
  }

  const pdfDocument = (
    <MyDocument
      position={position}
      availabilityDate={availabilityDate}
      availabilityHours={availabilityHours}
    />
  );

  const fileName = t("fileName");

  return (
    <div className="app">
      <div className="iFrameWrapper">
        <PDFViewer showToolbar={false} style={{ height: "100%" }}>
          {pdfDocument}
        </PDFViewer>
      </div>
      <div className="controls">
        <h1>CV updates</h1>
        <PDFDownloadLink document={pdfDocument} fileName={`${fileName}.pdf`}>
          {({ loading }) => getDownloadButton(loading)}
        </PDFDownloadLink>
        <ToggleLanguage />
        <Position positionCallback={(value) => setPosition(value)} />
        <Availability
          availabilityDateCallback={(value) => setAvailabilityDate(value)}
          availabilityHoursCallback={(value) => setAvailabilityHours(value)}
        />
      </div>
    </div>
  );
}

export default App;
