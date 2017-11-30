


[Codepen](https://codepen.io/deen_john/pen/GOPqgV)


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

ul {
  list-style : none ;
  border-color : gray ;
  border-style : solid ;
  width : 50% ;
  padding : 10px
}

li{
  border-bottom : solid ;
  padding : 4px
}


```
 
```jsx

 const sortBy = function sortBy(value){
  return function compare(a,b) {
    
      if (a[value] < b[value])
        return -1;
      if (a[value] > b[value])
        return 1;
      return 0;
    }
}
 
 // filter
const type = ty => arg => arg.type === ty;
        
const DATA = { 
  title: 'Menu',
  items: [
    { id: 1, name: 'tacos', type: 'mexican' , price : 50 },
    { id: 2, name: 'burrito', type: 'mexican' ,price : 100 },
    { id: 3, name: 'tostada', type: 'mexican' ,price : 60  },
    { id: 4, name: 'chowmein', type: 'chinese',price : 25 } ,
    { id: 5, name: 'dal', type: 'indian' ,price : 10 },
    { id: 6, name: 'burrito', type: 'mexican',price : 30 },
    { id: 7, name: 'punjabi toast', type: 'indian' ,price : 23  },
    { id: 8, name: 'pizza', type: 'italian' ,price : 50  }
   
  ]
}

function SelectOption(props) {
  return (
    <select onChange = {props.onClick}>
          <option value="type">type</option>
          <option value="name">name</option>
         <option selected value="price">price</option>
      </select>
  );
}

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {sortValue : "price" };
    this.handleClick = this.handleClick.bind(this);
    const Data = Data
  }

  handleClick(e) {
    this.setState({sortValue :e.target.value })
  }
  
  render() {  
    var items = DATA.items.sort(sortBy(this.state.sortValue))
    .map(function (item) {
     return (<li key={item.id}>
         <div>{item.name} </div>
         Rs.{item.price}
       </li>)
    });
    
    return (
    <div>
      <h1>{DATA.title}</h1>
      <SelectOption onClick ={this.handleClick}/>
      <ul>{items}</ul>
    </div>
  )
  }
}

ReactDOM.render(
        <Menu />,
    document.getElementById('root')
);

```
