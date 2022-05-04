import React, { Component } from 'react';
import "./RegisterForm.css";
import { object, string, boolean, ref } from "yup";

const loginSchema = object({
  firstName: string().required().min(3),
  lastName: string().required().min(3),
  displayName: string().required().min(3),
  email: string().required().email(),
  password: string().required().min(8),
  passwordConf: string().required().oneOf([ref('password')]),
  joinAs: string().oneOf(['buyer', 'seller']).required(),
  isGoing: boolean(),
})

class RegisterForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      displayName: '',
      email: '',
      password: '',
      passwordConf: '',
      joinAs: '',
      isGoing: false,
      errors: {},
    };
  }

  setError(error) {
    this.setState((state) => {
      return {
        ...state,
        errors: { [error.path]: true },
      }
    })
  }

  onSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginSchema.validate(this.state)
    } catch (error){ 
      this.setError(error);
            console.log(error.message);

      return;
    }

    console.log(this.state);

    this.setState({
        firstName: '',
        lastName: '',
        displayName: '',
        email: '',
        password: '',
        passwordConf: '',
    })
  }

  onChange = async (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    const key =  event.target.name;

    this.setState((state)=>{
      return{
        ...state,
        [key]: value,
      }
    })
  }


  render() {
    return (
      <form className='registerForm' onSubmit={this.onSubmit}>
        <div className='inputLine'>
          <input 
            type="text"
            placeholder='First name'
            name='firstName'
            value={this.state.firstName}
            className={'input ' + (this.state.errors.firstName ? 'error' : '')}
            onChange={this.onChange}
          />

          <input 
            type="text" 
            placeholder='Last name'
            name='lastName'
            value={this.state.lastName}
            onChange={this.onChange}
            className={'input ' + (this.state.errors.lastName ? 'error' : '')}
          />
        </div> 

        <div className='inputLine'> 
          <input 
            type="text" 
            placeholder='Display name'
            name='displayName'
            value={this.state.displayName}
            onChange={this.onChange}
            className={'input ' + (this.state.errors.displayName ? 'error' : '')}
          />

          <input 
            type="text" 
            placeholder='Email Adress'
            name='email'
            value={this.state.email}
            onChange={this.onChange}
            className={'input ' + (this.state.errors.email ? 'error' : '')}
          />
        </div>

        <div className='inputLine'>
          <input 
            type="password" 
            placeholder='Password'
            name='password'
            value={this.state.password}
            onChange={this.onChange}
            className={'input ' + (this.state.errors.password ? 'error' : '')}
          />

          <input 
            type="password" 
            placeholder='Password Confirmation'
            name='passwordConf'
            value={this.state.passwordConf}
            onChange={this.onChange}
            className={'input ' + (this.state.errors.passwordConf ? 'error' : '')}
          />
        </div>

        <div className='radio '>
          <div className={'radioInput ' + (this.state.errors.joinAs ? 'error' : '')}>
            <input 
              type="radio" 
              name="joinAs" 
              id='buyer'
              value='buyer'
              onChange={this.onChange}
            />
            <label htmlFor="buyer">
              <div className='joinAs'>Join As a Buyer </div>
              <div className='descr'> I am looking for a Name, Logo or Tagline for my business, brand or product.</div>
            </label>
          </div>

          <div className={'radioInput ' + (this.state.errors.joinAs ? 'error' : '')}>
            <input 
              type="radio" 
              name="joinAs" 
              id="seller"
              value="seller"
              onChange={this.onChange}
            />
            <label htmlFor="seller">
            <div className='joinAs'>Join As a Creative or Marketplace Seller</div> 
            <div className='descr'> I plan to submit name ideas, Logo designs or sell names in Domain Marketplace.</div>
            </label>
          </div>
        </div>

        <div className='checkbox'>
          <input 
            type="checkbox" 
            id='allow'
            name="isGoing"
            checked={this.state.isGoing}
            onChange={this.onChange}
          />
          <label htmlFor="allow">
            Allow Squadhelp to send marketing/promotional offers from time to time
          </label>
        </div>
      
        <button className='createAcc' type='submit'>Create account</button>
      </form>
    )
  }
}

export default RegisterForm