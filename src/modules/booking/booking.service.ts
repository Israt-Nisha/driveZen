import { pool } from "../../config/db";

const createBooking = async (payload: Record<string, unknown>) => {

    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

    const vehicleRes = await pool.query(
        `SELECT  vehicle_name, daily_rent_price FROM vehicles WHERE id = $1 AND availability_status = 'available'`,
        [vehicle_id]
    );

    if (vehicleRes.rowCount === 0) {
        throw new Error("Vehicle not available");
    }

    const vehicle = vehicleRes.rows[0];

    const start = new Date(rent_start_date as string);
    const end = new Date(rent_end_date as string);
    const number_of_days =
        Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    if (number_of_days <= 0) {
        throw new Error("rent_end_date must be after rent_start_date");
    }

    const total_price = number_of_days * vehicle.daily_rent_price;

    const result = await pool.query(
        `INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
      VALUES($1, $2, $3, $4, $5, 'active') RETURNING *`,
        [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price,]
    );

    await pool.query(
        `UPDATE vehicles SET availability_status = 'booked' WHERE id = $1`,
        [vehicle_id]
    );

    const formattedBooking = {
        ...result.rows[0],
        rent_start_date: result.rows[0].rent_start_date.toISOString().split("T")[0],
        rent_end_date: result.rows[0].rent_end_date.toISOString().split("T")[0],
    };
    return {

        booking: formattedBooking,
        vehicle: vehicle,
    }
};


const getAllBooking = async (user: any) => {
  let query = (`SELECT b.id, b.customer_id, b.vehicle_id, b.rent_start_date, b.rent_end_date, b.total_price, b.status, u.name AS customer_name, u.email AS customer_email, v.vehicle_name, v.registration_number, v.type
    FROM bookings b
    JOIN users u ON b.customer_id = u.id
    JOIN vehicles v ON b.vehicle_id = v.id
  `);

  const params: any[] = [];
  if (user.role === "customer") {
    query += ` WHERE b.customer_id = $1`;
    params.push(user.id);
  }
  query += ` ORDER BY b.id DESC`;
  const result = await pool.query(query, params);

  const formatted = result.rows.map((item: any) => {
    const base = {
      id: item.id,
      vehicle_id: item.vehicle_id,
      rent_start_date: item.rent_start_date.toISOString().split("T")[0],
      rent_end_date: item.rent_end_date.toISOString().split("T")[0],
      total_price: item.total_price,
      status: item.status,
    };

    if (user.role === "admin") {
      return {
        ...base,
        customer_id: item.customer_id,
        customer: {
          name: item.customer_name,
          email: item.customer_email,
        },
        vehicle: {
          vehicle_name: item.vehicle_name,
          registration_number: item.registration_number,
        },
      };
    }

    return {
      ...base,
      vehicle: {
        vehicle_name: item.vehicle_name,
        registration_number: item.registration_number,
        type: item.type,
      },
    };
  });

  return formatted;
};



export const bookingService = {
    createBooking,
    getAllBooking,
};