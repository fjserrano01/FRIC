import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import api from '../api'
import * as moment from 'moment'


class Log extends Component{
    constructor(props){
        super(props);
        this.state = {
            logList:[]
        }
    }
    setLog = async e =>{
        console.log("In setTransaction")
        await api.getlog().then((res)=>{
          const data = res.data.data
          console.log("in getall")
          console.log(data)
          
          this.setState({logList:data})
          console.log(this.state.logList)

          
        }).catch(()=>{
          this.setState({logList:[]})
        })
    }
    componentDidMount(){
        console.log("you are in log componentDidMount")
        this.setLog()
    }
    displayLog = (posts) => {
        console.log("you are in display log")
        console.log(posts)
        if(!posts.length) return null;
        return posts.map((post, index) => (
                <tr key={index}>
                    <th>
                        {post.initials}
                    </th>
                    <th>
                        {post.description}
                    </th>
                    <th>
                        {post.date}
                    </th>
                </tr>
        ))
    }
    render(){
        
        return(
            <div className="container">
                <Table bordered hover>
                    <thead>
                        <th>Initials</th>
                        <th>Description</th>
                        <th>Date</th>
                    </thead>
                    <tbody>
                        {
                            this.displayLog(this.state.logList)
                        }
                    </tbody>
                </Table>
            </div>
            
        )
    }
}
export default Log