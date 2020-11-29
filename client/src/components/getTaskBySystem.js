import React, { Component, useState } from 'react'
import { Table, Button, Fade } from 'react-bootstrap'
import api from '../api'
import * as moment from 'moment'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import GetSubtaskByTask from '../components/getSubtaskByTask'

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
      console.log("in getTasksBySystem")
      this.props.display(posts, info)
    }
    setTaskList = async e =>{
        await api.getTaskBySystem(this.props.system).then((res) =>{
            const data = res.data.data
            if(data == null){
                this.setState({taskList:[]})
            }else{
                this.setState({taskList:[data]})
            }
            
        }).catch(()=>{
            this.setState({taskList:[]})
            })

    }
    displayTask = (posts) =>{
        //console.log("in display system")
        console.log(posts)
        if(!posts.length)return null;
        return posts.map((post, index)=>(
          <div key={index}>
            <Accordion>
                      <Card>
                        <Card.Header>
                          <Accordion.Toggle as={Button} variant="link" eventKey="0" >
                            {post.taskTitle}
                          </Accordion.Toggle>
                          <button onClick={()=> this.displaySecondCell(post, "task")} >view</button>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                          <GetTaskBySystem display={this.displaySecondCell.bind(this)} task={post._id}/>
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
