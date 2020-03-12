import React from 'react';
import './App.css';

function App() {
  return (
      <form className="container">
          <div className="form-group row">
              <label for="exampleInputEmail1" classsName="col-md-2 col-form-label">Label</label>
              <div class="col-md-4">
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Sales Region"/>
              </div>
          </div>
          <div className="form-group row">
              <label for="exampleInputEmail1" classsName="col-md-2 col-form-label">Type</label>
              <div className="col-md-2">
                  <label class="form-check-label" for="defaultCheck2">
                      <b>Multi-select</b>
                  </label>
              </div>
              <div className="col-md-4">
                  <input class="form-check-input" type="checkbox" value="" id="defaultCheck2"/>
                  A Value is required
              </div>
          </div>
          <div className="form-group row">
              <label for="exampleInputEmail1" classsName="col-md-2 col-form-label">Default Value</label>
              <div class="col-md-4">
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Sales Region" value="Asia"/>
              </div>
          </div>
          <div className="form-group row">
              <label for="exampleInputEmail1" classsName="col-md-2 col-form-label">Choices</label>
              <div class="col-md-4">
                  <select id="inputState" class="form-control">
                      <option selected>Asia</option>
                      <option>Australia</option>
                      <option>Europe</option>
                      <option>Americas</option>
                      <option>Africa</option>

                  </select>
              </div>
          </div>
          <div className="form-group row">
              <label for="exampleInputEmail1" classsName="col-sm-2 col-form-label">Order</label>
              <div class="col-sm-10">
                  <div class="col-sm-6">
                      <select id="inputState" class="form-control">
                          <option selected>Display choices in Alphabetical Order</option>
                      </select>
                  </div>
              </div>
          </div>
          <button type="submit" className="btn btn-success">Save changes</button> or <button className="btn btn-link" style={{color:'red'}}> cancel</button>
      </form>
  );
}

export default App;
