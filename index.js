var self = require("sdk/self");
var tabs = require("sdk/tabs");
var { ToggleButton } = require('sdk/ui/button/toggle');
var button = ToggleButton({
  id: "History",
  label: "History",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onChange: handleChange
});

var panel = require("sdk/panel").Panel({
  contentURL: self.data.url("panel.html"),
  contentScriptFile: self.data.url("scripts.js"),
  width: 500,
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
    panel.port.emit('history', results);
  });
}

panel.port.on('tabUrl', function(url) {
  tabs.open({
    url: url
  });
});
