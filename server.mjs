import jsonServer from 'json-server';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);

// カスタムルーティングを定義
server.use(jsonServer.rewriter({
  '/users/:userId/skill-book-songs': '/users/:userId/skill-book-songs',
  '/users/:userId/skill-book-stats': '/users/:userId/skill-book-stats',
  '/ranking-songs': '/ranking-songs'
}));

// データベースの構造に基づいてカスタムレスポンスを設定
server.use((req, res, next) => {
  if (req.method === 'GET') {
    if (req.path.startsWith('/users/')) {
      const parts = req.path.split('/');
      if (parts.length === 4) {
        const userId = parts[2];
        const resource = parts[3];
        const db = router.db;
        const userData = db.get('users').get(userId).value();
        if (userData && userData[resource]) {
          return res.jsonp(userData[resource]);
        }
      }
    } else if (req.path === '/ranking-songs') {
      return res.jsonp(router.db.get('ranking-songs').value());
    }
  }
  next();
});

server.use(router);

const port = 3001;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});