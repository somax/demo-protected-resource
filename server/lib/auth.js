module.exports = Auth;

/**
 * 授权验证
 * @param {[type]}   req  [description]
 * @param {[type]}   res  [description]
 * @param {Function} next [description]
 */
function Auth(req, res, next){
	req.isAuth = isLogin;
	next();
}

// fake login & logout
let isLogin = false;

Auth.login = function() {
	isLogin = true;
	console.log('login!')
}

Auth.logout = function() {
	isLogin = false;
	console.log('logout!')
}