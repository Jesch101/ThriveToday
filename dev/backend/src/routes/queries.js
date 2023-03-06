const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE userid = $1";
const addUser = "INSERT INTO users (firstname, lastname, email, username, password) VALUES ($1, $2, $3, $4, $5)";

const checkEmailExists = "SELECT s FROM users s WHERE s.email = $1"; 

const getPlans = "SELECT * FROM posts";
const getPlanById = "SELECT * FROM posts WHERE postid = $1";

const addPost = "INSERT INTO posts (userid, post_title, date_created, tags) VALUES ($1, $2, $3, $4)";
const addTopic = "INSERT INTO topics (postid, topic_title, content) VALUES ($1, $2, $3)";
const addSubtopic = "INSERT INTO subtopics (topicid, subtopic_title, content) VALUES ($1, $2, $3)";


module.exports = {
    getUsers,
    getUserById,
    addUser,
    checkEmailExists,

    getPlans,
    getPlanById,
    addPost,
    addTopic,
    addSubtopic,
};