import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import ToDoTask from './ToDoTask';

class ToDoList extends React.Component {
  render(){
	return (
      <div className="List">
		<div class="card rounded-3">
          <div class="card-body p-4">
			<div className="card-header-title font-size-lg text-capitalize font-weight-normal">
				<i className="fa fa-tasks"></i>&nbsp;Task Lists</div>
          
				</div>
					<div className="scroll-area-sm">
					  <perfect-scrollbar className="ps-show-limits">
						<div style={{position: 'static'}} className="ps ps--active-y">
						  <div className="ps-content">
							<ul className=" list-group list-group-flush">
								{
									this.props.tasks.map((model) => {
									return (<ToDoTask model={model} key={model._id} />)
									})
								}
							</ul>
						  </div>
						  
						</div>
					  </perfect-scrollbar>
					</div>
						<div className="d-block text-right card-footer">
					<NavLink to='/add' className="btn btn-info ms-1">Выбрать телевизор</NavLink>
				</div>
			</div>
				
		</div> 
    );
  }
}

function mapStateToProps(state){
	return {
		tasks: [...state.tasks]
	}
}

export default connect(mapStateToProps)(ToDoList);
