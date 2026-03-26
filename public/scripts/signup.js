const filePicker = document.querySelector("#image");
const previewImage = document.querySelector("#preview-image");
filePicker.addEventListener("change", () => {
  const files = filePicker.files;
  if (!files || files.length === 0) {
    previewImage.style.display = "none";
  }
  const file = files[0];
  previewImage.src = URL.createObjectURL(file);
  previewImage.style.display = "block";
});
