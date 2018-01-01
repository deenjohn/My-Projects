var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var items = [{
  id: 0,
  image: "https://images-na.ssl-images-amazon.com/images/I/41oU1rL8adL.jpg",
  name: "Apple iPad Mini 2 16GB",
  description: "An iPad like no other. 16GB, WiFi, 4G.",
  price: 229.00
}, {
  id: 1,
  image: "https://images-na.ssl-images-amazon.com/images/I/41oU1rL8adL.jpg",
  name: "Apple iPad Mini 2 32GB",
  description: "Even larger than the 16GB.",
  price: 279.00
}, {
  id: 2,
  name: "Canon T7i",
  image: "https://images-eu.ssl-images-amazon.com/images/I/51Sn1wzpYmL._AC_US218_FMwebp_QL70_.jpg",
  description: "DSLR camera with lots of megapixels.",
  price: 749.99
}, {
  id: 3,
  name: "Apple Watch Sport",
  image: "https://images-eu.ssl-images-amazon.com/images/I/4130KpkqPnL._AC_US218_FMwebp_QL70_.jpg",
  description: "A watch",
  price: 249.99
}, {
  id: 4,
  name: "Apple Watch Silver",
  image: "https://images-na.ssl-images-amazon.com/images/I/41NW4xJXdPL._AC_US218_.jpg",
  description: "A more expensive watch",
  price: 599.99
}];

function ItemPage(_ref) {
  var items = _ref.items,
      onAddToCart = _ref.onAddToCart;

  return React.createElement(
    "ul",
    { className: "ItemPage-items" },
    items.map(function (item) {
      return React.createElement(
        "li",
        { key: item.id, className: "ItemPage-item" },
        React.createElement(
          Item,
          { item: item },
          React.createElement(
            "button",
            {
              className: "Item-addToCart",
              onClick: function onClick() {
                return onAddToCart(item);
              } },
            "Add to Cart"
          )
        )
      );
    })
  );
}

ItemPage.propTypes = {
  items: PropTypes.array.isRequired
};

var Nav = function Nav(_ref2) {
  var activeTab = _ref2.activeTab,
      onTabChange = _ref2.onTabChange;
  return React.createElement(
    "nav",
    { className: "App-nav" },
    React.createElement(
      "ul",
      null,
      React.createElement(
        "li",
        { className: "App-nav-item " + (activeTab === 0 && 'selected') },
        React.createElement(
          NavLink,
          { index: 0, onClick: onTabChange },
          "Items"
        )
      ),
      React.createElement(
        "li",
        { className: "App-nav-item " + (activeTab === 1 && 'selected') },
        React.createElement(
          NavLink,
          { index: 1, onClick: onTabChange },
          "Cart"
        )
      )
    )
  );
};

var NavLink = function (_React$Component) {
  _inherits(NavLink, _React$Component);

  function NavLink() {
    var _ref3;

    var _temp, _this, _ret;

    _classCallCheck(this, NavLink);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref3 = NavLink.__proto__ || Object.getPrototypeOf(NavLink)).call.apply(_ref3, [this].concat(args))), _this), _this.handleClick = function () {
      _this.props.onClick(_this.props.index);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(NavLink, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "a",
        { onClick: this.handleClick },
        this.props.children
      );
    }
  }]);

  return NavLink;
}(React.Component);

var Item = function Item(_ref4) {
  var item = _ref4.item,
      children = _ref4.children;
  return React.createElement(
    "div",
    { className: "Item" },
    React.createElement(
      "div",
      { className: "Item-left" },
      React.createElement(
        "div",
        { className: "Item-image" },
        React.createElement("img", { src: item.image, style: { width: 64, height: 64 } })
      ),
      React.createElement(
        "div",
        { className: "Item-title" },
        item.name
      ),
      React.createElement(
        "div",
        { className: "Item-description" },
        item.description
      )
    ),
    React.createElement(
      "div",
      { className: "Item-right" },
      React.createElement(
        "div",
        { className: "Item-price" },
        "$",
        item.price
      ),
      children
    )
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
  children: PropTypes.node
};

var App = function (_React$Component2) {
  _inherits(App, _React$Component2);

  function App() {
    var _ref5;

    var _temp2, _this2, _ret2;

    _classCallCheck(this, App);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_ref5 = App.__proto__ || Object.getPrototypeOf(App)).call.apply(_ref5, [this].concat(args))), _this2), _this2.state = {
      activeTab: 0,
      cart: []
    }, _this2.handleTabChange = function (index) {
      _this2.setState({
        activeTab: index
      });
    }, _this2.handleRemoveOne = function (item) {
      var index = _this2.state.cart.indexOf(item.id);
      _this2.setState({
        cart: [].concat(_toConsumableArray(_this2.state.cart.slice(0, index)), _toConsumableArray(_this2.state.cart.slice(index + 1)))
      });
    }, _this2.handleAddToCart = function (item) {
      _this2.setState({
        cart: [].concat(_toConsumableArray(_this2.state.cart), [item.id])
      });
    }, _temp2), _possibleConstructorReturn(_this2, _ret2);
  }

  _createClass(App, [{
    key: "renderContent",
    value: function renderContent() {
      switch (this.state.activeTab) {
        default:
        case 0:
          return React.createElement(ItemPage, {
            items: items,
            onAddToCart: this.handleAddToCart });
        case 1:
          return this.renderCart();
      }
    }
  }, {
    key: "renderCart",
    value: function renderCart() {
      // Count how many of each item is in the cart
      var itemCounts = this.state.cart.reduce(function (itemCounts, itemId) {
        itemCounts[itemId] = itemCounts[itemId] || 0;
        itemCounts[itemId]++;
        return itemCounts;
      }, {});

      // Create an array of items
      var cartItems = Object.keys(itemCounts).map(function (itemId) {
        // Find the item by its id
        var item = items.find(function (item) {
          return item.id === parseInt(itemId, 10);
        });
        // Create a new "item" that also has a 'count' property
        return _extends({}, item, {
          count: itemCounts[itemId]
        });
      });
      return React.createElement(CartPage, {
        items: cartItems,
        onAddOne: this.handleAddToCart,
        onRemoveOne: this.handleRemoveOne });
    }
  }, {
    key: "render",
    value: function render() {
      var activeTab = this.state.activeTab;

      return React.createElement(
        "div",
        { className: "App" },
        React.createElement(Nav, { activeTab: activeTab, onTabChange: this.handleTabChange }),
        React.createElement(
          "main",
          { className: "App-content" },
          this.renderContent()
        )
      );
    }
  }]);

  return App;
}(React.Component);

function sumCart(items) {
  return items.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue.count * currentValue.price;
  }, 0);
}

function CartCheckout(_ref6) {
  var items = _ref6.items;

  return React.createElement(
    "div",
    { className: "totalcart" },
    React.createElement(
      "span",
      { style: { fontSize: 17, fontWeight: 700 } },
      "Total :"
    ),
    React.createElement(
      "span",
      { style: { color: '#B12704', fontWeight: 700 } },
      "$",
      sumCart(items)
    )
  );
}

function CartGreet() {
  return React.createElement(
    "h2",
    { style: { fontSize: 21, fontWeight: 700 } },
    "Your Shopping Cart is empty."
  );
}
function CartPage(_ref7) {
  var _ref7$items = _ref7.items,
      items = _ref7$items === undefined ? {} : _ref7$items,
      onAddOne = _ref7.onAddOne,
      onRemoveOne = _ref7.onRemoveOne;

  return React.createElement(
    "div",
    null,
    React.createElement(
      "ul",
      { className: "CartPage-items" },
      items.map(function (item) {
        return React.createElement(
          "li",
          { key: item.id, className: "CartPage-item" },
          React.createElement(
            Item,
            { item: item },
            React.createElement(
              "div",
              { className: "CartItem-controls" },
              React.createElement(
                "button",
                {
                  className: "CartItem-removeOne",
                  onClick: function onClick() {
                    return onRemoveOne(item);
                  } },
                "\u2013"
              ),
              React.createElement(
                "span",
                { className: "CartItem-count" },
                item.count
              ),
              React.createElement(
                "button",
                {
                  className: "CartItem-addOne",
                  onClick: function onClick() {
                    return onAddOne(item);
                  } },
                "+"
              )
            )
          )
        );
      })
    ),
    Object.keys(items).length === 0 ? React.createElement(CartGreet, null) : React.createElement(CartCheckout, { items: items })
  );
}

CartPage.propTypes = {
  items: PropTypes.array.isRequired,
  onAddOne: PropTypes.func.isRequired,
  onRemoveOne: PropTypes.func.isRequired
};

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));