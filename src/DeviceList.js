import React from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import './All.css';
import './DeviceList.css';
import {Link} from "react-router-dom";
import Row from "react-bootstrap/Row";
import Cookies from 'universal-cookie';
//const tmp_cookies = new Cookies();
//tmp_cookies.set('VENTIS', ["a78oh3wedfdrg","s782oh3rwfsdd","as8ucibqws34t","ythfdg4gdrdgr","dgr4gergdrgrd"], { path: '/' });

class DeviceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ventis: []
    };
  }

  componentDidMount() {
    const dummy = [
        { id: "asdiljas", status: "on", capacity: 2, occupied: 1},
        { id: "fdvwefsd", status: "off", capacity: 1, occupied: 0 },
        { id: "sgegedgr", status: "maintenance", capacity: 2, occupied: 0 },
        { id: "rtehrtgt", status: "on", capacity: 4, occupied: 3 },
        { id: "dfbrdgfg", status: "on", capacity: 1, occupied: 1 },
        { id: "gtrjtgtt", status: "outoforder", capacity: 1, occupied: 0 },
        { id: "qrcodeid", status: "on", capacity: 2, occupied: 1 },
    ];
    const cookies = new Cookies();
    const venti_ids = cookies.get('VENTIS');
    const ventis = dummy//[]

    /*for (const idx in venti_ids){
      fetch(`https://venitor.windhager.io/devices/${venti_ids[idx]}/events/last`)
        .then(res => res.json())
        .then((data) => {
            ventis.push({ id: venti_ids[idx],
                          status: data.device_status,
                          capacity: data.device_capacity,
                          occupied: data.device_occupancy })
        })
        .catch(console.log)
    }*/
    this.setState({ventis:ventis});
  }

  render() {
    const venti_list = [];
    var count_on = 0;
    var count_off = 0;
    var count_maintenance = 0;
    var count_outoforder = 0;
    var count_total = 0;
    for (const venti of this.state.ventis) {
      const link = `/device/${venti.id}`;
      venti_list.push(
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
              {venti.occupied} / {venti.capacity}
            </div>
          </th>
        </tr>
      )
      count_total += venti.capacity;
      if (venti.status === "on") {
        count_on += venti.occupied;
        count_off += venti.capacity - venti.occupied;
      }
      else if (venti.status === "off") {
        count_off += venti.capacity
      }
      else if (venti.status === "maintenance") {
        count_maintenance += venti.capacity
      }
      else if (venti.status === "outoforder") {
        count_outoforder += venti.capacity
      }

    }

    const perc_on = Math.round((count_on / count_total) * 100);
    const perc_off = Math.round((count_off / count_total) * 100);
    const perc_maintenance = Math.round((count_maintenance / count_total) * 100);
    const perc_outoforder = Math.round((count_outoforder / count_total) * 100);

    return(
      <div>
        <div className="text-center">
          <h1 className="custom-title">Overview</h1>
        </div>
        <Container className="col-xs-6 col-md-4 custom-container">
          <h4>By Status</h4>
          <div>
            <Row>
              <div className="bar-chart">
                <div className="bar on-bar text-center" style={{width:perc_on + '%'}}/>
                <div className="bar off-bar text-center" style={{width:perc_off + '%'}}/>
                <div className="bar maintenance-bar text-center" style={{width:perc_maintenance + '%'}}/>
                <div className="bar outoforder-bar text-center" style={{width:perc_outoforder + '%'}}/>
              </div>
            </Row>
            <h6><span className="on"/>On <span className="bar-text">{perc_on} %</span></h6>
            <h6><span className="off"/>Off <span className="bar-text">{perc_off} %</span></h6>
            <h6><span className="maintenance"/>Maintenance <span className="bar-text">{perc_maintenance} %</span></h6>
            <h6><span className="outoforder"/>Out of Order <span className="bar-text">{perc_outoforder} %</span></h6>
          </div>
        </Container>
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
                {venti_list}
              </tbody>
            </Table>
          </div>
        </Container>
      </div>
    )
  }
}

export default DeviceList;

