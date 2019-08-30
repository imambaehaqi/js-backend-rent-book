module.exports = {
  getDataResponse: (res, statusCode, values, totalValues, page, message) => {
    return res.status(statusCode).json({
      data: values,
      total: totalValues,
      page: page,
      message: message
    })
  },
  dataManipulationResponse: (res, statusCode, message, values) => {
    return res.status(statusCode).json({
      message: message,
      data: values
    })
  }
}