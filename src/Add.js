import React from "react";

import './All.css';
import './Add.css';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import QRCode from "qrcode.react";

class Add extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showQR:false,
        id:"",
        location:"",
      };
    }

    render() {
      const containers = [];
      containers.push(
        <Container className="col-xs-6 col-md-4 custom-container">
          <h4>Details</h4>
          <Form>
            <Form.Group>
              <Form.Label>Venti ID</Form.Label>
              <Form.Control type="id"
                            placeholder="Enter ID"
                            onChange={ref => this.setState({id: ref.target.value})}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control type="location"
                            placeholder="Enter Location"
                            onChange={ref => this.setState({location: ref.target.value})}/>
            </Form.Group>
          </Form>
          <Button variant="secondary"
                  type="submit"
                  onClick={() => this.setState({showQR:true})}>
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