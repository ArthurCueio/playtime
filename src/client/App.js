import React, { Component } from 'react';
import './app.css';
import InputForm from './Components/inputForm';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      result: { time: {} },
    };

    this.requestPlayTime = this.requestPlayTime.bind(this);
  }

  requestPlayTime(accountName, region) {
    fetch(`/api/getHours/${region}/${accountName}`)
      .then(res => res.json())
      .then(time => this.setState({ result: { time }, name: accountName }));
  }

  render() {
    const { result, name } = this.state;
    const { time } = result;
    return (
      <div>
        <InputForm requestFunction={this.requestPlayTime} />
        { name !== ''
          ? <p>{`Of the last 24 hours ${name} spent ${time.hours}:${time.minutes}:${time.seconds} playing`}</p>
          : <p>/\ Enter summoner name and region above /\</p>}
      </div>
    );
  }
}
