import React, {Component} from 'react';
import api from '../api'
import { Redirect } from 'react-router-dom'
//import * as moment from 'moment'
import moment from 'moment'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
//import DatePicker from 'react-datepicker'
//import "react-datepicker/dist/react-datepicker.css"


class viewFinding extends Component{
    constructor(){
        super();
        this.state = {
          hostName:'',
	        ipPort:'',
	        description:'',
	        longDescription:'',
            status:'',
            system:'',
            task:'',
            subtask:'',
	        type:'',
            classification:'',
            posture:'',
            associationToFinding:'',
            confidentialityImpact:'',
            integrityImpact:'',
            availabilityImpact:'',
            threatRelevance:'',
            catScore:'',
          findingIdent:[],
          editStatus:false,
          archive:false,
          archiveSubmitted:false
          
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    handleSubmit = async e =>{
        e.preventDefault();
        const id = this.props.id
        const hostName = this.state.hostName
        const ipPort = this.state.ipPort
        const description = this.state.description
        const longDescription = this.state.longDescription
        const status = this.state.status
        const system = this.state.system
        const task = this.state.task
        const subtask = this.state.subtask
        const type = this.state.type
        const classification = this.state.classification
        const posture = this.state.posture
        const associationToFinding = this.state.associationToFinding
        const confidentialityImpact = this.state.confidentialityImpact
        const integrityImpact = this.state.integrityImpact
        const availabilityImpact = this.state.availabilityImpact
        const threatRelevance = this.state.threatRelevance
        const catScore = this.state.catScore
        const payload = {
          hostName, ipPort, description, longDescription, status, system, task, subtask, type, classification, posture, associationToFinding, confidentialityImpact, integrityImpact, availabilityImpact, threatRelevance, catScore
        }
        this.updateFinding(id, payload)
        this.log(hostName)
      };
      log = (hostName) =>{
        let initials = localStorage.getItem("initial")
        const description = "Editing Finding " + hostName
        const payload = {initials, description}
        api.createlog(payload)
        console.log("logging ",initials)
    }
    handleArchive = async e =>{
        console.log("in handle finding Archive")
        const id = this.props.match.params.id
        const archiveStatus =true
        const payload = {
          archiveStatus
        }
        console.log("made it here")
        this.updateFindingArchive(id, payload)
        this.logArchive(this.state.hostName)
      };
      logArchive = (hostName) =>{
        let initials = localStorage.getItem("initial")
        const description = "Archived Finding " + hostName
        const payload = {initials, description}
        api.createlog(payload)
        console.log("logging ",initials)
    }
      updateFinding (id, payload){
        api.updateFinding(id, payload).then(()=>{
          alert('Item updated')
          this.setState({editStatus:false})
        })
      
    }
    updateFindingArchive (id, payload){
        console.log("in finding archive")
        api.updatefindingarchive(id, payload).then(()=>{
          alert('Item updated')
          this.setState({archiveSubmitted:true})
        })
    }
  setVariables = async e =>{
    e.preventDefault();
    const hostName = e.target.hostName.value
        const ipPort = e.target.ipPort.value
        const description = e.target.description.value
        const longDescription = e.target.longDescription.value
        const status = e.target.status.value
        const system = e.target.system.value
        const task = e.target.task.value
        const subtask = e.target.subtask.value
        const type = e.target.type.value
        const classification = e.target.classification.value
        const posture = e.target.posture.value
        const associationToFinding = e.target.associationToFinding.value
        const confidentialityImpact = e.target.confidentialityImpact.value
        const integrityImpact = e.target.integrityImpact.value
        const availabilityImpact = e.target.availabilityImpact.value
        const threatRelevance = e.target.threatRelevance.value
        const catScore = e.target.catScore.value
    this.setState({
      hostName:hostName, 
      ipPort:ipPort, 
      description:description, 
      longDescription:longDescription, 
      status:status, 
      system:system, 
      task:task, 
      subtask:subtask, 
      type:type, 
      classification:classification, 
      posture:posture, 
      associationToFinding:associationToFinding, 
      confidentialityImpact:confidentialityImpact, 
      integrityImpact:integrityImpact, 
      availabilityImpact:availabilityImpact, 
      threatRelevance:threatRelevance, 
      catScore:catScore,
      editStatus:true

    })
    
  }
      handleChange = e =>{
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
      };
    setFinding = async e =>{
        await api.getFindingById(this.props.match.params.id).then((res)=>{
            const data = res.data.data
          
          this.setState({findingIdent:[data]})

          
        }).catch(()=>{
          this.setState({tasksIdent:[]})
        })
    }
    componentDidMount(){
        this.setFinding()
    }
    displayFinding = (posts) => {
        console.log(posts)
        if(!posts.length) return null;
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
      render(){
        if(this.state.archiveSubmitted){
          return(<Redirect to="/findings"/>);
        }
        if(this.state.archive){
          return(
            <div className="wrapper formatted-form">
              <div>
                Are you sure you want to archive this task?
                <a className="btn btn-primary" onClick={()=>this.handleArchive()}>Yes</a>
                <a className="btn btn-primary" onClick={()=>this.setState({archive:!this.state.archive})}>No</a>
              </div>
            </div>
            
          )
        }
        if(this.state.editStatus){
          return(
            <div className="wrapper formatted-form">
            <Form onSubmit = {this.handleSubmit}>
                
                    <Form.Group controlId="host">
                        <Form.Label className="padding-add">Host Name </Form.Label>
                        <Form.Control defaultValue={this.state.hostName} type="text" value = {this.state.value} name = "hostName" onChange = {this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="ip">
                        <Form.Label>IP Port </Form.Label>
                        <Form.Control defaultValue={this.state.ipPort} type="text" value = {this.state.value} name = "ipPort" onChange = {this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="desc">
                        <Form.Label>Description </Form.Label>
                        <Form.Control defaultValue={this.state.description} type="text" value = {this.state.value} name = "description" onChange = {this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="longDesc">
                        <Form.Label>Detailed Description </Form.Label>
                        <Form.Control as="textarea" rows={3} defaultValue={this.state.longDescription} value = {this.state.value} name = "longDescription" onChange = {this.handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="padding-add">System </Form.Label>
                        <select value = {this.state.system}  name = "system" onChange = {this.handleChange}>
                                
                            </select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="padding-add">Task </Form.Label>
                        <select value = {this.state.task} name = "task" onChange = {this.handleChange}>
                            </select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="padding-add">Subtask </Form.Label>
                        <select value = {this.state.subtask} name = "subtask" onChange = {this.handleChange}>
                                
                            </select>
                    </Form.Group>

                    <Form.Group controlId="status">
                        <Form.Label>Status </Form.Label>
                        <Form.Control defaultValue={this.state.status} type="text" value = {this.state.value} name = "status" onChange = {this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="type">
                        <Form.Label>Type </Form.Label>
                        <Form.Control type="text" defaultValue={this.state.type} value = {this.state.value} name = "type" onChange = {this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="class">
                        <Form.Label>Classification </Form.Label>
                        <Form.Control type="text" defaultValue={this.state.classification} value = {this.state.value} name = "classification" onChange = {this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="assoc">
                        <Form.Label>Findings linked to </Form.Label>
                        <Form.Control type="text" defaultValue={this.state.associationToFinding} value = {this.state.value} name = "associationToFinding" onChange = {this.handleChange}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="padding-add">Posture </Form.Label>
                        <select  value = {this.state.value} name = "posture" onChange = {this.handleChange}>
                                
                            </select>
                    </Form.Group>

                    <Form.Group controlId="CImpact">
                        <Form.Label className="padding-add">Confidentiality </Form.Label>
                        <select value = {this.state.value} name = "confidentialityImpact" onChange = {this.handleChange}>
                        </select>
                    </Form.Group>

                    <Form.Group controlId="IImpact">
                        <Form.Label className="padding-add">Integrity </Form.Label>
                        <select value = {this.state.value} name = "integrityImpact" onChange = {this.handleChange}>
                        </select>
                    </Form.Group>

                    <Form.Group controlId="AImpact">
                        <Form.Label className="padding-add">Availability </Form.Label>
                        <select value = {this.state.value} name = "availabilityImpact" onChange = {this.handleChange}>
                            
                        </select>
                    </Form.Group>

                    <Form.Group controlId = "CounterValue">
                        <Form.Label className="padding-add">Countermeasure </Form.Label>
                        <select value = {this.state.value} name = "countermeasureValue" onChange = {this.handleChange}>
                            </select>
                    </Form.Group>

                    <Form.Group controlId = "ImpactLvl">
                        <Form.Label className="padding-add">Impact Level </Form.Label>
                            <select value = {this.state.value} name = "impactLevel" onChange = {this.handleChange}>
                            </select>
                            
                    </Form.Group>
                    <Form.Group controlId = "ImpactLvlDes">
                        <Form.Label className="padding-add">Impact Level Description </Form.Label>
                            
                            <Form.Control  type="text" value = {this.state.value} name = "impactLevelDescription" onChange = {this.handleChange}/>
                            
                    </Form.Group>

                    <Form.Group controlId = "ThreatRelevance">
                        <Form.Label className="padding-add">Threat Relevance </Form.Label>
                        <select value = {this.state.threatRelevance} name = "threatRelevance" onChange = {this.handleChange}>

                        </select>

                    </Form.Group>

                    <Form.Group controlId = "CAT">
                        <Form.Label className="padding-add">CAT Score </Form.Label>
                        <select value={this.state.catScore}name="catScore"onChange={this.handleChange}>
                        </select>
                    </Form.Group>

                    <Button type = "submit"onClick="console.log(finding button clicked)" >Submit</Button>
                </Form>
                <button className="btn btn-primary" onClick={()=>this.setState({archive:!this.state.archive})}>Archive</button>
                </div>

          );
        }

        else{
          return(

            <div className="wrapper formatted-form">
                {
                    this.displayFinding(this.state.findingIdent)
                }
            </div>
        )
        }

        
      };
      


}

export default viewFinding;