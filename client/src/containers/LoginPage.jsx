import React, { PropTypes } from 'react';
import LoginForm from '../components/LoginForm.jsx';
import { browserHistory, Router } from 'react-router';


class LoginPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        username: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  validForm (username, password) {
      this.setState( { 
        errors: { 
          username: ( username.trim() == "") ? "required" : "", 
          password: ( password.trim() == "") ? "required" : "", 
          summary: ( username.trim() == "" || password.trim() == "") ? "invalid login" : ""
        } 
      });

      if ( username.trim() == "" || password.trim() == "" )
        return false;

      else 
        return true;
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    var username = this.state.user.username;
    var password = this.state.user.password;
    

    //validate form data
    var valid = this.validForm(username, password);


    // if form valid try login
    if ( valid ) {
      // static login and redirect to menues page
      if ( username == "admin" && password == "admin" ) {
          var user = { username: "admin", role: "admin" }
          browserHistory.push( { pathname: '/categories', state: { user: user } } );
      } else if ( username == "user" && password == "user" ) {
          var user = { username: "user", role: "user" }
          browserHistory.push( { pathname: '/categories', state: { user: user } } );
      } else {
        this.setState( { 
          errors: { 
            summary: "username or password is incorrect"
          } 
        });
      }
    }

  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }

}

export default LoginPage;