import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


class Login extends Component {
    constructor() {
        super();
        this.state = {
            initials:  "",
            loginErrors: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    loginUser () {
        this.props.login(this.state.initials);
    }
    render(){
        return(
            <div class="container">
                <h2>Log In</h2>
                <Form >
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Initials</Form.Label>
                        <Form.Control name="initials" onChange={this.handleChange} type="text" placeholder="Enter Your Initials" />
                    </Form.Group>
                    <Button onClick={this.loginUser.bind(this)} variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}

export default Login