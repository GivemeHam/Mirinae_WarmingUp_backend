const Joi = require('joi');
const Account = require('models/Account');
const { schema } = require('../../models/account');

//회원가입
exports.localRegister = async (ctx) => {
    //데이터검증
    const schema = Joi.object().keys({
        username: Joi.string().alphanum().min(4).max(15).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6)
    });

    const { error, result } = schema.validate(ctx.request.body);

    if (error) {
        ctx.status = 400;
        return;
    }

    //중복체크
    let existing = null;
    try {
        existing = await Account.findByEmail(ctx.request.body);
    } catch (e) {
        ctx.throw(500, e);
    }
    if (existing) {
        ctx.status = 409; // conflict
        ctx.body = {
            key: existing.email === ctx.request.body.email ? 'email' : 'username'
        };
        return;
    }

    //계정 생성
    let account = null;
    try {
        account = await Account.localRegister(ctx.request.body);
    } catch (e) {
        ctx.throw(500, e);
    }
    /*
        let token = null;
        try{
            token = await account.generateToken();
        } catch(e){
            ctx.throw(500, e);
        }
    
        ctx.cookies.set('acess_token', token, {httpOnly:true, maxAge: 1000 * 60 * 60 * 24 * 7 });
        ctx.body = account.profile; //프로필 정보로 응답
        */
}


//로그인
exports.localLogin = async (ctx) => {
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    const { error, result } = schema.validate(ctx.request.body);

    if (error) {
        ctx.status = 400;
        return;
    }

    const { email, password } = ctx.request.body;

    let account = null;
    //계정 존재 확인 및 비밀번호 확인
    try {
        account = await Account.findByEmail(email);
    } catch (e) {
        ctx.throw(500, e);
    }
    if (!account || account.validatePassword(password)) {
        ctx.status = 403;
        return;
    }

    let token = null;
    try {
        token = await account.generateToken();
    } catch (e) {
        ctx.throw(500, e);
    }
    ctx.cookies.set('access_token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
    ctx.body = account.profile;
}
