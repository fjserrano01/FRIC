import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import api from '../api'
import * as moment from 'moment'


class subtask extends Component{
    constructor(props){
        super(props);
        this.state = {
            subtaskList:[]
        }
    }
    setSubtasks = async e =>{
        await api.getAllSubtask().then((res)=>{
          const data = res.data.data
          console.log(data)
          
          this.setState({subtaskList:data}) //if gettaskbyID wrap with []
          console.log(this.state.subtaskList)

          
        }).catch(()=>{
          this.setState({subtaskLists:[]})
        })
    }
    componentDidMount(){
        this.setSubtasks()
        console.log("you are in subtask componentDidMount")
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
                    <th>
                        <a className="btn btn-primary" href={'/viewSubtask/'+post._id}>View</a>
                    </th>
                        
                </tr>
        ))
    }
    render(){
        
        return(
            <div className="container">
                <a className="btn btn-primary" href="/create-subtask">Create Subtask</a>
                <Table bordered hover>
                    <thead>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Progress</th>
                        <th>Association</th>
                        <th>Due Date</th>
                        <th>View</th>
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
export default subtask