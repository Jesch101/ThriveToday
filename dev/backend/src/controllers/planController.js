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
  // Check if post is in users likes
  // IF found: remove it from the users likes, decrease post like count -1
  // IF NOT found: append to end of users likes, increase post like count +1
  const postid = parseInt(req.params.postid);
  //const userid = req.body;
  pool.query(queries.getUserLiked, [userid], (error, results) => {
    console.log(results);
  });
});

module.exports = {
  getPlans,
  getPlanById,
  addPost,
  addTopic,
  addSubtopic,
  likePost,
};
