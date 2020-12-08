import 'bootstrap/dist/css/bootstrap.min.css'
import React, {Component} from 'react';

class ConfigurationView extends Component{
    render(){
        return(
            <div className="container">
              <br/>
              <br/>
                <table class="table myTable">
                    <thead>
                        <h4>
                            Finding Type
                        </h4>
                        <tbody>
                        <tr> <td> Credentials Complexity</td><td><button class="btn-sm"></button></td></tr>
                        <tr> <td> Manufacturer Default Creds</td><td><button class="btn-sm"></button></td></tr>
                        <tr><td>Lack of Authentication</td><td><button class="btn-sm"></button></td></tr>
                        <tr><td><input type="text"/></td><td><button class="btn-sm">Add</button></td></tr>
                        <tr> <td> Credentials Complexity</td><td><button class="btn-sm"></button></td></tr>
                        <tr> <td> Manufacturer Default Creds</td><td><button class="btn-sm"></button></td></tr>
                        <tr><td>Lack of Authentication</td><td><button class="btn-sm"></button></td></tr>
                        
                        </tbody>
                    </thead>
                </table>
                <br/>
          <table class="table myTable">
            <thead>
              <h4>
                Threat Level
              </h4>
            </thead>
            <tbody>
              <tr> <td>I</td><td><button class="btn-sm"></button></td></tr>
              <tr> <td>II</td><td><button class="btn-sm"></button></td></tr>
              <tr><td>III</td><td><button class="btn-sm"></button></td></tr>
              <tr><td><input type="text"/></td><td><button class="btn-sm">Add</button></td></tr>
            </tbody>
          </table>
      <br/>  
      <table class="table myTable">
            <thead>
              <h4>
                Finding Classification
              </h4>
            </thead>
            <tbody>
              <tr> <td>Vulnerability</td><td><button class="btn-sm"></button></td></tr>
              <tr> <td>Information</td><td><button class="btn-sm"></button></td></tr>
              <tr><td><input type="text"/><td><button class="btn-sm">Add</button></td></td></tr>
            </tbody>
          </table>
        <br/> 
        <table class="table myTable">
          <thead>
            <h4>
              Countermeasure
            </h4>
          </thead>
          <tbody>
            <tr> <td>Very High</td><td><button class="btn-sm"></button></td></tr>
            <tr> <td>High</td><td><button class="btn-sm"></button></td></tr>
            <tr><td>Moderate</td><td><button class="btn-sm"></button></td></tr>
            <tr> <td>Low</td><td><button class="btn-sm"></button></td></tr>
            <tr> <td>Very Low</td><td><button class="btn-sm"></button></td></tr>
            <tr><td><input type="text"/><td><button class="btn-sm">Add</button></td></td></tr>
          </tbody>
        </table>
        <br/> 
        <table class="table myTable">
          <thead>
            <h4>
              Event Classification
            </h4>
          </thead>
          <tbody>
            <tr> <td>Top Secret</td><td><button class="btn-sm"></button></td></tr>
            <tr> <td>Secret</td><td><button class="btn-sm"></button></td></tr>
            <tr><td>Confidential</td><td><button class="btn-sm"></button></td></tr>
            <tr> <td>Classified</td><td><button class="btn-sm"></button></td></tr>
            <tr> <td>Unclassified</td><td><button class="btn-sm"></button></td></tr>
            <tr><td><input type="text"/><td><button class="btn-sm">Add</button></td></td></tr>
          </tbody>
        </table>
        <br/> 
        <table class="table myTable">
          <thead>
            <h4>
              Level
            </h4>
          </thead>
          <tbody>
            <tr> <td>Low</td><td><button class="btn-sm"></button></td></tr>
            <tr> <td>Medium</td><td><button class="btn-sm"></button></td></tr>
            <tr><td>High</td><td><button class="btn-sm"></button></td></tr>
            <tr><td><input type="text"/><td><button class="btn-sm">Add</button></td></td></tr>
          </tbody>
        </table>
        <br/>   

        <table class="table myTable">
          <thead>
            <h4>
              Event Type
            </h4>
          </thead>
          <tbody>
            <tr> <td>Very Highe</td><td><button class="btn-sm"></button></td></tr>
            <tr> <td>High</td><td><button class="btn-sm"></button></td></tr>
            <tr><td>Moderate</td><td><button class="btn-sm"></button></td></tr>
            <tr> <td>Low</td><td><button class="btn-sm"></button></td></tr>
            <tr> <td>Very Low</td><td><button class="btn-sm"></button></td></tr>
            <tr><td><input type="text"/><td><button class="btn-sm">Add</button></td></td></tr>
          </tbody>
        </table>
        <br/> 
        <table class="table myTable">
          <thead>
            <h4>
              Finding Impact
            </h4>
          </thead>
          <tbody>
            <tr> <td><h6>Confidentiality</h6></td><td>Low, Medium, High, Information</td></tr>
            <tr> <td><h6>Integrity</h6></td><td>Low, Medium, High, Information</td></tr>
            <tr><td><h6>Availability</h6></td><td>Low, Medium, High, Information</td></tr>
          </tbody>
        </table>
        <br/> 
        <table class="table myTable">
          <thead>
            <h4>
              Severity Category Code
            </h4>
          </thead>
          <tbody>
            <tr> <td>I</td><td><button class="btn-sm"></button></td></tr>
            <tr> <td>II</td><td><button class="btn-sm"></button></td></tr>
            <tr><td>III</td><td><button class="btn-sm"></button></td></tr>
            <tr><td><input type="text"/><td><button class="btn-sm">Add</button></td></td></tr>
          </tbody>
        </table>
        <br/> 
        <table class="table myTable">
          <thead>
            <h4>
              Progress
            </h4>
          </thead>
          <tbody>
            <tr> <td>Not Started</td><td><button class="btn-sm"></button></td></tr>
            <tr> <td>Assigned</td><td><button class="btn-sm"></button></td></tr>
            <tr><td>Transferred</td><td><button class="btn-sm"></button></td></tr>
            <tr> <td>In Progress</td><td><button class="btn-sm"></button></td></tr>
            <tr> <td>Complete</td><td><button class="btn-sm"></button></td></tr>
            <tr> <td>Not Applicable</td><td><button class="btn-sm"></button></td></tr>
            <tr><td><input type="text"/><td><button class="btn-sm">Add</button></td></td></tr>
          </tbody>
        </table>
        <br/> 
        <table class="table myTable">
          <thead>
            <h4>
              Event Rules
            </h4>
          </thead>
          <tbody>
            <tr> <td>Lorem ipsum dolor sit amet consectetur adipisicing elit.</td><td><button class="btn-sm"></button></td></tr>
            <tr> <td> Non porro mollitia corporis corrupti nulla explicabo quisquam architecto ipsa, consectetur vitae possimus repellendus? </td><td><button class="btn-sm"></button></td></tr>
            <tr><td>Ad voluptatem unde, nobis non laudantium inventore omnis.</td><td><button class="btn-sm"></button></td></tr>
            <tr><td><input type="text"/><td><button class="btn-sm">Add</button></td></td></tr>
          </tbody>
        </table>
        <br/> 
        <table class="table myTable">
          <thead>
            <h4>
              Report Template
            </h4>
          </thead>
          <tbody>
            <tr> <td>Risk Matrix</td><td><button class="btn-sm"></button></td></tr>
            <tr> <td>ERB</td><td><button class="btn-sm"></button></td></tr>
            <tr><td>CVPA</td><td><button class="btn-sm"></button></td></tr>
            <tr> <td>Final</td><td><button class="btn-sm"></button></td></tr>
            <tr><td><input type="text"/><td><button class="btn-sm">Add</button></td></td></tr>
          </tbody>
        </table>
        <br/> 
        <table class="table myTable">
          <thead>
            <h4>
              Notification
            </h4>
          </thead>
          <tbody>
            <tr> <td>Lorem ipsum dolor sit amet consectetur adipisicing elit.</td><td><button class="btn-sm"></button></td></tr>
            <tr> <td> Non porro mollitia corporis corrupti nulla explicabo quisquam architecto ipsa, consectetur vitae possimus repellendus? </td><td><button class="btn-sm"></button></td></tr>
            <tr><td>Ad voluptatem unde, nobis non laudantium inventore omnis.</td><td><button class="btn-sm"></button></td></tr>
            <tr><td><input type="text"/><td><button class="btn-sm">Add</button></td></td></tr>
          </tbody>
        </table>
        <br/> 

        </div>
        
        )
    }
}
export default ConfigurationView
