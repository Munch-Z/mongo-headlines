const router = require('express').Router();
const Articles = require('./models/Articles');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(express.static(path.join(__dirname, '../views')));