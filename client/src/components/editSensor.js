import React, { Component } from "react";
import { Form, Button, Alert } from 'react-bootstrap'
import axios from 'axios';

export default class EditSensor extends Component {

  constructor(props) {
    super(props)


    this.onChangeSensorName = this.onChangeSensorName.bind(this);
    this.onChangeSensorType = this.onChangeSensorType.bind(this);
    this.onChangeSensorSnowDepthLimit = this.onChangeSensorSnowDepthLimit.bind(this);
    this.onChangeSensorBaseValue = this.onChangeSensorBaseValue.bind(this)
    this.onChangeSensorComment = this.onChangeSensorComment.bind(this)
    this.onChangeSensorAdminStatus = this.onChangeSensorAdminStatus.bind(this)
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      // id: '',
      name: '',
      type: '',
      snowDepthLimit: '',
      baseValue: '',
      comment: '',
      adminStatus: '',
      message: '',
      loading: false
    }
  }

  componentDidMount() {
    // console.log(this.props)
    axios.get(`${process.env.REACT_APP_API_URL}/sensors/` + this.props.match.params.id)
      .then(res => {
        console.log(res.data)
        this.setState({
          // id: res.data.id, 
          name: res.data.name,
          type: res.data.type,
          snowDepthLimit: res.data.snowDepthLimit,
          baseValue: res.data.baseValue,
          comment: res.data.comment,
          adminStatus: res.data.adminStatus
        });

      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeSensorName(e) {
    this.setState({ name: e.target.value })
  }

  onChangeSensorType(e) {
    this.setState({ type: e.target.value })
  }

  onChangeSensorSnowDepthLimit(e) {
    this.setState({ snowDepthLimit: e.target.value })
  }

  onChangeSensorBaseValue(e) {
    this.setState({ baseValue: e.target.value })
  }

  onChangeSensorComment(e) {
    this.setState({ comment: e.target.value })
  }

  onChangeSensorAdminStatus(e) {
    this.setState({ adminStatus: e.target.value })
  }

  onSubmit(e) {

    try {
      const sensorObject = {
        // id: this.state.id,
        name: this.state.name,
        type: this.state.type,
        snowDepthLimit: this.state.snowDepthLimit,
        baseValue: this.state.baseValue,
        comment: this.state.comment,
        adminStatus: this.state.adminStatus
      };

      const item = {
        id: this.state.id,
        name: this.state.name,
        snowDepth: 0,
        time:0
      };

      this.setState({
        message: 'Sensor Successfully Updated',
        loading: true
      })

      axios.put(`${process.env.REACT_APP_API_URL}/sensors/`  + this.props.match.params.id, sensorObject)
        .then((res) => {
          console.log(res)
          console.log('Sensor successfully updated')
          this.props.history.push('/sensors-list')
        }).catch((error) => {
          console.log(error)
        })

      // Redirect to Sensor List
      e.preventDefault()
    } catch {
      this.setState({ message: 'Error: Sensor is not Updated' })
    }
    this.setState({ loading: false })
  }

  render() {
    return (<div className="form-wrapper">
       <h2 className='text-center mb-4'>Update Sensor</h2>
      {this.state.message && <Alert variant='danger'>{this.state.message}</Alert>}
      <Form onSubmit={this.onSubmit}>
      

        <Form.Group controlId="Comment">
          <Form.Label>Comment</Form.Label>
          <Form.Control type="text" value={this.state.comment} onChange={this.onChangeSensorComment} required />
        </Form.Group>

        <Form.Group controlId="AdminStatus">
          <Form.Label>Status</Form.Label>
          <Form.Control as="select" value={this.state.adminStatus} onChange={this.onChangeSensorAdminStatus}>
          <option></option>
          <option>Öppen</option>
          <option>Stängd</option>
            </Form.Control> 
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Update Sensor
        </Button>
      </Form>
    </div>);
  }
}
