import "../App.css";
import { useRef, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { PdfPreview } from "../components/PdfPreview.tsx";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import CircularProgress from "@mui/material/CircularProgress";
import { Position } from "../components/Position.tsx";
import { Availability } from "../components/Availability.tsx";
import { DownloadJson } from "../components/DownloadJson.tsx";
import { DndUpload } from "../components/DndUpload.tsx";
import { PdfModel } from "../model/pdf-model.ts";

export function Homepage() {
  const [position, setPosition] = useState<string | undefined>(undefined);
  const [availabilityDate, setAvailabilityDate] = useState<string>("");
  const [availabilityHours, setAvailabilityHours] = useState<string>("");
  const [profileImg, setProfileImg] = useState<File | undefined>(undefined);
  const [data, setData] = useState<PdfModel | undefined>(undefined);

  function handleChangeJson(jsonData: PdfModel) {
    setData(jsonData);
  }

  function handleChangeImage(image: File) {
    setProfileImg(image);
  }

  function getDownloadButton(loading: boolean) {
    return (
      <Button variant="contained" fullWidth>
        {loading ? (
          <CircularProgress size="1rem" color={"inherit"} />
        ) : (
          <DownloadIcon />
        )}
        <span>Download CV</span>
      </Button>
    );
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

  const hiddenImageInput = useRef<HTMLInputElement>(null);
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  return (
    <div className="app">
      <div className="iFrameWrapper">
        <PDFViewer
          showToolbar={false}
          style={{ height: "100%", width: "100%" }}
        >
          {pdfDocument}
        </PDFViewer>
      </div>
      <div className="controls">
        <h2>CV UPDATES</h2>
        <div className="horizontalFlex">
          <DndUpload
            label={"Upload image"}
            uploadData={(image) => handleChangeImage(image)}
            hiddenFileInput={hiddenImageInput}
            id={"imageInput"}
            parseInput={false}
          />
          <DndUpload
            label={"Upload JSON file"}
            uploadData={(jsonData) => handleChangeJson(jsonData)}
            hiddenFileInput={hiddenFileInput}
            id={"jsonInput"}
            parseInput={true}
          />
        </div>
        <div className="horizontalFlex">
          <div style={{ width: "100%" }}>
            <PDFDownloadLink
              document={pdfDocument}
              fileName={`${data?.fileName}.pdf`}
            >
              {({ loading }) => getDownloadButton(loading)}
            </PDFDownloadLink>
          </div>
          <DownloadJson data={data} />
        </div>
        <Position
          positionCallback={(value) => setPosition(value)}
          positions={data?.position}
        />
        <Availability
          availabilityDateCallback={(value) => setAvailabilityDate(value)}
          availabilityHoursCallback={(value) => setAvailabilityHours(value)}
        />
      </div>
    </div>
  );
}
