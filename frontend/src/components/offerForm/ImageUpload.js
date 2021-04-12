import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@material-ui/core";

export function ImageUpload({ setFieldValue, values }) {
  const [files, setFiles] = useState([]);
  const classes = useStyles();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/png, image/jpg, image/jpeg",
    maxFiles: 5,
    maxSize: 8388608,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      setFieldValue("images", (values.images = acceptedFiles));
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt="img" />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div
        className={
          isDragActive
            ? `${classes.dropzone} ${classes.dropzoneActive}`
            : classes.dropzone
        }
      >
        <p>Przeciągnij pliki lub kliknij tutaj</p>
        <em>Musisz dodać przynajmniej jedno zdjęcie, maksymalnie 5</em>
        <br />
        <em>
          Obsługiwane formaty to .png, .jpg, .jpeg, limit dla jednego zdjęcia
          wynosi 8mb
        </em>
        <aside style={thumbsContainer}>{thumbs}</aside>
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  dropzone: {
    border: "3px dashed #9e9e9e",
    padding: "20px",
    cursor: "pointer",
  },
  dropzoneActive: {
    border: "3px dashed #258c2d",
  },
});

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};
