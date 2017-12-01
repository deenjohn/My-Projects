
[Live Demo on Codepen](https://codepen.io/deen_john/pen/dZwWJm?editors=0011)


```html

<script src="https://cdnjs.cloudflare.com/ajax/libs/redux/3.0.4/redux.js"></script>
<script src="//fb.me/react-0.14.0.js"></script>
<script src="//fb.me/react-dom-0.14.0.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/react-redux/4.0.0/react-redux.js"></script>
</head>
<body>
  <div id="root"></div>
</body>

```
 
```jsx

 

const styles = {}

styles.tab = {
  display: 'inline-block',
  padding: 10,
  margin: 10,
  borderBottom: '4px solid',
  borderBottomColor: '#ccc',
  cursor: 'pointer'
}

styles.activeTab = {
  ...styles.tab,
  borderBottomColor: '#000'
}

styles.panel = {
  padding: 10 ;
  background-color : gold ;
  width : 50%
}

const DATA = [
  { id: 1, name: 'USA', description: 'Land of the Free, Home of the brave' },
  { id: 2, name: 'Brazil', description: 'Sunshine, beaches, and Carnival' },
  { id: 3, name: 'Russia', description: 'World Cup 2018!' }
]

class Tabs extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {activeTabIndex: 0 };
    this.selectTabIndex = this.selectTabIndex.bind(this) ;
  }
  
  selectTabIndex(activeTabIndex) {
    this.setState({
      activeTabIndex : activeTabIndex
    });
  }
  
 render() {
    const { data } = this.props
    const { activeTabIndex } = this.state

    const tabs = data.map((tab, index) => {
      const isActive = index === activeTabIndex
      const style = isActive ? styles.activeTab : styles.tab
      return (
        <div
          key={tab.label}
          className="Tab"
          style={style}
          onClick={() => this.selectTabIndex(index)}
        >{tab.label}</div>
      )
    })

    const activeTab = data[activeTabIndex]
    const content = activeTab && activeTab.content

    return (
      <div className="Tabs">
        {tabs}
        <div className="TabPanel" style={styles.panel}>
          {content}
        </div>
      </div>
    )
  }
}


class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {};
   
  }
  
   render() {
     
     const data = this.props.countries.map(country => ({
      label: country.name,
      content: country.description
    }))
   console.log(data)
     
   return (
      <div>
        <h1>Countries</h1>
        <Tabs data={data} />
      </div>
    )
 
  }
}

ReactDOM.render(
       <App countries={DATA} />
    ,
    document.getElementById('root')
);

  

```
