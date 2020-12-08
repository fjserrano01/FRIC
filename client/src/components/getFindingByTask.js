import React, { Component, useState } from 'react'
import { Table, Button, Fade } from 'react-bootstrap'
import api from '../api'
import * as moment from 'moment'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

class GetFindingByTask extends Component{
    constructor(props){
        super(props);
        this.state = {
            findingList:[]
        }
    }
    componentDidMount(){
        this.setFindingList()
    }
    displaySecondCell = (posts, info) =>{
      this.props.display(posts, info)
    }
    setFindingList = async e =>{
        await api.getFindingByTask(this.props.taskID).then((res) =>{
            const data = res.data.data
            if(data == null){
                this.setState({findingList:[]})
            }else{
                this.setState({findingList:data})
            }
            
        }).catch(()=>{
            this.setState({findingList:[]})
            })
    }
    displayFinding = (posts) =>{
        if(!posts.length)return null;
        return posts.map((post, index)=>(
          <div key={index}>
            <Accordion>
                      <Card>
                        <Card.Header>
                        <div>Finding</div>
                          <Accordion.Toggle as={Button} variant="link" eventKey="0" >
                            {post.hostName}
                          </Accordion.Toggle>
                          <button onClick={()=> this.displaySecondCell(post, "finding")} >view</button>
                        </Card.Header>
                      </Card>
                    </Accordion>
          </div>
        ))
      }
    render(){
        return (<div>{this.displayFinding(this.state.findingList)}</div>)
    }

}

export default GetFindingByTask
