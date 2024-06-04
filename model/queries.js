import { pool } from "../config/db.js";


export const addUserQueries = async (nombre, balance) => {
   try {
       const sql={
           text: "INSERT INTO usuarios (nombre, balance) VALUES ($1, $2) RETURNING *",
           values:[nombre, balance]
       }
   
       const response = await pool.query(sql);
       if (response.rowCount > 0) {
           return response.rows;
       }else{
        return new Error("No se pudo registrar el usuario");
       }
    
   } catch (error) {
    console.log("Queries Error Code: ", error.code, "Message: ", error.message);
   }
}

export const getUsersQueries = async () => {
    try {
        const sql = {
            text: "SELECT * FROM usuarios",
        }
        const response = await pool.query(sql);
        if (response.rowCount > 0) {
            return response.rows;
        } else {    
            return new Error("No se encontraron usuarios");
        }
    } catch (error) {
        console.log("Queries Error Code: ", error.code, "Message: ", error.message);
    }
}

export const updateUserQueries = async ({id, nombre, balance}) => {
    try {
        const sql = {
            text: "UPDATE usuarios SET nombre = $1, balance = $2 WHERE id = $3 RETURNING *",
            values: [nombre, balance, id]
        }
        const response = await pool.query(sql);
        if (response.rowCount > 0) {
            return response.rows;
        } else {
            return new Error("No se pudo actualizar el usuario");
        }
    } catch (error) {
        console.log("Queries Error Code: ", error.code, "Message: ", error.message);
    }
}

export const deleteUserQueries = async (id) => {
    try {
        const sql = {
            text: "DELETE FROM usuarios WHERE id = $1 RETURNING *",
            values: [id]
        }
        const response = await pool.query(sql);
        if (response.rowCount > 0) {
            return response.rows;
        } else {
            return new Error("No se pudo eliminar el usuario");
        }
    } catch (error) {
        console.log("Queries Error Code: ", error.code, "Message: ", error.message);
    }
}

export const addTransferQueries = async (emisor, receptor, monto) => {
console.log(emisor, receptor, monto)
    const newTransfer = {
        text: "INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES ((Select id from usuarios where nombre = $1), (Select id from usuarios where nombre = $2), $3, CURRENT_TIMESTAMP) RETURNING *",
        values: [emisor, receptor, monto]
    }
    const updateEmiter = {
        text: "UPDATE usuarios SET balance = balance - $1 WHERE nombre = $2 RETURNING *",
        values: [monto, emisor]
    }
    const updateReceptor = {
        text: "UPDATE usuarios SET balance = balance + $1 WHERE nombre = $2 RETURNING *",
        values: [monto, receptor]
        
    }
    try {
        await pool.query("begin");

        const response = await pool.query(newTransfer);
        const responseEmiter = await pool.query(updateEmiter);
        const responseReceptor = await pool.query(updateReceptor);
        await pool.query("commit");
        console.log("ultima transaccion ", response.rows[0]);
    } catch (error) {
        console.log("Queries Error Code: ", error.code, "Message: ", error.message);
        await pool.query("rollback");
    }
}

export const getTransfersQueries = async () => {
    try {
        const sql = {
            text: "SELECT fecha, (Select nombre from usuarios where id = emisor), (Select nombre from usuarios where id = receptor), monto FROM transferencias order by fecha desc",
            rowMode: "array"
        }
        
        
        const response = await pool.query(sql);
        if (response.rowCount > 0) {
            return response.rows;
        } else {
            return new Error("No se encontraron transferencias");
        }
    } catch (error) {
        console.log("Queries Error Code: ", error.code, "Message: ", error.message);
    }
}