import React from "react";
import PropTypes from "prop-types";

class InputForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accountName: "",
      region: "NA",
    };

    this.regionList = [
      "BR",
      "EUNE",
      "EUW",
      "KR",
      "LAN",
      "LAS",
      "NA",
      "OCE",
      "RU",
      "TR",
      "JP",
    ];

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { accountName, region } = this.state;
    const { requestFunction } = this.props;
    requestFunction(accountName, region);
  }

  handleChange(event) {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { accountName, region } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="accountName"
          onChange={this.handleChange}
          value={accountName}
        />
        <select name="region" onChange={this.handleChange} value={region}>
          {this.regionList.map((r) => (
            <option value={r}>{r}</option>
          ))}
        </select>
        <button type="submit">Go</button>
      </form>
    );
  }
}

InputForm.propTypes = {
  requestFunction: PropTypes.func.isRequired,
};

export default InputForm;
