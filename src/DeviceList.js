import React from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import './All.css';
import './DeviceList.css';
import {Link} from "react-router-dom";
var VENTIS = [{id:"a78oh3wedfdrg", status:"on"},
              {id:"s782oh3rwfsdd", status:"off"},
              {id:"as8ucibqws34t", status:"on"},
              {id:"ythfdg4gdrdgr", status:"maintenance"},
              {id:"dgr4gergdrgrd", status:"on"}];




class DeviceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //TODO everytime we update the venits we need to update the cookie


    };
  }

  render() {
    const ventis = [];
    for (const venti of VENTIS.values()) {
      const link = `/device/${venti.id}`;
      ventis.push(
        <tr>
          <th>
            <Link className="btn btn-sm btn-secondary btn-block"
                  to={link}>
              {venti.id}
            </Link>
          </th>
          <th className="custom-th-status">
            <div className="custom-status">
              <span className={venti.status}/>
              {venti.status}
            </div>
          </th>
        </tr>
      )
    }

    return(
      <div className="custom-background">
        <div className="text-center">
          <h1 className="custom-title">Overview</h1>
        </div>
        <Container className="col-xs-6 col-md-4 custom-container">
          <h4>By Machine</h4>
          <div className="custom-table text-center">
            <Table borderless>
              <thead>
                <tr>
                  <th>Venti-ID</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {ventis}
              </tbody>
            </Table>
          </div>
        </Container>
      </div>
    )
  }
}

export default DeviceList;

