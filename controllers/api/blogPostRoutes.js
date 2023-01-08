const router = require('express').Router();
const { BlogPost } = require('../../models');

//FIXME:
router.get('/', async(req, res) => {
try {
  const postData = await BlogPost.get({
   
  });

  res.status(200).json(postData);
} catch (err) {
  res.status(400).json(err);
}

});

//FIXME: 
router.get("/:id", async (req, res) => {
  try {
    const postData = await BlogPost.get({});

    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newPost = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

//FIXME:
router.put('/', async (req, res) => {
//update the blog post
});

router.delete('/:id', async (req, res) => {
  try {
    const postData = await BlogPost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
