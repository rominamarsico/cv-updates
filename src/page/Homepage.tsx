import "../App.css";
import { useRef, useState, ReactNode } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PdfPreview } from "../components/PdfPreview.tsx";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import CircularProgress from "@mui/material/CircularProgress";
import { Position } from "../components/Position.tsx";
import { Availability } from "../components/Availability.tsx";
import { DownloadJson } from "../components/DownloadJson.tsx";
import { DndUpload } from "../components/DndUpload.tsx";
import { PdfModel } from "../model/pdf-model.ts";
import exampleData from "../model/example.json";

export function Homepage() {
  const [position, setPosition] = useState<string | undefined>(undefined);
  const [availabilityDate, setAvailabilityDate] = useState<string>("");
  const [availabilityHours, setAvailabilityHours] = useState<string>("");
  const [profileImg, setProfileImg] = useState<File | undefined>(undefined);
  const [data, setData] = useState<PdfModel | undefined>(undefined);

  function getDownloadButton(loading: boolean) {
    const downloadButton = (
      <Button variant="contained" fullWidth>
        <span>
          {loading ? (
            <CircularProgress size="1rem" color="inherit" />
          ) : (
            <DownloadIcon />
          )}
        </span>
        <span>Download CV as PDF</span>
      </Button>
    );
    return downloadButton as ReactNode;
  }

  const pdfDocument = (
    <PdfPreview
      data={data}
      profileImg={profileImg}
      position={position}
      availabilityDate={availabilityDate}
      availabilityHours={availabilityHours}
    />
  );

  const hiddenImageInput = useRef<HTMLInputElement | undefined>(undefined);
  const hiddenFileInput = useRef<HTMLInputElement | undefined>(undefined);

  const pdfPreview = (
    <div className="iFrameWrapper">
      <PDFViewer showToolbar={false} style={{ height: "100%", width: "100%" }}>
        {pdfDocument}
      </PDFViewer>
    </div>
  );

  const downloadExample = (
    <DownloadJson
      data={exampleData}
      fileName="cv-export.json"
      label="Download Example Data"
    />
  );

  const uploadImage = (
    <DndUpload
      label={"Upload image"}
      uploadData={(image: File) => setProfileImg(image)}
      hiddenFileInput={hiddenImageInput}
      id={"imageInput"}
      parseInput={false}
    />
  );

  const uploadCV = (
    <DndUpload
      label={"Upload your CV as JSON file"}
      uploadData={(jsonData: PdfModel) => setData(jsonData)}
      hiddenFileInput={hiddenFileInput}
      id={"jsonInput"}
      parseInput={true}
    />
  );

  return (
    <div className="app">
      {pdfPreview}
      <div className="controls">
        <h2>CV UPDATES</h2>
        <div className="horizontalFlex">{downloadExample}</div>
        <div className="horizontalFlex">
          {uploadImage}
          {uploadCV}
        </div>
        <Position
          positionCallback={(value) => setPosition(value)}
          positions={data?.position}
        />
        <Availability
          availabilityDateCallback={(value) => setAvailabilityDate(value)}
          availabilityHoursCallback={(value) => setAvailabilityHours(value)}
        />
        <div className="horizontalFlex">
          <DownloadJson
            data={data}
            fileName="cv-export.json"
            label="Download CV as JSON"
          />
          <div style={{ width: "100%" }}>
            <PDFDownloadLink
              document={pdfDocument}
              fileName={`${data?.fileName}.pdf`}
            >
              {({ loading }) => getDownloadButton(loading)}
            </PDFDownloadLink>
          </div>
        </div>
      </div>
    </div>
  );
}
