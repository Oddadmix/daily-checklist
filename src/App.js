import React from 'react';
import logo from './logo.svg';
import './App.css';

export default class App extends React.Component {

  value = 'Test';

  constructor(props) {
    super(props);
    this.state = { value: '', tasks: {} };
    try {
      if (localStorage.getItem('tasks')) {
        this.state.tasks = JSON.parse(localStorage.getItem('tasks'));
        console.log(this.state.tasks);
      }
    } catch (e) {
      console.log(e);
    }
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }


  onChange = (event) => {
    this.value = event.target.value;
  };

  addItem = () => {
    this.state.tasks[Date.now()] = { value: this.state.value, checked: false };
    this.saveTasks();
    this.setState({ value: '' });
  }


  istItems = () => Object.keys(this.state.tasks).sort((a, b) => parseInt(a) - parseInt(b)).map(key =>
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <div class="checkbox" key={key}>
        <label><input type="checkbox" data-key={key} onChange={() => this.checkedBox(key)} checked={this.state.tasks[key].checked} /> {this.state.tasks[key].value}</label>

        <button onClick={() => this.deleteItem(key)} class="btn btn-default btn-xs pull-right remove-item">
          <span class="badge badge-danger badge-pill">Delete</span>
        </button>
      </div>
    </li>
  )

  resetAll = () => {
    Object.keys(this.state.tasks).forEach(key => {
      this.state.tasks[key].checked = false;
    });
    this.saveTasks();
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    this.setState({ tasks: this.state.tasks });
  }

  deleteItem = (key) => {
    delete this.state.tasks[key];
    this.saveTasks();
  }

  checkedBox = (key) => {
    debugger;
    const tasks = this.state.tasks;
    this.setState({ tasks: { ...tasks, [key]: { ...tasks[key], checked: !tasks[key].checked } } });
    localStorage.setItem('tasks', JSON.stringify({ ...tasks, [key]: { ...tasks[key], checked: !tasks[key].checked } }));
  }

  render() {
    return <div class="col-lg-12">
      <div class="card text-center">
        <div class="card-body">
        <h5 class="card-title">Daily Checklist</h5>
          <ul class="list-group text-center">{this.istItems()}</ul>

          <div class="form-group">
            <label for="exampleInputEmail1"><b>Add New Item</b></label>
            <input type="text" id="exampleInputEmail1" class="form-control" value={this.state.value} onChange={this.handleChange} />
          </div>

          <div class="form-group">
            <button type="button" class="btn btn-lg btn-primary" style={{marginLeft: 20}} onClick={this.addItem}>Add</button>

            <button type="button" class="btn btn-lg btn-danger" style={{marginLeft: 20}} onClick={this.resetAll}>Reset All</button>
          </div>


        </div>
      </div>

    </div>;
  }
}