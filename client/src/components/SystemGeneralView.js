import React from 'react';
import {Component} from 'react';
import api from '../api';

class SystemGeneralView extends Component{
  constructor(props){
      super(props);
      this.state = {
          systems:[]
      }
  }
  componentDidMount(){
      this.getSystem()
  }
  getSystem = async e =>{
    console.log(e)
    await api.getAllSystems().then((res)=>{
      const data = res.data.data
      console.log(data)
      this.setState({systems:[data]})
    }).catch(()=>{
      this.setState({systems:[]})
    })
  }
  displaySystem = (posts) => {
    console.log(posts);
    if(!posts.length) return null;
    return posts.map((post, index) => (
      <div key={index}>
        <h1>{post.systemName}</h1>
      </div>
    ))
  }
  render(){
    return(
        <div className="system-list">
        {this.displaySystem(this.state.systems)}
    </div>
    )
}
}
export default SystemGeneralView