import React, {Component} from 'react';
import api from '../api'

class CreateNewEvent extends Component{
    constructor(props){
        super(props);
        this.state = {
          firstName:'', 
          lastName:'',
          initials:'',
          eventName:'', 
          eventDescription: '', 
          eventType:'', 
          versionNumber: '', 
          eventClass: '', 
          eventDate:'', 
          eventCustomer:'',
          eventOrg:'',
          secClass:'',
          declassDate:''
          
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    handleSubmit = async e =>{
        const firstName = this.state.firstName
        const lastName = this.state.lastName
        const initial = this.state.initials
        const Role = 'Lead'
        const eventName = this.state.eventName
        const eventDescription = this.state.eventDescription
        const eventType = this.state.eventType
        const eventVersion = this.state.versionNumber
        const eventClassification = this.state.eventClass
        const eventDate = this.state.eventDate
        const eventCustomer = this.state.eventCustomer
        const eventOrgName = this.state.eventOrg
        const eventSecClass = this.state.secClass
        const eventDeclassDate = this.state.declassDate
        const payload = {
          eventName, eventDescription, eventType, eventVersion, eventClassification, eventDate, eventCustomer, eventOrgName, eventSecClass, eventDeclassDate
        }
        const pay = { firstName, lastName, initial, Role }
        this.insertAnalyst(pay)
        this.createEvent(payload)
        
        
      };
      async createEvent (payload){
        alert('made it here')
        await api.insertEvent(payload).then(res => {
          const data = res.data
          alert(data.id, ' Event has been set up')
        })
      }
      async insertAnalyst(payload){
        await api.insertAnalyst(payload).then(res =>{
          alert(('Analyst Inserted Succesfully'))
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
      
      render(){
        return( 
          <div className="wrapper formatted-form">
          <div class="form-group" id="create-form">
            <h2>Create Event</h2>
          <form onSubmit={this.handleSubmit}>
            <div class="form-group">
                <label >First Name</label>
                <input 
                  onChange={this.handleChange} 
                  type="text" 
                  value={this.state.value}
                  name="firstName"
                  class="form-control" 
                  placeholder="Enter First Name"
                  />
              </div>
              <div class="form-group">
                <label >Last Name</label>
                <input 
                  onChange={this.handleChange} 
                  type="text" 
                  value={this.state.value}
                  name="lastName"
                  class="form-control" 
                  placeholder="Enter Last Name"
                  />
              </div>
              <div class="form-group">
                <label >Initials</label>
                <input 
                  onChange={this.handleChange} 
                  type="text" 
                  value={this.state.value}
                  name="initials"
                  class="form-control" 
                  placeholder="Enter Initials"
                  />
              </div>
              <div class="form-group">
                <label >Event Name</label>
                <input 
                  onChange={this.handleChange} 
                  type="text" 
                  value={this.state.value}
                  name="eventName"
                  class="form-control" 
                  placeholder="Enter Event Name"
                  />
              </div>
              <div class="form-group">
                <label>Event Description</label>
                <input 
                onChange={this.handleChange}  
                value={this.state.value}
                type="text" 
                name="eventDescription"
                class="form-control" 
                placeholder="Enter Event Description"
                required />
              </div>
              <div class="form-group">
                <label>Event Type</label>
                <select 
                  placeholder="Not Selected" 
                  onChange={this.handleChange}  
                  value={this.state.value}
                  class="form-control" 
                  name="eventType" 
                  required >
                    <option></option>
                  <option value="CVPA">CVPA</option>
                  <option value="CVI">CVI</option>
                  <option value="VOF">VOF</option>
                </select>
              </div>
              <div class="form-group">
                <label>Event Version Number</label>
                <input 
                  type="float" 
                  onChange={this.handleChange}  
                  value={this.state.value}
                  class="form-control" 
                  name="versionNumber"
                  placeholder="Enter version number" 
                  required />
              </div>
    
              <div class="form-group">
                <label>Event Classification</label>
                <select 
                  onChange={this.handleChange}  
                  value={this.state.value}
                  name="eventClass"
                  class="form-control"
                  placeholder="Not Selected" 
                  required >
                    <option></option>
                  <option>Top Secret</option>
                  <option>Secret</option>
                  <option>Confidential</option>
                  <option>Classified</option>
                  <option>Unclassified</option>
                </select>
              </div>
    
    
              <div class="form-group">
                <label class="control-label" for="date">Event Date</label>
                <input 
                  onChange={this.handleChange}  
                  value={this.state.value}
                  class="form-control" 
                  id="date" 
                  name="eventDate" 
                  placeholder="MM/DD/YYY" 
                  type="text" 
                  required/>
              </div>
    
              <div class="form-group">
                <label>Event Customer</label>
                <input 
                  type="text"
                  onChange={this.handleChange}  
                  value={this.state.value}
                  class="form-control" 
                  name="eventCustomer"
                  placeholder="Enter customer name" 
                  required />
              </div>
    
              <div class="form-group">
                <label>Event Organization</label>
                <input 
                  type="text" 
                  onChange={this.handleChange}  
                  value={this.state.value}
                  class="form-control" 
                  name="eventOrg"
                  placeholder="Enter Organization Name" 
                  required />
              </div>
    
              <div class="form-group">
                <label for="exampleInputCustomer">Security Classification</label>
                <input 
                  type="text" 
                  class="form-control" 
                  onChange={this.handleChange}  
                  value={this.state.value}
                  name="secClass"
                  placeholder="Enter email" 
                  required />
              </div>
    
              <div class="form-group">
                <label class="control-label" for="date">Declassification Date</label>
                <input 
                  onChange={this.handleChange}  
                  value={this.state.value}
                  id="date2"
                  class="form-control" 
                  name="declassDate" 
                  placeholder="MM/DD/YYY" 
                  type="text" 
                  required />
              </div>
    
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
          <div class="form-group" id="sync-form">
            <h2>Sync With Lead Analyst</h2>
          <form>
              <div class="form-group">
                <label for="exampleInputEmail1">Hello</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
        )
      };
      


}

export default CreateNewEvent;