import React from "react";

import './All.css';
import './Add.css';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import QRCode from "qrcode.react";
import Cookies from "universal-cookie";

class Add extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showQR:false,
        id:"",
        location:"",
        capacity: "1",
      };
    }

    addQR(){
      const cookies = new Cookies();
      const venti_ids = cookies.get('VENTIS');
      venti_ids.push(this.state.id);
      cookies.set('VENTIS', venti_ids, { path: '/' });
      this.setState({showQR:true});
      /*const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                  id: this.state.id,
                  gnm: "",
                  qr_code: "",
                  documents: ["https://www.codevscovid19.org/", "https://www.google.com"]
            })
        };
        fetch(`https://venitor.windhager.io/devices/${this.state.id}/events`, requestOptions)
            .then(response => response.json())
            .catch(console.log);*/
      /*const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                  device_id: this.state.id,
                  device_status: "off",
                  device_location: this.state.location,
                  device_geolocation: "",
                  device_capacity: this.state.capacity,
                  device_occupancy: 0,
                  timestamp: ""
            })
        };
        fetch(`https://venitor.windhager.io/devices/${this.state.id}/events`, requestOptions)
            .then(response => response.json())
            .catch(console.log);*/
    }

    render() {
      const containers = [];
      containers.push(
        <Container className="col-xs-6 col-md-4 custom-container">
          <h4>Details</h4>
          <Form>
            <Form.Group>
              <Form.Label>Venti ID</Form.Label>
              <Form.Control name="id"
                            placeholder="Enter ID"
                            onChange={ref => this.setState({id: ref.target.value})}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control name="location"
                            placeholder="Enter Location"
                            onChange={ref => this.setState({location: ref.target.value})}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Capacity</Form.Label>
              <Form.Control name="capcity"
                            placeholder="Enter Capacity"
                            onChange={ref => this.setState({capacity: ref.target.value})}/>
            </Form.Group>
          </Form>
          <Button variant="secondary"
                  type="submit"
                  onClick={() => this.addQR()}>
            Create
          </Button>
        </Container>
      )

      if (this.state.showQR) {
        containers.push(
          <Container className="col-xs-6 col-md-4 custom-container">
            <h4>QR Code</h4>
            <div className="text-center">
              <QRCode value={`{"id":${this.state.id}}}`}
                      size="188"/>
              <h6>ID: {this.state.id}</h6>
            </div>
          </Container>
        )
      }

      return(
        <div>
          <div className="text-center">
            <h1 className="custom-title">Add new Venti</h1>
          </div>
          {containers}
        </div>
      )
    }
}

export default Add;