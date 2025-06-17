/**
 * API 響應處理工具
 */

const responseHandler = {
  /**
   * 成功響應
   * @param {Response} res - Express response 對象
   * @param {*} data - 響應數據
   * @param {string} message - 成功消息
   * @param {number} statusCode - HTTP 狀態碼
   */
  success(res, data = null, message = '操作成功', statusCode = 200) {
    return res.status(statusCode).json({
      code: statusCode,
      message,
      data
    })
  },

  /**
   * 錯誤響應
   * @param {Response} res - Express response 對象
   * @param {string} message - 錯誤消息
   * @param {number} statusCode - HTTP 狀態碼
   * @param {*} details - 詳細錯誤信息
   */
  error(res, message = '操作失敗', statusCode = 500, details = null) {
    return res.status(statusCode).json({
      code: statusCode,
      message,
      ...(details && { details })
    })
  },

  /**
   * 404 錯誤響應
   * @param {Response} res - Express response 對象
   * @param {string} message - 錯誤消息
   */
  notFound(res, message = '資源不存在') {
    return this.error(res, message, 404)
  },

  /**
   * 400 錯誤響應
   * @param {Response} res - Express response 對象
   * @param {string} message - 錯誤消息
   * @param {*} details - 詳細錯誤信息
   */
  badRequest(res, message = '無效的請求', details = null) {
    return this.error(res, message, 400, details)
  },

  /**
   * 401 錯誤響應
   * @param {Response} res - Express response 對象
   * @param {string} message - 錯誤消息
   */
  unauthorized(res, message = '未授權的訪問') {
    return this.error(res, message, 401)
  },

  /**
   * 403 錯誤響應
   * @param {Response} res - Express response 對象
   * @param {string} message - 錯誤消息
   */
  forbidden(res, message = '禁止訪問') {
    return this.error(res, message, 403)
  },

  /**
   * 409 衝突響應
   * @param {Response} res - Express response 對象
   * @param {string} message - 錯誤消息
   */
  conflict(res, message = '資源衝突') {
    return this.error(res, message, 409)
  },

  /**
   * 422 驗證錯誤響應
   * @param {Response} res - Express response 對象
   * @param {string} message - 錯誤消息
   * @param {*} details - 詳細錯誤信息
   */
  validationError(res, message = '驗證失敗', details = null) {
    return this.error(res, message, 422, details)
  }
}

module.exports = responseHandler 