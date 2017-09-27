import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Avater from '../../images/Avater.jpg';

export default class extends Component {
  render() {
    return (<Link to="/home">
      <img src={Avater} alt="点我达" width="200" />
      <h1>Hello Dora!</h1>
    </Link>);
  }
}
