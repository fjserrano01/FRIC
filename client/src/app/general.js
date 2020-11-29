import React, {Component} from 'react';
import api from '../api';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import GetTaskBySystem from '../components/getTaskBySystem'


class General extends Component{
  constructor(props){
    super(props);
    this.state = {
        eventList:[],
        systemList:[],
        //taskList:[],
        progress:[],
        eventInformation:[],
        type:""
    }
}
componentDidMount(){
  console.log("in componentDidMount general")
    this.getEvents()
    this.getSystems()
    // this.getTasks()
    this.getProgress()
}
getEvents = async e =>{
  //console.log("in getEvents")
    await api.getAllEvents().then((res)=>{
    const data = res.data.data
    //console.log(data)
    
    this.setState({eventList:data})
    
    }).catch(()=>{
    this.setState({eventList:[]})
    })
}
getSystems = async e =>{
  //console.log("in getSystesms")
  await api.getAllSystems().then((res)=>{
    const data = res.data.data
    console.log(data)

    this.setState({systemList:data})
  }).catch(()=>{
    this.setState({systemList:[]})
  })
}
// getTasks = async e =>{
//   console.log("in getTasks")
//   await api.getAllTasks().then((res)=>{
//     const data = res.data.data
//     console.log(data)

//     this.setState({taskList:data})
//   }).catch(()=>{
//     this.setState({taskList:[]})
//   })
// }
getProgress = async e =>{
  await api.getEventProgress().then((res) => { 
    const data = res.data.data
    this.setState({progress : [data]})
}).catch(() =>{
    this.setState({progress:[]})
})
}
// setTaskList = async (systemName)=>{
//   await api.getTaskBySystem(systemName).then((res)=>{
//     const data = res.data.data
//     console.log("in set data")
//     console.log(data)
//     return data
//   }).catch(()=>{
//     this.setState({tasksLists:[]})
//   })
// }
displayProgress = (progress) => {
  //console.log('in progress')
  //console.log(progress[0])
  if(!progress.length) return null;
  return progress.map((progress, index)=>(
  <div>
      Tasks Not Started: {progress.notStarted} / {progress.total}
      Tasks in Progress: {progress.inProgress} / {progress.total}
      Complete tasks: {progress.complete} / {progress.total}
      Tasks total: {progress.total} 
  </div>
  ))
}
displayingSystemInformation = () =>{
  //console.log("in displaySystemINformation")
  const posts = this.state.eventInformation
  //console.log(posts)
  if(!posts.length)return null;
  if(this.state.type == "system"){
    return posts.map((post, index)=>(
      <div key={index} className="form-group">
      <h2>View system</h2>
      <form onSubmit={this.handleSubmit}>
      <div className="form-group">
        <label >System</label>
        <input 
          onChange={this.handleChange} 
          type="text" 
          value={post.systemName}
          name="systemName"
          className="form-control" 
          placeholder="Enter System Name"
          />
      </div>
      <div className="form-group">
        <label >Description</label>
        <input 
          onChange={this.handleChange} 
          type="text" 
          value={post.systemDescription}
          name="systemDescription"
          className="form-control" 
          
          />
      </div>
      <div class="form-group">
        <label >Location</label>
        <input 
          onChange={this.handleChange} 
          type="text" 
          value={post.systemLocation}
          name="systemLocation"
          class="form-control" 
          />
      </div>
      <div class="form-group">
        <label >Router</label>
        <input 
          onChange={this.handleChange} 
          type="text" 
          value={post.systemRouter}
          name="systemRouter"
          class="form-control" 
          />
      </div>
      <div class="form-group">
        <label >Switch</label>
        <input 
          onChange={this.handleChange} 
          type="text" 
          value={post.systemSwitch}
          name="systemSwitch"
          class="form-control" 
          />
      </div>
      <div class="form-group">
        <label >Room</label>
        <input 
          onChange={this.handleChange} 
          type="text" 
          value={post.systemRoom}
          name="systemRoom"
          class="form-control" 
          />
      </div>
      <div class="form-group">
        <label>TestPlan</label>
        <input 
          type="text" 
          onChange={this.handleChange}  
          value={post.testPlan}
          class="form-control" 
          name="testPlan"
          
           />
      </div>
      <div class="form-group">
        <label >Confidentiality</label>
        <input 
          onChange={this.handleChange} 
          type="text" 
          value={post.systemConfidentiality}
          name="systemConfidentiality"
          class="form-control" 
          />
      </div>
      <div class="form-group">
        <label >Availability</label>
        <input 
          onChange={this.handleChange} 
          type="text" 
          value={post.systemAvailability}
          name="systemAvailability"
          class="form-control" 
          />
      </div>
      </form>
  </div>
    ))
  }
  if(this.state.type == "task"){
    return posts.map((post, index)=>(
        <div key={index}>
          {post.taskTitle}
          {post.taskDescription}
        </div>
    ))
  }
  if(this.state.type == "subtask"){
    return posts.map((post, index)=>(
      <div key={index}>
        {post.subtaskTitle}
      </div>
    ))
  }
}
displaySecondCell = (posts, info) =>{
  console.log("in displaySeconCell")
  console.log(info)
  this.setState({eventInformation: [posts], type: info})
}
displaySystem = (posts) =>{
  //console.log("in display system")
  if(!posts.length)return null;
  return posts.map((post, index)=>(
    <tr key={index}>
      <Accordion>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0" >
                      {post.systemName}
                    </Accordion.Toggle>
                    <button onClick={()=> this.displaySecondCell(post, "system")} >view</button>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                    <GetTaskBySystem display={this.displaySecondCell.bind(this)} system={post._id}/>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
    </tr>
  ))
}
displayEvent = (posts) => {
  //console.log("in displayEvent")
  //console.log(posts)
  if(!posts.length) return null;
        return posts.map((post, index) => (
            <tr key={index}>
              <div>
              <h3>{post.eventName}</h3>
              <div>
                {this.displaySystem(this.state.systemList)}
                
              </div>
              </div>
            </tr>
        ))
}
render(){
    return(
    <div className="container">
    <div className="row">
    <div className="col-5">
      {this.displayEvent(this.state.eventList)}
    </div>
    <div className="col-7 addBorder">
       {this.displayingSystemInformation()}
    </div>

    </div>
    
    
      <div>
        {this.displayProgress(this.state.progress)}
      </div>
    </div>
    )
}
}


export default General;