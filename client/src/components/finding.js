import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import api from '../api'
import * as moment from 'moment'


class Finding extends Component{
    constructor(props){
        super(props);
        this.state = {
            findingList:[]
        }
    }
    setTasks = async e =>{
        await api.getAllFindings().then((res)=>{
          const data = res.data.data
          
          this.setState({findingList:data})
          console.log(this.state.findingList)
          console.log(this.state.findingList.length)

          
        }).catch(()=>{
          this.setState({findingLists:[]})
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
                        {post._id}
                    </th>
                    <th>
                        Title
                    </th>
                    <th>
                        System
                    </th>
                    <th>
                        Task
                    </th>
                    <th>
                        Subtask
                    </th>
                    <th>
                        Analyst
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
                        Risk
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
                <a className="btn btn-primary" href="/create-finding">Create Finding</a>
                <a className="btn btn-primary" href="/create-finding">ERB Report</a>
                <a className="btn btn-primary" href="/create-finding">Risk Matrix</a>
                <a className="btn btn-primary" href="/create-finding">Final Report</a>
                <Table bordered hover>
                    <thead>
                        <th>ID</th>
                        <th>Title</th>
                        <th>System</th>
                        <th>Task</th>
                        <th>Subtask</th>
                        <th>Analyst</th>
                        <th>Status</th>
                        <th>Classification</th>
                        <th>Type</th>
                        <th>Risk</th>
                        <th>View</th>
                    </thead>
                    <tbody>
                        {
                            this.displayEvent(this.state.findingList)
                        }
                    </tbody>
                </Table>
            </div>
            
        )
    }
}
export default Finding