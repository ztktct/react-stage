import * as React from 'react';
import { Link } from 'react-router-dom';

const Logo = require('../../static/logo.png');

export default class extends React.Component {
  render() {
    return (<Link to="/other">
      <img src={Logo} alt="点我达" />
      <h1>Hello Worda!</h1>
    </Link>);
  }
}
