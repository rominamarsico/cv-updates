import "../App.css";
import { useEffect, useState } from "react";
import { PDFViewer, usePDF } from "@react-pdf/renderer";
import { PdfPreview } from "../components/PdfPreview.tsx";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import CircularProgress from "@mui/material/CircularProgress";
import { ToggleLanguage } from "../components/ToggleLanguage.tsx";
import { Position } from "../components/Position.tsx";
import { Availability } from "../components/Availability.tsx";
import { useTranslation } from "react-i18next";
import { DownloadJson } from "../components/DownloadJson.tsx";
import { DndUpload } from "../components/DndUpload.tsx";
import { PdfModel, Test } from "../model/pdf-model.ts";

export function Homepage() {
  const [position, setPosition] = useState<string>("");
  const [availabilityDate, setAvailabilityDate] = useState<string>("");
  const [availabilityHours, setAvailabilityHours] = useState<string>("");
  const [data, setData] = useState<PdfModel | undefined>(undefined);

  const { t } = useTranslation();

  function handleChangeJson(jsonData: PdfModel) {
    setData(jsonData);
  }

  function getDownloadButton(loading: boolean) {
    return (
      <Button variant="contained">
        {loading ? <CircularProgress /> : <DownloadIcon />}
        <span>Download CV</span>
      </Button>
    );
  }

  const pdfDocument = (
    <PdfPreview
      data={data}
      position={position}
      availabilityDate={availabilityDate}
      availabilityHours={availabilityHours}
    />
  );

  const [instance, update] = usePDF({ document: pdfDocument });

  useEffect(() => {
    update(pdfDocument);
  }, [data]);

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
        <DndUpload jsonData={(jsonData) => handleChangeJson(jsonData)} />
        <div className="horizontalFlex">
          <PDFDownloadLink document={pdfDocument} fileName={`${fileName}.pdf`}>
            {({ loading }) => getDownloadButton(loading)}
          </PDFDownloadLink>
          <DownloadJson />
        </div>
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


export function Test()