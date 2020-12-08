import React, {Component} from 'react';
import api from '../api'
import { Redirect } from 'react-router-dom'
import * as moment from 'moment'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"


class viewSystem extends Component{
    constructor(){
        super();
        this.state = {
          systemName:'', 
          systemDescription:'',
          systemLocation: [], 
          systemRouter:[], 
          systemSwitch: [], 
          systemRoom: [],
          testPlan:'', 
          systemConfidentiality:'',
          systemIntegrity:'',
          systemAvailability:'',
          systemIdent:[],
          editForm:'', 
          editStatus:false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    handleSubmit = async e =>{
        const id = this.props.match.params.id
        const systemName= this.state.systemName
        const systemDescription = this.state.systemDescription
        const systemLocation = this.state.systemLocation
        const systemRouter = this.state.systemRouter
        const systemSwitch = this.state.systemSwitch
        const systemRoom = this.state.systemRoom
        const testPlan = this.state.testPlan
        const systemConfidentiality = this.state.systemConfidentiality
        const systemIntegrity = this.state.systemIntegrity
        const systemAvailability = this.state.systemAvailability
        const payload = {
          systemName, systemDescription, systemLocation, systemRouter, systemSwitch, systemRoom, testPlan, systemConfidentiality, systemIntegrity, systemAvailability
        }
        this.updateSystem(id, payload)
        this.log(systemName)
        
      };
      log = (hostName) =>{
        let initials = localStorage.getItem("initial")
        const description = "Editing System " + hostName
        const payload = {initials, description}
        api.createlog(payload)
        console.log("logging ",initials)
    }
      updateSystem(id, payload){
        api.updateSystem(id, payload).then(()=>{
          alert('Item updated')
          this.setState({editStatus:false})
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
      setVariables = e =>{
        e.preventDefault();
        const Name= e.target.systemName.value
        const Description = e.target.systemDescription.value
        const Location = e.target.systemLocation.value
        const Router = e.target.systemRouter.value
        const Switch = e.target.systemSwitch.value
        const Room = e.target.systemRoom.value
        const Plan = e.target.testPlan.value
        const Confidentiality = e.target.systemConfidentiality.value
        const Integrity = e.target.systemIntegrity.value
        const Availability = e.target.systemAvailability.value
      
        console.log(e.target.systemDescription.value)
        this.setState({
          systemName : Name,
          systemDescription : Description,
          systemLocation : Location,
          systemRouter : Router,
          systemSwitch : Switch,
          systemRoom : Room,
          testPlan : Plan,
          systemConfidentiality : Confidentiality,
          systemIntegrity : Integrity,
          systemAvailability : Availability,
          editStatus:true,

        })
        console.log(this.state.systemName)
        
      }
      handleArchive = async e =>{
        const id = this.props.match.params.id
        const archiveStatus =true
        const payload = {
          archiveStatus
        }
        console.log("made it here")
        this.updateSystemArchive(id, payload)
        this.logArchive(this.state.systemName)
      };
      logArchive = (hostName) =>{
        let initials = localStorage.getItem("initial")
        const description = "Archived System " + hostName
        const payload = {initials, description}
        api.createlog(payload)
        console.log("logging ",initials)
    }
      updateSystemArchive (id, payload){
        api.updateSystemArchive(id, payload).then(()=>{
          alert('Item updated')
          this.setState({archiveSubmitted:true})
        })
      
    }
    setSystem = async e =>{
      console.log("you are in viewSystem setsystem")
      await api.getSystemById(this.props.match.params.id).then((res)=>{
        const data = res.data.data
        console.log(data)
        this.setState({systemIdent:[data]})
          
      }).catch(()=>{
        this.setState({systemIdent:[]})
      })
    }
    componentDidMount(){
      console.log("you are in viewsystem componentdidmount")
        this.setSystem()
    }
    displaySystem = (posts) => {
      console.log("you are in viewSystem display system")
        if(!posts.length) return null;
        return posts.map((post, index) => (
                <div key={index} className="form-group">
                    <h2>View system</h2>
                    <form onSubmit={this.setVariables}>
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
                    <div class="form-group">
                      <label >Integrity</label>
                      <input 
                        onChange={this.handleChange} 
                        type="text" 
                        value={post.systemIntegrity}
                        name="systemIntegrity"
                        class="form-control" 
                        />
                    </div>
                    <button type="submit" class="btn btn-primary">Edit</button>
                    </form>
                </div>
        )
      )
    }
    render(){
      if(this.state.archiveSubmitted){
        return(<Redirect to="/system"/>);
      }
      if(this.state.archive){
        return(
          <div className="wrapper formatted-form">
            <div>
              Are you sure you want to archive this system?
              <a className="btn btn-primary" onClick={()=>this.handleArchive()}>Yes</a>
              <a className="btn btn-primary" onClick={()=>this.setState({archive:!this.state.archive})}>No</a>
            </div>
          </div>
        )
      }
      if(this.state.editStatus){
        console.log("editstatus = true")
        return(
          <div className="wrapper formatted-form">
                <div class="form-group"></div>
                    <h2>View system</h2>
                    <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label >System</label>
                      <input 
                        onChange={this.handleChange}
                        type="text" 
                        value={this.state.value}
                        defaultValue={this.state.systemName}
                        name="systemName"
                        class="form-control" 
                        contentEditable="true"
                        />
                    </div>
                    <div className="form-group">
                      <label >Description</label>
                      <input 
                        onChange={this.handleChange} 
                        type="text" 
                        value={this.state.value}
                        defaultValue={this.state.systemDescription}
                        name="systemDescription"
                        class="form-control" 
                        contentEditable="true"
                        />
                    </div>
                    <div class="form-group">
                      <label >Location</label>
                      <input 
                        onChange={this.handleChange} 
                        type="text" 
                        value={this.state.value}
                        defaultValue={this.state.systemLocation}
                        name="systemLocation"
                        class="form-control" 
                        contentEditable="true"
                        />
                    </div>
                    <div class="form-group">
                      <label >Router</label>
                      <input 
                        onChange={this.handleChange} 
                        type="text" 
                        value={this.state.value}
                        defaultValue={this.state.systemRouter}
                        name="systemRouter"
                        class="form-control" 
                        contentEditable="true"
                        />
                    </div>
                    <div class="form-group">
                      <label >Switch</label>
                      <input 
                        onChange={this.handleChange} 
                        type="text" 
                        value={this.state.value}
                        defaultValue={this.state.systemSwitch}
                        name="systemSwitch"
                        class="form-control" 
                        contentEditable="true"
                        />
                    </div>
                    <div class="form-group">
                      <label >Room</label>
                      <input 
                        onChange={this.handleChange} 
                        type="text" 
                        value={this.state.value}
                        defaultValue={this.state.systemRoom}
                        name="systemRoom"
                        class="form-control" 
                        contentEditable="true"
                        />
                    </div>
                    <div class="form-group">
                      <label>TestPlan</label>
                      <input 
                        onChange={this.handleChange} 
                        type="text" 
                        value={this.state.value}
                        defaultValue={this.state.testPlan}
                        name="testPlan"
                        class="form-control" 
                        contentEditable="true"
                         />
                    </div>
                    <div class="form-group">
                      <label >Confidentiality</label>
                      <input 
                        onChange={this.handleChange} 
                        type="text" 
                        value={this.state.value}
                        defaultValue={this.state.systemConfidentiality}
                        name="systemConfidentiality"
                        class="form-control" 
                        contentEditable="true"
                        />
                    </div>
                    <div class="form-group">
                      <label >Availability</label>
                      <input 
                        onChange={this.handleChange} 
                        type="text" 
                        value={this.state.value}
                        defaultValue={this.state.systemAvailability}
                        name="taskTitle"
                        class="form-control" 
                        contentEditable="true"
                        />
                    </div>
                    <div class="form-group">
                      <label >Integrity</label>
                      <input 
                        onChange={this.handleChange} 
                        type="text" 
                        value={this.state.value}
                        defaultValue={this.state.systemIntegrity}
                        name="systemIntegrity"
                        class="form-control" 
                        contentEditable="true"
                        />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                    <button className="btn btn-primary" onClick={()=>this.setState({archive:!this.state.archive})}>Archive</button>
                </div>
        )
      }
      else{
        console.log("editstatus = false")
        return(
        <div className="wrapper formatted-form">
        {
          this.displaySystem(this.state.systemIdent)
        }
        </div>
        )
      }
    };
  }
export default viewSystem;