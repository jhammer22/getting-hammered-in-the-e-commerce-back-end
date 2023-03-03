const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: ProductTag, through: Product, as: 'tag-product-all'}]
    });
    
    if (!tagData) {
      res.status(404).json({ message: 'try again out of everything you found nothing'});
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
}); // find all tags
// be sure to include its associated Product data

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: ProductTag, through: Product, as: 'tag-product'}]
    });

    if (!tagData) {
      res.status(404).json({ message: 'try again this tag-product does not exist'});
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
}); // find a single tag by its `id`
// be sure to include its associated Product data

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
}); // create a new tag

router.put('/:id', (req, res) => {
  Tag.update(
    {
      
    }
  )
}); // update a tag's name by its `id` value

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(400).json({ message: 'This id does not exist' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
}); // delete on tag by its `id` value

module.exports = router;
