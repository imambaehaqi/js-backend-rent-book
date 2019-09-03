const modelGenres = require('../models/genres')
const responses = require('../responses')

module.exports = {
  insertGenres: (req, res) => {
    const data = {
      name: req.body.name
    }

    modelGenres.insertGenre(data)
      .then(result => {
        data.id = result.insertId
        return responses.dataManipulationResponse(res, 201, 'Success adding genre', data)
      })
      .catch(err => {
        console.error(err)
        return responses.dataManipulationResponse(res, 500, 'Failed adding genre', err)
      })
  },
  getAllGenres: (req, res) => {
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
    const id = req.params.id
    modelGenres.getOneGenre(id)
      .then(result => {
        if (result.length !== 0) return responses.getDataResponse(res, 200, result, result.length)
        else return responses.getDataResponse(res, 404, null, null, null, 'Genre not found')
      })
      .catch(err => {
        console.error(err)
        return responses.getDataResponse(res, 500, err)
      })
  },
  updateGenres: (req, res) => {
    const id = req.params.id
    const data = {
      name: req.body.name
    }

    modelGenres.updateGenre(id, data)
      .then(result => {
        data.id = id
        if (result.affectedRows !== 0) return responses.dataManipulationResponse(res, 200, 'Success updating data', data)
        else return responses.dataManipulationResponse(res, 500, 'Failed to update', data)
      })
      .catch(err => {
        console.error(err)
        return responses.dataManipulationResponse(res, 500, err)
      })
  },
  deleteGenres: (req, res) => {
    const id = req.params.id

    modelGenres.deleteGenre(id)
      .then(result => {
        if (result.affectedRows !== 0) return responses.dataManipulationResponse(res, 200, 'Success deleting data', { id })
        else return responses.dataManipulationResponse(res, 500, 'Failed to delete', { id })
      })
      .catch(err => {
        console.error(err)
        return responses.dataManipulationResponse(res, 500, err)
      })
  }
}
