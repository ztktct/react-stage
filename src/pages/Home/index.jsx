import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../images/logo.png';

export default class extends Component {
  render() {
    return (<Link to="/other">
      <img src={Logo} alt="点我达" />
      <h1>Hello Worda!</h1>
    </Link>);
  }
}
