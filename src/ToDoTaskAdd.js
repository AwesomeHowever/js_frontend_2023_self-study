import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { todoAdd } from './actions';

class ToDoTaskAddInner extends React.Component {
  constructor(props) { 
    super(props) 

    this.state =  {
      name: '',
      description: '',
	  tvsets: [
            {id: 123, value: 'Телевизор Samsung UE50BU8000U',    selected: false},
            {id: 456, value: 'Телевизор Samsung UE32T5300AUXCE', selected: false},
            {id: 789, value: 'Телевизор Samsung UE43AU7100UXCE',  selected: false},
            {id: 659, value: 'LED телевизор 32" Toshiba 32V35LE', selected: false}
        ]
    }
	
	this.handleChange = (event) => {
        const options = event.target.options;
        this.state.tvsets.forEach((lang, index, tvsets) => {
            tvsets[index].selected = options[index].selected;
        });
        this.setState({tvsets: this.state.tvsets});
    }

    this.handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.tvsets);
    }
    
    this.onNameChange = this.onNameChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onAddFormSubmit = this.onAddFormSubmit.bind(this);
  }
  
  onNameChange(e) { 
    e.preventDefault();

    this.setState({
      name: e.target.value
    });
  }

  onDescriptionChange(e) { 
    e.preventDefault();

    this.setState({
      description: e.target.value
    });
  }
  
  onAddFormSubmit(e) { 
    e.preventDefault();

      fetch('tasks', {
               method: 'POST', 
               body: JSON.stringify({
                 name: this.state.name, 
                 description: this.state.description
               }),
			   headers: {
				   'Content-type': 'application/json'
			   }
             }).then((res) => {
                 return res.json();
             }).then((data) => {
		this.props.dispatch(todoAdd(data._id, data.name, data.description));
		this.props.history('/');
      });
  }



  render() {
	  const selected = [];
        this.state.tvsets.forEach(lang => {
            if (lang.selected) {selected.push(lang.id); this.state.name=lang.value;}
        });
    return (
		<div className="card-hover-shadow-2x mb-3 card">
			<div class="card">
          <div class="card-body p-5">
			<i className="fa fa-tasks"></i>&nbsp; Выбор техники
				</div>
			</div>
				<form onSubmit={this.onAddFormSubmit}>
				
				<select
                    name="tvsets"
                    value={selected}
                    onChange={this.handleChange}
                    multiple={true}
                    size="4"
                >
                {this.state.tvsets.map(lang =>
                    <option key={lang.id} value={lang.id}>{lang.value}</option>
					
				
                )}
                </select>
                <input type="submit" value="В корзину" />
				
				
				</form>
					<div className="vh-100 gradient-custom">
						<NavLink to="/"  onClick="location.reload()" className="btn btn-info ms-1">Вернуться к списку заказов</NavLink>
						<div className="form-row">
							</div>
							<div className="forn-group col-xs-5">
							</div>
							<div className="forn-group col-xs-2">
						</div>
					</div>
			</div>
	)
  }
}

const ToDoTaskAdd = (props) => {
	return (
	  <ToDoTaskAddInner {...props} history={useNavigate()} />
	)
	
}

export default ToDoTaskAdd;