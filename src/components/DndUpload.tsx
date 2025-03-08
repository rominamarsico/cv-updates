import Button from "@mui/material/Button";
import UploadIcon from "@mui/icons-material/Upload";
import { PdfModel } from "../model/pdf-model";
import { Ref } from "react";

type DndUploadProps = {
  uploadData: (data: PdfModel | File) => void;
  label: string;
  hiddenFileInput?: Ref<HTMLInputElement>;
  parseInput: boolean;
  id: string;
};

export function DndUpload({
  uploadData,
  label,
  hiddenFileInput,
  parseInput,
  id,
}: DndUploadProps) {
  function handleClick() {
    hiddenFileInput?.current?.click();
  }

  function handleChange() {
    const fileUploadInput = document.getElementById(id) as HTMLInputElement;
    if (
      fileUploadInput == null ||
      fileUploadInput.files == null ||
      fileUploadInput.files.length == 0
    ) {
      return;
    }
    const reader = new FileReader();

    reader.onload = (event) => {
      if (parseInput) {
        uploadData(JSON.parse(event?.target?.result));
      } else {
        uploadData(URL.createObjectURL(fileUploadInput.files[0]));
      }
    };
    const selectedFile = fileUploadInput.files[0];
    reader.readAsText(selectedFile);
  }

  return (
    <>
      <Button variant="outlined" fullWidth onClick={handleClick}>
        <UploadIcon />
        {label}
      </Button>
      <input
        ref={hiddenFileInput}
        style={{ display: "none" }}
        type="file"
        id={id}
        multiple={false}
        onChange={handleChange}
      />
    </>
  );
}
