import React from 'react';
import ReactDOM from 'react-dom';
import {MockService} from './MockService.js';
import {Button} from './Button.js';
//import { Form, Button, FormGroup, FormControl, ControlLabel, FormCheck, controlId } from "react-bootstrap";
import './App.css';

class App extends React.Component {

  constructor(props){
    super(props);
    this.MockService = React.createRef();
    this.state = {
      label:'Sales region',
      multiSelect: false,
      defaultValue: "North America",
      choices:["Asia","North America","Eastern Europe","Australia","Western Europe","Latin America","Middle East","Africa"],
      order:false,
      validate: 'valid',
      inputAdd: '',
      validInputAdd: '',
      invalidInputAdd: '',
      choicesForDelete: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sortChoices = this.sortChoices.bind(this);
    this.addChoice = this.addChoice.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.removeChoice = this.removeChoice.bind(this);
    this.validateChoices = this.validateChoices.bind(this);
    this.handleChoiceLength = this.handleChoiceLength.bind(this);
  }

  handleChange(e) { 
      const target = e.target;
      const value = target.type === 'checkbox'? target.checked:target.value;
      const name = target.name;
      this.setState({
        [name]: value
      });
      if(name==='order'&&value===true){
        this.state.choices.sort(function(c1,c2){
          return c1.toLowerCase().localeCompare(c2.toLowerCase());
        });
      }
    } 
  //to validate the length of input while adding new choices  
  handleChoiceLength(e){
     //validation for input Add
     let value = e.target.value;
     let { invalidInputAdd, validInputAdd } = this.state;
     validInputAdd = value;
     if(value.length>40){
       validInputAdd = value.substring(0,40);
       invalidInputAdd = value.substring(40);
     }
     else{
       invalidInputAdd="";
     }
     this.setState({ validInputAdd: validInputAdd, invalidInputAdd: invalidInputAdd, inputAdd: value })
  }  
  //sorting choices alphabetically
  sortChoices(){
    if(this.state.order===true){
      this.state.choices.sort(function(c1,c2){
        return c1.toLowerCase().localeCompare(c2.toLowerCase());
      });
    }
  }
//to reset form. Called when cancel is clicked
resetForm(e){
  e.preventDefault();
  const resetState = this.MockService.current.getField();
  //console.log(resetState);
   this.setState(resetState);
}
//to handle the submission of form. Called when submit is clicked
handleSubmit(e) {
  e.preventDefault();
  this.addDefault();
  const test = JSON.stringify(this.state);
  //<MockService ref={this._MockService} />
  this.MockService.current.saveField(test);
  //alert('Sales Region Provided: ' + this.state.label);
}

//This functions helps multiple delete
  handleOptionClick = item => {
    let { choicesForDelete } = this.state;
    // checking if seleced choice exists in choicesForDelete
    const exists = choicesForDelete.includes(item);
    if (exists) {
      choicesForDelete = choicesForDelete.filter(choice => choice === item);
    } else {
      choicesForDelete = [...choicesForDelete, item];
    }
    this.setState({ choicesForDelete });
  };
  
  //To add choices to list of choices
  addChoice(e) {
    e.preventDefault();
    let currentChoices = this.state.choices;
    let input = e.target.previousElementSibling.previousElementSibling;
      //validating choices
    if(input.value){  
      if(this.validateChoices(input.value)){
          currentChoices.push(input.value);
          this.sortChoices();
          input.value = '';
          this.setState({
              choices: currentChoices
          });
      }
      else{
        if(this.state.choices.length>50){
          alert("Not Allowed: More than 50 choices not allowed");}
        else{
          alert("Not Allowed: Duplicate choice")}  
      }
    }
  }
  
  //Add default value if not present in list of choices
  addDefault(){
    if(this.validateChoices(this.state.defaultValue)){
      let choice;
      let defaultExist=false;
      for(choice in this.state.choices){
        if(this.state.choices[choice].toLowerCase() === this.state.defaultValue.toLowerCase()){
            defaultExist = true;
        }
      }
      if(!defaultExist){
        let newChoices = this.state.choices;
        newChoices.push(this.state.defaultValue);
        this.setState({choices: newChoices});
      }
    }
  }

  //Removing a choice. Called when removed is clicked
  removeChoice = (e) => {
    e.preventDefault();
    const choices = this.state.choices.filter(
      choiceItem => !this.state.choicesForDelete.includes(choiceItem)
    );
    this.setState({ choices });
  };

  //Validation for choices
  validateChoices(item){
    //Disallow user to add more than 50 choices
    if(this.state.choices.length>50){
        return false;
    }
    //check if duplicate choice exist
    let choice;
    for(choice in this.state.choices){
      if(this.state.choices[choice].toLowerCase() === item.toLowerCase()){
        return false;
      }
    }
    return true;
  }

  render(){
    let choiceItems = this.state.choices.map((item, i) => {
      return (
        <option
          className={
            this.state.choicesForDelete.includes(item) ? "selected" : ""// check if choice is selected
          }
          key={item + i}
          onClick={() => this.handleOptionClick(item)}
        >
          {item}
        </option>
      );})





    return(
      <div className="container fluid mx-auto my-auto py-5">
        <div className="card border-info">
          <h5 className="card-header bg-info">Field Builder</h5>
          <div className="card-body">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group row">
              <label htmlFor="label"  className="col-sm-2 col-form-label">Label</label>
              <div className="col-sm-6">
                <input
                  className="form-control"
                  name="label"
                  placeholder={this.state.label}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group row">
              <label className="col-sm-2">Type</label>
              <div className="col-sm-6">
                <div className="form-check pl-0">
                  <span className="pl-0 mr-5 font-weight-bold"> Multi Select</span>
                  <input
                    className="form-check-input "
                    name="multiSelect"
                    type="checkbox"
                    checked={this.state.multiSelect}
                    onChange={this.handleChange}
                  />
                  <label 
                    htmlFor="multiSelect"
                    className="form-check-label"
                  >A value is required</label>
                </div>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="defaultValue" className="col-sm-2">Default Value</label>
              <div className="col-sm-6">
                <input
                  className="form-control"
                  name="defaultValue"
                  type="text"
                  placeholder={this.state.defaultValue}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="Add Choice" className="col-sm-2">Add Choice</label>
              <div className="col-sm-6">
                <div style={{position:'relative'}}>
                  <input
                    className="form-control"
                    value={this.state.inputAdd} type="text" 
                    id="input-add"
                    onChange={this.handleChoiceLength}
                    maxLength='50' 
                    style={{ color:'transparent', width: '100%'}}
                  />
                </div>
              </div>
              <div className="col-sm-4">
                <span style={{ position: 'absolute', left: '1%' }}>
                  {this.state.validInputAdd}
                  <span style={{ color: 'red' }}>{this.state.invalidInputAdd}</span>
                </span>
                <Button id={'new-choice'} handleClick={this.addChoice} label={'Add Choice'}></Button>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="Choices" className="col-sm-2">Choices</label>
              <div className="col-sm-6">
                <select
                  className="form-control"
                  name="choices"
                  size="5"
                  multiple={!!this.state.multiSelect}
                >
                  {choiceItems}
                </select>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="Remove Choice" className="col-sm-2">Remove Choice</label>
              <div className="col-sm-6">
                <Button
                  id={'remove-choice'}
                  handleClick={this.removeChoice}
                  label={'Remove Choice'}
                ></Button>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-2">Order</label>
              <div className="col-sm-6">
                <div className="form-check pl-0">
                  <input
                    className="form-check-input "
                    name="order"
                    type="checkbox"
                    checked={this.state.order}
                    onChange={this.handleChange}
                  />
                  <label 
                    htmlFor="order"
                    className="form-check-label"
                  >Display choices in alphabetical</label>
                </div>
              </div>
            </div>

            <MockService ref={this.MockService}/>
            <div className="form-group row">
              <div className="col-sm-10 offset-2">
                <input type="submit" value="Submit" className="btn btn-success mr-4"/> Or
                <input type="submit" value="Cancel" className="btn btn-link text-danger font-weight-bold" onClick={this.resetForm}/>
              </div>
            </div>
          </form>
        </div>
        </div>
        {/* <form onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-25">
            <label htmlFor="label">Label</label>
          </div>
          <div className="col-75">
            <input name="label" value={this.state.label} onChange={this.handleChange} required/>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="multiSelect">Type: Multi Select</label>
          </div>
          <div className="col-75">
            <input name="multiSelect" type="checkbox" checked={this.state.multiSelect} onChange={this.handleChange}/>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="defaultValue">Default Value</label>
          </div>
          <div className="col-75">
            <input name="defaultValue" type="text" value={this.state.defaultValue} onChange={this.handleChange}/>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="Add Choice">Add Choice</label>
          </div>
          <div className="col-75">
            <div style={{position:'relative'}}>
            <input value={this.state.inputAdd} type="text" 
                    id="input-add" onChange={this.handleChoiceLength} maxLength='50' 
                    style={{ color:'transparent', width: '95%'}}/>
            <span style={{ position: 'absolute', left: '1%' }}>{this.state.validInputAdd}<span
                      style={{ color: 'red' }}>{this.state.invalidInputAdd}</span></span>
            <Button id={'new-choice'} handleClick={this.addChoice} label={'Add Choice'}></Button>          
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="Choices">Choices</label>
          </div>
          <div className="col-75">
            <select name="choices" size="3" multiple={!!this.state.multiSelect}>
              {choiceItems}</select>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="Remove Choice">Remove Choice</label>
          </div>
          <div className="col-75">
            <Button id={'remove-choice'} handleClick={this.removeChoice} label={'Remove Choice'}></Button>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="Order">Order:Display Alphabetically</label>
          </div>
          <div className="col-75">
            <input name="order" type="checkbox" checked={this.state.order} onChange={this.handleChange}/> 
          </div>
        </div>
        <MockService ref={this.MockService}/>
        <div className="row">
          <input type="submit" value="Submit" className="sub"/>
          <input type="submit" value="Cancel" className="sub" onClick={this.resetForm}/>
        </div>
      </form> */}
    </div>
    );
  }
}
ReactDOM.render(<App/>,document.getElementById('root'));
export default App;
