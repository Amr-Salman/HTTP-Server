const http = require('http');
const fs = require('fs');

const paths = {
  Home: 'html/Home.html',
  Nature: 'html/Nature.html',
  Quotes: 'html/Quotes.html',
  main: 'css/main.css',
};

const sendPage = (res, path, encoding, contentType = 'text/html') => {
  const page = fs.readFileSync(path, encoding ? { encoding: 'utf-8' } : '');
  res.setHeader('Content-Type', contentType);
  res.end(page);
};
const readDB = (name) => {
  const db = fs.readFileSync(name, { encoding: 'utf-8' });
  return JSON.parse(db);
};

const server = http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      const notes = readDB('db.json');
      let notesHtml = '';
      notes.forEach((note) => {
        notesHtml += `
        <div>
        <p>${note.title}</p>
      <span>Status: ${note.status}</span>
      <span>Created At: ${new Date(note.date).toLocaleDateString(
        'en-US'
      )}</span>
        </div>
        `;
      });
      const homePage = `
      <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Home</title>
    <link rel="stylesheet" href="../css/main.css" />
  </head>
  <body>
    <header>
      <nav>
        <a href="/" class="active">Home</a>
        <a href="/Nature">Nature</a>
        <a href="/Quotes">Quotes</a>
      </nav>
    </header>
    <main>
      <section class="notes">
          ${notesHtml}
      </section>
    </main>
  </body>
</html>
`;
      res.setHeader('Content-Type', 'text/html');
      res.end(homePage);
      break;

    case '/Nature':
      sendPage(res, paths['Nature'], true);
      break;

    case '/Quotes':
      sendPage(res, paths['Quotes'], true);
      break;

    case '/css/main.css':
      sendPage(res, paths['main'], false, 'text/css');
      break;

    case '/Nature/1.jpg':
      sendPage(res, 'Nature/1.jpg', false, 'image/jpeg');
      break;

    case '/Nature/2.jpg':
      sendPage(res, 'Nature/2.jpg', false, 'image/jpeg');
      break;

    case '/Quotes/1.jpg':
      sendPage(res, 'Quotes/1.jpg', false, 'image/jpeg');
      break;

    case '/Quotes/2.jpg':
      sendPage(res, 'Quotes/2.jpg', false, 'image/jpeg');
      break;

    default:
      break;
  }
});

server.listen(3000, () => {
  console.log('Server is Running!');
});
