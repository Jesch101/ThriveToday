const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE userid = $1";
const getUserByUsername = "SELECT * FROM users WHERE username = $1";
const getUserLikes = "SELECT * FROM likes RIGHT JOIN posts ON likes.postid = posts.postid WHERE likes.userid = $1";
const addUser = "INSERT INTO users (firstname, lastname, email, username, password) VALUES ($1, $2, $3, $4, $5)";

const checkEmailExists = "SELECT s FROM users s WHERE s.email = $1";
const checkUsernameExists = "SELECT s FROM users s WHERE s.username = $1"; 

const getPlans = "SELECT * FROM posts";
const getPlanById = "SELECT * FROM posts WHERE postid = $1";
const getTopicById = "SELECT * FROM topics WHERE topicid = $1";
const getSubtopicById = "SELECT * FROM subtopics WHERE subtopicid = $1";
const getPlanAuthor = "SELECT userid FROM posts WHERE postid = $1";

const addPost = "INSERT INTO posts (userid, post_title, date_created, tags) VALUES ($1, $2, $3, $4)";
const addTopic = "INSERT INTO topics (postid, topic_title, content) VALUES ($1, $2, $3)";
const addSubtopic = "INSERT INTO subtopics (topicid, subtopic_title, content) VALUES ($1, $2, $3)";

const editPost = "UPDATE plans SET post_title = $1 WHERE postid = $2";
const editTopic = "UPDATE topics SET topic_title = $1, content = $2 WHERE postid = $3 AND topicid = $4";
const editSubtopic = "UPDATE subtopics SET subtopic_title = $1, content = $2 WHERE topicid = $3 AND subtopicid = $4";

const hasUserLikedPost = "SELECT * FROM likes WHERE postid = $1 AND userid = $2";
const likePost = "INSERT INTO likes (postid, userid) VALUES ($1, $2)";
const unlikePost = "DELETE FROM likes WHERE postid = $1 AND userid = $2";
const getPostLikes = "SELECT * FROM likes WHERE postid = $1";

module.exports = {
    getUsers,
    getUserById,
    getUserByUsername,
    getUserLikes,
    addUser,
    checkEmailExists,
    checkUsernameExists,

    getPlans,
    getPlanById,
    getTopicById,
    getSubtopicById,
    getPlanAuthor,
    addPost,
    addTopic,
    addSubtopic,
    
    editPost,
    editTopic,
    editSubtopic,

    hasUserLikedPost,
    likePost,
    unlikePost,
    getPostLikes,
};