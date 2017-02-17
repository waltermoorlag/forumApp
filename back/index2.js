var React = require('react');
var ReactDOM = require('react-dom');
var Registrar= require('./registroReact')

var Login = React.createClass({
	getInitialState: function(){
		return { 
			email:this.props.email,
			pass:this.props.pass,
			msj:'',
			btnreg:'display: none;'
		}
	},
	onButtonClickReg: function(e){
		e.preventDefault	();
        ReactDOM.render(<Registrar />,document.getElementById('app'))
    },
	onButtonClick: function(e){
		e.preventDefault	();
		// var newName = this.refs.name.value;
        // var misCabeceras = new Headers();
        // var user={usuario: this.refs.email, pwd: this.refs.pass};
        var user = { email: this.refs.email.value, 
                         pwd: this.refs.pass.value, 
                   };

        var miInit = { 
        	       // credentials: 'include',
        	       credentials: "include",
                   method: 'post',
                   mode: 'cors', 
                   headers: {'Content-Type': 'application/json'} ,
                   body: JSON.stringify(user),

        };
		var that=this;
		fetch('http://localhost:3000/login',miInit)
		.then(function(response) {
		 	return response.json()})
		.then(function(data){
			 console.log('paso 3',data)
             if (data.registrar) { 
	             that.setState({
	             	msj :  'usuario no registrado',
	             });
	         }
		})

	},
	render: function(){
		return (
			<div>
			<form onSubmit = { this.onButtonClick } >
				<input type='text' ref='email' placeholder='email'></input><br></br>
				<input type='password' ref='pass' placeholder='password'></input><br></br>
				<button>Login</button>
				<button onClick={ this.onButtonClickReg }>Registrar</button>
				<label ref='msj'>{this.state.msj}</label>
			</form>
			</div>
		)
	}
})

// var BotRegistrar = function (props) {
//       return <button onClick={ props.onButtonClickReg }>Registrar</button>
// };

ReactDOM.render(<Login />,document.getElementById('app'))
