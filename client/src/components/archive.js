import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import api from '../api'
import * as moment from 'moment'


class Archive extends Component{
    constructor(props){
        super(props);
        this.state = {
            tasksList:[],
            findingList:[],
            systemList:[],
            subtaskList:[],

            
        }
    }
    setTasks = async e =>{
        await api.getArchivedTasks().then((res)=>{
          const data = res.data.data
          
          this.setState({tasksList:data})
          console.log(this.state.tasksList)
          console.log(this.state.tasksList.length)

          
        }).catch(()=>{
          this.setState({tasksLists:[]})
        })
    }
    setFindings = async e =>{
        await api.getArchivedFindings().then((res)=>{
          const data = res.data.data
          
          this.setState({findingList:data})
          console.log(this.state.findingList)
          console.log(this.state.findingList.length)

          
        }).catch(()=>{
          this.setState({findingLists:[]})
        })
    }
    setSubtasks = async e =>{
        await api.getArchivedSubtasks().then((res)=>{
          const data = res.data.data
          console.log(data)
          
          this.setState({subtaskList:data}) //if gettaskbyID wrap with []
          console.log(this.state.subtaskList)

          
        }).catch(()=>{
          this.setState({subtaskLists:[]})
        })
    }
    setSystem = async e =>{
        console.log("In setSystem")
        await api.getArchivedSystems().then((res)=>{
          const data = res.data.data
          console.log("in getall")
          console.log(data)
          
          this.setState({systemList:data})
          console.log(this.state.systemList)

          
        }).catch(()=>{
          this.setState({systemList:[]})
        })
    }
    componentDidMount(){
        this.setTasks()
        this.setSystem()
        this.setSubtasks()
        this.setFindings()
    }
    displayEvent = (posts) => {
        console.log(posts.length)
        if(!posts.length) return null;
        return posts.map((post, index) => (
                <tr key={index}>
                    <th>
                        {post.taskTitle}
                    </th>
                    <th>
                        {post.taskDescription}
                    </th>
                    <th>
                        {post.analyst}
                    </th>
                    <th>
                        {post.progress}
                    </th>
                    <th>
                        {post.numFindings}
                    </th>
                    <th>
                        {moment(post.dueDate).format('MM-DD-YY')}
                    </th>
                    
                        
                </tr>
        ))
    }
    displaySubtask = (posts) => {
        console.log("you are in subtask displaysubtask")
        console.log(posts)
        if(!posts.length) return null;
        return posts.map((post, index) => (
                <tr key={index}>
                    <th>
                        {post.subtaskTitle}
                    </th>
                    <th>
                        {post.subtaskDescription}
                    </th>
                    <th>
                        {post.subtaskProgress}
                    </th>
                    <th>
                        {post.subtaskAssociation}
                    </th>
                    <th>
                        {moment(post.subtaskDueDate).format('MM-DD-YY')}
                    </th>
                    
                        
                </tr>
        ))
    }
    displayFinding = (posts) => {
        console.log(posts.length)
        if(!posts.length) return null;
        return posts.map((post, index) => (
                <tr key={index}>
                    <th>
                        {post._id}
                    </th>
                    <th>
                        {post.hostName}
                    </th>
                    <th>
                    {post.analyst}
                    </th>
                    <th>
                        {post.status}
                    </th>
                    <th>
                        {post.classification}
                    </th>
                    <th>
                        {post.type}
                    </th>
                    <th>
                    {post.threatRelevance}
                    </th>
                    
                        
                </tr>
        ))
    }
    displaySystem = (posts) => {
        console.log("you are in system displaysubtask")
        console.log(posts)
        if(!posts.length) return null;
        return posts.map((post, index) => (
                <tr key={index}>
                    <th>
                        {post.systemName}
                    </th>
                    <th>
                        {post.systemDescription}
                    </th>
                    <th>
                        {post.testPlan}
                    </th>
                    <th>
                        {post.systemConfidentiality}
                    </th>
                    
                        
                </tr>
        ))
    }
    render(){
        console.log("in render archive")
        return(
            <div className="container">
                <a className="btn btn-primary" href="/create-task">Create Task</a>
                <Table bordered hover>
                    <thead>
                        <th>Title</th>
                        <th>Task</th>
                        <th>Analyst</th>
                        <th>Progress</th>
                        <th>No. of Findings</th>
                        <th>Due Date</th>
                    </thead>
                    <tbody>
                        {
                            this.displayEvent(this.state.tasksList)
                        }
                    </tbody>
                </Table>
                <Table bordered hover>
                    <thead>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Analyst</th>
                        <th>Status</th>
                        <th>Classification</th>
                        <th>Type</th>
                        <th>Risk</th>
                        
                    </thead>
                    <tbody>
                        {
                            this.displayFinding(this.state.findingList)
                        }
                    </tbody>
                </Table>

                <Table bordered hover>
                    <thead>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Test Plan</th>
                        <th>Confidentiality</th>
                    </thead>
                    <tbody>
                        {
                            this.displaySystem(this.state.systemList)
                        }
                    </tbody>
                </Table>
                <Table bordered hover>
                    <thead>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Progress</th>
                        <th>Association</th>
                        <th>Due Date</th>
                        
                    </thead>
                    <tbody>
                        {
                            this.displaySubtask(this.state.subtaskList)
                        }
                    </tbody>
                </Table>
            </div>
            
        )
    }
}
export default Archive