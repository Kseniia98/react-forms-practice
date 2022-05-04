import React, { Component } from 'react';
import "./AccForm.css";
import RegisterForm from '../RegisterForm';

export class AccForm extends Component {
  render() {
    return (
      <div className='accForm'>
        <h2>CREATE AN ACCOUNT</h2>
        <h3>We always keep your name and email address private.</h3>
        <RegisterForm />
      </div>
    )
  }
}

export default AccForm