import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ListComplimentsSentByUserController } from "./controllers/ListComplimentsSentByUserController";
import { ListComplimentsReceivedByUserController } from "./controllers/ListComplimentsReceivedByUserController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersController } from "./controllers/ListUsersController";
import { ForgotPasswordController } from "./controllers/ForgotPasswordController";
import { ResetPasswordController } from "./controllers/ResetPasswordController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const createComplimentController = new CreateComplimentController();
const authenticateUserController = new AuthenticateUserController();
const listComplimentsSentByUserController = new ListComplimentsSentByUserController();
const listComplimentsReceivedByUserController = new ListComplimentsReceivedByUserController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

router.post("/users", createUserController.handle);
// router.use(ensureAdmin); -> habilita o middleware a parti daqui.
router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/compliments", ensureAuthenticated, createComplimentController.handle);
router.post("/forgot_password", forgotPasswordController.handle)
router.post("/reset_password/:resetToken", resetPasswordController.handle)

router.get("/users/compliments/sent", ensureAuthenticated, listComplimentsSentByUserController.handle)
router.get("/users/compliments/received", ensureAuthenticated, listComplimentsReceivedByUserController.handle)
router.get("/tags", ensureAuthenticated, listTagsController.handle)
router.get("/users", ensureAuthenticated, listUsersController.handle)


export { router };