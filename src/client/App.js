import React, { Component } from "react";
import "./app.css";
import InputForm from "./Components/inputForm";
import Loader from "./Components/loader";
import { SucessMessage, ErrorMessage } from "./Components/messages";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetching: false,
      data: null,
    };

    this.requestData = this.requestData.bind(this);
  }

  requestData(accountName, region) {
    this.setState({ fetching: true, data: null });
    const timeOffset = new Date().getTimezoneOffset();
    fetch(`/api/getPlaytime/${region}/${accountName}?timeOffset=${timeOffset}`)
      .then((res) => res.json())
      .then((json) => {
        this.setState(
          json.error
            ? { fetching: false, data: { error: json.error } }
            : { fetching: false, data: { name: accountName, time: json.time } }
        );
      })
      .catch(() => {
        this.setState({ fetching: false, data: { error: "Unknown error" } });
      });
  }

  render() {
    const { fetching, data } = this.state;

    return (
      <div className="flex-wrapper">
        <main>
          {fetching ? (
            <Loader />
          ) : (
            <InputForm requestFunction={this.requestData} />
          )}
          {data &&
            (data.error ? (
              <ErrorMessage value={data.error} />
            ) : (
              <SucessMessage value={data} />
            ))}
        </main>
      </div>
    );
  }
}
