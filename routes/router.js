import express from "express";
import { home, addUser, getUsers, updateUser, deleteUser, addTransfer, getTransfer } from "../controller/controller.js";
const router = express.Router();


router.get("/", home);

router.post("/usuario", addUser);
router.get("/usuarios", getUsers);
router.put("/usuario", updateUser);
router.delete("/usuario", deleteUser);

router.post("/transferencia", addTransfer);
router.get("/transferencias", getTransfer);


export default router;