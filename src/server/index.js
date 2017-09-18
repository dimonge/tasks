const express = require('express');
const fs = require('fs');
const app = express();
const Papa = require('papaparse');
app.get('/stats', function(req, res) {
  const filename = './metrics.csv';
  const stream = fs.createReadStream(filename);
  Papa.parse(stream, {
    delimiter: "\t",
    header: true,
    worker: true,
    preview: 100,
    complete: function(results, file) {
      res.json(results);
    },
    error: function(error) {
      console.log(error);
    }
  });
  
});

app.listen(3001, function() {
  console.log('listening to port 3001');
})