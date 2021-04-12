const User = require("./../models/userModel");
const asyncHandler = require("./../middleware/asyncHandler");
const AppError = require("./../utils/appError");
const obj = require("./../utils/objectHelpers");

exports.updateCurrentUser = asyncHandler(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword",
        400
      )
    );
  }

  if (req.body.role) {
    return next(
      new AppError("You do not have permisson to perfomr this acton", 403)
    );
  }

  const filteredBody = obj.objFilter(req.body, "name", "email");

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});
