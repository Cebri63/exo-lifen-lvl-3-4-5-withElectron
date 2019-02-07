import React from "react";
import "../App.css";

const InputFile = props => {
  return (
    <div className="btn-choose-send">
      <label className="btn" for="file">
        Choisissez un fichier
      </label>
      <div className="fileName-X">
        <div>{props.fileName}</div>
        {props.fileName ? (
          <i onClick={props.handleCancel} className="fas fa-times" />
        ) : null}
      </div>

      <input
        type="file"
        name="file"
        id="file"
        accept="application/pdf"
        className="inputfile"
        onChange={props.handleFile}
      />

      <label className="btn" onClick={props.handleUpload}>
        Envoyer
      </label>
    </div>
  );
};
export default InputFile;
