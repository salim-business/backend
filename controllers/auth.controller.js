const { staffService, authService } = require("../services");
const httpStatus = require("http-status");
const AppError = require("../utils/AppError");
const constants = require("../constants");
const context = require("../context");
const utils = require("../utils");
const xtend = require("xtend");
const bcrypt = require("bcrypt");

/**
 *
 * @param {User} user
 * @param {Response} res
 * @author Koodeyo
 */
const createTokenAndSend = (user, res) => {
  user.password = undefined;
  user.__v = undefined;

  if (!user.isAdmin) {
    user = xtend(user.toJSON(), {
      isAdmin: user.roles.includes("ADMIN"),
    });
  }

  // generate auth token and set X-Access-Token header with the token
  const token = authService.generateAuthToken(user);
  res.setHeader("X-Access-Token", token);
  // send user and the token
  return res.status(200).json(
    xtend(
      {
        token,
      },
      user
    )
  );
};

/**
 * Login
 *
 * @version 1.0.0
 * @throws AppError 400 status
 * @author Koodeyo
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @description takes user email and password from the user and return user and token with 200 status code
 *  if valid else return AppError with 400 status code
 * @summary User Login
 */
exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  let admin = context.store.getAdmin(username);

  if (admin) {
    const isMatch = await utils.checkPassword(
      password.toString(),
      admin.password
    );
    if (isMatch) {
      return createTokenAndSend(
        {
          id: "admin",
          isAdmin: true,
          isRoot: true,
        },
        res
      );
    }
  }

  if (
    !admin &&
    username === process.env.DEFAULT_ADMIN_USERNAME &&
    password === process.env.DEFAULT_ADMIN_PASSWORD
  ) {
    return createTokenAndSend(
      {
        id: "admin",
        isAdmin: true,
        isRoot: true,
      },
      res
    );
  }

  let user = await staffService.findUserAndCheckPassword(
    {
      $or: [{ username }],
    },
    password
  );

  if (!user) {
    return next(
      new AppError("Incorrect username or password!", httpStatus.UNAUTHORIZED)
    );
  }

  await user.save();
  createTokenAndSend(user, res);
};

/**
 * Update password
 *
 * @version 1.0.0
 * @throws AppError 400 status, AppError 401 status
 * @author Koodeyo
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @description takes currentPassword, Password and passwordConfirm. if currentPassword is wrong return 401 status
 * if password != passwordConfirm return 400
 * @summary User Update Password
 */
exports.updatePassword = async (req, res, next) => {
  const { currentPassword, password, passwordConfirm } = req.body;

  if (!req.user) {
    return next(
      new AppError(
        "Please Authentcate first",
        httpStatus.INTERNAL_SERVER_AppError
      )
    );
  }

  // get user with a password
  if (password !== passwordConfirm) {
    return next(
      new AppError("Please confirm your password", httpStatus.BAD_REQUEST)
    );
  }

  // admin
  if (req.user.isRoot) {
    let admin = context.store.getAdmin(process.env.DEFAULT_ADMIN.USERNAME);
    let hasMatched;

    if (admin) {
      hasMatched = await authService.checkPassword(
        currentPassword,
        admin.password
      );
    } else {
      hasMatched = currentPassword === process.env.DEFAULT_ADMIN.PASSWORD;
    }

    if (hasMatched) {
      context.store.updateAdmin(process.env.DEFAULT_ADMIN.USERNAME, {
        username: process.env.DEFAULT_ADMIN.USERNAME,
        password: await await bcrypt.hash(password, 8),
      });
      return createTokenAndSend(req.user, res);
    }

    return next(new AppError("Incorrect password!", httpStatus.UNAUTHORIZED));
  }

  // user
  const user = await staffService.findUserByIdAndCheckPassword(
    req.user.id,
    currentPassword
  );

  if (!user) {
    return next(new AppError("Incorrect password!", httpStatus.UNAUTHORIZED));
  }

  user.password = password;

  await user.save();
  createTokenAndSend(user, res);
};

exports.signup = async (req, res, next) => {
  const newUser = await staffService.createUser(req.body);
  res.json(newUser);
};

exports.deleteUser = async (req, res, next) => {
  let user = await staffService.deleteUser(req.params.id);
  res.json(user);
};
