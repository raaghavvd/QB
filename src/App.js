import React, {Component} from 'react';
import './App.css';

const arrayOfData=[
   

    {
        'id':'Australia',
        'value':'Australia'
    },
    {
        'id':'America',
        'value':'America'
    },
    {
        'id':'United Kingdom',
        'value':'United Kingdom'
    },

]


class App extends Component {
    constructor(props) {
        super(props);
        // this.label = ;
        this.checker=0;
        this.activateLasers=this.activateLasers.bind(this);
        this.activateMultiple=this.activateMultiple.bind(this); 
        this.defaultChange=this.defaultChange.bind(this);
        // this.clearForm=this.clearForm(this);
        this.sortAlphabets=this.sortAlphabets(this);
        // this.upsertValue=this.upsertValue.bind(this);

    }
    activateLasers(value) {
        // console.log(value.target.multiple=true)
        console.log(this.checker)
        if(this.checker===1){
            value.target.multiple=true;

        }
        else{
            value.target.multiple=false;
        }
        console.log(value)
        this.handleChange()
    }
    handleChange = (event) => {
        // this.setState({
        //     value: event.target
        // });

    console.log(this.event.target.value)
    }
    sortAlphabets(value){
        console.log("SORTER")
        // if(this.sorter===1){
        //     arrayOfData.sort((a,b) => {
        //         return a.id > b.id;
        //     });
        //     this.setState({
        //         contacts: itemsArray
        //     })
        //     arrayOfData.sort(a>b,)
        //     arrayOfData.sort()
        // }
       
       
        
        // console.log(arrayOfData)
        // return arrayOfData;
        
    }
    
    activateMultiple(value){
        console.log("toggle")
        if (this.checker===1) {
            this.checker=0;
        } else {
            this.checker=1;
        }
        
    }
    defaultChange(event){
            if (event.key === 'Enter') {
                event.preventDefault();
                this.setState({value: event.target.value});
                let selectedValue = event.target.value;
        // this.props.onSelectChange(selectedValue);

                console.log(selectedValue)
                this.upsertValue(selectedValue);
                console.log('do validate');
            
    }
}
handleButtonClick = () => {
    this.form.reset() // resets "username" field to "admin"
  }



    

    upsertValue(selectedValue){
        console.log("UPSERT!!!")
        
        let presentVal=false;
        arrayOfData.map((data) =>{
        if (data.value===selectedValue){
            presentVal= true;
        }
        });
        if (!presentVal){
            arrayOfData.push({'id':selectedValue,'value':selectedValue})
        }
        console.log(arrayOfData)
    }

  render() {
        // let arrayOfData = this.props.arrayOfData;
        console.log(arrayOfData)
        // let options=null;
        let options = arrayOfData.map((data) =>
                <option 
                    key={data.id}
                    value={data.value}
                >
                    {data.value}
                </option>
            );
      return (
          <form className="container" ref={form => this.form = form}>
              <div className="form-group row">
                  <label for="defaultValue" classsName="col-md-2 col-form-label">Label</label>
                  <div class="col-md-4">
                      <input type="text" className="form-control" id="defaultValue" aria-describedby="emailHelp"
                             placeholder="Sales Region"/>
                  </div>
                  <p>{ this.label}</p>
              </div>
              <div className="form-group row">
                  <label for="defaultValue" classsName="col-md-2 col-form-label">Type</label>
                  <div className="col-md-2">
                      <label class="form-check-label" for="checker">
                          <b>Multi-select</b>
                      </label>
                  </div>
                  <div className="col-md-4">
                      <input class="form-check-input" type="checkbox" value="" id="checker" onClick={this.activateMultiple}/>
                      A Value is required
                  </div>
                   
              </div>
             
              <div className="form-group row">
                  <label for="defaultValue" classsName="col-md-2 col-form-label">Default Value</label>
                  <div class="col-md-4">
                      <input type="text" className="form-control" id="defaultValue" onSubmit={false} onKeyDown={this.defaultChange} aria-describedby="emailHelp"
                             placeholder="Enter the value"/>
                  </div>
              </div>
              <div className="form-group row">
                  <label for="defaultValue" classsName="col-md-2 col-form-label">Choices</label>
                  <div class="col-md-4">
                      <select id="inputGetter" class="form-control" onChange={this.activateLasers}>
                          <option selected>Continent selector</option>
                            {options}

                      </select>
                  </div>
              </div>
              <div className="form-group row">
                  <label for="defaultValue" classsName="col-md-2 col-form-label">Order</label>
                  <div className="col-md-2">
                      <label class="form-check-label" for="checker">
                          <b>Ok</b>
                      </label>
                  </div>
                  <div className="col-md-4">
                      <input class="form-check-input" type="checkbox" value="" id="sorter" onClick={this.sortAlphabets}/>
                      Sort the elements by alphabetical order
                  </div>
                   
              </div>
              <div className="form-group row">
                  <label for="defaultValue" classsName="col-sm-2 col-form-label">Order</label>
                  <div class="col-sm-10">
                      <div class="col-sm-6">
                          <select id="inputState" class="form-control">
                              <option selected>Display choices in Alphabetical Order</option>
                          </select>
                      </div>
                  </div>
              </div>

              <button type="submit"  onClick={this.activateLasers} className="btn btn-success">Save changes</button>
              or
              <button className="btn btn-link" style={{color: 'red'}} onClick={this.handleButtonClick}> cancel</button>
          </form>
      );
  }
}

export default App;