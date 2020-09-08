const Router = require('koa-router');
const auth = new Router();
const authCtrl = require('./auth.controller');

//회원가입
auth.post('/register/local', authCtrl.localRegister);
//로그인
auth.post('login/local', authCtrl.localLogin);

module.exports = auth;