const modelGenres = require('../models/genres')
const responses = require('../responses')

module.exports = {
  insertGenre: (req, res) => {
    const data = {
      name: req.body.name
    }
    modelGenres.insertGenre(data)
      .then(result => {
        data.id = result.insertId
        return responses.dataManipulationResponse(res, 201, 'Success add new genre', data)
      })
      .catch(err => {
        console.error(err)
        return responses.dataManipulationResponse(res, 500, 'Failed add new genre', err)
      })
  },
  getAllGenre: (req, res) => {
    modelGenres.getAllGenre()
      .then(result => {
        if (result.length !== 0) return responses.getDataResponse(res, 200, result, result.length)
        else return responses.getDataResponse(res, 404, 0, 0, null, 'Genre not found')
      })
      .catch(err => {
        console.error(err)
        return responses.getDataResponse(res, 500, err)
      })
  },
  getOneGenre: (req, res) => {
    const genreid = req.params.genreid
    modelGenres.getOneGenre(genreid)
      .then(result => {
        if (result.length !== 0) return responses.getDataResponse(res, 200, result, result.length)
        else return responses.getDataResponse(res, 404, null, null, null, 'Genre not found')
      })
      .catch(err => {
        console.error(err)
        return responses.getDataResponse(res, 500, err)
      })
  },
  updateGenre: (req, res) => {
    const genreid = req.params.genreid
    const data = {
      name: req.body.name
    }
    modelGenres.updateGenre(genreid, data)
      .then(result => {
        data.genreid = genreid
        if (result.affectedRows !== 0) return responses.dataManipulationResponse(res, 200, 'Success update genre', data)
        else return responses.dataManipulationResponse(res, 404, 'Failed to update genre', data)
      })
      .catch(err => {
        console.error(err)
        return responses.dataManipulationResponse(res, 500, err)
      })
  },
  deleteGenre: (req, res) => {
    const genreid = req.params.genreid

    modelGenres.deleteGenre(genreid)
      .then(result => {
        if (result.affectedRows !== 0) return responses.dataManipulationResponse(res, 200, 'Success delete genre', { genreid })
        else return responses.dataManipulationResponse(res, 404, 'Failed to delete genre', genreid)
      })
      .catch(err => {
        console.error(err)
        return responses.dataManipulationResponse(res, 500, err)
      })
  }
}
