const mysql = require("mysql");
const connection = require("../mysql");
const CONFIG = require("../config");
/**
 * @name        : getScores
 * @description : get all score by key word
 * @author      : Hoa Nguyen Quoc
 * @param       : {req} request
 * @param       : {res} response
 * @param       : {next} callback function
 * @return      : {res} response
 * @return      : {next} callback function if have error
 * @created     : 2023/01/17
 */
exports.getScores = (req, res, next) => {
  let kw = req.query.kw;
  let limit = req.query.limit ?? 10;
  let offset = req.query.offset ?? 0;
  let sql = mysql.format(
    "SELECT id, Diem, Mon, HocSinhId FROM diem LIMIT ? OFFSET ?",
    [limit * 1, offset * 1]
  );
  connection.query(sql, (err, scores) => {
    if (err) {
      next({
        controllerName: "Score controller",
        message: err,
      });
      return;
    }
    return res.send(scores);
  });
};

/**
 * @name        : getScoreById
 * @description : get score by id
 * @author      : Hoa Nguyen Quoc
 * @param       : {req} request
 * @param       : {res} response
 * @param       : {next} callback function
 * @return      : {res} response
 * @return      : {next} callback function if have error
 * @created     : 2023/01/17
 */
exports.getScoreById = (req, res, next) => {
  let scoreId = req.params.id;
  let sql = mysql.format(
    "SELECT id, Diem, Mon, HocSinhId FROM diem WHERE id = ?",
    [scoreId]
  );
  connection.query(sql, (err, scores) => {
    if (err) {
      next({
        controllerName: "Score controller",
        message: err,
      });
      return;
    }
    if (!scores.length) {
      actionNotFound(next);
      return;
    }
    return res.send(scores[0]);
  });
};

/**
 * @name        : insertScore
 * @description : insert score by id
 * @author      : Hoa Nguyen Quoc
 * @param       : {req} request
 * @param       : {res} response
 * @param       : {next} callback function
 * @return      : {res} response
 * @return      : {next} callback function if have error
 * @created     : 2023/01/17
 */
exports.insertScore = (req, res, next) => {
  const body = req.body;
  const score = [body.Diem, body.Mon, body.HocSinhId];
  const sql = mysql.format(
    `INSERT diem SET Diem = ?, Mon = ?, HocSinhId = ?`,
    score
  );
  connection.query(sql, (err) => {
    if (err) {
      next({
        controllerName: "Score controller",
        message: err,
      });
      return;
    }
    return res.send(body);
  });
};

/**
 * @name        : updateScore
 * @description : update score by id
 * @author      : Hoa Nguyen Quoc
 * @param       : {req} request
 * @param       : {res} response
 * @param       : {next} callback function
 * @return      : {res} response
 * @return      : {next} callback function if have error
 * @created     : 2023/01/17
 */
exports.updateScore = (req, res, next) => {
  let scoreId = req.params.id;
  const body = req.body;
  const score = [body.Diem, body.Mon, body.HocSinhId, scoreId];
  const sql = mysql.format(
    `UPDATE diem SET Diem = ?, Mon = ?, HocSinhId = ? WHERE id = ?`,
    score
  );
  connection.query(sql, (err, results) => {
    if (err) {
      next({
        controllerName: "Score controller",
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
 * @name        : deleteScore
 * @description : delete score by id
 * @author      : Hoa Nguyen Quoc
 * @param       : {req} request
 * @param       : {res} response
 * @param       : {next} callback function
 * @return      : {res} response
 * @return      : {next} callback function if have error
 * @created     : 2023/01/17
 */
exports.deleteScore = (req, res, next) => {
  let scoreId = req.params.id;
  const sql = mysql.format(`DELETE FROM diem WHERE id = ?`, scoreId);
  connection.query(sql, (err, results) => {
    if (err) {
      next({
        controllerName: "Score controller",
        message: err,
      });
      return;
    }
    if (results.affectedRows === 0) {
      actionNotFound(next);
      return;
    }
    return res.send(scoreId);
  });
};

/**
 * @name        : actionNotFound
 * @description : show error message not found
 * @author      : Hoa Nguyen Quoc
 * @param       : {next} callback function
 * @return      : {next} callback function if have error
 * @created     : 2023/01/17
 */
const actionNotFound = (next) => {
  next({
    controllerName: "Score controller",
    message: `${CONFIG.NOT_FOUND} score`,
  });
};
