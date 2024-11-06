import { Router } from 'express';
import { UserController } from '../controllers';
import { validateCreateUser, validateLoginUser } from '../middlewares/dataValidator';
import authJwt from '../middlewares/authJwt';
import isAdmin from '../middlewares/isAdmin'

export class UsersRoute {
  private userController: UserController;

  constructor(userController: UserController) {
    this.userController = userController;
  }

  createRouter(): Router {
    const router = Router();

    router.post('/users', validateCreateUser, this.userController.createUser.bind(this.userController));
    router.delete('/users/:id', validateCreateUser, this.userController.deleteUser.bind(this.userController));

    router.put('/users/me', authJwt.verifyToken, this.userController.updateMyData.bind(this.userController));

    router.get('/users', authJwt.verifyToken, this.userController.getUsers.bind(this.userController));

    router.get('/users/:id', authJwt.verifyToken, this.userController.getUserById.bind(this.userController));

    router.post('/auth/login', validateLoginUser, this.userController.login.bind(this.userController));

    return router;
  }
}
