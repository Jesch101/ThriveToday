const pool = require("../config/db");
const queries = require("../queries");
const asyncHandler = require("express-async-handler");

// @desc    Get all plans
// @route   GET /api/plans/
// @access  Public
const getPlans = asyncHandler(async (req, res) => {
  pool.query(queries.getPlans, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
});

// @desc    Get plan by plan ID
// @route   GET /api/plans/:postid
// @access  Public
const getPlanById = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.postid);
  pool.query(queries.getPlanById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
});

// @desc    Get topic by post ID
// @route   GET /api/plans/:postid/:topicid
// @access  Public
const getTopicById = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.topicid);
  pool.query(queries.getTopicById, [id], (error, results) => {
    if (error) res.status(500).send("Server error");
    res.status(200).json(results.rows);
  });
});

// @desc    Get subtopic by post and topic ID
// @route   GET /api/plans/:postid/:topicid/:subtopicid
// @access  Public
const getSubtopicById = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.subtopicid);
  pool.query(queries.getSubtopicById, [id], (error, results) => {
    if (error) res.status(500).send("Server error");
    res.status(200).json(results.rows);
  });

});


// @desc    Add a post
// @route   POST /api/plans/create
// @access  Private
const addPost = asyncHandler(async (req, res) => {
  let userid = req.session?.userID;
  const { post_title, datecreated, tags } = req.body;

  pool.query(
    queries.addPost,
    [userid, post_title, datecreated, tags],
    (error, results) => {
      if (error) throw error;
      res.status(201).send("Post added successfully");
      console.log("Post created");
    }
  );
});

// @desc    Add a post topic
// @route   POST /api/plans/create/:postid
// @access  Private
const addTopic = asyncHandler(async (req, res) => {
  const postid = parseInt(req.params.postid);
  const { topic_title, content } = req.body;
  console.log("Adding topic.....");

  pool.query(
    queries.addTopic,
    [postid, topic_title, content],
    (error, results) => {
      if (error) throw error;
      res.status(201).send("Topic added successfully");
      console.log("Topic created");
    }
  );
});

// @desc    Add a post subtopic
// @route   POST /api/plans/create/:postid/:topicid
// @access  Private
const addSubtopic = asyncHandler(async (req, res) => {
  const topicid = parseInt(req.params.topicid);

  const { subtopic_title, content } = req.body;
  console.log("Adding subtopic.....");

  pool.query(
    queries.addSubtopic,
    [topicid, subtopic_title, content],
    (error, results) => {
      if (error) throw error;
      res.status(201).send("Subtopic added successfully");
      console.log("Subtopic created");
    }
  );
});

// @desc    Like a post
// @route   PUT /api/plans/:postid/like
// @access  Private
const likePost = asyncHandler(async (req, res) => {

  const postid = parseInt(req.params.postid);
  let userid = req.session?.userID;
  
  const likes = await pool.query(queries.getUsersLikedPosts, [userid], (error, results) => {
    if (likes.length) { // If user has liked this post, remove from likes
      pool.query(queries.unlikePost, [userid, postid]);
    }
    else { // User has not liked the post, add the post as liked
      pool.query(queries.likePost, [userid, postid]);
    } 
  });
});

// @desc    Edit plan
// @route   PATCH /api/plans/:postid/edit
// @access  Public
const editPlan = asyncHandler(async (req, res) => {
  
  let id = req.session?.userID;
  const postid = parseInt(req.params.postid);
  const post_title = req.body;

  try {
    const authorID = await pool.query(queries.getPlanAuthor, [postid])
    if (id != authorID) // If user is not the author
    {
      res.status(403).send("No permissions to edit");
      return;
    } else { // User is the author, change data
      pool.query(queries.editPost, [post_title, postid]);
      res.status(200).send("Post has been updated");
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("Server error");
  }

});

// @desc    Edit topic
// @route   PATCH /api/plans/:postid/:topicid/edit
// @access  Public
const editTopic = asyncHandler(async (req, res) => {
  
  let id = req.session?.userID;
  const postid = parseInt(req.params.postid);
  const topicid = parseInt(req.params.topicid);
  const { topic_title, content } = req.body;

  try {
    const authorID = await pool.query(queries.getPlanAuthor, [postid])
    if (id != authorID) // If user is not the author
    {
      res.status(403).send("No permissions to edit");
      return;
    } else { // User is the author, change data
      pool.query(queries.editTopic, [topic_title, content, postid, topicid]);
      res.status(200).send("Topic has been updated");
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("Server error");
  }

});

// @desc    Edit subtopic
// @route   PATCH /api/plans/:postid/:topicid/:subtopicid/edit
// @access  Public
const editSubtopic = asyncHandler(async (req, res) => {
  
  let id = req.session?.userID;
  const topicid = parseInt(req.params.topicid);
  const subtopicid = parseInt(req.params.subtopicid);
  const { subtopic_title, content } = req.body;

  try {
    const authorID = await pool.query(queries.getPlanAuthor, [postid])
    if (id != authorID) // If user is not the author
    {
      res.status(403).send("No permissions to edit");
      return;
    } else { // User is the author, change data
      pool.query(queries.editSubtopic, [subtopic_title, content, topicid, subtopicid]);
      res.status(200).send("Subtopic has been updated");
    } 
  } catch (e) {
    console.error(e);
    res.status(500).send("Server error");
  }

});

module.exports = {
  getPlans,
  getPlanById,
  getTopicById,
  getSubtopicById,
  addPost,
  addTopic,
  addSubtopic,
  likePost,
  editPlan,
  editTopic,
  editSubtopic,
};
