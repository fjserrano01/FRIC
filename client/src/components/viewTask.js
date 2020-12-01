import React, {Component} from 'react';
import api from '../api'
import { Redirect } from 'react-router-dom'
import * as moment from 'moment'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"


class ViewTask extends Component{
    constructor(){
        super();
        this.state = {
          taskTitle:'', 
          taskDescription:'', 
          system: '',
          //systemName:'',
          analyst:'', 
          priority: '', 
          progress: '', 
          numSubtasks:0, 
          numFindings:0,
          collaborators:'',
          relatedTasks:'',
          attatchments:'', 
          dueDate:'',
          taskIdent:[], 
          editForm:'', 
          editStatus:false,
          archive:false,
          archiveSubmitted:false
          
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    handleArchive = async e =>{
      const id = this.props.match.params.id
      const archiveStatus =true
      const payload = {
        archiveStatus
      }
      console.log("made it here")
      this.updateTaskArchive(id, payload)
    };


    handleSubmit = async e =>{
        const id = this.props.match.params.id
        const taskTitle= this.state.taskTitle
        const taskDescription = this.state.taskDescription
        const system = this.state.system
        //const systemName = this.state.systemName
        const analyst = this.state.analyst
        const priority = this.state.priority
        const progress = this.state.progress
        const numSubtasks = this.state.numSubtasks
        const numFindings = this.state.numFindings
        const collaborators = this.state.collaborators
        const relatedTasks = this.state.numSubtasks
        const attatchments = this.state.attatchments
        const payload = {
          taskTitle, taskDescription, system, analyst, priority, progress, numSubtasks, numFindings, collaborators, relatedTasks
        }
        console.log("made it here")
        this.updateTask(id, payload)
        
        
      };
      updateTask (id, payload){
          api.updateTask(id, payload).then(()=>{
            alert('Item updated')
            this.setState({editStatus:false})
          })
        
      }
      updateTaskArchive (id, payload){
        api.updateTaskArchive(id, payload).then(()=>{
          alert('Item updated')
          this.setState({archiveSubmitted:true})
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
        const Title=e.target.taskTitle.value
        const taskDescription=e.target.taskDescription.value
        const system = e.target.system.value
        //const sysName = e.target.systemName.value
        const analyst = e.target.analyst.value
        const priority = e.target.priority.value
        const progress = e.target.progress.value
        const collaborators = e.target.collaborators.value
        const dueDate = e.target.dueDate.value
        console.log(e.target.dueDate.value)
        this.setState({
          taskTitle : Title,
          taskDescription : taskDescription,
          system : system,
          //systemName : sysName,
          analyst: analyst,
          priority:priority,
          progress:progress,
          collaborators:collaborators,
          editStatus:true,
          dueDate:dueDate

        })
        console.log(this.state.taskTitle)
        
      }
    setTask = async e =>{
        await api.getTaskById(this.props.match.params.id).then((res)=>{
            const data = res.data.data
          
          this.setState({taskIdent:[data]})

          
        }).catch(()=>{
          this.setState({tasksIdent:[]})
        })
    }
    componentDidMount(){
        this.setTask()
    }
    displayTask = (posts) => {
        if(!posts.length) return null;
        return posts.map((post, index) => (
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
                    <button type="submit" class="btn btn-primary">Edit</button>
                    
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
      render(){
        if(this.state.archiveSubmitted){
          return(<Redirect to="/tasks"/>);
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
                <div class="form-group">
                  <h2>Edit Task</h2>
                <form onSubmit={this.handleSubmit}>
                  <div class="form-group">
                      <label >Title</label>
                      <input 
                        onChange={this.handleChange} 
                        type="text" 
                        value={this.state.value}
                        defaultValue={this.state.taskTitle}
                        name="taskTitle"
                        class="form-control" 
                        contentEditable="true"
                        />
                    </div>
                    <div class="form-group">
                      <label >Task Description</label>
                      <input 
                        onChange={this.handleChange} 
                        type="text" 
                        value={this.state.value}
                        defaultValue={this.state.taskDescription}
                        name="taskDescription"
                        class="form-control" 
                        placeholder="Enter Task Description"
                        />
                    </div>
                    <div class="form-group">
                      <label >System</label>
                      <input
                        type="text" 
                        value={this.state.system}
                        defaultValue={this.state.system}
                        name="system"
                        class="form-control" 
                        placeholder="system"
                        />
                    </div>
                    <div class="form-group">
                      <label >Analyst</label>
                      <input 
                        onChange={this.handleChange} 
                        type="text" 
                        value={this.state.value}
                        defaultValue={this.state.analyst}
                        name="analyst"
                        class="form-control" 
                        placeholder="Assign Analyst"
                        />
                    </div>
                    <div class="form-group">
                      <label>Priority</label>
                      <select 
                        placeholder="Not Selected" 
                        onChange={this.handleChange}  
                        value={this.state.value}
                        defaultValue={this.state.priority}
                        class="form-control" 
                        name="priority" 
                        required >
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
                        value={this.state.value}
                        defaultValue={this.state.progress}
                        class="form-control" 
                        name="progress" 
                        required >
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
                        value={this.state.value}
                        defaultValue={this.state.collaborators}
                        class="form-control" 
                        name="collaborators"
                        placeholder="Collaborators" 
                        required />
                    </div>
                    <div class="form-group">
                      <label class="control-label" for="date">Due Date: </label>
                      <input 
                        type="text" 
                        onChange={this.handleChange}  
                        value={this.state.dueDate}
                        class="form-control" 
                        name="dueDate"
                        />
                    </div>
                  
          
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
                </div>
                <button className="btn btn-primary" onClick={()=>this.setState({archive:!this.state.archive})}>Archive</button>
              </div>
          )
        }else{
          return(
              <div className="wrapper formatted-form">
                  {
                      this.displayTask(this.state.taskIdent)
                  }
              </div>
          )
        }



        
      };
      


}

export default ViewTask;