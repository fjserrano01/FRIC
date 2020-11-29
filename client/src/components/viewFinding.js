import React, {Component} from 'react';
import api from '../api'
import { Redirect } from 'react-router-dom'
//import * as moment from 'moment'
import moment from 'moment'
//import DatePicker from 'react-datepicker'
//import "react-datepicker/dist/react-datepicker.css"


class viewFinding extends Component{
    constructor(){
        super();
        this.state = {
          id:'', 
          hostName:'', 
          ip: '', 
          description:'', 
          longDescription: '', 
          status: '', 
          type:'', 
          classification:'',
          evidence:'',
          system:'',
          task:'', 
          subtask:'',
          relatedFinding:'',
          findingIdent:[]
          
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    handleSubmit = async e =>{
        e.preventDefault();
        const id= this.state.id
        const hostName = this.state.hostName
        const ip = this.state.ip
        const description = this.state.description
        const longDescription = this.state.longDescription
        const status = this.state.status
        const type = this.state.type
        const classification = this.state.classification
        const system = this.state.system
        const payload = {
          id, hostName,ip,description, longDescription, status, type, classification,system
        }
        this.updateTask(payload)
        
        
      };
      updateTask (payload){

        
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
                    <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label >ID</label>
                      <input 
                        onChange={this.handleChange} 
                        type="text" 
                        value={post.id}
                        name="taskTitle"
                        className="form-control" 
                        placeholder="Enter Task Title"
                        />
                    </div>
                    <div className="form-group">
                      <label >Host Name</label>
                      <input 
                        onChange={this.handleChange} 
                        type="text" 
                        value={post.hostName}
                        name="taskDescription"
                        className="form-control" 
                        
                        />
                    </div>
                    <div class="form-group">
                      <label >IP</label>
                      <input 
                        onChange={this.handleChange} 
                        type="text" 
                        value={post.ipPort}
                        name="system"
                        class="form-control" 
                        />
                    </div>
                    <div class="form-group">
                      <label >Description</label>
                      <input 
                        onChange={this.handleChange} 
                        type="text" 
                        value={post.description}
                        name="analyst"
                        class="form-control" 
                        />
                    </div>
                    <div class="form-group">
                    <label>Details</label>
                      <input 
                        placeholder="Not Selected" 
                        onChange={this.handleChange}  
                        value={post.longDescription}
                        class="form-control" 
                        name="priority" 
                         >
                      </input>
                      </div>
                      <div class="form-group">
                      <label>status</label>
                      <input 
                        placeholder="Not Selected" 
                        onChange={this.handleChange}  
                        value={post.status}
                        class="form-control" 
                        name="progress" 
                         >
                      </input>
                    </div>
                    <div class="form-group">
                      <label>Type</label>
                      <input 
                        type="text" 
                        onChange={this.handleChange}  
                        value={post.type}
                        class="form-control" 
                        name="collaborators"
                        
                         />
                    </div>
                    <div class="form-group">
                      <label class="control-label">Classification</label>
                      <input 
                        type="text" 
                        onChange={this.handleChange}  
                        value={post.classification}
                        
                        />
                    </div>
                    <div class="form-group">
                      <label>System</label>
                      <input 
                        type="text" 
                        onChange={this.handleChange}  
                        value={post.system}
                        class="form-control" 
                        name="collaborators"
                         />
                    </div>
                    <button type="submit" class="btn btn-primary">Edit</button>
                    </form>
                    
                </div>
        ))
    }
      render(){
        return(
            <div className="wrapper formatted-form">
                {
                    this.displayFinding(this.state.findingIdent)
                }
            </div>
        )


        
      };
      


}

export default viewFinding;