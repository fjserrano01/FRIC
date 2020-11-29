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
          systemIdent:[]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    handleSubmit = async e =>{
        e.preventDefault();
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
        this.updateSystem(payload)
        this.setState({submitted:true})
        
        
      };
      updateSystem(payload){

        
      }
      handleChange = e =>{
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
      };
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
                    <button type="submit" class="btn btn-primary">Edit</button>
                    </form>
                </div>
        )
      )
    }
    render(){
      if(this.state.submitted){
        return (<Redirect to="/system"/>)
      }
      else{
        return(
        <div className="wrapper formatted-form">
        {
          this.displaySystem(this.state.systemIdent)
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
export default viewSystem;