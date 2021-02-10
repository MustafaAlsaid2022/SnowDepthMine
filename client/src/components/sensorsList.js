import React, { Component } from "react";
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios';
// import Table from 'react-bootstrap/Table';
// import sensorTableRow from './sensorTableRow';


class SensorsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      sensors: []
    };
  }

  
  componentDidMount() {
    fetch("/sensors")
      .then(res => res.json())
      .then(
        (sensorList) => {
          this.setState({
            isLoaded: true,
            sensors: sensorList
          });
        },
        
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }


  // DataTable() {
  // DataTable() {
  // DataTable() {
  //   return this.state.sensors.map((res, i) => {
  //     return <sensorTableRow obj={res} key={i} />;
  //   });
  // }

  deleteSensor(id, e){
    axios.delete(`/sensors/${id}`)
      .then(res => {
        console.log(res.data)
        console.log('Sensor successfully deleted')
        const sensors = this.state.sensors.filter(item => item.id !== id);
        this.setState({ sensors });
      }).catch((error) => {
        console.log(error)
    })
  
  }

  render() {
    const {userLoggedIn} = this.props;
    const { error, isLoaded, sensors } = this.state;
    if(userLoggedIn === 'false') {
      return <Redirect to="/" />
    }
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
      <>
        <h2>Senors List View</h2> 
        <div style={{overflowX:"auto"}}> 
        <table id='sensorsList' className="table table-striped table-borderless">
          <thead className="thead-light">
            <tr>
              
              <th>Name</th>
              <th>Type</th>
              <th>SnowDepthLimit</th>
              <th>BaseValue</th>
              <th>Comment</th>
              <th>AdminStatus</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {sensors.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.snowDepthLimit}</td>
              <td>{item.baseValue}</td>
              <td>{item.comment}</td>
              <td>{item.adminStatus}</td>
              
              <td>
 
                <button className="btn text-danger" onClick={(e) => this.deleteSensor(item.id, e)}>
                  <i className="far fa-trash-alt"></i>
                  </button>
                  
                  <Link to={`/edit-sensor/${item.id}`} className="btn text-primary" >
                <i className='fas fa-pencil-alt'></i>
                  </Link>
                 
                  
              </td>
                  </tr>
                ))}
          
          </tbody>
        </table>
        </div>
        
       </>
       
      );
    }
  }
}
 


export default SensorsList;
