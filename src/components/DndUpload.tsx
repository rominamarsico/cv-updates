export function DndUpload() {
  function onChangeHandler() {
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
    reader.onload = (evt) => {
      console.log(evt.target.result); // TODO
    };
    const selectedFile = fileUploadInput.files[0];
    reader.readAsText(selectedFile);
  }

  return <input type="file" id="input" multiple onChange={onChangeHandler} />;
}
