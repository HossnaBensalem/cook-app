import jsonServer from 'json-server';
import cors from 'cors';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = 3001;

server.use(cors());
server.use(middlewares);
server.use(jsonServer.bodyParser);

// ------ المسارات المخصصة (يجب أن تكون قبل server.use(router)) ------
// مسار تسجيل الدخول
server.post('/login', (req, res) => {
  const { email, password } = req.body;
  const users = router.db.get('users').value();
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(401).json({ message: 'Identifiants invalides' });
  }
});

// مسار التسجيل
server.post('/register', (req, res) => {
  const { email, password } = req.body;
  const users = router.db.get('users').value();
  
  if (users.some(u => u.email === email)) {
    return res.status(400).json({ message: 'Email déjà utilisé' });
  }
  
  const newUser = { id: String(users.length + 1), email, password, role: 'user' };
  router.db.get('users').push(newUser).write();
  res.status(201).json({ message: 'Inscription réussie' });
});

// مسار جلب وصفة واحدة
server.get('/recipes/:id', (req, res) => {
  const recipe = router.db.get('recipes').find({ id: req.params.id }).value();
  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).json({ message: 'Recette non trouvée' });
  }
});

// مسارات التعليقات
server.get('/comments', (req, res) => {
  const recipeId = req.query.recipeId;
  const comments = router.db.get('comments').filter({ recipeId }).value();
  res.json(comments);
});

server.post('/comments', (req, res) => {
  const newComment = req.body;
  router.db.get('comments').push(newComment).write();
  res.status(201).json(newComment);
});

server.delete('/comments/:id', (req, res) => {
  router.db.get('comments').remove({ id: req.params.id }).write();
  res.status(204).end();
});

// ------ نهاية المسارات المخصصة ------
server.use(router); // <-- المسارات الافتراضية لـ json-server

server.listen(port, () => {
  console.log(`✅ JSON Server running at http://localhost:${port}`);
});