import React, { Component } from 'react';
import './app.css';
import InputForm from './Components/inputForm';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      result: { time: {} },
      fetching: false,
    };

    this.requestPlayTime = this.requestPlayTime.bind(this);
  }

  requestPlayTime(accountName, region) {
    this.setState({ fetching: true });
    fetch(`/api/getHours/${region}/${accountName}`)
      .then(res => res.json())
      .then(time => this.setState({ result: { time }, name: accountName, fetching: false }));
  }

  render() {
    const { result, name, fetching } = this.state;
    const { time } = result;

    let content;
    if (fetching) {
      content = (
        <div className="loader-wrapper">
          <div className="loader" />
          <p>Fetching data...</p>
        </div>
      );
    } else {
      content = (
        <div>
          <InputForm requestFunction={this.requestPlayTime} />
          {name !== ''
            ? <p>{`Of the last 24 hours ${name} spent ${time.hours}:${time.minutes}:${time.seconds} playing`}</p>
            : <p>/\ Enter summoner name and region above /\</p>}
        </div>
      );
    }

    return (
      <div className="flex-wrapper">
        <main>
          {content}
        </main>
      </div>
    );
  }
}
