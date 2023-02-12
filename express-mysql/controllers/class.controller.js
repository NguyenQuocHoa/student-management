const mysql = require("mysql");
const connection = require("../mysql");
const CONFIG = require("../config");
/**
 * @name        : getClasses
 * @description : get all class by key word
 * @author      : Hoa Nguyen Quoc
 * @param       : {req} request
 * @param       : {res} response
 * @param       : {next} callback function
 * @return      : {res} response
 * @return      : {next} callback function if have error
 * @created     : 2023/01/16
 */
exports.getClasses = (req, res, next) => {
  let kw = req.query.kw;
  let limit = req.query.limit ?? 10;
  let offset = req.query.offset ?? 0;
  let sql = mysql.format(
    "SELECT id, MaLop, TenLop, SiSo, HocSinhRot, HocSinhDau FROM lop LIMIT ? OFFSET ?",
    [limit * 1, offset * 1]
  );
  connection.query(sql, (err, classes) => {
    if (err) {
      next({
        controllerName: "Class controller",
        message: err,
      });
      return;
    }
    return res.send(classes);
  });
};

/**
 * @name        : getClassById
 * @description : get class by id
 * @author      : Hoa Nguyen Quoc
 * @param       : {req} request
 * @param       : {res} response
 * @param       : {next} callback function
 * @return      : {res} response
 * @return      : {next} callback function if have error
 * @created     : 2023/01/16
 */
exports.getClassById = (req, res, next) => {
  let classId = req.params.id;
  let sql = mysql.format(
    "SELECT id, MaLop, TenLop, SiSo, HocSinhRot, HocSinhDau FROM lop WHERE id = ?",
    [classId]
  );
  connection.query(sql, (err, classes) => {
    if (err) {
      next({
        controllerName: "Class controller",
        message: err,
      });
      return;
    }
    if (!classes.length) {
      actionNotFound(next);
      return;
    }
    return res.send(classes[0]);
  });
};

/**
 * @name        : insertClass
 * @description : insert class by id
 * @author      : Hoa Nguyen Quoc
 * @param       : {req} request
 * @param       : {res} response
 * @param       : {next} callback function
 * @return      : {res} response
 * @return      : {next} callback function if have error
 * @created     : 2023/01/16
 */
exports.insertClass = (req, res, next) => {
  const body = req.body;
  const cls = [body.MaLop, body.TenLop, 0, 0, 0];
  const sql = mysql.format(
    `INSERT lop SET MaLop = ?, TenLop = ?, SiSo = ?, HocSinhRot = ?, HocSinhDau = ?`,
    cls
  );
  connection.query(sql, (err) => {
    if (err) {
      next({
        controllerName: "Class controller",
        message: err,
      });
      return;
    }
    return res.send(body);
  });
};

/**
 * @name        : updateClass
 * @description : update class by id
 * @author      : Hoa Nguyen Quoc
 * @param       : {req} request
 * @param       : {res} response
 * @param       : {next} callback function
 * @return      : {res} response
 * @return      : {next} callback function if have error
 * @created     : 2023/01/16
 */
exports.updateClass = (req, res, next) => {
  let clsId = req.params.id;
  const body = req.body;
  const cls = [body.MaLop, body.TenLop, clsId];
  const sql = mysql.format(
    `UPDATE lop SET MaLop = ?, TenLop = ? WHERE id = ?`,
    cls
  );
  connection.query(sql, (err, results) => {
    if (err) {
      next({
        controllerName: "Class controller",
        message: err,
      });
      return;
    }
    if (results.affectedRows === 0) {
      actionNotFound(next);
      return;
    }
    return res.send(body);
  });
};

/**
 * @name        : deleteClass
 * @description : delete class by id
 * @author      : Hoa Nguyen Quoc
 * @param       : {req} request
 * @param       : {res} response
 * @param       : {next} callback function
 * @return      : {res} response
 * @return      : {next} callback function if have error
 * @created     : 2023/01/16
 */
exports.deleteClass = (req, res, next) => {
  let classId = req.params.id;
  const sql = mysql.format(`DELETE FROM lop WHERE id = ?`, classId);
  connection.query(sql, (err, results) => {
    if (err) {
      next({
        controllerName: "Class controller",
        message: err,
      });
      return;
    }
    if (results.affectedRows === 0) {
      actionNotFound(next);
      return;
    }
    return res.send(classId);
  });
};

/**
 * @name        : actionNotFound
 * @description : show error message not found
 * @author      : Hoa Nguyen Quoc
 * @param       : {next} callback function
 * @return      : {next} callback function if have error
 * @created     : 2023/01/16
 */
const actionNotFound = (next) => {
  next({
    controllerName: "Class controller",
    message: `${CONFIG.NOT_FOUND} class`,
  });
};
