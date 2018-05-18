import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.state = {
      events: [],
    };
  }
  componentDidMount() {
    console.log('1')
    this.loadEventsFromServer();
    console.log('loading');
  }

  loadEventsFromServer() {
    console.log('starting fetch')
    fetch('http://localhost:8080/api/events', {
      credentials: 'same-origin'
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          events: data._embedded.events,
        });
        console.log('fetch done');
      });
  }

  deleteEvent(event) {
    fetch(event._links.self.href,
      {
        method: 'DELETE',
        credentials: 'same-origin'
      })
      .then(
        res => this.loadEventsFromServer()
      )
      .catch(err => console.log(err))
    console.log('error')
  }

  createEvent(event) {
    fetch('http://localhost:8080/api/events', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event)
    })
      .then(
        res => this.loadEventsFromServer()
      )
      .catch(err => console.log(err))
  }

  render() {
    console.log('render')
    return (
      <div>
        <EventForm createEvent={this.createEvent} />
        <EventTable deleteEvent={this.deleteEvent} events={this.state.events} />
      </div>
    );

  }
}

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { eventName: '', type: '', date: '', time: '', place: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState(
      { [event.target.name]: event.target.value }
    );

  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('event name: ', this.state.eventName);
    var newEvent = {
      eventName: this.state.eventName,
      type: this.state.type,
      date: this.state.date,
      time: this.state.time,
      place: this.state.place
    }
    this.props.createEvent(newEvent);
  }

  render() {
    console.log('event form')
    return (
      <div className='panel panel-default'>
        <div className='panel-heading'>Create Event</div>
        <div className='panel-body'>
          <form className='form-inline'>
            <div className='col-md-2'>
              <input type='text' placeholder='Event name' className='form-control' name='eventName' onChange={this.handleChange} />
            </div>
            <div className='col-md-2'>
              <input type='text' placeholder='Type' className='form-control' name='type' onChange={this.handleChange} />
            </div>
            <div className='col-md-2'>
              <input type='text' placeholder='Date' className='form-control' name='date' onChange={this.handleChange} />
            </div>
            <div className='col-md-2'>
              <input type='text' placeholder='Time' className='form-control' name='time' onChange={this.handleChange} />
            </div>
            <div className='col-md-2'>
              <input type='text' placeholder='Place' className='form-control' name='place' onChange={this.handleChange} />
            </div>
            <div className='col-md-2'>
              <button className='btn btn-success' onClick={this.handleSubmit}>Save</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

class EventTable extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    let events = this.props.events.map(event =>
      <Event key={event._links.self.href} deleteEvent={this.props.deleteEvent} event={event} />
    );

    return (
      <div>
        <table className='table table-striped'>

          <tbody>
            <tr>
              <th>Name</th><th>Type</th><th>Date</th><th>Time</th><th>Place</th><th></th>
            </tr>

            {events}</tbody>
        </table>
      </div>
    );

  }
}

class Event extends React.Component {
  constructor(props) {
    super(props);

    console.log('propsit')
    console.log(this.props)

    this.deleteEvent = this.deleteEvent.bind(this);

  }
  deleteEvent() {
    this.props.deleteEvent(this.props.event);
  }

  render() {
    return (
      <tr>
        <td>{this.props.event.eventName}</td>
        <td>{this.props.event.type}</td>
        <td>{this.props.event.date}</td>
        <td>{this.props.event.time}</td>
        <td>{this.props.event.place}</td>
        <td>
          <button className='btn btn-danger' onClick={this.deleteEvent}>Delete</button>
        </td>
      </tr>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('root'));	