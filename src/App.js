import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  state = {
    file: null,
    entry: 0,
    fileName: ""
  };

  handleFile = event => {
    let file = event.target.files[0];
    if (file) {
      this.setState({ file: file, fileName: event.target.files[0].name });
    } else {
      this.setState({ file: null, fileName: "" });
    }
  };

  handleUpload = () => {
    let file = this.state.file;

    const data = new FormData();
    data.append("file", file);

    axios
      .post("https://fhirtest.uhn.ca/baseDstu3/Binary", data)
      .then(response => {
        alert("Fichier envoyé avec succés");
        axios.get("https://fhirtest.uhn.ca/baseDstu3/Binary").then(response => {
          this.setState({ entry: response.data.entry.length });
        });
      })
      .catch(error => {
        alert("Une erreure est survenue, veuillez recommencer");
      });
  };

  render() {
    return (
      <section>
        <div className="header">
          <img
            className="logo"
            src="https://www.lifen.fr/wp-content/themes/lifen_orange/images/lifen-orange.svg"
            alt="logo"
          />
        </div>
        <div className="container">
          <div className="btn-choose-send">
            <label className="btn" for="file">
              Choisissez un fichier
            </label>
            <div>{this.state.fileName}</div>
            <input
              type="file"
              name="file"
              id="file"
              className="inputfile"
              data-multiple-caption="{count} files selected"
              multiple
              onChange={this.handleFile}
            />
            <button className="btn" onClick={this.handleUpload}>
              Envoyer
            </button>
          </div>

          <label>
            Nombre total de fichiers enregistrés :{" "}
            {this.state.entry > 0 && this.state.entry}
          </label>
        </div>
      </section>
    );
  }
}

export default App;
