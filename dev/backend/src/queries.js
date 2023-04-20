const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE userid = $1";
const getUserByUsername = "SELECT * FROM users WHERE username = $1";
const getUserLikes = "SELECT * FROM likes RIGHT JOIN posts ON likes.postid = posts.postid WHERE likes.userid = $1";
const addUser = "INSERT INTO users (firstname, lastname, email, username, password) VALUES ($1, $2, $3, $4, $5)";

const checkEmailExists = "SELECT s FROM users s WHERE s.email = $1";
const checkUsernameExists = "SELECT s FROM users s WHERE s.username = $1"; 

const updateEmail = "UPDATE users SET email = $1 WHERE userid = $2";

const getUserPasswordById = 'SELECT password FROM users WHERE userid = $1';
const updateUserPassword = 'UPDATE users SET password = $1 WHERE userid = $2';

const getPlans = "SELECT * FROM posts";
const getPlanById = "SELECT * FROM posts WHERE postid = $1";
const getTopicById = "SELECT * FROM topics WHERE topicid = $1";
const getSubtopicById = "SELECT * FROM subtopics WHERE subtopicid = $1";
const getPlanAuthor = "SELECT userid FROM posts WHERE postid = $1";
const getTopTen = "SELECT * FROM posts ORDER BY likes DESC limit 10";
const getRecentPlansByUserId = "SELECT * FROM posts WHERE userid = $1 ORDER BY date_created DESC LIMIT 5";
const getPlansByUserId = "SELECT * FROM posts WHERE userid = $1 ORDER BY date_created DESC";

const addPost = "INSERT INTO posts (userid, post_title, date_created) VALUES ($1, $2, $3)";
const addTopic = "INSERT INTO topics (postid, topic_title, content) VALUES ($1, $2, $3)";
const addSubtopic = "INSERT INTO subtopics (topicid, subtopic_title, content) VALUES ($1, $2, $3)";

const editPost = "UPDATE posts SET post_title = $1 WHERE postid = $2";
const editTopic = "UPDATE topics SET topic_title = $1, content = $2 WHERE postid = $3 AND topicid = $4";
const editSubtopic = "UPDATE subtopics SET subtopic_title = $1, content = $2 WHERE topicid = $3 AND subtopicid = $4";

const hasUserLikedPost = "SELECT * FROM likes WHERE postid = $1 AND userid = $2";
const likePost = "INSERT INTO likes (postid, userid) VALUES ($1, $2)";
const incPostLikes = "UPDATE posts SET likes = likes + 1 WHERE postid = $1";
const decPostLikes = "UPDATE posts SET likes = likes - 1 WHERE postid = $1";
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
    getTopTen,
    getRecentPlansByUserId,
    getPlansByUserId,
    
    updateEmail,
    
    getUserPasswordById,
    updateUserPassword,

    addPost,
    addTopic,
    addSubtopic,
    
    editPost,
    editTopic,
    editSubtopic,

    hasUserLikedPost,
    likePost,
    incPostLikes,
    decPostLikes,
    unlikePost,
    getPostLikes,
};
