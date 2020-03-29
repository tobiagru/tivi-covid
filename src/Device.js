import React from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt } from '@fortawesome/free-solid-svg-icons'
import './All.css';
import './Device.css';

var STATUSQUEUE = []


class Device extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      status: "on", //TODO we need to get this from a request
      timestamp: new Date(Date.now()).toUTCString(),
      capacity: "3", //TODO we need to get this from a request
      documents: ["https://www.google.com", "https://www.sz.de"],
    };
    this.buttons = {
      on: {variant: "success", title: "On"},
      off: {variant: "dark", title: "Off"},
      maintenance: {variant: "warning", title: "Maintenance"},
      outoforder: {variant: "danger", title: "Out of Order"},
    };
  }

  postStatus(position){
    console.log(position);
    /*const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'React POST Request Example' })
    };
    fetch('https://jsonplaceholder.typicode.com/posts', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ postId: data.id }));
     */
  }

  changeStatus(status) {
    this.setState({status:status, timestamp: new Date(Date.now()).toUTCString(),});
    //TODO test if we have access to the geolocation else send IP
    navigator.geolocation.getCurrentPosition(this.postStatus);
  }

  handleCapacityChange(event) {
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    this.setState({[fieldName]: fleldVal});
  }

  render() {
  	const buttons = [];
    for (const [key, val] of Object.entries(this.buttons)){
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

    const max_capacity = 8;
    const capacity_options = [<option value="1">1 Person</option>];
    for (var i=2; i<=max_capacity; i++) {
      capacity_options.push(<option value={i}>{i} Persons</option>)
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
          <h6><span className={this.state.status}/>{this.buttons[this.state.status].title}</h6>
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
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form>
              <Form.Label>Capacity</Form.Label>
              <Form.Control as="select"
                            name="capacity"
                            onChange={this.handleCapacityChange.bind(this)}>
                {capacity_options}
              </Form.Control>
            </Form>
          </Form.Group>
        </Container>
      </div>
    );
  }
}

export default Device;