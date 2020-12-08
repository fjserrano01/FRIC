import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'
import api from '../api';
import FindingType from '../components/EditFT'

class Configuration extends Component{

    constructor(){
        super();
        this.state = {
            findingTypeList: ['Credentials Complexity',
                'Manufacturer Default Creds',
                'Lack of Authentication', 'Plain Text Protocols',
                'Plain Text Web Login', 'Encryption',
                'Authentication Bypass', 'Port Security',
                'Access Control', 'Least Privilege',
                'Privilege Escalation', 'Missing Patches', 'Physical Security',
                'Information Disclosure'
            ],
            findingClassificationList:['Vulnerability', 'Information'],
            findingImpactLevelList:['VH','H', 'M', 'L', 'VL', 'Information'],
            postureList:['Insider',
                'Insider-nearsider',
                'Outsider',
                'Nearsider',
                'Nearsider-outsider'],
            threatLevelList:['Confirmed', 'Expected',
                'Anticipated', 'Predicted',
                'Possible'],
            impactLevelList:['VH','H', 'M', 'L', 'VL', 'Information'],
            countermeasureList:['VH','H', 'M', 'L', 'VL'],
            eventClassificationList:['Top secret', 'Secret', 'Confidential',
                'Classified', 'Unclassified'],
            eventRulesList:[],
            eventTypeList:['Cooperative Vulnerability Penetration Assessment',
                'Cooperative Vulnerability Investigation', 'Verification of Fixes'],
            levelList:[],
            severityCategoryCodeList:['I', 'II',
            'III'],
            progressList:['Not started','assigned', 'transferred', 
                'in progress', 'complete',  'not applicable'],
            reportList:[],
            notificationDurationList:[],
            notificationFrequencyList:[],
            submitted: false

        };

    }

    renderTableData(){
        return this.state.findingTypeList.map((ft) => {
            const {name} = ft
            return (
               <tr key={name}>
                  <td>{name}</td>
               </tr>
            )
         })
      }

    render(){
        if(this.state.submitted){
            return(<Redirect to="/"/>)
        }
        else{
            return(
            <div className="wrapper formatted-form">
            <div class="form-group">

                <FindingType/> 
            <table >
               <tbody>
                  {this.renderTableData()}
               </tbody>
            </table>
            </div>
            </div>
            )
        }
    }




} export default Configuration



class FindingType extends Component{

    constructor(){
        super();
        this.state = {
            findingTypeList:[],
            values:[],

            submitted: false,
            boop: false
        };
        //this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }


    handleSubmit = async e => {

        this.setState({

        })

        e.preventDefault();
        var name;
        var value_n;
        var payload;
        this.state.findingTypeList.forEach((value) => {
            name = value
            value_n = '1';
            payload = {name,value_n}
            console.log('made it in ft')
            api.insertFT(payload);
        });
        this.setState({submitted:true});
    }

    onChangeValue = event => {
        this.setState({ value: event.target.value });
      };
     
      onChangeValue0 = event => {
        this.setState({ value: event.target.value });
      };

      onAddItem = () => {

        this.setState(state => {
            const list = state.findingTypeList.concat(state.value);
            state.findingTypeList = list
            return {
              list,
              value: '',
            };
        });
      };

      table(){


      }

    render(){
        
            return(
            <div className="wrapper formatted-form">
            <div class="form-group">
                
            <div>   
                
                <table>
                    <thead>table</thead>
                    <tbody>{this.state.findingTypeList.map(item => (
                    <tr key={item}>{item}</tr>
                ))}</tbody>
                </table>
                <input
                type="text"
                value = "name"
                value={this.state.value}
                onChange={this.onChangeValue}
                />

                <input
                type="text"
                id = "value"
                value={this.state.value}
                onChange={this.onChangeValue0}
                />
            
                <button
                type="button"
                onClick={this.onAddItem}
                disabled={!this.state.value}
                >
                Add
                </button>
            </div>

                <button 
                    value={this.state.value}
                    onClick={
                    this.handleSubmit
                    } 
                    class="btn btn-primary">
                        Submit
                </button>
            </div>
            </div>
            )
        }
    




} export default FindingType