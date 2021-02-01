// import React, { Component } from "react";
// import { Form, Button, Alert } from 'react-bootstrap'
// import axios from 'axios';


// export default class AddSensor extends Component {

//   constructor(props) {
//     super(props)

//     // Setting up functions
//     this.onChangeSensorID = this.onChangeSensorID.bind(this);
//     this.onChangeSensorName = this.onChangeSensorName.bind(this);
//     this.onChangeSensorType = this.onChangeSensorType.bind(this);
//     this.onChangeSensorSnowDepthLimit = this.onChangeSensorSnowDepthLimit.bind(this);
//     this.onChangeSensorBaseValue = this.onChangeSensorBaseValue.bind(this)
//     this.onChangeSensorComment = this.onChangeSensorComment.bind(this)
//     this.onChangeSensorAdminStatus = this.onChangeSensorAdminStatus.bind(this)
//     this.onSubmit = this.onSubmit.bind(this);

//     // Setting up state
//     this.state = {
//       id: '',
//       name: '',
//       type: '',
//       snowDepthLimit: '',
//       baseValue: '',
//       comment: '',
//       adminStatus: '',
//       message: '',
//       loading: false

//     }
//   }

//   onChangeSensorID(e) {
//     this.setState({ id: e.target.value })
//   }

//   onChangeSensorName(e) {
//     this.setState({ name: e.target.value })
//   }

//   onChangeSensorType(e) {
//     this.setState({ type: e.target.value })
//   }

//   onChangeSensorSnowDepthLimit(e) {
//     this.setState({ snowDepthLimit: e.target.value })
//   }

//   onChangeSensorBaseValue(e) {
//     this.setState({ baseValue: e.target.value })
//   }

//   onChangeSensorComment(e) {
//     this.setState({ comment: e.target.value })
//   }

//   onChangeSensorAdminStatus(e) {
//     this.setState({ adminStatus: e.target.value })
//   }

//   onSubmit(e) {
//     e.preventDefault()

//     try {
//       const sensorObject = {
//         id: this.state.id,
//         name: this.state.name,
//         type: this.state.type,
//         snowDepthLimit: this.state.snowDepthLimit,
//         baseValue: this.state.baseValue,
//         comment: this.state.comment,
//         adminStatus: this.state.adminStatus
//       };
      
//       this.setState({
//         message:'Sensor Successfully Added',
//         loading: true
//     })

//       axios.post('/sensors', sensorObject)
//         .then((res) => {
//           console.log(res.data)
//           console.log('Sensor successfully Added')
//         }).catch((error) => {
//           console.log(error)
//         })


//       this.setState({
//         id: '',
//         name: '',
//         type: '',
//         snowDepthLimit: '',
//         baseValue: '',
//         comment: '',
//         adminStatus: ''
//       });
//     } catch {
//         this.setState({message:'Error: Sensor is not Added'})
//     }
//     this.setState({loading:false})
//   }

//   render() {
//     return (<div className="form-wrapper">
//       <h2 className='text-center mb-4'>Add Sensor</h2>
//       {this.state.message && <Alert variant='success'>{this.state.message}</Alert>}
//       <Form onSubmit={this.onSubmit}>
//         <Form.Group controlId="ID">
//           <Form.Label>ID</Form.Label>
//           <Form.Control type="text" value={this.state.id} onChange={this.onChangeSensorID}
//             placeholder='Enter ID'
//             required />
//         </Form.Group>

//         <Form.Group controlId="Name">
//           <Form.Label>Name</Form.Label>
//           <Form.Control type="text" value={this.state.name} onChange={this.onChangeSensorName}
//             placeholder='Enter Name'
//             required />
//         </Form.Group>

//         <Form.Group controlId="Type">
//           <Form.Label>Type</Form.Label>
//           <Form.Control type="text" value={this.state.type} onChange={this.onChangeSensorType}
//             placeholder='Enter Type'
//             required />
//         </Form.Group>

//         <Form.Group controlId="Snow">
//           <Form.Label>SnowDepthLimit</Form.Label>
//           <Form.Control type="text" value={this.state.snowDepthLimit} onChange={this.onChangeSensorSnowDepthLimit}
//             placeholder='Enter Snow Depth Limit'
//             required />
//         </Form.Group>

//         <Form.Group controlId="Base">
//           <Form.Label>Base Value</Form.Label>
//           <Form.Control type="text" value={this.state.baseValue} onChange={this.onChangeSensorBaseValue}
//             placeholder='Enter Base Value'
//             required />
//         </Form.Group>

//         <Form.Group controlId="Comment">
//           <Form.Label>Comment</Form.Label>
//           <Form.Control type="text" value={this.state.comment} onChange={this.onChangeSensorComment}
//             placeholder='Enter Comment'
//             required />
//         </Form.Group>

//         <Form.Group controlId="AdminStatus">
//           <Form.Label>Status</Form.Label>
//           <Form.Control type="text" value={this.state.adminStatus} onChange={this.onChangeSensorAdminStatus}
//             placeholder='Enter Status'
//             required />
//         </Form.Group>


//         <Button variant="danger" size="lg" block="block" type="submit">
//           Add Sensor
//         </Button>
//       </Form>
//     </div>);
//   }
// }
