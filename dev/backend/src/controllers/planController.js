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
  

});

// @desc    Get subtopic by post and topic ID
// @route   GET /api/plans/:postid/:topicid/:subtopicid
// @access  Public
const getSubtopicById = asyncHandler(async (req, res) => {
  

});


// @desc    Add a post
// @route   POST /api/plans/create
// @access  Private
const addPost = asyncHandler(async (req, res) => {
  // future: userid = req.header;
  const { userid, post_title, datecreated, tags } = req.body;

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
  
  // Add condition for if not logged in 
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
// @route   PUT /api/plans/:postid/edit
// @access  Public
const editPlan = asyncHandler(async (req, res) => {
  
  let id = req.session?.userID;
  const postid = parseInt(req.params.postid);
  const content = req.body;

  try {
    const authorID = await pool.query(queries.getPlanAuthor, [postid])
    if (id != authorID)
    {
      res.status(403).send("No permissions to edit");
      return;
    } else {
      // Make the query to edit
    }
  } catch (e) {

  }

});

// @desc    Edit topic
// @route   PUT /api/plans/:postid/:topicid/edit
// @access  Public
const editTopic = asyncHandler(async (req, res) => {
  

});

// @desc    Edit subtopic
// @route   PUT /api/plans/:postid/:topicid/:subtopicid/edit
// @access  Public
const editSubtopic = asyncHandler(async (req, res) => {
  

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
