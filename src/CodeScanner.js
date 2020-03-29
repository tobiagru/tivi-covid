import React, { Component } from "react";
import { render } from "react-dom";
import { ScanSettings, Barcode } from "scandit-sdk";
import BarcodePicker from "../src/barcodescanner/BarcodePicker";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import './All.css';
import './CodeScanner.css';
import { Link } from "react-router-dom";


class CodeScanner extends Component {
  constructor(props) {
      super(props);
      this.state = {
        foundID: false,
        id: null
      };
  }

  getQR(scanResult) {
    const qr = JSON.parse(scanResult.barcodes[0].data)
    this.setState({foundID:true, id:qr.id});
  }

  render() {
    const next_content = [];
    if (this.state.foundID) {
      const link = `/device/${this.state.id}`;
      next_content.push(
        <h6>Found Venti Click to Access:</h6>
      )
      next_content.push(
        <Link className="btn btn-sm btn-secondary btn-block" to={link}>{this.state.id}</Link>
      )
    }
    else {
      next_content.push(
        <h6>Please Scan QR Code</h6>
      )
    }

    return (
      <div>
        <div className="text-center">
          <h1 className="custom-title">Please Scan the Barcode</h1>
        </div>
        <Container className="col-xs-6 col-md-4 custom-container">
          {next_content}
        </Container>
        <Container className="scanner-View-Container col-xs-6 col-md-4 custom-container">
        <BarcodePicker id="scanner-View"
            playSoundOnScan={true}
            vibrateOnScan={true}
            scanSettings={
              new ScanSettings({
                enabledSymbologies: ["qr", "ean8", "ean13", "upca", "upce", "code128", "code39", "code93", "itf"],
                codeDuplicateFilter: 1000
              })
            }
            onScan={scanResult => this.getQR(scanResult)}
            onError={error => {console.error(error.message);}}
          />
        </Container>
      </div>
    )
  }
}

export default CodeScanner;