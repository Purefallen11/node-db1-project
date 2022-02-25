const router = require('express').Router()
const Accounts = require('./accounts-model')

router.get('/', (req, res, next) => {
  Accounts.getAll()
    .then(account => {
    res.status(200).json(account)
    }).catch(() => {
    res.status(500).json('unable to retrieve database')
  })
})

router.get('/:id', (req, res, next) => {
  const { id } = req.params
  Accounts.getById(id)
    .then(account => {
      if (!account) {
      res.status(404).json(`account with id ${id} not found`)
      } else {
        res.status(200).json(account)
    }
    }).catch(() => {
    res.status(500).json('unable to retrieve database through id')
  })
})

router.post('/', async (req, res, next) => {
  try {
    const newAccount = await Accounts.create(req.body)
      res.json(newAccount)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
