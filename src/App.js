import React from 'react';
import logo from './logo.svg';
import './App.css';

export default class App extends React.Component {

  value = 'Test';

  constructor(props){
    super(props);
    this.state = {value: '', tasks: {}};
    try{
      if(localStorage.getItem('tasks')){
        this.state.tasks = JSON.parse(localStorage.getItem('tasks'));
        console.log(this.state.tasks);
      }
    }catch(e){
      console.log(e);
    }
  }

  handleChange = (event) =>{
    this.setState({value: event.target.value});
  }

  
  onChange = (event) => {
    this.value = event.target.value;
  };

  addItem = () =>{
    this.state.tasks[Date.now()] = {value: this.state.value, checked: false};
    this.saveTasks();
    this.setState({value:''});
  }


  istItems = ()=> Object.keys(this.state.tasks).map(key =>
    <div class="checkbox" key={key} style={{marginBottom: 20}}>
    <label><input  type="checkbox" data-key={key} onChange={()=>this.checkedBox(key)} checked={this.state.tasks[key].checked}/> {this.state.tasks[key].value}</label>
    <button style={{marginLeft: 50}} class="btn btn-danger" onClick={()=>this.deleteItem(key)}>Delete</button>
    </div>
  )

  resetAll = ()=>{
    Object.keys(this.state.tasks).forEach(key=>{
      this.state.tasks[key].checked = false;
    });
    this.saveTasks();
  }

  saveTasks(){
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    this.setState({tasks: this.state.tasks});    
  }

  deleteItem = (key)=>{
    delete this.state.tasks[key];
    this.saveTasks();
  }

  checkedBox = (key) =>{
    debugger;
    const tasks = this.state.tasks;
    this.setState({tasks: {...tasks,[key]:{...tasks[key],checked:!tasks[key].checked}}});
    localStorage.setItem('tasks', JSON.stringify({...tasks,[key]:{...tasks[key],checked:!tasks[key].checked}}));
  }

  render() {
    return <div class="col-xs-12">
              <ul>{this.istItems()}</ul>
              <input  type="text" value={this.state.value} onChange={this.handleChange} />
              <br/>
            <button class="btn btn-primary" onClick={this.addItem}>Add</button>
              <br/>
            <button class="btn btn-danger" onClick={this.resetAll}>Reset All</button>
            </div>;
  }
}