const express = require("express");
const { register, createAdmin, updateAdmin } = require("../controller/admin");
const { onlyAdmin, authTokenRequired } = require("../middleware/auth");
const {
    validateRegisterPayload,
    validateLoginPayload,
    validateUpdateUserToAdminPayload,
} = require("../helpers/validations/user");
const { login } = require("../controller/user");

const adminRouter = express.Router();

adminRouter.post(
    "/auth/admin/register",
    validateRegisterPayload,
    authTokenRequired,
    onlyAdmin,
    register
);

adminRouter.post("/auth/admin/login", validateLoginPayload, login);

adminRouter.patch(
    "/auth/admin/update",
    validateUpdateUserToAdminPayload,
    authTokenRequired,
    onlyAdmin,
    updateAdmin
);

module.exports = adminRouter;
