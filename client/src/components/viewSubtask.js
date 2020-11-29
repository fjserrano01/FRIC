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
          submitted:false,
          subtaskIdent:[]
          
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    handleSubmit = async e =>{
        e.preventDefault();
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
        this.updateSubtask(payload)
        this.setState({submitted:true})
        
        
      };
      updateSubtask (payload){

        
      }
      handleChange = e =>{
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
      };
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
                    <form onSubmit={this.handleSubmit}>
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
        if(this.state.submitted){
          return (<Redirect to="/subtask"/>)
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
        /*
        if(this.state.submitted){
            return (<Redirect to="/tasks"/>)

        }
        else{
            return( 
                <div className="wrapper formatted-form">
                <div class="form-group">
                  <h2>Create Task</h2>
                <form onSubmit={this.handleSubmit}>
                  
                    
                    
                    
                    
                    <div class="form-group">
                      <label>Collaborators</label>
                      <input 
                        type="text" 
                        onChange={this.handleChange}  
                        value={this.state.value}
                        class="form-control" 
                        name="collaborators"
                        placeholder="Collaborators" 
                        required />
                    </div>
                    
          
                    <button type="submit" onClick="window.location.href = '/tasks'" class="btn btn-primary">Submit</button>
                  </form>
                </div>
              </div>
              )
        }*/
        
      };
    }
export default viewSubtask;