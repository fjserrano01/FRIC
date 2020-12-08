import React, {Component} from 'react';
import api from '../api'
import { Redirect } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

class CreateSubTask extends Component{
    constructor(props){
        super(props);
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
            system:"",
            taskID:"",
            systemList:[],
            taskList:[],
            analystList:[]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeTask = this.handleChangeTask.bind(this);
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
        const taskID = this.state.taskID
        const system = this.state.system
        const payload = {
          subtaskTitle, subtaskProgress, subtaskDescription, subtaskDueDate, subtaskAttachment, subtaskAssociation, subtaskTeam, subtaskCollaborators, taskID, system
        }
        this.createSubtask(payload)
        this.log(subtaskTitle)
        this.setState({submitted:true})
    };
    log = (hostName) =>{
      let initials = localStorage.getItem("initial")
      const description = "Created Subtask " + hostName
      const payload = {initials, description}
      api.createlog(payload)
      console.log("logging ",initials)
  }
    componentDidMount(){
      this.getSystems();
      this.getAnalysts();
    }
    getAnalysts = async e =>{
      await api.getAllAnalyst().then((res)=>{
        const data = res.data.data
        console.log("gettingAnalysts", data)
        this.setState({analystList:data})

      }).catch(()=>{
        this.setState({analystList:[]})
      })
    }
    displayAnalysts(posts){
      console.log("display Analyst", posts)
      if(!posts.length)return null;
      return posts.map((post, index)=>(
        <option key={index} value={post._id}>
          {post.initial}
        </option>
      ))
    }
    getSystems = async e =>{
      await api.getAllSystems().then((res)=>{
        const data = res.data.data
        this.setState({systemList:data})
          
      }).catch(()=>{
          this.setState({systemList:[]})
        })
      }
      displaySystems(posts){
        if(!posts.length) return null;
        return posts.map((post, index) => (
          <option key={index} value={post._id}>
            {post.systemName}
          </option>
        ))
      }
      setTaskList = async (value) =>{
        await api.getTaskBySystem(value).then((res) =>{
            const data = res.data.data
            if(data == null){
                this.setState({taskList:[]})
            }else{
                this.setState({taskList:data})
            }
            
        }).catch(()=>{
            this.setState({taskList:[]})
            })
    }
      displayTasks(){
        const posts = this.state.taskList
        if(!posts.length) return null;
        return posts.map((post, index) => (
          <option key={index} value={post._id}>
            {post.taskTitle}
          </option>
        ))
      }
      createSubtask (payload){
        api.insertSubtask(payload)
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
      }
      handleDateChange = e =>{
        console.log(e)

        this.setState({
          subtaskDueDate: e
        });
      };
      
      render(){
        if(this.state.submitted){
            return (<Redirect to="/subtask"/>)

        }
        else{
          console.log("made it here")
            return(
                <div className="wrapper formatted-form">
                <div class="form-group">
                  <h2>Create Subtask</h2>
                <form onSubmit={this.handleSubmit}>
                  <div class="form-group">
                      <label >Title</label>
                      <input 
                        onChange={this.handleChange} 
                        type="text" 
                        value={this.state.value}
                        name="subtaskTitle"
                        class="form-control" 
                        placeholder="Enter Subtask Title"
                        />
                    </div>
                    <div class="form-group">
                      <label>Progress</label>
                      <select 
                        placeholder="Not Selected" 
                        onChange={this.handleChange}  
                        value={this.state.value}
                        class="form-control" 
                        name="subtaskProgress" 
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
                      <label >Subtask Description</label>
                      <input 
                        onChange={this.handleChange} 
                        type="text" 
                        value={this.state.value}
                        name="subtaskDescription"
                        class="form-control" 
                        placeholder="Enter Subtask Description"
                        />
                    </div>
                    <div class="form-group">
                      <label >System</label>
                        <select 
                        placeholder="Not Selected" 
                        onChange={this.handleChangeTask}  
                        value={this.state.value}
                        class="form-control" 
                        name="system" 
                        required >
                          <option value="" selected disabled>
                          none
                          </option>
                          {this.displaySystems(this.state.systemList)}
                      </select>
                    </div>
                    <div class ="form-group">
                      <label> Task</label>
                      <select
                      placeholder="Not Selected"
                      onChange={this.handleChange}
                      value={this.state.value}
                      class="form-control"
                      name="taskID"
                      required>
                        <option value="" selected disabled>
                          none
                        </option>
                        {this.displayTasks(this.state.taskList)}
                      </select>
                    </div>
                    <div class="form-group">
                      <label >Analyst</label>
                        <select 
                        placeholder="Not Selected" 
                        onChange={this.handleChange}  
                        value={this.state.value}
                        class="form-control" 
                        name="analyst" 
                        required >
                          <option value="" selected disabled>
                          none
                          </option>
                          {this.displayAnalysts(this.state.analystList)}
                      </select>
                    </div>
                    <div class="form-group">
                      <label >Attachments</label>
                      <input 
                        onChange={this.handleChange} 
                        type="float" 
                        value={this.state.value}
                        name="subtaskAttachment"
                        class="form-control" 
                        placeholder="Attachment"
                        />
                    </div>
                    <div class="form-group">
                      <label >Associations</label>
                      <input 
                        onChange={this.handleChange} 
                        type="text" 
                        value={this.state.value}
                        name="subtaskAssociation"
                        class="form-control" 
                        placeholder="Assign Association"
                        />
                    </div>
                    <div class="form-group">
                      <label>Analyst Team</label>
                      <input 
                        type="text" 
                        onChange={this.handleChange}  
                        value={this.state.value}
                        class="form-control" 
                        name="subtaskTeam"
                        placeholder="Add analyst" 
                      />
                    </div>
                    <div class="form-group">
                      <label >Collaborators</label>
                      <input 
                        onChange={this.handleChange} 
                        type="text" 
                        value={this.state.value}
                        name="subtaskCollaborators"
                        class="form-control" 
                        placeholder="Add a Collaborator"
                        />
                    </div>
                    <div class="form-group">
                      <label class="control-label" for="date">Due Date: </label>
                      <DatePicker name="subtaskDueDate" onChange={this.handleDateChange} selected={this.state.dueDate} />
                    </div>
                  
          
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
                </div>
              </div>
              )
        }
        
      };
      


}

export default CreateSubTask;