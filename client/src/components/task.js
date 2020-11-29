import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import api from '../api'
import * as moment from 'moment'


class Task extends Component{
    constructor(props){
        super(props);
        this.state = {
            tasksList:[]
            
        }
    }
    setTasks = async e =>{
        await api.getAllTasks().then((res)=>{
          const data = res.data.data
          
          this.setState({tasksList:data})
          console.log(this.state.tasksList)
          console.log(this.state.tasksList.length)

          
        }).catch(()=>{
          this.setState({tasksLists:[]})
        })
    }
    componentDidMount(){
        this.setTasks()
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
                    <th>
                        <a className="btn btn-primary" href={'/view-task/'+post._id}>View</a>
                    </th>
                        
                </tr>
        ))
    }
    render(){
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
                        <th>View</th>
                    </thead>
                    <tbody>
                        {
                            this.displayEvent(this.state.tasksList)
                        }
                    </tbody>
                </Table>
            </div>
            
        )
    }
}
export default Task