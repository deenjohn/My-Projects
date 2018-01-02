
let items = [
  {
  id: 0,
  image : "https://images-na.ssl-images-amazon.com/images/I/41oU1rL8adL.jpg" ,
  name: "Apple iPad Mini 2 16GB",
  description: "An iPad like no other. 16GB, WiFi, 4G.",
  price: 229.00
  },
  {
  id: 1,
  image : "https://images-na.ssl-images-amazon.com/images/I/41oU1rL8adL.jpg" ,
  name: "Apple iPad Mini 2 32GB",
  description: "Even larger than the 16GB.",
  price: 279.00
  },
  {
  id: 2,
  name: "Canon T7i",
  image : "https://images-eu.ssl-images-amazon.com/images/I/51Sn1wzpYmL._AC_US218_FMwebp_QL70_.jpg" ,
  description: "DSLR camera with lots of megapixels.",
    price: 749.99
  },
  {
  id: 3,
  name: "Apple Watch Sport",
  image : "https://images-eu.ssl-images-amazon.com/images/I/4130KpkqPnL._AC_US218_FMwebp_QL70_.jpg" ,
  description: "A watch",
  price: 249.99
  },
  {
  id: 4,
  name: "Apple Watch Silver",
  image : "https://images-na.ssl-images-amazon.com/images/I/41NW4xJXdPL._AC_US218_.jpg" ,
  description: "A more expensive watch",
  price: 599.99
  }
];

function ItemPage({ items, onAddToCart }) {
  return (
    <ul className="ItemPage-items">
    {items.map(item =>
      <li key={item.id} className="ItemPage-item">
        <Item item={item}>
          <button
            className="Item-addToCart"
            onClick={() => onAddToCart(item)}>
            Add to Cart
          </button>
        </Item>
      </li>
    )}
    </ul>
  );
 }


ItemPage.propTypes = {
  items: PropTypes.array.isRequired
};

const Nav = ({ activeTab, onTabChange }) => (
  <nav className="App-nav">
    <ul>
       <li className={`App-nav-item ${activeTab === 0 && 'selected'}`}>
          <NavLink index={0} onClick={onTabChange}>Items</NavLink>
       </li>
       <li className={`App-nav-item ${activeTab === 1 && 'selected'}`}>
          <NavLink index={1} onClick={onTabChange}>Cart</NavLink>
       </li>
     </ul>
  </nav>
);


class NavLink extends React.Component {
  handleClick = () => {
    this.props.onClick(this.props.index);
    }
    render() {
    return (
      <a onClick={this.handleClick}>
        {this.props.children}
      </a>
    );
  }
}
  

  const Item = ({ item, children }) => (
    <div className="Item">
    <div className="Item-left">
      <div className="Item-image"> 
        <img src={item.image} style={{width : 64 ,height: 64}} />  
      </div>
      <div className="Item-title">{item.name}</div>
      <div className="Item-description">{item.description}</div>
    </div>
    <div className="Item-right">
      <div className="Item-price">${item.price}</div>
        {children}
    </div>
    </div>
  );

  Item.propTypes = {
  item: PropTypes.object.isRequired,
  children: PropTypes.node
  };

 class App extends React.Component {
  state = {
    activeTab: 0,
    cart: []
   }

  handleTabChange = (index) => {
    this.setState({
     activeTab: index
     });
   }
  
   handleRemoveOne = (item) => {
    let index = this.state.cart.indexOf(item.id);
    this.setState({
      cart: [
      ...this.state.cart.slice(0, index),
      ...this.state.cart.slice(index + 1)
      ]
    });
  }

   handleAddToCart = (item) => {
      //console.log('handleAddToCart')
      this.setState({
        cart: [...this.state.cart, item.id]
      });
    }
   
  renderContent() {
    switch(this.state.activeTab) {
    default:
    case 0:
      return (
        <ItemPage
          items={items}
          onAddToCart={this.handleAddToCart} />
        );
      case 1:
        return this.renderCart();
      }

   }
    
    renderCart() {
    // Count how many of each item is in the cart
      let itemCounts = this.state.cart.reduce((itemCounts, itemId) => {
      itemCounts[itemId] = itemCounts[itemId] || 0;
      itemCounts[itemId]++;
        return itemCounts;
      }, {});
   
      // Create an array of items
        let cartItems = Object.keys(itemCounts).map(itemId => {
        // Find the item by its id
        var item = items.find(item =>
        item.id === parseInt(itemId, 10)
        );
        // Create a new "item" that also has a 'count' property
        return {
          ...item,
          count: itemCounts[itemId]
         }
        }); //cartItems
      
        return (
        <CartPage
          items={cartItems}
          onAddOne={this.handleAddToCart}
          onRemoveOne={this.handleRemoveOne} />
        );
    }

    render() {
      let {activeTab} = this.state;
      return (
        <div className="App">
          <Nav activeTab={activeTab} onTabChange={this.handleTabChange} />
          <main className="App-content">
            {this.renderContent()}
          </main>
        </div>
      );
      }
  }

  function sumCart(items){
     return items.reduce(
      function (
        accumulator,
        currentValue
       ) {
        return accumulator + currentValue.count*currentValue.price;
       },0
     );
  }

 function CartCheckout({items}){     
      return(<div className='totalcart'> 
          <span style={{fontSize: 17 ,fontWeight: 700}}>Total :</span>
          <span style={{color: '#B12704',fontWeight: 700}}>${sumCart(items)}</span>
        </div> )            
  }

function CartGreet(){
  return <div style={{fontSize: 21 ,fontWeight: 700}}>
    <h2>Your Shopping Cart is empty.</h2>
  </div> ;
}
 function CartPage({ items ={}, onAddOne, onRemoveOne }) {
    return (
     <div> 
         <ul className="CartPage-items">
             {items.map(item =>
          <li key={item.id} className="CartPage-item">
            <Item item={item}>
              <div className="CartItem-controls">
                <button
                className="CartItem-removeOne"
                onClick={() => onRemoveOne(item)}>&ndash;</button>
                <span className="CartItem-count">{item.count}</span>
                <button
                className="CartItem-addOne"
                onClick={() => onAddOne(item)}>+</button>
              </div>
          </Item>
          </li>
          )}
          </ul>
        {Object.keys(items).length === 0? (
          <CartGreet />
        ) : (
         <CartCheckout items={items} />
        )}
      </div>
    );
 }

  CartPage.propTypes = {
  items: PropTypes.array.isRequired,
  onAddOne: PropTypes.func.isRequired,
  onRemoveOne: PropTypes.func.isRequired
  };

  ReactDOM.render(<App /> , document.getElementById('root'));


