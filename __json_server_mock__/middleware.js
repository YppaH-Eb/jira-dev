module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "wym" && req.body.password === "123456") {
      console.log("登录成功");
      return res.status(200).json({
        user: {
          token: 1234,
        },
      });
    } else {
      return res.status(400).json({
        message: "用户名或者密码错误",
      });
    }
  }
};
