import React, {Component} from 'react';
import api from '../api';
import { Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import GetTaskBySystem from '../components/getTaskBySystem'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import {store} from 'react-notifications-component'
import * as moment from 'moment'
import GetFindingBySystem from '../components/getFindingBySystem'

class General extends Component{
  constructor(props){
    super(props);
    this.state = {
        eventList:[],
        systemList:[],
        taskListByDate:[],
        taskListByDateLate:[],
        progress:[],
        eventInformation:[],
        type:"",
        notified:false,
        notifiedLate:false
    }
}
componentDidMount(){
  console.log("in componentDidMount general")
    this.getEvents()
    this.getSystems()
    this.getProgress()
    this.getTasksByDate()
    this.getTasksByDateLate()
}
addNot (posts){
  console.log("in addNot",posts)
  if(!posts.length) return null;
  if(this.state.notified == true){
    return null
  }
  this.setState({notified:true})
  return posts.map((post, index)=>(
  <div key={index}>
      {
      store.addNotification({
        title: post.taskTitle,
        message: " Task is due soon "+moment(post.dueDate).format('MM-DD-YY'),
        type:"success",
        insert:"top",
        container:"top-right",
        animationIn:["animate__animated","animate__fadeIn"],
        animationOut:["animate__animated","animate__fadeOut"],
        dismiss:{
          duration:5000,
          onScreen:true
        },
        width:500
        
      })}
  </div>
  ))
}
addNotLate (posts){
  console.log("In addNotLate",posts)
  if(!posts.length) return null;
  if(this.state.notifiedLate == true){
    return null
  }
  this.setState({notifiedLate:true})
  return posts.map((post, index)=>(
  <div key={index}>
      {
      store.addNotification({
        title: post.taskTitle,
        message: " Task is past due "+moment(post.dueDate).format('MM-DD-YY'),
        type:"danger",
        insert:"top",
        container:"top-right",
        animationIn:["animate__animated","animate__fadeIn"],
        animationOut:["animate__animated","animate__fadeOut"],
        dismiss:{
          duration:5000,
          onScreen:true
        },
        width:500
        
      })}
  </div>
  ))
}
getTasksByDate = async e =>{
  await api.getTasksByDate(this.props.init).then((res)=>{
    const data = res.data.data
    this.setState({taskListByDate:data})
    
    }).catch(()=>{
    this.setState({taskListByDate:[]})
    })
}
getTasksByDateLate = async e =>{
  console.log("in getTaskByDateLate")
  await api.getTasksByDateLate(this.props.init).then((res)=>{
    const data = res.data.data
    console.log("data:", data)
    this.setState({taskListByDateLate:data})
    
    }).catch(()=>{
    this.setState({taskListByDateLate:[]})
    })
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

getProgress = async e =>{
  await api.getEventProgress().then((res) => { 
    const data = res.data.data
    this.setState({progress : [data]})
}).catch(() =>{
    this.setState({progress:[]})
})
}

displayProgress = (progress) => {
  //console.log('in progress')
  //console.log(progress[0])
  if(!progress.length) return null;
  return progress.map((progress, index)=>(
  <div>
    <div>
      Tasks Not Started: {progress.notStarted} / {progress.total}
    </div>
    <div>
      Tasks in Progress: {progress.inProgress} / {progress.total}
    </div>
      Complete tasks: {progress.complete} / {progress.total}
    <div>
      Tasks total: {progress.total}
    </div>
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
      <div key={index} className="form-group">
      <h2>View Task</h2>
      <form onSubmit={this.setVariables}>
      <div className="form-group">
        <label >Title</label>
        <input 
          onChange={this.handleChange} 
          type="text" 
          value={post.taskTitle}
          name="taskTitle"
          className="form-control" 
          placeholder="Enter Task Title"
          contentEditable="true"
          />
      </div>
      <div className="form-group">
        <label >Task Description</label>
        <input 
          onChange={this.handleChange} 
          type="text" 
          value={post.taskDescription}
          name="taskDescription"
          className="form-control" 
          
          />
      </div>
      <div class="form-group">
        <label >System</label>
        <input 
          onChange={this.handleChange} 
          type="text" 
          value={post.system}
          name="system"
          class="form-control" 
          />
      </div>
      <div class="form-group">
        <label >Analyst</label>
        <input 
          onChange={this.handleChange} 
          type="text" 
          value={post.analyst}
          name="analyst"
          class="form-control" 
          />
      </div>
      <div class="form-group">
      <label>Priority</label>
        <select 
          placeholder="Not Selected" 
          onChange={this.handleChange}  
          value={post.priority}
          class="form-control" 
          name="priority" 
           >
              <option value="" disabled selected>Choose your option</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
        </select>
        </div>
        <div class="form-group">
        <label>Progress</label>
        <select 
          placeholder="Not Selected" 
          onChange={this.handleChange}  
          value={post.progress}
          class="form-control" 
          name="progress" 
           >
              <option value="" disabled selected>Choose your option</option>
              <option value="Not Started">Not Started</option>
              <option value="Assigned">Assigned</option>
              <option value="Transferred">Transferred</option>
              <option value="In Progress">In Progress</option>
              <option value="Complete">Complete</option>
              <option value="Not Applicable">Not Applicable</option>
        </select>
      </div>
      <div class="form-group">
        <label>Collaborators</label>
        <input 
          type="text" 
          onChange={this.handleChange}  
          value={post.collaborators}
          class="form-control" 
          name="collaborators"
          
           />
      </div>
      <div class="form-group">
        <label class="control-label" for="date">Due Date: </label>
        <input 
          type="text" 
          onChange={this.handleChange}  
          value={moment(post.dueDate).format('MM-DD-YY')}
          class="form-control" 
          name="dueDate"
          />
      </div>
      
      </form>
      <div>
          Number of Findings: {post.numFindings}
      </div>
      <div>
          Number of Substasks: {post.numFindings}
      </div>
  </div>
    ))
  }
  if(this.state.type == "subtask"){
    return posts.map((post, index)=>(
      <div key={index} className="form-group">
                    <h2>View Subtask</h2>
                    <form onSubmit={this.setVariables}>
                    <div className="form-group">
                      <label >Title</label>
                      <input 
                        onChange={this.handleChange} 
                        type="text" 
                        value={post.subtaskTitle}
                        name="subtaskTitle"
                        className="form-control" 
                        placeholder="Enter Subtask Title"
                        />
                    </div>
                    <div className="form-group">
                      <label >Subtask Description</label>
                      <input 
                        onChange={this.handleChange} 
                        type="text" 
                        value={post.subtaskDescription}
                        name="subtaskDescription"
                        className="form-control" 
                        
                        />
                    </div>
                    <div class="form-group">
                      <label >Subtask Team</label>
                      <input 
                        onChange={this.handleChange} 
                        type="text" 
                        value={post.subtaskTeam}
                        name="subtaskTeam"
                        class="form-control" 
                        />
                    </div>
                    <div class="form-group">
                      <label >Subtask Attachment</label>
                      <input 
                        onChange={this.handleChange} 
                        type="float" 
                        value={post.subtaskAttachment}
                        name="subtaskAttachment"
                        class="form-control" 
                        />
                    </div>
                    <div class="form-group">
                      <label >Subtask Association</label>
                      <input 
                        onChange={this.handleChange} 
                        type="text" 
                        value={post.subtaskAssociation}
                        name="subtaskAssociation"
                        class="form-control" 
                        />
                    </div>
                      <div class="form-group">
                      <label>Progress</label>
                      <select 
                        placeholder="Not Selected" 
                        onChange={this.handleChange}  
                        value={post.subtaskProgress}
                        class="form-control" 
                        name="subtaskProgress" 
                         >
                            <option value="" disabled selected>Choose your option</option>
                            <option value="Not Started">Not Started</option>
                            <option value="Assigned">Assigned</option>
                            <option value="Transferred">Transferred</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Complete">Complete</option>
                            <option value="Not Applicable">Not Applicable</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Collaborators</label>
                      <input 
                        type="text" 
                        onChange={this.handleChange}  
                        value={post.subtaskCollaborators}
                        class="form-control" 
                        name="subtaskCollaborators"
                        
                         />
                    </div>
                    <div class="form-group">
                      <label class="control-label" for="date">Due Date: </label>
                      <input 
                        type="text" 
                        onChange={this.handleChange}  
                        value={moment(post.subtaskDueDate).format('MM-DD-YY')}
                        class="form-control" 
                        name="subtaskDueDate"
                        />
                    </div>
                    </form>
                </div>
    ))
  }
  if(this.state.type == "finding"){
    return posts.map((post, index) => (
      <div key={index} className="form-group">
          <h2>View Finding</h2>
          
          <Form onSubmit={this.setVariables} >
      
          <Form.Group controlId="host">
              <Form.Label className="padding-add">Host Name </Form.Label>
              <Form.Control type="text" value = {post.hostName} name = "hostName" onChange = {this.handleChange}/>
          </Form.Group>

          <Form.Group controlId="ip">
              <Form.Label>IP Port </Form.Label>
              <Form.Control type="text" value = {post.ipPort} name = "ipPort" onChange = {this.handleChange}/>
          </Form.Group>

          <Form.Group controlId="desc">
              <Form.Label>Description </Form.Label>
              <Form.Control type="text" value = {post.description} name = "description" onChange = {this.handleChange}/>
          </Form.Group>

          <Form.Group controlId="longDesc">
              <Form.Label>Detailed Description </Form.Label>
              <Form.Control as="textarea" rows={3} value = {this.longDescription} name = "longDescription" onChange = {this.handleChange}/>
          </Form.Group>
          <Form.Group>
              <Form.Label className="padding-add">System </Form.Label>
              <select value = {post.system} name = "system" onChange = {this.handleChange}>
                <option value={post.system} selected> {post.system}</option>
                      
                  </select>
          </Form.Group>
          <Form.Group>
              <Form.Label className="padding-add">Task </Form.Label>
              <select value = {post.task} name = "task" onChange = {this.handleChange}>
              <option value={post.task} selected> {post.task}</option>
                  </select>
          </Form.Group>
          <Form.Group>
              <Form.Label className="padding-add">Subtask </Form.Label>
              <select value = {post.subtask} name = "subtask" onChange = {this.handleChange}>
              <option value={post.subtask} selected> {post.subtask}</option>
                  </select>
          </Form.Group>

          <Form.Group controlId="status">
              <Form.Label>Status </Form.Label>
              <Form.Control type="text" value = {post.status} name = "status" onChange = {this.handleChange}/>
          </Form.Group>

          <Form.Group controlId="type">
              <Form.Label>Type </Form.Label>
              <Form.Control type="text" value = {post.type} name = "type" onChange = {this.handleChange}/>
          </Form.Group>

          <Form.Group controlId="class">
              <Form.Label>Classification </Form.Label>
              <Form.Control type="text" value = {post.classification} name = "classification" onChange = {this.handleChange}/>
          </Form.Group>

          <Form.Group controlId="assoc">
              <Form.Label>Findings linked to </Form.Label>
              <Form.Control type="text" value = {post.associationToFinding} name = "associationToFinding" onChange = {this.handleChange}/>
          </Form.Group>

          <Form.Group>
              <Form.Label className="padding-add">Posture </Form.Label>
              <select value = {post.posture} name = "posture" onChange = {this.handleChange}>
              <option value={post.posture} selected> {post.posture}</option>
                      
                  </select>
          </Form.Group>

          <Form.Group controlId="CImpact">
              <Form.Label className="padding-add">Confidentiality </Form.Label>
              <select value = {post.confidentialityImpact} name = "confidentialityImpact" onChange = {this.handleChange}>
              <option value={post.confidentialityImpact} selected> {post.confidentialityImpact}</option>
              </select>
          </Form.Group>

          <Form.Group controlId="IImpact">
              <Form.Label className="padding-add">Integrity </Form.Label>
              <select value = {post.integrityImpact} name = "integrityImpact" onChange = {this.handleChange}>
              <option value={post.integrityImpact} selected> {post.integrityImpact}</option>
              </select>
          </Form.Group>

          <Form.Group controlId="AImpact">
              <Form.Label className="padding-add">Availability </Form.Label>
              <select value = {post.availabilityImpact} name = "availabilityImpact" onChange = {this.handleChange}>
              <option value={post.availabilityImpact} selected> {post.availabilityImpact}</option>
                  
              </select>
          </Form.Group>

          <Form.Group controlId = "CounterValue">
              <Form.Label className="padding-add">Countermeasure </Form.Label>
              <select value = {post.countermeasureValue} name = "countermeasureValue" onChange = {this.handleChange}>
              <option value={post.countermeasureValue} selected> {post.countermeasureValue}</option>
                  </select>
          </Form.Group>

          <Form.Group controlId = "ImpactLvl">
              <Form.Label className="padding-add">Impact Level </Form.Label>
                  <select value = {post.impactLevel} name = "impactLevel" onChange = {this.handleChange}>
                  <option value={post.impactLevel} selected> {post.impactLevel}</option>
                  </select>
                  
          </Form.Group>
          <Form.Group controlId = "ImpactLvlDes">
              <Form.Label className="padding-add">Impact Level Description </Form.Label>
                  
                  <Form.Control type="text" value = {post.impactLevelDescription} name = "impactLevelDescription" onChange = {this.handleChange}/>
                  
          </Form.Group>

          <Form.Group controlId = "ThreatRelevance">
              <Form.Label className="padding-add">Threat Relevance </Form.Label>
              <select value = {post.threatRelevance} name = "threatRelevance" onChange = {this.handleChange}>
              <option value={post.threatRelevance} selected> {post.threatRelevance}</option>
              </select>

          </Form.Group>

          <Form.Group controlId = "CAT">
              <Form.Label className="padding-add">CAT Score </Form.Label>
              <select value={post.catScore}name="catScore"onChange={this.handleChange}>
              <option value={post.catScore} selected> {post.catScore}</option>
              </select>
          </Form.Group>

          <Button type = "submit"onClick="console.log(finding button clicked)" >Edit</Button>
      </Form>
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
                  <div>System</div>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0" >
                      {post.systemName}
                    </Accordion.Toggle>
                    <button onClick={()=> this.displaySecondCell(post, "system")} >view</button>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                    <GetTaskBySystem display={this.displaySecondCell.bind(this)} system={post._id} />
                    </Card.Body>
                  </Accordion.Collapse>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                    <GetFindingBySystem display={this.displaySecondCell.bind(this)} system={post._id} />
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
      <ReactNotification types={[{htmlClasses:["notification-right"]}]}/>
    <div className="row">
    <div style={{display:'none'}}>{this.addNot(this.state.taskListByDate)}</div>
    <div style={{display:'none'}}>{this.addNotLate(this.state.taskListByDateLate)}</div>
    <div className="col-5">
      {this.displayEvent(this.state.eventList)}
    </div>
    <div className="col-5 addBorder">
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