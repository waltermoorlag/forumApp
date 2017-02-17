var React = require('react');
var ReactDOM = require('react-dom');

var Registro = React.createClass({
  getInitialState: function(){
    return { 
    }
  },
  onButtonClick: function(e){
    e.preventDefault  ();

        var user = { email: this.refs.email.value, 
                         pwd: this.refs.pwd.value, 
                   pwdrepeat: this.refs.pwdrepeat.value };

        var miInit = { 
                   method: 'post',
                   mode: 'cors', 
                   headers: {'Content-Type': 'application/json'} ,
                   body: JSON.stringify(user),
        };
    var that=this;
    fetch('http://localhost:3000/login/registrar',miInit)
    .then((response) => {
       return response.json()})
    .then((data) => {
       // if (!data.registroOk) { 
         that.setState({
          msj :  data.msj
         });
       // }
    })

  },
  render: function(){
    return (
          <form onSubmit = { this.onButtonClick } >
            <div>
              <input type="text" placeholder="Usuario" ref="email"></input><br></br>
              <input type="password" placeholder="Enter Password"  ref="pwd" ></input><br></br>
              <input type="password" placeholder="Repeat Password"  ref="pwdrepeat" ></input><br></br>
           
              <div >
                <button type="button" >Cancel</button>
                <button type="submit" >Sign Up</button>
              </div><br></br>
              <label ref='msj'>{this.state.msj}</label>
            </div>
          </form>
    )
  }
})
module.exports=Registro


