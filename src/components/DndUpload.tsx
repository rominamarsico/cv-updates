import { useRef } from "react";
import { Button } from "@mui/material";
import { PdfModel } from "../model/pdf-model";

type DndUploadProps = {
  jsonData: (jsonData: PdfModel) => void;
};

export function DndUpload({ jsonData }: DndUploadProps) {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  function handleClick() {
    hiddenFileInput.current?.click();
  }

  function handleChange() {
    const fileUploadInput = document.getElementById(
      "input",
    ) as HTMLInputElement;
    if (
      fileUploadInput == null ||
      fileUploadInput.files == null ||
      fileUploadInput.files.length == 0
    ) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      jsonData(event?.target?.result); // TODO: TS
    };
    const selectedFile = fileUploadInput.files[0];
    reader.readAsText(selectedFile);
  }

  return (
    <>
      <Button variant={"outlined"} onClick={handleClick}>
        Upload a file
      </Button>
      <input
        ref={hiddenFileInput}
        style={{ display: "none" }}
        type="file"
        id="input"
        multiple
        onChange={handleChange}
      />
    </>
  );
}
