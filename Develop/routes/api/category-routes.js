const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
    try {
    const categoryData = await Category.findAll({
      // include: [{ model: Category }, { model: Tag },],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

  // find one category by its `id` value
  // be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      // include: [{ model: Category }, { model: Tag }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

  // create a new category
  router.post('/', async (req, res) => {
    try {
      const productData = await Category.create(req.body);
  
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      // For other models, don't need lines 49-57
      // if (req.body.tagIds && req.body.tagIds.length) {
      //   const productTagIdArr = req.body.tagIds.map((tag_id) => {
      //     return {
      //       product_id: productData.id,
      //       tag_id,
      //     };
      //   });
      //   await ProductTag.bulkCreate(productTagIdArr);
      // }
  
      res.status(200).json(categoryData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  });

    // update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const productData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    
    res.json(productData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
  // delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
