import { pool } from "../../config/db";


const getUser = async () => {
  const result = await pool.query(`SELECT id,name,email,phone,role FROM users`);

  delete result.rows[0].password;

  return result;
};


const updateUser = async (payload: Record<string, unknown>, id: string) => {
  const { name, email, phone, role } = payload;
  const result = await pool.query(
    `UPDATE users SET name=$1, email=$2, phone=$3, role=$4 WHERE id=$5 RETURNING *`,
    [name, email, phone, role, id]
  );
  delete result.rows[0].password;
  return result;
};


const deleteUser = async (id: string | number) => {
   const result = await pool.query(`
    DELETE FROM users WHERE id = $1 AND NOT EXISTS ( SELECT 1 FROM bookings WHERE customer_id = $1 AND status = 'active')
    RETURNING *`, [id]
  );

  return result;
};
export const userServices = {
  getUser,
  updateUser,
  deleteUser
};