const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE id = $1";
const addUser = "INSERT INTO users (firstname, lastname, email, username, password) VALUES ($1, $2, $3, $4, $5)";

const checkEmailExists = "SELECT s FROM users s WHERE s.email = $1"; 

const getPlans = "SELECT * FROM posts";
const getPlanById = "SELECT * FROM posts WHERE postid = $1";


module.exports = {
    getUsers,
    getUserById,
    addUser,
    checkEmailExists,
    getPlans,
    getPlanById,
};