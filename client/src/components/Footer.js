import React, { Component } from 'react'
import { Navbar } from 'react-bootstrap'
import { Button } from 'react-bootstrap'


class Footer extends Component{
    render(){
        return(
            <Navbar fixed="bottom" bg="dark" variant="dark">
                <Button onClick={ () => this.props.onClick()} className="btn btn-primary">Logout</Button>
            </Navbar>
        )
    }
}
export default Footer;