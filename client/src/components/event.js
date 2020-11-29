import React, {Component} from 'react';
import api from '../api'
import styled from 'styled-components'
import ReactTable from 'react-table'
//import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      event :[],
      progress :[],
      
    }
  }
  componentDidMount(){
      this.getEvents();
  }
    getEvents = async e=>{
        await api.getEventProgress().then((res) => { 
            const data = res.data.data
            this.setState({progress : [data]})
        }).catch(() =>{
            this.setState({progress:[]})
        })
    }
    displayEvent = (post, progress) => {
        if(!progress.length) return null;
        return 
        <div>
            Tasks Not Started: {progress.notStarted} / {progress.total}
            Tasks in Progress: {progress.inProgress} / {progress.total}
            Complete tasks: {progress.complete} / {progress.total} 
        </div>
    }
}
