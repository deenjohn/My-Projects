var React = require('react');
var ReactDOM = require('react-dom');
var Show = require('./Show');
var shows = require('./shows');
var createReactClass = require('create-react-class');



ReactDOM.render(
        <Show shows={shows} /> ,
    document.getElementById('root')
);

/*var Component = createReactClass({
 getInitialState :function(){
 return {
 color : 'blue'
 } ;
 } ,
 handleButtonClick : function(){
 this.setState(function(prevState){
 console.log(prevState);

 return {
 color : (prevState.color === 'blue')? 'green' :'blue'
 }

 }) ;
 }
 ,
 render : function(){
 console.log('render ');
 return (

 <div>
 <div style = {{ color : this.state.color}}>
 <h1> {this.props.greeting}</h1>
 </div>
 <button onClick ={this.handleButtonClick}>Click Me</button>
 </div>
 ) ;
 }
 });

 ReactDOM.render(
 <Component greeting = "Hello World" />,
 document.getElementById('root')
 );*/
