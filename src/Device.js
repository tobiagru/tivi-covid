import React from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import './All.css';
import './Device.css';

class Device extends React.Component {
  constructor(props) {
    super(props);
    const dummy = {
       asdiljas: { id: "asdiljas", status: "on", capacity: 2, occupied: 1, location: "Zurich"},
       fdvwefsd: { id: "fdvwefsd", status: "off", capacity: 1, occupied: 0, location: "Zurich" },
       sgegedgr: { id: "sgegedgr", status: "maintenance", capacity: 2, occupied: 0, location: "Zurich" },
       rtehrtgt: { id: "rtehrtgt", status: "on", capacity: 4, occupied: 3, location: "Zurich" },
       dfbrdgfg: { id: "dfbrdgfg", status: "on", capacity: 1, occupied: 1, location: "Zurich" },
       gtrjtgtt: { id: "gtrjtgtt", status: "outoforder", capacity: 1, occupied: 0, location: "Zurich" },
       qrcodeid: { id: "qrcodeid", status: "off", capacity: 1, occupied: 0, location: "Zurich" },
    };

    this.state = {
      id: this.props.match.params.id,
      status: dummy[this.props.match.params.id].status,
      timestamp: new Date(Date.now()).toUTCString(),
      capacity: dummy[this.props.match.params.id].capacity,
      documents: ["https://www.google.com", "https://www.sz.de"],
      location: dummy[this.props.match.params.id].location,
      occupied: dummy[this.props.match.params.id].occupied,
    };
    this.buttons = {
      on: {variant: "success", title: "On"},
      off: {variant: "dark", title: "Off"},
      maintenance: {variant: "warning", title: "Maintenance"},
      outoforder: {variant: "danger", title: "Out of Order"},
    };
  }

  componentDidMount() {
    fetch(`https://venitor.windhager.io/devices/${this.state.id}`, {mode: 'no-cors'})
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            this.setState({ documents: data.documents})
        })
        .catch(console.log)

    fetch(`https://venitor.windhager.io/devices/${this.state.id}/events/last`, {mode: 'no-cors'})
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            this.setState({ status: data.device_status,
                                  capacity: data.device_capacity,
                                  location: data.device_location,
                                  occupied: data.device_occupancy})
        })
        .catch(console.log)
  }

  postStatus(position){
    console.log(position);
    /*const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
              device_id: this.state.id,
              device_location: this.state.location,
              device_geolocation: position,
              device_capacity: this.state.capacity,
              device_occupancy: this.state.occupied,
              timestamp: this.state.timestamp
        })
    };
    fetch(`https://venitor.windhager.io/devices/${this.state.id}/events`, requestOptions)
        .then(response => response.json())
        .catch(console.log);*/
  }

  changeStatus(status) {
    var state = {status:status, timestamp: new Date(Date.now()).toUTCString(),}
    if(status !== "on"){
      state.occupied = 0;
    }
    if(status === "on" && this.state.occupied === 0){
      state.occupied = 1;
    }
    this.setState(state);
    //TODO test if we have access to the geolocation else send IP
    navigator.geolocation.getCurrentPosition(this.postStatus);
  }

  render() {
  	const max_capacity = 8;
  	const capacity_options = [];
    for (var i=1; i<=max_capacity; i++) {
      capacity_options.push(<option value={i}>{i} Person(s)</option>)
    }

    const buttons = [];
    for (const [key, val] of Object.entries(this.buttons)){
      if (key==="on" && this.state.status==="on" && this.state.capacity!=="1"){
        const carousel_items = [];
        for (var i=1; i<=this.state.capacity; i++) {
           carousel_items.push(<Carousel.Item className="btn btn-lg btn-success">{i} Person(s)</Carousel.Item>)
        }
        buttons.push(
          <div>
            <Row>
              <Carousel className="custom-carousel"
                        interval={null}
                        onSlid={(number) => this.setState({occupied: number + 1})}
                        defaultActiveIndex={this.state.occupied - 1}
                        indicators={false}>
                {carousel_items}
              </Carousel>
            </Row>
          </div>
        )
      }
      else{
        const variant = key === this.state.status ? val.variant : "outline-secondary";
        buttons.push(
          <div>
            <Row>
              <Button onClick={() => this.changeStatus(key)}
                      variant={variant}
                      className="custom-button"
                      size="lg" block>{val.title}</Button>
            </Row>
          </div>
        )
      }
    }

    const documents = [];
    for (const key in this.state.documents){
      documents.push(
        <a href={this.state.documents[key]}
           className="custom-manual"
           target="_blank">
          <FontAwesomeIcon icon={ faFileAlt }
                           color="#343a40"
                           size="5x"/></a>
      )
    }

    return (
      <div>
        <div className="text-center">
          <h1 className="custom-title">{this.state.id}</h1>
        </div>
        <Container className="col-xs-6 col-md-4 custom-container">
          <h5>Currently:</h5>
          <h6><span className={this.state.status}/>{this.state.status === "on" ? `${this.state.occupied} Person(s)` : this.buttons[this.state.status].title}</h6>
          <h5>Since: </h5>
          <h6>{this.state.timestamp}</h6>
          <h5>Capacity:</h5>
          <h6>{this.state.capacity} People</h6>
        </Container>
        <Container className="col-xs-6 col-md-4 custom-container">
          <h4>Change Status</h4>
          {buttons}
        </Container>
        <Container className="col-xs-6 col-md-4 custom-container">
          <h4>Manuals</h4>
          {documents}
        </Container>
        <Container className="col-xs-6 col-md-4 custom-container">
          <h4>Settings</h4>
          <Form>
            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control name="location"
                            value={this.state.location}
                            onChange={ref => this.setState({location: ref.target.value})}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Capacity</Form.Label>
              <Form.Control as="select"
                            name="capacity"
                            value={this.state.capacity}
                            onChange={ref => this.setState({capacity: ref.target.value})}>
                {capacity_options}
              </Form.Control>
            </Form.Group>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Device;