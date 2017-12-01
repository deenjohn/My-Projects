




[Live Demo on Codepen](https://codepen.io/deen_john/pen/eebvEo?editors=0110)


```html

<script src="https://cdnjs.cloudflare.com/ajax/libs/redux/3.0.4/redux.js"></script>
<script src="//fb.me/react-0.14.0.js"></script>
<script src="//fb.me/react-dom-0.14.0.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/react-redux/4.0.0/react-redux.js"></script>
<link rel="stylesheet" href="sortable-theme-dark.css" />
<script src="sortable.min.js"></script>
<body>
  <div id="root"></div>
</body>

```
```css

.pre{
  background-color : yellow ;
  width : 50% ;
}

.ContentToggle__Details{
  background-color : grey ;
  width : 50% ;
  padding : 10px
}


```
 
```jsx

 

class ContentToggle  extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {isOpen : false};
    this.handleClick = this.handleClick.bind(this) ;
  }
  
  handleClick() {
   this.setState({
     isOpen: !this.state.isOpen //toggle state
   })
    if (this.props.onToggle){
      this.props.onToggle()    
    }
         
  }
  
   render() {
     let summaryClassName = 'ContentToggle__Summary'
     if (this.state.isOpen){
        summaryClassName += ' ContentToggle__Summary--is-open'
     }
     
    return (
           <div className="ContentToggle">
           <button onClick={this.handleClick} className={summaryClassName}>
              {this.props.title}
           </button>
           {this.state.isOpen && (
             <div className="ContentToggle__Details">
                {this.props.children}
             </div>
           )}
     </div>
    );
  }
}




class ToggleTracker   extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { numToggles : 0};
    this.handleToggle = this.handleToggle.bind(this) ;
  }
  
  handleToggle() {
   this.setState({
     numToggles: this.state.numToggles + 1
    })
  }
   render() {
     
      let { children } = this.props ;
      children = React.Children.map(children, (child) => (
                    React.cloneElement(child, {
                       onToggle: this.handleToggle
                   })
      ))

   return (
     <div>
       <pre className="pre">{JSON.stringify(this.state, null, 2)}</pre>
       {children} 
     </div>
   )
     
  }
}

  
ReactDOM.render(
       <ToggleTracker>
    
        <ContentToggle title="Tacos">
         <p>A taco is a traditional Mexican dish composed of a corn or 
           wheat tortilla folded or rolled  around a filling.</p>
       </ContentToggle>
    
       <ContentToggle title="Burritos">
         <p>A burrito is a type of Mexican and Tex-Mex food, consisting of a wheat 
           flour tortilla wrapped or folded into a cylindrical shape to completely enclose 
           the filling (in contrast to a taco, which is generally formed by simply folding 
           a tortilla in half around a filling, leaving the semicircular perimeter open).</p>
        </ContentToggle>
    
  </ToggleTracker>
    ,
    document.getElementById('root')
);

  
```
