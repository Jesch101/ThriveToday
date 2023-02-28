const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE id = $1";

const getPlans = "SELECT * FROM posts";
const getPlanById = "SELECT * FROM posts WHERE postid = $1";


module.exports = {
    getUsers,
    getUserById,
    getPlans,
    getPlanById,
};