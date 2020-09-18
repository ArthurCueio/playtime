import React, { Component } from 'react';
import './app.css';
import InputForm from './Components/inputForm';
import Loader from './Components/loader';
import { SucessMessage, ErrorMessage } from './Components/messages';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetching: false,
      ok: false,
      data: null
    };

    this.requestData = this.requestData.bind(this);
  }

  requestData(accountName, region) {
    this.setState({ fetching: true, data: null });
    fetch(`/api/getHours/${region}/${accountName}`)
      .then(res => {
        this.setState({ok: res.ok});
        return res.json();
      })
      .then(json => {
        const { ok } = this.state;
        this.setState(ok ? { fetching: false, data: {name: accountName, time: json} } : { fetching: false, data: {}});
      })
      .catch(err => {
        this.setState({ fetching: false, ok: false, data: {}});
      });
  }

  render() {
    const { fetching, data, ok } = this.state;

    return (
      <div className="flex-wrapper">
        <main>
          { fetching ? <Loader /> : <InputForm requestFunction={this.requestData} /> }
          {data && (
            ok ? <SucessMessage value={data}/> : <ErrorMessage />
          )}
        </main>
      </div>
    )
  }
}
