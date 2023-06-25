import React from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'redact-redux';
import { NavLink } from 'react-router-dom';
import { todoAdd } from './actions'

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
            {id: 659, value: 'LED телевизор 32" Toshiba 32V35LE', selected: false},
			{id: 867, value: 'Телевизор 43" Philips 43PUS7406/60',  selected: false},
			{id: 890, value: 'Телевизор 32" Artel A32KH5500',  selected: false},
            {id: 784, value: 'Телевизор 50" Haier 50 Smart TV S3', selected: false},
			{id: 791, value: 'Телевизор 32" Hi VHIX-32F199MSA',  selected: false},
			{id: 792, value: 'Телевизор 50" Hisense 50A6BG',  selected: false},
            {id: 760, value: 'Телевизор Яндекс 43" - умный телевизор с Алисой (YNDX-00071)', selected: false},
			{id: 762, value: 'Телевизор 43" Artel UA43H3401',  selected: false},
			{id: 763, value: 'Телевизор 50" Haier 50 Smart TV S1', selected: false},
			{id: 755, value: 'Телевизор 43" Haier 43 Smart TV S1',  selected: false},
			{id: 720, value: 'Телевизор 55" Hisense 55E7HQ',  selected: false},
            {id: 721, value: 'Телевизор 50" Artel UA50H3502', selected: false}
        ]
    }
	
	this.handleChange = (event) => {
        const options = event.target.options;
        this.state.tvsets.forEach((tvset, index, tvsets) => {
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

      fetch((`tasks`), {
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
        this.state.tvsets.forEach(tvset => {
            if (tvset.selected) {selected.push(tvset.id); this.state.name=tvset.value;}
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
                    size="15"
                >
                {this.state.tvsets.map(tvsets =>
                    <option key={tvsets.id} value={tvsets.id}>{tvsets.value}</option>
					
				
                )}
                </select>
                <input type="submit" value="В корзину" />
				
				
				</form>
					<div className="vh-100 gradient-custom">
						<NavLink to="/" className="btn btn-info ms-1">Вернуться к списку заказов</NavLink>
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

export default connect() (ToDoTaskAdd);