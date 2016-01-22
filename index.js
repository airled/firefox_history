let tabs = require("sdk/tabs");
let { search } = require("sdk/places/history");
let { ToggleButton } = require('sdk/ui/button/toggle');

let button = ToggleButton({
  id: "History",
  label: "History",
  icon: {
    "16": "./16.png",
    "32": "./32.png",
    "64": "./64.png"
  },
  onChange: handleChange
});

let panel = require("sdk/panel").Panel({
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
  search(
    { url: "" },
    { sort: "date", descending: true, count: 38 })
  .on("end", function (results) {
    panel.port.emit('history', results);
  });
}

panel.port.on('tabUrl', function(url) {
  tabs.open({
    url: url
  });
  panel.hide();
});
