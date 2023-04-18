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
    if (error) { throw error; }
    res.status(200).json(results.rows);
  });
});

// @desc    Get topic by topic ID
// @route   GET /api/plans/:postid/:topicid
// @access  Public
const getTopicById = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.topicid);
  pool.query(queries.getTopicById, [id], (error, results) => {
    if (error) { res.status(500).send("Server error"); }
    res.status(200).json(results.rows);
  });
});

// @desc    Get subtopic by subtopic ID
// @route   GET /api/plans/:postid/:topicid/:subtopicid
// @access  Public
const getSubtopicById = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.subtopicid);
  pool.query(queries.getSubtopicById, [id], (error, results) => {
    if (error) { res.status(500).send("Server error"); }
    res.status(200).json(results.rows);
  });

});


// @desc    Add a post
// @route   POST /api/plans/create
// @access  Private
const addPost = asyncHandler(async (req, res) => {
  let userid = req.session?.userID;
  const { post_title, datecreated} = req.body;

  pool.query(
    queries.addPost,
    [userid, post_title, datecreated],
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
  //let { userid } = req.body;
  let userid = req.session?.userID;
  
  const { rows } = await pool.query(queries.hasUserLikedPost, [postid, userid])
    if (rows.length == 0) { // If user has not liked this post, add the post as liked
      await pool.query(queries.likePost, [postid, userid]);
      // Increment post likes in posts
      await pool.query(queries.incPostLikes, [postid]);
      res.status(201).send("Post has been liked");
    }
    else { // User has liked the post, remove the like
      await pool.query(queries.unlikePost, [postid, userid]);
      // Decrement post likes in posts
      await pool.query(queries.decPostLikes, [postid]);
      res.status(200).send("Post has been unliked");
    }  
});

// @desc    Edit plan
// @route   PATCH /api/plans/:postid/edit
// @access  Public
const editPlan = asyncHandler(async (req, res) => {
  
  let id = req.session?.userID;
  const postid = parseInt(req.params.postid);
  const post_title = req.body;

  try {
    const authorID = await pool.query(queries.getPlanAuthor, [postid]);
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
    const authorID = await pool.query(queries.getPlanAuthor, [postid]);
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
  const postid = parseInt(req.params.postid);
  const topicid = parseInt(req.params.topicid);
  const subtopicid = parseInt(req.params.subtopicid);
  const { subtopic_title, content } = req.body;

  try {
    const authorID = await pool.query(queries.getPlanAuthor, [postid]);
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

const getTopTen = asyncHandler(async (req, res) => {
  const { rows } = await pool.query(queries.getTopTen);
  res.status(200).json(rows);  
});

const search = asyncHandler(async (req, res) => {
  console.log("... Searching...");
  let term = req.body; 
  try {
    console.log("... Searching...");
    const { rows } = await pool.query(queries.search, [term]);
    console.log("... Searching...");
    if(rows.length == 0) {
      res.status(204).send("No Results Found");
    } 
    else {
      res.status(200).send(rows);
    }
  } catch (e) {
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
  getTopTen,
  search,
};
