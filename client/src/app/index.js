import React, {Component} from 'react';
import CreateNewEvent from './createNewEvent'
import api from '../api'
import { BrowserRouter as Router} from 'react-router-dom'
import Switch  from 'react-router-dom/Switch'
import Route from 'react-router-dom/Route'
import NavBar from '../components/NavBar'
import { Redirect } from 'react-router-dom'
import Login from '../components/Login'
import Footer from '../components/Footer'
import General from './general'
import Task from '../components/task'
import CreateTask from '../components/createTask'
import ViewTask from '../components/viewTask'
import Subtask from '../components/subtask'
import CreateSubTask from '../components/CreateSubTask'
import viewSubtask from '../components/viewSubtask'
import CreateSystem from '../components/CreateSystem'
import System from '../components/system'
import viewSystem from '../components/viewSystem'
import CreateFinding from '../components/CreateFindingForm'
import Finding from '../components/finding'
import viewFinding from '../components/viewFinding'

import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component{
  constructor(){
    super();
    this.state = {
      events:[], 
      isLogged:false,
      initials:'', 
      user:[]
    }
  }
  getEvents = async e =>{
    await api.getAllEvents().then((res)=>{
      const data = res.data.data
      
      this.setState({events:data})
      
    }).catch(()=>{
      this.setState({events:[]})
    })
  }
  getStatus(){
    let store=localStorage.getItem('login');
    let init =localStorage.getItem('initial');
    if(store){
      this.setState({isLogged:true})
      this.setState({initials:init})
      

    }else{
      this.setState({isLogged:false})
    }
  }
  componentDidMount(){
    this.getEvents()
    this.getStatus()
  }
  async loginUser (init){

    await api.getAnalystById(init).then((res) =>{
      this.setState({ user:res.data.data})
      localStorage.setItem('login', true);
      localStorage.setItem('initial', init);
      
    }).catch(error =>{
      console.log(error)   
    })

    
  }
  async logout(){
    localStorage.clear();
    this.getStatus()
  }
  //used to display object info
  displayEvent = (posts) => {
    if(!posts.length) return null;
    return posts.map((post, index) => (
      <div key={index}>
        <h3>{post.eventName}</h3>
      </div>
    ))
  }
  render(){
    if(this.state.events.length === 0){
      return(
        <div class="mainbody">
          <div className= "FRIC text-center">
            <h1>Finding and Reporting Information Console(FRIC)</h1>
            <p>There is no existing event in your local system</p>
          </div> 
            <div className="mainContain text-center">
              <a className="btn btn-primary" href="javascript:displayForm('create-form')">Create New Event</a>
              <a className="btn btn-primary" href="javascript:displayForm('sync-form')">Sync with Lead Analyst</a>
          </div>
          <CreateNewEvent />
        </div>
      )
    }else{
      return(
          <Router>
            <NavBar />
              <Route path="/" exact render={() =>{
                if(this.state.isLogged){
                  return(
                    <div>
                      You are in Genereal {
                        this.state.initials
                      }
                      <General/>
                      <Footer 
                        onClick={ () => this.logout() }
                      />
                    </div>
                )
                }else{
                  return(<div>
                      <Redirect to="/login"/>
                    </div>);
                }
              }
              }/>
              <Route path="/tasks" exact render={() =>{
                if(this.state.isLogged){
                  return(
                    <div>
                      You are in Tasks {
                        this.state.initials
                      }
                      <Task/>
                      <Footer 
                        onClick={ () => this.logout() }
                      />
                    </div>
                )
                }else{
                  return(<div>
                      <Redirect to="/login"/>
                    </div>);
                }
              }
              }/>
              <Route path="/create-task" exact render={() =>{
                if(this.state.isLogged){
                  return(
                    <div>
                      You are in create task {
                        this.state.initials
                      }
                      <CreateTask />
                      <Footer 
                        onClick={ () => this.logout() }
                      />
                    </div>
                )
                }else{
                  return(<div>
                      <Redirect to="/login"/>
                    </div>);
                }
              }
              }/>
              <Route path="/view-task/:id" component={ViewTask}/>
              <Route path="/login" render={() => {
                if(!this.state.isLogged){
                  return(
                    <Login 
                      login={this.loginUser.bind(this)}
                    />
                  )
                }else{
                  return(
                    <Redirect to="/"/>
                  );
                }
              }
              } />
              <Route path="/subtask" exact render={() =>{
                if(this.state.isLogged){
                  return(
                    <div>
                      You are in Subtask {
                        this.state.initials
                      }
                      <Subtask/>
                      <Footer 
                        onClick={ () => this.logout() }
                      />
                    </div>
                )
                }else{
                  return(<div>
                      <Redirect to="/login"/>
                    </div>);
                }
              }
              }/>
              <Route path="/create-subtask" exact render={() =>{
                if(this.state.isLogged){
                  return(
                    <div>
                      You are in create subtask {
                        this.state.initials
                      }
                      <CreateSubTask/>
                      <Footer 
                        onClick={ () => this.logout() }
                      />
                    </div>
                )
                }else{
                  return(<div>
                      <Redirect to="/login"/>
                    </div>);
                }
              }
              }/>
              <Route path="/viewSubtask/:id" component={viewSubtask}/>
              <Route path="/login" render={() => {
                if(!this.state.isLogged){
                  return(
                    <Login 
                      login={this.loginUser.bind(this)}
                    />
                  )
                }else{
                  return(
                    <Redirect to="/"/>
                  );
                }
              }
              } />
              <Route path="/system" exact render={() =>{
                if(this.state.isLogged){
                  return(
                    <div>
                      You are in System {
                        this.state.initials
                      }
                      <System/>
                      <Footer 
                        onClick={ () => this.logout() }
                      />
                    </div>
                )
                }else{
                  return(<div>
                      <Redirect to="/login"/>
                    </div>);
                }
              }
              }/>
              <Route path="/create-System" exact render={() =>{
                if(this.state.isLogged){
                  return(
                    <div>
                      You are in create System {
                        this.state.initials
                      }
                      <CreateSystem/>
                      <Footer 
                        onClick={ () => this.logout() }
                      />
                    </div>
                )
                }else{
                  return(<div>
                      <Redirect to="/login"/>
                    </div>);
                }
              }
              }/>
              <Route path="/viewSystem/:id" component={viewSystem}/>
              <Route path="/login" render={() => {
                if(!this.state.isLogged){
                  return(
                    <Login 
                      login={this.loginUser.bind(this)}
                    />
                  )
                }else{
                  return(
                    <Redirect to="/"/>
                  );
                }
              }
              } />
              <Route path="/findings" exact render={() =>{
                if(this.state.isLogged){
                  return(
                    <div>
                      You are in Finding {
                        this.state.initials
                      }
                      <Finding/>
                      <Footer 
                        onClick={ () => this.logout() }
                      />
                    </div>
                )
                }else{
                  return(<div>
                      <Redirect to="/login"/>
                    </div>);
                }
              }
              }/>
              <Route path="/create-finding" exact render={() =>{
                if(this.state.isLogged){
                  return(
                    <div>
                      You are in create System {
                        this.state.initials
                      }
                      <CreateFinding/>
                      <Footer 
                        onClick={ () => this.logout() }
                      />
                    </div>
                )
                }else{
                  return(<div>
                      <Redirect to="/login"/>
                    </div>);
                }
              }
              }/>
              {/*
              <Route path="/viewFinding/:id" component={viewFinding}/>
              */}
              <Route path="/login" render={() => {
                if(!this.state.isLogged){
                  return(
                    <Login 
                      login={this.loginUser.bind(this)}
                    />
                  )
                }else{
                  return(
                    <Redirect to="/"/>
                  );
                }
              }
              } />
          </Router>
      )
    }

  }

  
  
};





export default App;