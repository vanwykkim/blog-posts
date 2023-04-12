const router = require('express').Router();
const { BlogPost, User, Comment} = require('../models');
const withAuth = require('../utils/auth');

//TODO: Used for routing to pages with menubar

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/homepage");
    return;
  }
  //if not not logged in show the login page
  res.render("partials/login");
});

router.get("/", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/homepage");
    return;
  }
  //if not not logged in show the login page
  res.render("partials/login");
});

router.get('/homepage', async (req, res) => {
  try {
    // Get all blogPostss and JOIN with user data
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('./partials/homepage', { 
      blogPosts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", async (req, res) => {

  //fixME: to get only logged in users posts
  try {
    // Get all blogPostss and JOIN with user data
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogPosts = blogPostData.map((blogPost) =>
      blogPost.get({ plain: true })
    );

    // Pass serialized data and session flag into template
    res.render("./partials/dashboard", {
      blogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/blogpost/:id', async (req, res) => {
//   try {
//     const blogPostData = await BlogPost.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     const blogPost = blogPostData.get({ plain: true });

//     res.render('./partials/blogpostupdate', {
//       ...blogPost,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Use withAuth middleware to prevent access to route
// router.get('/homepage', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: BlogPost }],
//     });

//     const user = userData.get({ plain: true });
// console.log(user);
//     res.render('./partials/homepage', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });





// router.get("/", async (req, res) => {
//   try {
//     const providerData = await ProviderInfo.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ["name"],
//         },
//       ],
//     });

//     // Serialize data so the template can read it
//     const providers = providerData.map((providerInfo) =>
//       providerInfo.get({ plain: true })
//     );

//     console.log("providers from homeroutes get " + providers);

//     // Pass serialized data and session flag into template
//     res.render("login", {
//       providers,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });



// // Use withAuth middleware to prevent access to route
// router.get("/profile", withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ["password"] },
//       include: [{ model: ProviderInfo }],
//     });

//     const user = userData.get({ plain: true });
//     console.log("user from homeroutes getprofile " + JSON.stringify(user));

//     res.render("profile", {
//       ...user,
//       logged_in: true,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get("/homepage", withAuth, async (req, res) => {
//   try {
//     // FIXME: I think this is going to need to be a find all not findbypk so we can display all provider info listings
//     const providerInfoData = await ProviderInfo.findAll({
//       include: [{ model: User }],
//     });

//     const listings = providerInfoData.map((providerInfo) =>
//       providerInfo.get({ plain: true })
//     );
//     console.log("listings from homeroutes get listings " + listings);
//     res.render("listings", {
//       listings,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });



// // router.get("/providersignup", withAuth, async (req, res) => {
// //   if (req.session.logged_in) {
// //     const userData = await User.findByPk(req.session.user_id, {});

// //     const user = userData.get({ plain: true });
// //     res.render("provider-signup", {
// //       ...user,
// //       logged_in: true,
// //     });
// //     return;
// //   }
// //   //if not not logged in show the login page
// //   res.render("login");
// // });



module.exports = router;

