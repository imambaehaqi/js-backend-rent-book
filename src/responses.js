module.exports = {
  getDataResponse: (res, statuscode, values, totalvalues, page, message) => {
    return res.json({
      status: statuscode,
      data: values,
      total: totalvalues,
      page: page,
      message: message
    })
  },
  dataManipulationResponse: (res, statuscode, message, values) => {
    return res.json({
      status: statuscode,
      message: message,
      data: values
    })
  }
}
