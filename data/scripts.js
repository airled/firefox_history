var divhistory = document.getElementById('history');

self.port.on('history', function(array_of_objects) {
  divhistory.innerHTML = '';
  array_of_objects.map(function(object) {
    title = String(object.title);
    if (title != 'null') {
      var newdiv = document.createElement('div');
      newdiv.setAttribute('class', 'historyElement');
      newdiv.setAttribute('title', object.url);
        if (title.length > 50) {
          newdiv.innerHTML = title.substr(0, 48) + '...';
        }
        else{
          newdiv.innerHTML = title;
        }
      divhistory.appendChild(newdiv);
    }
  });
});

window.addEventListener('click', function(event) {
  self.port.emit('tabUrl', event.target.getAttribute('title').toString());
}, false);
