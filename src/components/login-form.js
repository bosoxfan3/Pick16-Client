import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';

import { login } from '../actions/login';
import { required, nonEmpty } from '../validators';
import Input from './input';

export class LoginForm extends React.Component {
  onSubmit(values) {
    return this.props.dispatch(login(values.username, values.password));
  }
  render() {
    let error;
    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }
    return (
      <div>
        <form
          className="login-form"
          onSubmit={this.props.handleSubmit(values => 
            this.onSubmit(values)
          )}>
          {error}
          <h2>Log In</h2>
          <label htmlFor="username">Username</label>
          <Field
            component={Input}
            type="text"
            name="username"
            id="username"
            validate={[required, nonEmpty]}
          />
          <label htmlFor="password">Password</label>
          <Field
            component={Input}
            type="password"
            name="password"
            id="password"
            validate={[required, nonEmpty]}
          />
          <button disabled={this.props.pristine || this.props.submitting}>
            Log In
          </button>
        </form>
      </div>
    );
  }
}