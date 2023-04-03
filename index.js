const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "susanamunoz",
  database: "diurno",
  password: "",
});


//validar existencia usuario
//si no existe crear
//insertar la transaccion


(async () => {
    await pool.query('BEGIN');
    try{
        const resultado = await pool.query('insert into usuario (nombre, apellido, edad, email) values ($1, $2, $3, $4) RETURNING id', ['Armando', 'Barreras', 32, 'ab6@mail.com']);

        const id = resultado.rows[0].id;

        const transaccion = await pool.query('insert into transaccion (id_usuario, monto, tipo_transaccion) values ($1, $2, $3) RETURNING id', [id, 3500, 'a']);
       
        console.log("Proceso finalizado"); 

        await pool.query('COMMIT');
    }catch(e){
        await pool.query('ROLLBACK');
        console.log(e);
    }

  })()