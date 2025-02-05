const { loginUser } = require("../services/authService");
async function login(req, res) {
  try {
    const loginPayload = req.body;
    const response = await loginUser(loginPayload);
    // After User login, we send JWT token in the form of cookie to user, so next time when he use any functionality he send this cookie to server then server gives direct access to the user for that functionality.
    console.log("Response token is ",response.token);
    res.cookie("authToken", response.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000, 
  });
    return res.status(200).json({
      success: true,
      message: "Successfully logged in",
      data: {
        userData: response.userData,
        userRole: response.userRole
      },
      error: {},
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      data: {},
      error: error,
    });
  }
}
module.exports = {
  login,
  // logout,
};
