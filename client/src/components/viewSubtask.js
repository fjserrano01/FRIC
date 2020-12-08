import React, {Component} from 'react';
import api from '../api'
import { Redirect } from 'react-router-dom'
import * as moment from 'moment'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"


class viewSubtask extends Component{
    constructor(){
        super();
        this.state = {
          subtaskTitle:'',
          subtaskProgress:'',
          subtaskDescription:'',
          subtaskDueDate:'',
          subtaskAttachment:'',
          subtaskAssociation:'',
          subtaskTeam:'',
          subtaskCollaborators:'',
          system:"",
          taskID:"",
          editStatus:false,
          subtaskIdent:[]
          
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    handleSubmit = async e =>{
        const id = this.props.match.params.id
        const subtaskTitle= this.state.subtaskTitle
        const subtaskProgress = this.state.subtaskProgress
        const subtaskDescription = this.state.subtaskDescription
        const subtaskDueDate = this.state.subtaskDueDate
        const subtaskAttachment = this.state.subtaskAttachment
        const subtaskAssociation = this.state.subtaskAssociation
        const subtaskTeam = this.state.subtaskTeam
        const subtaskCollaborators = this.state.subtaskCollaborators
        const payload = {
          subtaskTitle, subtaskProgress, subtaskDescription, subtaskDueDate, subtaskAttachment, subtaskAssociation, subtaskTeam, subtaskCollaborators
        }
        this.updateSubtask(id, payload)
        this.log(subtaskTitle)
      };
      log = (hostName) =>{
        let initials = localStorage.getItem("initial")
        const description = "Editing Subtask " + hostName
        const payload = {initials, description}
        api.createlog(payload)
        console.log("logging ",initials)
    }
      updateSubtask (id, payload){
        api.updateSubtask(id, payload).then(()=>{
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
        console.log("settingVariable", e.target.subtaskProgress.value)
        const Title= e.target.subtaskTitle.value
        const Progress = e.target.subtaskProgress.value
        const Description = e.target.subtaskDescription.value
        const DueDate = e.target.subtaskDueDate.value
        const Attachment = e.target.subtaskAttachment.value
        const Association = e.target.subtaskAssociation.value
        const Team = e.target.subtaskTeam.value
        const Collaborators = e.target.subtaskCollaborators.value

        console.log(e.target.subtaskTitle.value)
        this.setState({
          subtaskTitle : Title,
          subtaskProgress : Progress,
          subtaskDescription : Description,
          subtaskDueDate : DueDate,
          subtaskAttachment : Attachment,
          subtaskAssociation : Association,
          subtaskTeam : Team,
          subtaskCollaborators : Collaborators,
          editStatus:true,
          archive:false,
          archiveSubmitted:false
        })
      }

      handleArchive = async e =>{
        const id = this.props.match.params.id
        const archiveStatus =true
        const payload = {
          archiveStatus
        }
        console.log("made it here")
        this.updateSubtaskArchive(id, payload)
        this.logArchive(this.state.subtaskTitle)
      };
      logArchive = (hostName) =>{
        let initials = localStorage.getItem("initial")
        const description = "Archived Subtask " + hostName
        const payload = {initials, description}
        api.createlog(payload)
        console.log("logging ",initials)
    }
      updateSubtaskArchive (id, payload){
        api.updateSubtaskArchive(id, payload).then(()=>{
          alert('Item updated')
          this.setState({archiveSubmitted:true})
        })
      
    }
    setSubtask = async e =>{
      console.log("you are in viewSubtask setsubtask")
      await api.getSubtaskById(this.props.match.params.id).then((res)=>{
        const data = res.data.data
        console.log(data)
        this.setState({subtaskIdent:[data]})
          
      }).catch(()=>{
        this.setState({SubtasksIdent:[]})
      })
    }
    componentDidMount(){
      console.log("you are in viewSubtask componentdidmount")
        this.setSubtask()
    }
    displaySubtask = (posts) => {
      console.log("you are in viewSubtask display subtask")
        if(!posts.length) return null;
        return posts.map((post, index) => (
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
                    <button type="submit" class="btn btn-primary">Edit</button>
                    </form>
                </div>
        )
      )
    }
      render(){
        if(this.state.archiveSubmitted){
          return(<Redirect to="/subtask"/>);
        }
        if(this.state.archive){
          return(
            <div className="wrapper formatted-form">
              <div>
                Are you sure you want to archive this subtask?
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
                    <h2>View Subtask</h2>
                    <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label >Title</label>
                      <input 
                        onChange={this.handleChange}
                        type="text" 
                        value={this.state.value}
                        defaultValue={this.state.subtaskTitle}
                        name="subtaskTitle"
                        class="form-control" 
                        contentEditable="true"
                        />
                    </div>
                    <div className="form-group">
                      <label >Subtask Description</label>
                      <input 
                        onChange={this.handleChange}
                        type="text" 
                        value={this.state.value}
                        defaultValue={this.state.subtaskDescription}
                        name="subtaskDescription"
                        class="form-control" 
                        contentEditable="true"
                        />
                    </div>
                    <div class="form-group">
                      <label >Subtask Team</label>
                      <input 
                        onChange={this.handleChange}
                        type="text" 
                        value={this.state.value}
                        defaultValue={this.state.subtaskTeam}
                        name="subtaskTeam"
                        class="form-control" 
                        contentEditable="true"
                        />
                    </div>
                    <div class="form-group">
                      <label >Subtask Attachment</label>
                      <input 
                        onChange={this.handleChange}
                        type="text" 
                        value={this.state.value}
                        defaultValue={this.state.subtaskAttachment}
                        name="subtaskAttachment"
                        class="form-control" 
                        contentEditable="true"
                        />
                    </div>
                    <div class="form-group">
                      <label >Subtask Association</label>
                      <input 
                        onChange={this.handleChange}
                        type="text" 
                        value={this.state.value}
                        defaultValue={this.state.subtaskAssociation}
                        name="subtaskAssociation"
                        class="form-control" 
                        contentEditable="true"
                        />
                    </div>
                      <div class="form-group">
                      <label>Progress</label>
                      <select
                        placeholder="Not Selected" 
                        onChange={this.handleChange}  
                        value={this.state.value}
                        defaultValue={this.state.systemProgress}
                        class="form-control" 
                        name="systemProgress" 
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
                        onChange={this.handleChange}
                        type="text" 
                        value={this.state.value}
                        defaultValue={this.state.subtaskCollaborators}
                        name="subtaskCollaborators"
                        class="form-control" 
                        contentEditable="true"
                         />
                    </div>
                    <div class="form-group">
                      <label class="control-label" for="date">Due Date: </label>
                      <input 
                        type="text" 
                        onChange={this.handleChange}  
                        value={moment(this.state.subtaskDueDate).format('MM-DD-YY')}
                        class="form-control" 
                        name="subtaskDueDate"
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
          return(
          <div className="wrapper formatted-form">
          {
            this.displaySubtask(this.state.subtaskIdent)
          }
          </div>
          )
        }
      };
    }
export default viewSubtask;