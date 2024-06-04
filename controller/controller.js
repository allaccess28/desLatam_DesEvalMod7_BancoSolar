import path from "path";
import { addUserQueries, getUsersQueries, updateUserQueries, deleteUserQueries, addTransferQueries, getTransfersQueries } from "../model/queries.js";
const __dirname = path.resolve();

export const home = (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
}

export const addUser = async (req, res) => {
    const { nombre, balance } = req.body;
    const response = await addUserQueries(nombre, balance);
    if (response instanceof Error) {
        res.status(400).send(response.message);
    } else {
        res.status(200).send(response);
    }
}

export const getUsers = async (req, res) => {
    const response = await getUsersQueries();
    if (response instanceof Error) {
        res.status(400).send(response.message);
    } else {
        res.status(200).send(response);
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.query;
    const { nombre, balance } = req.body;
    
    const response = await updateUserQueries({id, nombre, balance});
    if (response instanceof Error) {
        res.status(400).send(response.message);
    } else {
        res.status(200).send(response);
    }   
}

export const deleteUser = async (req, res) => {
    const { id } = req.query;
    const response = await deleteUserQueries(id);
    if (response instanceof Error) {
        res.status(400).send(response.message);
    } else {
        res.status(200).send(response);
    }
}

export const addTransfer = async (req, res) => {
    const { emisor, receptor, monto } = req.body;
    
    const response = await addTransferQueries(emisor, receptor, monto);
    if (response instanceof Error) {
        res.status(400).send(response.message);
    } else {
        res.status(200).send(response);
    }
}

export const getTransfer = async (req, res) => {
    const response = await getTransfersQueries();
    if (response instanceof Error) {
        res.status(400).send(response.message);
    } else {
        res.status(200).send(response);
    }
}