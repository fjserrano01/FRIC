import React, {Component} from 'react'
import api from '../api'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
import { Redirect } from 'react-router-dom'

class CreateFindingForm extends Component{
    constructor(){
        super()
        this.state = {
            hostName:'',
	        ipPort:'',
	        description:'',
	        longDescription:'',
            status:'',
            system:'',
            task:'',
            subtask:'',
            analyst:'',
	        type:'',
            classification:'',
            posture:'',
            associationToFinding:'',
            confidentialityImpact:'',
            integrityImpact:'',
            availabilityImpact:'',
            impactLevelDescription:'',
            threatRelevance:'',
            catScore:'',
            systems:[],
            tasks:[],
            subtasks:[],
            analysts:[],
            archiveStatus:false, 
            submitted:false
        };
        //why does this work?
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeOther = this.handleChangeTask.bind(this);
        this.handleChangeOther = this.handleChangeSubtask.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    handleSubmit = async e =>{
        e.preventDefault();
        const hostName = this.state.hostName
        const ipPort = this.state.ipPort
        const description = this.state.description
        const longDescription = this.state.longDescription
        const status = this.state.status
        const analyst = this.state.analyst
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
        const countermeasureValue = this.state.countermeasureValue
        const impactLevel = this.state.impactLevel
        const impactLevelDescription = this.state.impactLevelDescription
        const threatRelevance = this.state.threatRelevance
        const catScore = this.state.catScore
        const catValue = this.calculateCatValue(catScore)
        const vulnScore = this.calculateVS(catValue,impactLevel,countermeasureValue)
        const files = document.getElementById("inputGroupFile01").files;
        const archiveStatus = this.state.archiveStatus
        const payload = {
            hostName, ipPort, description, longDescription, analyst, status, system, task, subtask, type, classification, posture, associationToFinding, 
            confidentialityImpact, integrityImpact, impactLevelDescription, availabilityImpact, threatRelevance, catScore, files
        }
        this.createFinding(payload)
        this.setState({submitted:true})
    } 
      displayAnalysts(posts){
        if(!posts.length) return null;
        return posts.map((post, index) => (
          <option key={index} value={post.initial}>{post.initial}</option>
        ))
      }
    calculateVS(catScore,impactLevel,countermeasureValue){
        return (catScore*impactLevel*countermeasureValue)/10
    }
    getAnalysts = async e =>{
        
        await api.getAllAnalyst().then((res)=>{
          const data = res.data.data
          this.setState({analysts:data})
          
        }).catch(()=>{
          this.setState({analysts:[]})
        })
      }
    calculateCatValue(score){ 
        const cat = 0
        switch(score){
            case "I": return 4;
            case "II": return 7;
            case "III": return 10;
        }
        return cat
    }

    createFinding(payload){
        api.insertFinding(payload)
    }
    componentDidMount(){
        this.getSystems();
        this.getAnalysts();
      }
      getSystems = async e =>{
        await api.getAllSystems().then((res)=>{
          const data = res.data.data
          
          this.setState({systems:data})
          
        }).catch(()=>{
          this.setState({systems:[]})
        })
      }
    handleChange = e =>{
        console.log(e)
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
      };
      handleChangeTask = e =>{
        console.log(e)
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
        this.setTaskList(value)
      };
      handleChangeSubtask = e =>{
        console.log(e)
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
        this.setSubtaskList(value)
      };
      setTaskList = async (val) =>{
        await api.getTaskBySystem(val).then((res) =>{
            const data = res.data.data
            console.log(data)
            if(data == null){
                this.setState({tasks:[]})
            }else{
                this.setState({tasks:data})
            }
            
        }).catch(()=>{
            this.setState({tasks:[]})
            })
      }
      setSubtaskList = async (val) =>{
        console.log("Made it to subtask by task")
      }
      displaySystems(posts){
        if(!posts.length) return null;
        return posts.map((post, index) => (
          <option key={index} value={post._id}>{post.systemName}</option>
        ))
      }
      displayTaskList(posts){
        if(!posts.length) return null;
        return posts.map((post, index) => (
          <option key={index} value={post._id}>{post.taskTitle}</option>
        ))
      }
    
    render(){
        
        if(this.state.submitted){
                return(<Redirect to="/findings"/>)
        }
        else{
            return (

                <div className="wrapper formatted-form">

                    <h3>Create Finding</h3>

                    <Form onSubmit = {this.handleSubmit}>
                
                    <Form.Group controlId="host">
                        <Form.Label className="padding-add">Host Name </Form.Label>
                        <Form.Control type="text" value = {this.state.value} name = "hostName" onChange = {this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="ip">
                        <Form.Label>IP Port </Form.Label>
                        <Form.Control type="text" value = {this.state.value} name = "ipPort" onChange = {this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="desc">
                        <Form.Label>Description </Form.Label>
                        <Form.Control type="text" value = {this.state.value} name = "description" onChange = {this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="longDesc">
                        <Form.Label>Detailed Description </Form.Label>
                        <Form.Control as="textarea" rows={3} value = {this.state.value} name = "longDescription" onChange = {this.handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="padding-add">System </Form.Label>
                        <select value = {this.state.value} name = "system" onChange = {this.handleChangeTask}>
                        <option value="" selected disabled>None</option>
                        {this.displaySystems(this.state.systems)}
                                
                            </select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="padding-add">Task </Form.Label>
                        <select value = {this.state.value} name = "task" onChange = {this.handleChangeSubtask}>
                                <option value="" selected>None</option>
                                {this.displayTaskList(this.state.tasks)}
                            </select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="padding-add">Subtask </Form.Label>
                        <select value = {this.state.value} name = "subtask" onChange = {this.handleChange}>
                                <option value="" selected>None</option>
                                
                            </select>
                    </Form.Group>

                    <Form.Group controlId="status">
                        <Form.Label>Status </Form.Label>
                        <Form.Control type="text" value = {this.state.value} name = "status" onChange = {this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="type">
                        <Form.Label>Type </Form.Label>
                        <Form.Control type="text" value = {this.state.value} name = "type" onChange = {this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="class">
                        <Form.Label>Classification </Form.Label>
                        <Form.Control type="text" value = {this.state.value} name = "classification" onChange = {this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="assoc">
                        <Form.Label>Findings linked to </Form.Label>
                        <Form.Control type="text" value = {this.state.value} name = "associationToFinding" onChange = {this.handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="padding-add">Analyst</Form.Label>
                        <select value = {this.state.value} name = "analyst" onChange = {this.handleChange}>
                        <option value="" selected disabled>None</option>
                          {this.displayAnalysts(this.state.analysts)}
                                
                            </select>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="padding-add">Posture </Form.Label>
                        <select value = {this.state.value} name = "posture" onChange = {this.handleChange}>
                                <option value="Insider-1">Insider-1</option>
                                <option value="Insider-2">Insider-2</option>
                                <option value="Insider-3<">Insider-3</option>
                                <option value="Outsider-1">Outsider-1</option>
                                <option value="Outsider-2">Outsider-2</option>
                                <option value="Outsider-3">Outsider-3</option>
                                <option value="Nearsider-1">Nearsider-1</option>
                                <option value="Nearsider-2">Nearsider-2</option>
                                <option value="Nearsider-3<">Nearsider-3</option>
                                
                            </select>
                    </Form.Group>

                    <Form.Group controlId="CImpact">
                        <Form.Label className="padding-add">Confidentiality </Form.Label>
                        <select value = {this.state.value} name = "confidentialityImpact" onChange = {this.handleChange}>
                            <option value="L">Low</option>
                            <option value="M">Medium</option>
                            <option value="H">High</option>
                            <option value="I">Information</option>
                        </select>
                    </Form.Group>

                    <Form.Group controlId="IImpact">
                        <Form.Label className="padding-add">Integrity </Form.Label>
                        <select value = {this.state.value} name = "integrityImpact" onChange = {this.handleChange}>
                            <option value="L">Low</option>
                            <option value="M">Medium</option>
                            <option value="H">High</option>
                            <option value="I">Information</option>
                        </select>
                    </Form.Group>

                    <Form.Group controlId="AImpact">
                        <Form.Label className="padding-add">Availability </Form.Label>
                        <select value = {this.state.value} name = "availabilityImpact" onChange = {this.handleChange}>
                            <option value="L">Low</option>
                            <option value="M">Medium</option>
                            <option value="H">High</option>
                            <option value="I">Information</option>
                        </select>
                    </Form.Group>

                    <Form.Group controlId = "CounterValue">
                        <Form.Label className="padding-add">Countermeasure </Form.Label>
                        <select value = {this.state.value} name = "countermeasureValue" onChange = {this.handleChange}>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                    </Form.Group>

                    <Form.Group controlId = "ImpactLvl">
                        <Form.Label className="padding-add">Impact Level </Form.Label>
                            <select value = {this.state.value} name = "impactLevel" onChange = {this.handleChange}>
                                <option value="VL">Very Low</option>
                                <option value="L">Low</option>
                                <option value="M">Moderate</option>
                                <option value="H">High</option>
                                <option value="VH">Very High</option>
                                <option value="I">Information</option>
                            </select>
                            
                    </Form.Group>
                    <Form.Group controlId = "ImpactLvlDes">
                        <Form.Label className="padding-add">Impact Level Description </Form.Label>
                            
                            <Form.Control type="text" value = {this.state.value} name = "impactLevelDescription" onChange = {this.handleChange}/>
                            
                    </Form.Group>

                    <Form.Group controlId = "ThreatRelevance">
                        <Form.Label className="padding-add">Threat Relevance </Form.Label>
                        <select value = {this.state.value} name = "impactLevel" onChange = {this.handleChange}>
                            <option value="E">Expected</option>
                            <option value="A">Anticipated</option>
                            <option value="Pr">Predicted</option>
                            <option value="Po">Possible</option>
                            <option value="C">Confirmed</option>
                        </select>

                    </Form.Group>

                    <Form.Group controlId = "CAT">
                        <Form.Label className="padding-add">CAT Score </Form.Label>
                        <select value={this.state.value}name="catScore"onChange={this.handleChange}>
                            <option value="I">I</option>
                            <option value="II">II</option>
                            <option value="III">III</option>
                        </select>
                    </Form.Group>

                    <input type="file" id="inputGroupFile01"/>

                    <Button type = "submit" >Submit</Button>
                </Form>
                </div>
            );
        }
    }

}

export default CreateFindingForm