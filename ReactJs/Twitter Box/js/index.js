
var testTweet = {
  message: "I love Anime.",
  gravatar: "xyz",
  author: {
    handle: "deen_john",
    name: "Deen John Uzumaki"
  },
  likes: 2,
  retweets: 1,
  timestamp: "2017-07-30 21:24:37"
};

function Avatar(_ref) {
  var hash = _ref.hash;

  var url = "https://pbs.twimg.com/profile_images/888754591965167622/EPVlCaUF_bigger.jpg";
  return React.createElement("img", {
    src: url,
    className: "avatar",
    alt: "avatar" });
}

function Message(_ref2) {
  var text = _ref2.text;

  return React.createElement(
    "div",
    { className: "message" },
    text
  );
}

function NameWithHandle(_ref3) {
  var author = _ref3.author;
  var name = author.name,
      handle = author.handle;

  return React.createElement(
    "span",
    { className: "name-with-handle" },
    React.createElement(
      "span",
      { className: "name" },
      name
    ),
    React.createElement(
      "span",
      { className: "handle" },
      "@",
      handle
    )
  );
}

var Time = function Time(_ref4) {
  var time = _ref4.time;

  var timeString = moment(time).fromNow();
  return React.createElement(
    "span",
    { className: "time" },
    timeString
  );
};

var ReplyButton = function ReplyButton() {
  return React.createElement("i", { className: "fa fa-reply reply-button" });
};

// function getRetweetCount(count) {
//     if(count > 0) {
//       return (
//         <span className="retweet-count">
//           {count}
//         </span>
//         );
//       } else {
//       return 0;
//     }
//   }

function Count(_ref5) {
  var count = _ref5.count;

  if (count > 0) {
    return React.createElement(
      "span",
      { className: "retweet-count" },
      count
    );
  } else {
    return 0;
  }
}

var RetweetButton = function RetweetButton(_ref6) {
  var count = _ref6.count;
  return React.createElement(
    "span",
    { className: "retweet-button" },
    React.createElement("i", { className: "fa fa-retweet" }),
    React.createElement(Count, { count: count })
  );
};

var LikeButton = function LikeButton(_ref7) {
  var count = _ref7.count;
  return React.createElement(
    "span",
    { className: "like-button" },
    React.createElement("i", { className: "fa fa-heart" }),
    React.createElement(
      "span",
      { className: "like-count" },
      count ? count : null
    )
  );
};

var MoreOptionsButton = function MoreOptionsButton() {
  return React.createElement("i", { className: "fa fa-ellipsis-h more-options-button" });
};

function Tweet(_ref8) {
  var tweet = _ref8.tweet;

  return React.createElement(
    "div",
    { className: "tweet" },
    React.createElement(Avatar, { hash: tweet.gravatar }),
    React.createElement(
      "div",
      { className: "content" },
      React.createElement(NameWithHandle, { author: tweet.author }),
      React.createElement(Time, { time: tweet.timestamp }),
      React.createElement(Message, { text: tweet.message }),
      React.createElement(
        "div",
        { className: "buttons" },
        React.createElement(ReplyButton, null),
        React.createElement(RetweetButton, { count: tweet.retweets }),
        React.createElement(LikeButton, { count: tweet.likes }),
        React.createElement(MoreOptionsButton, null)
      )
    )
  );
}

ReactDOM.render(React.createElement(Tweet, { tweet: testTweet }), document.getElementById('root'));