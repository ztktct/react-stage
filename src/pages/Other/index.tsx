import * as React from 'react';
import { Link } from 'react-router-dom';

const Avater = require('../../static/Avater.jpg');

export default class extends React.Component {
  render() {
    return (<Link to="/home">
      <img src={Avater} alt="Doraemon" width="200" />
      <h1>Hello Dora!</h1>
    </Link>);
  }
}
