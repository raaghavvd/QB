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
let sorterOrderID

const sortChoices=[
   

    {
        'id':'asc',
        'value':'Order Choices by Ascending'
    },
    {
        'id':'desc',
        'value':'Order Choices by Descending'
    }
]
class App extends Component {
    constructor(props) {
        super(props);
        // this.label = ;
        this.state={
            selectValue:""
        }
        this.checker=0;
        this.activateLasers=this.activateLasers.bind(this);
        this.activateMultiple=this.activateMultiple.bind(this); 
        this.defaultChange=this.defaultChange.bind(this);
        // this.clearForm=this.clearForm(this);
        this.sortAlphabets=this.sortAlphabets.bind(this);
        this.orderSelection=this.orderSelection.bind(this);
        this.handleDropDownChange=this.handleDropDownChange.bind(this);


        // this.upsertValue=this.upsertValue.bind(this);

    }
    handleDropDownChange(e){
        console.log(this.sorterSelect)
        // this.setState({selectValue:e.target.value})
    }
    orderSelection(event){
        console.log("ORDER~!!")
        console.log(event.target.id)

       sorterOrderID= sortChoices.map((data)=>{
            if(data.value===event.target.value){
                return data.id;
            }
        });
        arrayOfData.sort(this.sortAlphabets())   
        console.log(arrayOfData) 

    }
    sortAlphabets(value){
        console.log("SORTER")
        if(sorterOrderID=="asc"){

            return function(a,b){
                if(a[value]>b[value]){
                    return 1
                }
                else if(a[value]<b[value]){
                    return -1
                }
        
        }
        

        }
        else{
            return function(a,b){
                if(a[value]>b[value]){
                    return -1
                }
                else if(a[value]<b[value]){
                    return 1
                }

        }

       
        
        }
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
        
    }
  
  

        // if(this.sorter===1){
        //     arrayOfData.sort((a,b) => {
        //         return a.id > b.id;
        //     });
            
        //     this.setState({
        //         contacts: itemsArray
        //     })
        // }
       
       
        
        // console.log(arrayOfData)
        // return arrayOfData;
        
    
    
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
        let sortOptions= sortChoices.map((data) =>
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
                      <select id="inputGetter" class="form-control" onChange={this.activateLasers} placeholder= "Select">
                          {/* <option placeholder>Continent selector</option> */}
                            {options}

                      </select>
                  </div>
              </div>
             
              <div className="form-group row">
                  <label for="defaultValue" classsName="col-sm-2 col-form-label">Order</label>
                  <div class="col-sm-10">
                      <div class="col-sm-6">
                          <select id="sorterSelect" class="form-control" onChange={this.orderSelection} value={this.state.selectValue} >
                              {sortOptions}
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