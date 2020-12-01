import React, { Component, useState } from 'react'
import { Table, Button, Fade } from 'react-bootstrap'
import api from '../api'
import * as moment from 'moment'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

class GetSubtaskByTask extends Component{
    constructor(props){
        super(props);
        this.state = {
            subtaskList:[]
        }
    }
    componentDidMount(){
        this.setSubTaskList()
    }
    displaySecondCell = (posts, info) =>{
      this.props.display(posts, info)
    }
    setSubTaskList = async e =>{
        await api.getSubtaskByTask(this.props.taskID).then((res) =>{
            const data = res.data.data
            if(data == null){
                this.setState({subtaskList:[]})
            }else{
                this.setState({subtaskList:data})
            }
            
        }).catch(()=>{
            this.setState({subtaskList:[]})
            })

    }
    displaySubTask = (posts) =>{
        if(!posts.length)return null;
        return posts.map((post, index)=>(
          <div key={index}>
            <Accordion>
                      <Card>
                        <Card.Header>
                          <Accordion.Toggle as={Button} variant="link" eventKey="0" >
                            {post.subtaskTitle}
                          </Accordion.Toggle>
                          <button onClick={()=> this.displaySecondCell(post, "subtask")} >view</button>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                          hello
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
          </div>
        ))
      }

    render(){
        return (<div>{this.displaySubTask(this.state.subtaskList)}</div>)
    }

}

export default GetSubtaskByTask
