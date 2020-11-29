import React, {Component} from 'react';
import api from '../api'
import { Redirect } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

class CreateTask extends Component{
    constructor(props){
        super(props);
        this.state = {
          taskTitle:'', 
          taskDescription:'', 
          system: '', 
          analyst:'', 
          priority: '', 
          progress: '', 
          numSubtasks:0, 
          numFindings:0,
          collaborators:'',
          relatedTasks:'',
          attatchments:'', 
          dueDate:new Date(),
          submitted:false, 
          systems: []
          
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    handleSubmit = async e =>{
        const taskTitle= this.state.taskTitle
        const taskDescription = this.state.taskDescription
        const system = this.state.system
        const analyst = this.state.analyst
        const priority = this.state.priority
        const progress = this.state.progress
        const numSubtasks = this.state.numSubtasks
        const numFindings = this.state.numFindings
        const collaborators = this.state.collaborators
        const relatedTasks = this.state.numSubtasks
        const attatchments = this.state.attatchments
        const dueDate = this.state.dueDate
        const payload = {
          taskTitle, taskDescription, system, analyst, priority, progress, numSubtasks, numFindings, collaborators, relatedTasks, dueDate
        }
        this.createTask(payload)
        this.setState({submitted:true})
        
        
      };
      createTask (payload){

        api.insertTask(payload)
        
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
      componentDidMount(){
        this.getSystems();
      }
      getSystems = async e =>{
        await api.getAllSystems().then((res)=>{
          const data = res.data.data
          
          this.setState({systems:data})
          
        }).catch(()=>{
          this.setState({systems:[]})
        })
      }
      displaySystems(posts){
        if(!posts.length) return null;
        return posts.map((post, index) => (
          <option key={index} value={post._id}>{post.systemName}</option>
        ))
      }
      handleDateChange = e =>{
        console.log(e)

        this.setState({
          dueDate: e
        });
      };
      
      render(){
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
                      <label >Title</label>
                      <input 
                        onChange={this.handleChange} 
                        type="text" 
                        value={this.state.value}
                        name="taskTitle"
                        class="form-control" 
                        placeholder="Enter Task Title"
                        />
                    </div>
                    <div class="form-group">
                      <label >Task Description</label>
                      <input 
                        onChange={this.handleChange} 
                        type="text" 
                        value={this.state.value}
                        name="taskDescription"
                        class="form-control" 
                        placeholder="Enter Task Description"
                        />
                    </div>
                    <div class="form-group">
                      <label >System</label>
                        <select 
                        placeholder="Not Selected" 
                        onChange={this.handleChange}  
                        value={this.state.value}
                        class="form-control" 
                        name="system" 
                        required >
                          {this.displaySystems(this.state.systems)}
                      </select>
                    </div>
                    <div class="form-group">
                      <label >Analyst</label>
                      <input 
                        onChange={this.handleChange} 
                        type="text" 
                        value={this.state.value}
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
                        class="form-control" 
                        name="collaborators"
                        placeholder="Collaborators" 
                        required />
                    </div>
                    <div class="form-group">
                      <label class="control-label" for="date">Due Date: </label>
                      <DatePicker name="dueDate" onChange={this.handleDateChange} selected={this.state.dueDate} />
                    </div>
                  
          
                    <button type="submit" onClick="window.location.href = '/tasks'" class="btn btn-primary">Submit</button>
                  </form>
                </div>
              </div>
              )
        }
        
      };
      


}

export default CreateTask;