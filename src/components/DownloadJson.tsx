import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import data from "../translation/de.json";

export function DownloadJson() {
  const fileName = "cv-export.json";
  const contentType = "application/json;charset=utf-8";

  function exportToJson() {
    const jsonDocument = document.createElement("a");
    jsonDocument.download = fileName;
    jsonDocument.href = `data:${contentType},${encodeURIComponent(JSON.stringify(data))}`;
    jsonDocument.target = "_blank";
    document.body.appendChild(jsonDocument);
    jsonDocument.click();
    document.body.removeChild(jsonDocument);
  }

  return (
    <div>
      <Button variant="contained" onClick={exportToJson}>
        <DownloadIcon />
        <span>Download JSON</span>
      </Button>
    </div>
  );
}
