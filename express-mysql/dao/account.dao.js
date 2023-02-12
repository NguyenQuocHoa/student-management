const ModelDAO = require("./model.dao");
const connection = require("../mysql");

/**
 * @name        : class Account
 * @description : dao for model account
 * @author      : Hoa Nguyen Quoc
 * @created     : 2022/06/16
 */
class AccountDAO {
  /**
   * @name        : getAccounts
   * @description : get list account from database
   * @author      : Hoa Nguyen Quoc
   * @param       : {result} function callback get data
   * @param       : {kw} keyword for search
   * @return      : {result} callback
   * @created     : 2022/06/16
   */
  static getAccounts = (result, kw = null) => {
    ModelDAO.getDataList("account", "username", AccountDAO.#convertObject, result, kw);
  };

  /**
   * @name        : getAccountById
   * @description : get account by id
   * @author      : Hoa Nguyen Quoc
   * @param       : {result} function callback get data
   * @param       : {accountId} id of object want to get
   * @return      : {result} callback
   * @created     : 2022/07/17
   */
  static getAccountById = (result, accountId) => {
    ModelDAO.getObjectById("account", AccountDAO.#convertObject, result, accountId);
  };

  /**
   * @name        : getAccountByUsername
   * @description : get account by username
   * @author      : Hoa Nguyen Quoc
   * @param       : {result} function callback get data
   * @param       : {username} username of account want to get
   * @return      : {result} callback
   * @created     : 2022/07/19
   */
  static getAccountByUsername = (result, username, password) => {
    let sql = `SELECT id, username, password FROM account WHERE username = '${username}' AND password = '${password}'`;
    connection.query(sql, (err, accounts) => {
      if (err) {
        result(err, null);
      } else if (accounts?.length === 1) {
        result(null, AccountDAO.#convertObject(accounts[0]));
      } else {
        result(null, null);
      }
    });
  };

  /**
   * @name        : convertObject
   * @description : convert raw object to exact format object
   * @author      : Hoa Nguyen Quoc
   * @param       : {obj} object want to convert
   * @return      : {obj} object after convert
   * @created     : 2022/07/17
   */
  static #convertObject = (obj) => {
    return {
      id: obj.id,
      username: obj.username,
      password: obj.password,
    };
  };
}

module.exports = AccountDAO;
