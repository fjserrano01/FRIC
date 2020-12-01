import React, {Component} from 'react';
import api from '../api'
import { Redirect } from 'react-router-dom'
import "react-datepicker/dist/react-datepicker.css"

class CreateSystem extends Component{
    constructor(props){
        super(props);
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
          submitted:false
          
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
        this.createSystem(payload)
        this.setState({submitted:true})
      };
      createSystem(payload){
        console.log("in create system")
        console.log(payload)
        api.insertSystem(payload)
      }
      handleChange = e =>{
        const target = e.target;
        const value = target.value;
        const name = target.name;
        if (name == "systemLocation"){
          const temporary = target.value.split('/')
          console.log("temporary:", temporary)
          this.setState({
            [name] : temporary
          })
        }
        if(name == "systemRouter"){
          const temporary = value.split(",")
          this.setState({
            [name] : temporary
          })
        }
        if (name == "systemSwitch"){
          const temporary = value.split(",")
          this.setState({
            [name] : temporary
          })
        }
        if(name == "systemRoom"){
          const temporary = value.split(",")
          this.setState({
            [name]: temporary
          })
        }
        this.setState({
          [name]: value
        });
        console.log(this.state)
      };
      
      render(){
        if(this.state.submitted){
            return (<Redirect to="/system"/>)

        }
        else{
            return( 
                <div className="wrapper formatted-form">
                <div class="form-group">
                  <h2>Create System</h2>
                <form onSubmit={this.handleSubmit}>
                  <div class="form-group">
                      <label >System Name</label>
                      <input 
                        onChange={this.handleChange} 
                        type="text" 
                        value={this.state.value}
                        name="systemName"
                        class="form-control" 
                        placeholder="Enter System Name"
                        />
                    </div>
                    <div class="form-group">
                      <label >System Description</label>
                      <input 
                        onChange={this.handleChange} 
                        type="text" 
                        value={this.state.value}
                        name="systemDescription"
                        class="form-control" 
                        placeholder="Enter System Description"
                        />
                    </div>
                    <div class="form-group">
                      <label >System Location</label>
                      <input 
                        onChange={this.handleChange} 
                        type="text" 
                        value={this.state.value}
                        name="systemLocation"
                        class="form-control" 
                        placeholder="Enter system Location; Each location seperated by a ',' "
                        />
                    </div>
                    <div class="form-group">
                      <label >System Router</label>
                      <input 
                        onChange={this.handleChange} 
                        type="text" 
                        value={this.state.value}
                        name="systemRouter"
                        class="form-control" 
                        placeholder="Enter System Router"
                        />
                    </div>
                    <div class="form-group">
                      <label >System Switch</label>
                      <input 
                        onChange={this.handleChange} 
                        type="text" 
                        value={this.state.value}
                        name="systemSwitch"
                        class="form-control" 
                        placeholder="Enter System Switch"
                        />
                    </div>
                    <div class="form-group">
                      <label >System Room</label>
                      <input 
                        onChange={this.handleChange} 
                        type="text" 
                        value={this.state.value}
                        name="systemRoom"
                        class="form-control" 
                        placeholder="Enter System Room"
                        />
                    </div>
                    <div class="form-group">
                      <label>System TestPlan</label>
                      <input 
                        type="text" 
                        onChange={this.handleChange}  
                        value={this.state.value}
                        class="form-control" 
                        name="testPlan"
                        placeholder="testPlan" 
                        required />
                    </div>
                    <div class="form-group">
                      <label>System Confidendiality</label>
                      <select 
                        placeholder="Not Selected" 
                        onChange={this.handleChange}  
                        value={this.state.value}
                        class="form-control" 
                        name="systemConfidentiality" 
                        required >
                            <option value="" disabled selected>Choose your option</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Information">Information</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>System Integrity</label>
                      <select 
                        placeholder="Not Selected" 
                        onChange={this.handleChange}  
                        value={this.state.value}
                        class="form-control" 
                        name="systemIntegrity" 
                        required >
                            <option value="" disabled selected>Choose your option</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Information">Information</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>System Availiability</label>
                      <select 
                        placeholder="Not Selected" 
                        onChange={this.handleChange}  
                        value={this.state.value}
                        class="form-control" 
                        name="systemAvailability" 
                        required >
                            <option value="" disabled selected>Choose your option</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Information">Information</option>
                      </select>
                    </div>
          
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
                </div>
              </div>
              )
        }
        
      };
      


}

export default CreateSystem;