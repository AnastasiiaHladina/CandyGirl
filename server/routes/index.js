const express = require('express');
const router = express.Router();
const db = require('../models');
const jwt = require('jsonwebtoken');

const secret = '*ON&OSdfsdf';

/* GET home page. */
router.post('/login', async (req, res, next) => {
	try {
	  if (!req.body.Name || !req.body.Password) {
	  	throw new Error('Name or Password not received');
	  }

	  let user = await db.user.find({
	  	where: req.body
	  });

	  if (!user) {
	  	user = await db.user.create(req.body);
	  }

	  // генерируем токен, secret нужен в качестве ключа токена
	  const token = jwt.sign({ id: user.id_user }, secret, {
	  	expiresIn: 86400 // expires in 24 hours
	  });
console.log(user);
	  // отправляем токен, если все ок
	  res.json({ token, Level: user.Level });
	} catch (err) {
		next(err);
	}
});

router.get('/record', async (req, res, next) => {
	try {
		const records = await db.records.findAll({});

		res.json(records);
	} catch (err) {
		next(err);
	}
});

router.post('/record', (req, res, next) => {
	const token = req.headers['token'];
  	if (!token) return res.status(401).send({ 
  		auth: false, 
  		message: 'No token provided.' 
  	});
  
  	jwt.verify(token, secret, async (err, decoded) => {
  		if (err) {
  			return res.status(500).send({
  				auth: false,
  				message: 'Failed to authenticate token.'
  			});
  		}

		try {
			if (!req.body.Points || !req.body.Level) {
				throw new Error('Record or level not received');
			}

			await db.records.create({
				id_user: decoded.id,
				Level: req.body.Level,
				Points: req.body.Points
			});
			res.json({ status: 'ok' });
		} catch (err) {
			next(err);
		}
	});
});

router.post('/setLevel', (req, res, next) => {
	const token = req.headers['token'];
  	if (!token) return res.status(401).send({ 
  		auth: false, 
  		message: 'No token provided.' 
  	});
  
  	jwt.verify(token, secret, async (err, decoded) => {
  		if (err) {
  			return res.status(500).send({
  				auth: false,
  				message: 'Failed to authenticate token.'
  			});
  		}

		try {
			if (!req.body.Level) {
				throw new Error('Level not received');
			}

			await db.user.update({
				Level: req.body.Level
			}, {
				where: {
					id_user: decoded.id
				}
			});
			res.json({ status: 'ok' });
		} catch (err) {
			next(err);
		}
	});
});

module.exports = router;
