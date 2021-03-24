import React, { Component } from "react";
// import {Link} from 'react-router-dom'
import axios from 'axios';
// import Table from 'react-bootstrap/Table';
// import sensorTableRow from './sensorTableRow';


class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      view: []
    };
  }

  
  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/view`)
      .then(res => res.json())
      .then(
        (data) => {
           
          this.setState({
            isLoaded: true,
            view: data,
            
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

  // componentDidUpdate() {
  //   fetch("/view")
  //     .then(res => res.json())
  //     .then(
  //       (data) => {
  //           console.log(data)
            
  //         this.setState({
  //           isLoaded: true,
  //           view: data,
            
  //         });
  //       },
        
  //       (error) => {
  //         this.setState({
  //           isLoaded: true,
  //           error
  //         });
  //       }
  //     )
  // }

 

  render() {
    const { error, isLoaded, view } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
      <>
        <h2>Senors Summary</h2> 
        <div style={{overflowX:"auto"}}> 
        {view.length > 0 &&
        <table id='sensorsList' className="table table-striped table-borderless">
          <thead className="thead-light">
            <tr>
              
            <th>Status</th>
            <th>Idrottsplats</th>
            <th>Plan</th>
            <th>Snödjup</th>
            <th>Kommentar</th>
            <th>Temperatur</th>
            </tr>
          </thead>
          <tbody>
          {view.map(item => (
                  <tr key={item.Id}>
                     {(item.Status !== 'Öppen' && item.Status !== 'Stängd'  && item.Status !== 'Varning' )
                      &&
                      <td className = 'opened'>{"Unknown"}</td>}
                      {item.Status === 'Öppen' &&
                      <td className = 'opened'>{item.Status}</td>}
                       {item.Status === 'Varning' &&
                      <td className = 'warning'>{item.Status}</td>}
                       {item.Status === 'Stängd' &&
                      <td className = 'closed'>{item.Status}</td>}
                    <td>{item.Name}</td>
              <td>{item.Type}</td>
              <td>{item.SnowDepth+"mm"}</td>
              <td>{item.Comment}</td>
              <td>{item.Temperature}</td>
              
              
                  </tr>
                ))}
          
          </tbody>
        </table>
    }
        </div>
        
       </>
       
      );
    }
  }
}
 


export default View;
