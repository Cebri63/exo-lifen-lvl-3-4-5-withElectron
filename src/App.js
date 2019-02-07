import React, { Component } from "react";
import "./App.css";
import axios from "axios";

import InputFile from "./components/InputFile";

// var chokidar = require("chokidar");

class App extends Component {
  state = {
    file: null,
    entry: 0,
    fileName: ""
  };

  // componentDidMount = () => {
  //   const watcher = chokidar.watch("./FHIR");
  //   const log = console.log.bind(console);

  //   watcher
  //     .on("ready", () => log("Initial scan complete. Ready for changes"))
  //     .on("add", path => log(`File ${path} has been added`))
  //     .on("change", path => log(`File ${path} has been changed`))
  //     .on("unlink", path => log(`File ${path} has been removed`));
  // };

  handleFile = event => {
    let file = event.target.files[0];

    if (file) {
      let size = event.target.files[0].size;
      if (size > 2097152) {
        alert("Le fichier ne doit pas excéder 2Mo");
        this.value = "";
      } else {
        this.setState({ file: file, fileName: event.target.files[0].name });
      }
    }
  };

  handleCancel = () => {
    this.setState({ file: null, fileName: "" });
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
        <section className="section1">
          <div className="header">
            <img
              className="logo"
              src="https://www.lifen.fr/wp-content/themes/lifen_orange/images/lifen-orange.svg"
              alt="logo"
            />
          </div>

          <div className="container">
            <div className="title">
              <span className="welcome">Bienvenue </span>
              sur la plateforme d'envoi de fichiers
            </div>
            <div className="input-and-total">
              <InputFile
                fileName={this.state.fileName}
                handleCancel={this.handleCancel}
                handleFile={this.handleFile}
                handleUpload={this.handleUpload}
              />

              <div className="total-files">
                Nb de fichiers dans le dossier :{" "}
                {this.state.entry > 0 && this.state.entry}
              </div>
            </div>
          </div>
        </section>
      </section>
    );
  }
}

export default App;
