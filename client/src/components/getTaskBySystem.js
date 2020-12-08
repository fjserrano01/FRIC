import React, { Component, useState } from 'react'
import { Table, Button, Fade } from 'react-bootstrap'
import api, { getFindingByTask } from '../api'
import * as moment from 'moment'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import GetSubtaskByTask from '../components/getSubtaskByTask'
import GetFindingByTask from '../components/getFindingByTask'

class GetTaskBySystem extends Component{
    constructor(props){
        super(props);
        this.state = {
            taskList:[]
        }
    }
    componentDidMount(){
        this.setTaskList()
    }
    displaySecondCell = (posts, info) =>{
      this.props.display(posts, info)
    }
    setTaskList = async e =>{
        await api.getTaskBySystem(this.props.system).then((res) =>{
            const data = res.data.data
            if(data == null){
                this.setState({taskList:[]})
            }else{
                this.setState({taskList:data})
            }
            
        }).catch(()=>{
            this.setState({taskList:[]})
            })
    }
    displayTask = (posts) =>{
        if(!posts.length)return null;
        return posts.map((post, index)=>(
          <div key={index}>
            <Accordion>
                      <Card>
                        <Card.Header>
                        <div>Task</div>
                          <Accordion.Toggle as={Button} variant="link" eventKey="0" >
                            {post.taskTitle}
                          </Accordion.Toggle>
                          <button onClick={()=> this.displaySecondCell(post, "task")} >view</button>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                          <GetSubtaskByTask display={this.displaySecondCell.bind(this)} taskID={post._id}/>
                          </Card.Body>
                        </Accordion.Collapse>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                          <GetFindingByTask display={this.displaySecondCell.bind(this)} taskID={post._id}/>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
          </div>
        ))
      }

    render(){
        return (<div>{this.displayTask(this.state.taskList)}</div>)
    }

}

export default GetTaskBySystem
