self.port.on('history', function(array_of_objects) {
  var divhistory = document.getElementById('history');
  divhistory.innerHTML = '';
  array_of_objects.map(function(object) {
    var newdiv = document.createElement('div');
    newdiv.setAttribute('class', 'historyElement');
    newdiv.setAttribute('url', object.url);
    newdiv.innerHTML = object.title;
    divhistory.appendChild(newdiv);
  });
});

window.addEventListener('click', function(event) {
  self.port.emit('tabUrl', event.target.getAttribute('url').toString());
}, false);
