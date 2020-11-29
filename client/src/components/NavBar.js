import React, { Component } from 'react'
import styled from 'styled-components'
import { Navbar } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { FormControl } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'

import Links from './Links'


class NavBar extends Component{
    render(){
        return(
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">F.R.I.C.</Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="/system">Systems</Nav.Link>
                <Nav.Link href="/tasks">Tasks</Nav.Link>
                <Nav.Link href="/subtask">Subtasks</Nav.Link>
                <Nav.Link href="/findings">Findings</Nav.Link>
                <Nav.Link href="/archive">Archive</Nav.Link>
                <Nav.Link href="/ConfigurationView">Configuration</Nav.Link>
                <Nav.Link href="/setup">Setup</Nav.Link>
                <Nav.Link href="/help">Help</Nav.Link>
                </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar>
            
        )
    }
}
export default NavBar