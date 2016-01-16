var tabs = require("sdk/tabs");
var { ToggleButton } = require('sdk/ui/button/toggle');
var button = ToggleButton({
  id: "History",
  label: "History",
  icon: {
    "16": "./16.png",
    "32": "./32.png",
    "64": "./64.png"
  },
  onChange: handleChange
});

var panel = require("sdk/panel").Panel({
  contentURL: "./panel.html",
  contentScriptFile: "./scripts.js",
  width: 400,
  height: 600,
  onHide: handleHide
});

function handleChange(state) {
  if (state.checked) {
    getHistory();
    panel.show({
      position: button
    });
  }
}

function handleHide() {
  button.state('window', {checked: false});
}

function getHistory() {
  var { search } = require("sdk/places/history");
  search({ sort: "date" }).on("end", function (results) {
    panel.port.emit('history', results.reverse().slice(0,38));
  });
}

panel.port.on('tabUrl', function(url) {
  tabs.open({
    url: url
  });
});
