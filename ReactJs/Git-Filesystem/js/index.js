
var FileList = function FileList(_ref) {
  var files = _ref.files;
  return React.createElement(
    "table",
    { className: "file-list" },
    React.createElement(
      "tbody",
      null,
      files.map(function (file) {
        return (
          /* now we use FileListItem here */
          React.createElement(FileListItem, { key: file.id, file: file })
        );
      })
    )
  );
};

function getFileName(file) {
  return [React.createElement(FileIcon, { file: file, key: 0 }), React.createElement(
    "td",
    { className: "file-name", key: 1 },
    file.name
  )];
}

var FileListItem = function FileListItem(_ref2) {
  var file = _ref2.file;
  return React.createElement(
    "tr",
    { className: "file-list-item" },
    getFileName(file),
    React.createElement(CommitMessage, {
      commit: file.latestCommit }),
    React.createElement(
      "td",
      { className: "age" },
      React.createElement(Time, { time: file.updated_at })
    )
  );
};

var CommitMessage = function CommitMessage(_ref3) {
  var commit = _ref3.commit;
  return React.createElement(
    "td",
    { className: "commit-message" },
    commit.message
  );
};

function FileIcon(_ref4) {
  var file = _ref4.file;

  var icon = 'fa-file-text-o';
  if (file.type === 'folder') {
    icon = 'fa-folder';
  }
  return React.createElement(
    "td",
    { className: "file-icon" },
    React.createElement("i", { className: "fa " + icon })
  );
}

var Time = function Time(_ref5) {
  var time = _ref5.time;

  var timeString = moment(time).fromNow();
  return React.createElement(
    "span",
    { className: "time" },
    timeString
  );
};
var testFiles = [{
  id: 1,
  name: 'src',
  type: 'folder',
  updated_at: "2016-07-11 21:24:00",
  latestCommit: {
    message: 'Initial commit'
  }
}, {
  id: 2,
  name: 'tests',
  type: 'folder',
  updated_at: "2016-07-11 21:24:00",
  latestCommit: {
    message: 'Initial commit'
  }
}, {
  id: 3,
  name: 'README',
  type: 'file',
  updated_at: "2016-07-18 21:24:00",
  latestCommit: {
    message: 'Added a readme'
  }
}];

ReactDOM.render(React.createElement(FileList, { files: testFiles }), document.getElementById('root'));