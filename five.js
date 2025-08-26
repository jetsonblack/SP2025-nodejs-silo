const connect = require('connect');
const serveStatic = require('serve-static');
const fs = require('fs');
const path = require('path');
const url = require('url');

const app = connect();
const PORT = 56079;
const logFile = path.join(__dirname, 'zanyaccess.log'); // log file
const htmlFile = path.join(__dirname, 'zanyaccess.html'); // html file

// Handle visit tracking
app.use((req, res, next) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === '/track') {
    const timestamp = new Date().toISOString() + '\n';

    fs.appendFile(logFile, timestamp, (err) => {
      if (err) {
        res.statusCode = 500;
        res.end('Error logging visit');
        return;
      }

      fs.readFile(logFile, 'utf8', (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end('Error reading log file');
          return;
        }

        const count = data.trim().split('\n').filter(Boolean).length;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ count }));
      });
    });

  } else if (parsedUrl.pathname === '/zanyaccess') {
    // Render the HTML file
    fs.readFile(htmlFile, 'utf8', (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end('zanyaccess.html not found');
        return;
      }

      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    });

  } else {
    next();
  }
});

// Serve static files from current directory
app.use(serveStatic(__dirname));

app.listen(PORT, () => {
  console.log(`Server running on http://silo.cs.indiana.edu:${PORT}`);
});
