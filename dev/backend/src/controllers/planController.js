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
  const postid = parseInt(req.params.postid);
  try {
    let { rows: planDetails } = await pool.query(queries.getPlanById, [postid]);
    let { rows: topicids } = await pool.query(queries.getTopicIds, [postid]);
    let { rows: subtopicids } = await pool.query(queries.getSubtopicIds, [
      postid,
    ]);
    let plan = {
      planDetails,
      topicids,
      subtopicids,
    };
    res.status(200).json(plan);
  } catch (e) {
    res.status(500).send("Server error");
  }
});

// @desc    Get plan by plan ID
// @route   GET /api/plans/:postid/info
// @access  Public
const getPlan = asyncHandler(async (req, res) => {
  const postid = parseInt(req.params.postid);

  try {
    // Get the plan information
    let { rows: planDetails } = await pool.query(queries.getPlanById, [postid]);
    const { id, userid, post_title, date_created, likes, tag } = planDetails[0];
    // Get the username
    let { rows: user } = await pool.query(queries.getUserById, [
      planDetails[0].userid,
    ]);
    const author = user[0].username;

    let plan = {
      postid,
      author,
      userid,
      post_title,
      date_created,
      likes,
      tag,
    };

    // Get topic ids
    let { rows: alltopicids } = await pool.query(queries.getTopicIds, [postid]);
    // Takes topic as input, returns the value of its topicid
    let topicids = alltopicids.map((topic) => topic.topicid);

    let topics = [];
    for (let x of topicids) {
      let { rows: topic } = await pool.query(queries.getTopicById, [x, postid]);
      let { topicid, topicpostid, topic_title, content } = topic[0];
      let { rows: subtopics } = await pool.query(
        queries.getAllSubtopicsOfTopic,
        [x]
      );
      let topicObj = { topicid, postid, topic_title, content, subtopics };
      topics.push(topicObj);
    }

    plan = { ...plan, topics }; // Add topics to plan
    res.status(200).json(plan);
  } catch (e) {
    res.status(500).send("Server error");
  }
});

// @desc    Get topic by topic ID
// @route   GET /api/plans/:postid/:topicid
// @access  Public
const getTopicById = asyncHandler(async (req, res) => {
  const postid = parseInt(req.params.postid);
  const topicid = parseInt(req.params.topicid);
  try {
    const { rows } = await pool.query(queries.getTopicById, [topicid, postid]);
    if (rows.length == 0) {
      res.status(204).send("Topic not found");
    } else {
      res.status(200).json(rows);
    }
  } catch (e) {
    res.status(500).send("Server error");
  }
});

// @desc    Get subtopic by subtopic ID
// @route   GET /api/plans/:postid/:topicid/:subtopicid
// @access  Public
const getSubtopicById = asyncHandler(async (req, res) => {
  const postid = parseInt(req.params.postid);
  const topicid = parseInt(req.params.topicid);
  const subtopicid = parseInt(req.params.subtopicid);
  try {
    const { rows } = await pool.query(queries.getSubtopicById, [
      postid,
      topicid,
      subtopicid,
    ]);
    if (rows.length == 0) {
      res.status(204).send("Topic not found");
    } else {
      res.status(200).json(rows);
    }
  } catch (e) {
    res.status(500).send("Server error");
  }
});

// @desc    Add a post
// @route   POST /api/plans/create
// @access  Private
const addPost = asyncHandler(async (req, res) => {
  let userid = req.session?.userID;

  const { post_title, date_created, tag } = req.body;

  pool.query(
    queries.addPost,
    [userid, post_title, date_created, tag],
    (error, results) => {
      if (error) throw error;
      res.status(201).json(results.rows[0]);
    }
  );
});

// @desc    Add a post topic
// @route   POST /api/plans/create/:postid
// @access  Private
const addTopic = asyncHandler(async (req, res) => {
  const postid = parseInt(req.params.postid);
  const { topic_title, content } = req.body;

  let id = req.session?.userID;
  const { rows } = await pool.query(queries.getPlanById, [postid]);
  if (id != rows[0].userid) {
    // If user is not the author
    res.status(403).send("No permissions to edit");
    return;
  }

  pool.query(
    queries.addTopic,
    [postid, topic_title, content],
    (error, results) => {
      if (error) throw error;
      res.status(201).send("Topic added successfully");
    }
  );
});

// @desc    Add a post subtopic
// @route   POST /api/plans/create/:postid/:topicid
// @access  Private
const addSubtopic = asyncHandler(async (req, res) => {
  const topicid = parseInt(req.params.topicid);
  const postid = parseInt(req.params.postid);

  let id = req.session?.userID;
  const { rows } = await pool.query(queries.getPlanById, [postid]);
  if (id != rows[0].userid) {
    // If user is not the author
    res.status(403).send("No permissions to edit");
    return;
  }
  const { subtopic_title, content } = req.body;

  try {
    pool.query(
      queries.addSubtopic,
      [topicid, subtopic_title, content, postid],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(201).send("Subtopic added successfully");
      }
    );
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// @desc    Like a post
// @route   PUT /api/plans/:postid/like
// @access  Private
const likePost = asyncHandler(async (req, res) => {
  const postid = parseInt(req.params.postid);
  //let { userid } = req.body;
  let userid = req.session?.userID;

  const { rows } = await pool.query(queries.hasUserLikedPost, [postid, userid]);
  if (rows.length == 0) {
    // If user has not liked this post, add the post as liked
    await pool.query(queries.likePost, [postid, userid]);
    // Increment post likes in posts
    await pool.query(queries.incPostLikes, [postid]);
    res.status(201).send("Post has been liked");
  } else {
    // User has liked the post, remove the like
    await pool.query(queries.unlikePost, [postid, userid]);
    // Decrement post likes in posts
    await pool.query(queries.decPostLikes, [postid]);
    res.status(200).send("Post has been unliked");
  }
});

// @desc    Checks if the user has liked the plan
// @route   GET /api/plans/:postid/like
// @access  Public
const checkLiked = asyncHandler(async (req, res) => {
  const postid = parseInt(req.params.postid);
  let userid = req.session?.userID;

  try {
    const { rows } = await pool.query(queries.hasUserLikedPost, [
      postid,
      userid,
    ]);
    if (rows.length == 0) {
      res.status(200).send(false);
    } else {
      res.status(200).send(true);
    }
  } catch (e) {
    res.status(500).send("Server error");
  }
});

// @desc    Edit plan
// @route   PATCH /api/plans/:postid/edit
// @access  Public
const editPlan = asyncHandler(async (req, res) => {
  // Add tag changing option

  let id = req.session?.userID;
  const postid = parseInt(req.params.postid);
  const { post_title, tag } = req.body;

  try {
    const { rows } = await pool.query(queries.getPlanById, [postid]);
    if (id != rows[0].userid) {
      // If user is not the author
      res.status(403).send("No permissions to edit");
      return;
    } else {
      // User is the author, change data
      pool.query(queries.editPost, [post_title, tag, postid]);
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
    const { rows } = await pool.query(queries.getPlanById, [postid]);
    if (id != rows[0].userid) {
      // If user is not the author
      res.status(403).send("No permissions to edit");
      return;
    } else {
      // User is the author, change data
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
    const { rows } = await pool.query(queries.getPlanById, [postid]);
    if (id != rows[0].userid) {
      // If user is not the author
      res.status(403).send("No permissions to edit");
      return;
    } else {
      // User is the author, change data
      pool.query(queries.editSubtopic, [
        subtopic_title,
        content,
        topicid,
        subtopicid,
      ]);
      res.status(200).send("Subtopic has been updated");
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("Server error");
  }
});

// @desc    Get top 10 liked plans
// @route   GET /api/plans/top-ten
// @access  Public
const getTopTen = asyncHandler(async (req, res) => {
  try {
    const { rows } = await pool.query(queries.getTopTen);
    res.status(200).json(rows);
  } catch (e) {
    res.status(500).send("Server error");
  }
});

// @desc    Searches for the specified term in post titles
// @route   GET /api/plans/search
// @access  Public
const search = asyncHandler(async (req, res) => {
  let { term } = req.query;

  try {
    const { rows } = await pool.query(queries.search, [term]);
    if (rows.length == 0) {
      res.status(204).send("No Results Found");
    } else {
      res.status(200).json(rows);
    }
  } catch (e) {
    res.status(500).send("Server error");
  }
});

// @desc    Gets all plans with the Mental tag
// @route   GET /api/plans/mental
// @access  Public
const getMental = asyncHandler(async (req, res) => {
  try {
    const { rows } = await pool.query(queries.getMental);
    res.status(200).json(rows);
  } catch (e) {
    res.status(500).send("Server error");
  }
});

// @desc    Gets all plans with the Education tag
// @route   GET /api/plans/education
// @access  Public
const getEducation = asyncHandler(async (req, res) => {
  try {
    const { rows } = await pool.query(queries.getEducation);
    res.status(200).json(rows);
  } catch (e) {
    res.status(500).send("Server error");
  }
});

// @desc    Gets all plans with the Physical tag
// @route   GET /api/plans/physical
// @access  Public
const getPhysical = asyncHandler(async (req, res) => {
  try {
    const { rows } = await pool.query(queries.getPhysical);
    res.status(200).json(rows);
  } catch (e) {
    res.status(500).send("Server error");
  }
});

// @desc    Gets all plans with the Other tag
// @route   GET /api/plans/other
// @access  Public
const getOther = asyncHandler(async (req, res) => {
  try {
    const { rows } = await pool.query(queries.getOther);
    res.status(200).json(rows);
  } catch (e) {
    res.status(500).send("Server error");
  }
});

// @desc    Deletes the plan and all topics/subtopics associated
// @route   DELETE /api/plans/:postid
// @access  Public
const deletePost = asyncHandler(async (req, res) => {
  let id = req.session?.userID;
  //let { id } = req.body;

  const postid = parseInt(req.params.postid);

  const { rows } = await pool.query(queries.getPlanById, [postid]);
  if (id != rows[0].userid) {
    // If user is not the author
    res.status(403).send("No permissions to delete");
    return;
  }

  try {
    await pool.query(queries.deletePostByPostId, [postid]);
    await pool.query(queries.deleteTopicByPostId, [postid]);
    await pool.query(queries.deleteSubtopicByPostId, [postid]);
    res.status(200).send("This plan has been deleted");
  } catch (e) {
    res.status(500).send("Server error");
  }
});

// @desc    Deletes a topic and all of it's corresponding subtopics
// @route   DELETE /api/plans/:postid/:topicid
// @access  Public
const deleteTopic = asyncHandler(async (req, res) => {
  let id = req.session?.userID;
  // let { id } = req.body;
  const topicid = parseInt(req.params.topicid);
  const postid = parseInt(req.params.postid);

  const { rows } = await pool.query(queries.getPlanById, [postid]);
  if (id != rows[0].userid) {
    // If user is not the author
    res.status(403).send("No permissions to delete");
    return;
  }

  try {
    await pool.query(queries.deleteTopic, [topicid]);
    await pool.query(queries.deleteSubtopicByTopicId, [topicid]);
    res.status(200).json("Topic and subtopics under it have been deleted");
  } catch (e) {
    res.status(500).send("Server error");
  }
});

// @desc    Deletes a singular subtopic
// @route   DELETE /api/plans/:postid/:topicid/:subtopicid
// @access  Public
const deleteSubtopic = asyncHandler(async (req, res) => {
  let id = req.session?.userID;
  // let { id } = req.body;
  const subtopicid = parseInt(req.params.subtopicid);
  const postid = parseInt(req.params.postid);

  const { rows } = await pool.query(queries.getPlanById, [postid]);
  if (id != rows[0].userid) {
    // If user is not the author
    res.status(403).send("No permissions to delete");
    return;
  }

  try {
    await pool.query(queries.deleteSubtopic, [subtopicid]);
    res.status(200).json("Subtopic has been deleted");
  } catch (e) {
    res.status(500).send("Server error");
  }
});

module.exports = {
  getPlans,
  getPlanById,
  getPlan,
  getTopicById,
  getSubtopicById,
  addPost,
  addTopic,
  addSubtopic,
  likePost,
  checkLiked,
  editPlan,
  editTopic,
  editSubtopic,
  getTopTen,
  search,
  getMental,
  getEducation,
  getPhysical,
  getOther,
  deletePost,
  deleteTopic,
  deleteSubtopic,
};
