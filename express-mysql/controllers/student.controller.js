const mysql = require("mysql");
const connection = require("../mysql");
const CONFIG = require("../config");
/**
 * @name        : getStudents
 * @description : get all student by key word
 * @author      : Hoa Nguyen Quoc
 * @param       : {req} request
 * @param       : {res} response
 * @param       : {next} callback function
 * @return      : {res} response
 * @return      : {next} callback function if have error
 * @created     : 2023/01/11
 * @modified    : 2023/02/12 add condition search
 */
exports.getStudents = (req, res, next) => {
  let kw = req.query.kw;
  let sortOrder = req.query.sortOrder;
  let limit = req.query.limit ?? 10;
  let offset = req.query.offset ?? 0;
  let fromDate = req.query.fromDate;
  let toDate = req.query.toDate;
  let params = [];
  let condition = "";
  if (kw == null) {
    condition = `SELECT id, MaHocSinh, HoHocSinh, TenHocSinh, NgaySinh, GioiTinh, Diem1, Diem2, Diem3, TinhTrang 
              FROM hocsinh`;
    if (fromDate && toDate) {
      params.push(fromDate);
      params.push(toDate);
      condition += " WHERE NgaySinh BETWEEN ? AND ? ";
    }
  } else {
    condition = `SELECT id, MaHocSinh, HoHocSinh, TenHocSinh, NgaySinh, GioiTinh, Diem1, Diem2, Diem3, TinhTrang 
                  FROM hocsinh WHERE TenHocSinh LIKE ? ? ?`;
    params.push(...["%", kw, "%"]);
    if (fromDate && toDate) {
      params.push("2000-11-01");
      params.push("2020-11-01");

      condition += " AND NgaySinh BETWEEN ? AND ? ";
    }
  }
  if (sortOrder === "true") {
    condition += " ORDER BY TenHocSinh ASC ";
  } else {
    condition += " ORDER BY TenHocSinh DESC ";
  }
  condition += "LIMIT ? OFFSET ?";
  params.push(...[limit * 1, offset * 1]);

  let sql = mysql.format(condition, params);
  console.log(sql);
  connection.query(sql, (err, students) => {
    if (err) {
      next({
        controllerName: "Student controller",
        message: err,
      });
      return;
    }
    return res.send(students);
  });
};

/**
 * @name        : getStudentById
 * @description : get student by id
 * @author      : Hoa Nguyen Quoc
 * @param       : {req} request
 * @param       : {res} response
 * @param       : {next} callback function
 * @return      : {res} response
 * @return      : {next} callback function if have error
 * @created     : 2023/01/11
 */
exports.getStudentById = (req, res, next) => {
  let studentId = req.params.id;
  let sql = mysql.format(
    "SELECT id, MaHocSinh, HoHocSinh, TenHocSinh, Diem1, Diem2, Diem3 FROM hocsinh WHERE id = ?",
    [studentId]
  );
  connection.query(sql, (err, students) => {
    if (err) {
      next({
        controllerName: "Student controller",
        message: err,
      });
      return;
    }
    if (!students.length) {
      actionNotFound(next);
      return;
    }
    return res.send(students[0]);
  });
};

/**
 * @name        : insertStudent
 * @description : insert student by id
 * @author      : Hoa Nguyen Quoc
 * @param       : {req} request
 * @param       : {res} response
 * @param       : {next} callback function
 * @return      : {res} response
 * @return      : {next} callback function if have error
 * @created     : 2023/01/15
 */
exports.insertStudent = (req, res, next) => {
  const body = req.body;
  const student = [
    body.MaHocSinh,
    body.HoHocSinh,
    body.TenHocSinh,
    body.Diem1,
    body.Diem2,
    body.Diem3,
  ];
  const sql = mysql.format(
    `INSERT hocsinh SET MaHocSinh = ?, HoHocSinh = ?, TenHocSinh = ?, Diem1 = ?, Diem2 = ?, Diem3 = ?`,
    student
  );
  connection.query(sql, (err) => {
    if (err) {
      next({
        controllerName: "Student controller",
        message: err,
      });
      return;
    }
    return res.send(body);
  });
};

/**
 * @name        : updateStudent
 * @description : update student by id
 * @author      : Hoa Nguyen Quoc
 * @param       : {req} request
 * @param       : {res} response
 * @param       : {next} callback function
 * @return      : {res} response
 * @return      : {next} callback function if have error
 * @created     : 2023/01/15
 */
exports.updateStudent = (req, res, next) => {
  let studentId = req.params.id;
  const body = req.body;
  const student = [
    body.MaHocSinh,
    body.HoHocSinh,
    body.TenHocSinh,
    body.Diem1,
    body.Diem2,
    body.Diem3,
    studentId,
  ];
  const sql = mysql.format(
    `UPDATE hocsinh SET MaHocSinh = ?, HoHocSinh = ?, TenHocSinh = ?, Diem1 = ?, Diem2 = ?, Diem3 = ? WHERE id = ?`,
    student
  );
  connection.query(sql, (err, results) => {
    if (err) {
      next({
        controllerName: "Student controller",
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
 * @name        : deleteStudent
 * @description : delete student by id
 * @author      : Hoa Nguyen Quoc
 * @param       : {req} request
 * @param       : {res} response
 * @param       : {next} callback function
 * @return      : {res} response
 * @return      : {next} callback function if have error
 * @created     : 2023/01/16
 */
exports.deleteStudent = (req, res, next) => {
  let studentId = req.params.id;
  const sql = mysql.format(`DELETE FROM hocsinh WHERE id = ?`, studentId);
  connection.query(sql, (err, results) => {
    if (err) {
      next({
        controllerName: "Student controller",
        message: err,
      });
      return;
    }
    if (results.affectedRows === 0) {
      actionNotFound(next);
      return;
    }
    return res.send(studentId);
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
    controllerName: "Student controller",
    message: `${CONFIG.NOT_FOUND} student`,
  });
};
