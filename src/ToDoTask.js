import React from 'react';
import { connect } from 'react-redux';
import { todoDelete, todoUpdateState } from './actions';

class ToDoTask extends React.Component {
  constructor(props) { 
    super(props) 

    this.onStatusClick = this.onStatusClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onStatusClick(e) { 
    e.preventDefault();
	
	fetch(`tasks/${this.props.model._id}`, {method: 'PATCH',
	  body: JSON.stringify({
		  done: !this.props.model.done
	  }),
	  headers: {
		  'Content-type': 'application/json'
	  }
	}).then((res) => {
        if (res.status === 200) { 
          console.log('Updated');
		  this.props.dispatch(todoUpdateState(this.props.model._id));
        }
        else { console.log('not updated'); }
    });
  }

  onDeleteClick(e) { 
    e.preventDefault();

      fetch(`tasks/${this.props.model._id}`, {method: 'DELETE'}).then((res) => {
        if (res.status === 200) { 
          console.log('deleted');
		  this.props.dispatch(todoDelete(this.props.model._id));
        }
        else { console.log('not deleted'); }
      });
    
  }

  render() {
    return (			 
	<li className="list-group-item">
	{this.props.model.done ? <div className="todo-indicator bg-success"></div> : <div className="todo-indicator bg-focus"></div>}
		
		<div className="widget-content p-0">
		  <div className="widget-content-wrapper">
		   
			<div className="widget-content-left">
			  <div className="widget-heading">{this.props.model.name}</div>
			  <div className="widget-subheading">
				<div>{this.props.model.description}</div>
			  </div>
			</div>
			<div className="widget-content-right">
			  <button className="border-0 btn-transition btn btn-outline-success" onClick={this.onStatusClick}>
				<i className="fa fa-check"></i></button>
			  <button className="border-0 btn-transition btn btn-outline-danger" onClick={this.onDeleteClick}>
				<i className="fa fa-trash"></i>
			  </button>
			</div>
		  </div>
		</div>
	  </li>
   )
  }
}

export default connect()(ToDoTask);
