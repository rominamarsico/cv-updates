import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import { PdfModel } from "../model/pdf-model.ts";

type DownloadProps = {
  data?: PdfModel;
  fileName: string;
  label: string;
};

export function DownloadJson({ data, fileName, label }: DownloadProps) {
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
    <Button variant="contained" fullWidth onClick={exportToJson}>
      <DownloadIcon />
      <span>{label}</span>
    </Button>
  );
}
