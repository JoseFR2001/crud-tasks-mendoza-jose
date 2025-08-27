import { validationResult } from "express-validator";

const controller = (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    // 1. Errores como array
    console.log(result.array());
    // 2. Errores mapeados por campo
    console.log(result.mapped());
    // 3. Errores formateados personalizados
    const custom = result.formatWith((err) => `${err.param}: ${err.msg}`);
    console.log(custom.array());

    return res.status(400).json({ errors: result.array() }); // ⬅ return para cortar
  }

  // Si no hay errores, seguimos con el flujo
  next();
};

export default controller;
