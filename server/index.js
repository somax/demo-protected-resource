const express = require('express');
const app = express();
const auth = require('./lib/auth');

const PORT = 3000;

// 模拟登录、登出，现在拦截代码之前的接口 完全公开
app.get('/api/login',(req, res)=>{
	auth.login();
	res.redirect('/index.html');
})

app.get('/api/logout',(req, res)=>{
	auth.logout();
	res.redirect('/login.html');
})

// 映射第三方组件到 lib 路径，
// 在拦截器代码上方，不受保护，完全开放
app.use('/lib', express.static('bower_components'))

// 拦截器代码，保护资源：
// 验证登录状态，如果授权无效则加载 login.html，EXCEPT_URL 中的资源将被排除在外
const EXCEPT_URL = ['/login.html']
app.use('/', auth , (req, res, next)=>{
	if( EXCEPT_URL.indexOf(req.path) > -1 || req.isAuth ){
		express.static('app')(req, res, next);
	}else{
		res.redirect('/login.html');
	}
});

// 在拦截器代码下方都会受到保护
app.get('/api/secret', (req, res)=>{
	res.send('this is the secret code: 8888888');
})


app.listen(PORT, () => {
  console.log(`Example app listening on http://0.0.0.0:${PORT}!`)
})