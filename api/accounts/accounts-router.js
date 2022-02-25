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

router.put('/:id',async (req, res, next) => {
  try {
    const { id } = req.params
    const updates = req.body
    const updatedAccount = await Accounts.updateById(id, updates)
    res.json(updatedAccount)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});

router.delete('/:id',async (req, res, next) => {
  try {
    const {id} = req.params
    const removedAccount = await Accounts.deleteById(id)
    res.json(removedAccount)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
