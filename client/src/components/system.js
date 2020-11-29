import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import api from '../api'
import * as moment from 'moment'


class system extends Component{
    constructor(props){
        super(props);
        this.state = {
            systemList:[]
        }
    }
    setSystem = async e =>{
        console.log("In setSystem")
        await api.getAllSystems().then((res)=>{
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
        console.log("you are in system componentDidMount")
        this.setSystem()
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
                    <th>
                        <a className="btn btn-primary" href={'/viewSystem/'+post._id}>View</a>
                    </th>
                        
                </tr>
        ))
    }
    render(){
        
        return(
            <div className="container">
                <a className="btn btn-primary" href="/create-system">Create System</a>
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
            </div>
            
        )
    }
}
export default system