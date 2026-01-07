const matchRouter = require(`express`).Router()
const Match = require('../models/match')

//Recuperar todos los partidos de la base de datos
matchRouter.get('/', async (req, res, next) => {
    try{
        const matches = await Match
                                .find({})
                                .sort({ date : 1})
        
        res.json(matches)
    } catch(error) {
        next(error)
    }
})

//Adición de un partido a la BD
matchRouter.post(`/`, async (req, res, next) => {
    const body = req.body
    
    const match = new Match({
        date: body.date,
        localTeam: body.localTeam,
        localGoals: body.localGoals,
        visitTeam: body.visitTeam,
        visitGoals: body.visitGoals,
        competition: body.competition,
        timeView: body.timeView,
        method: body.method,
        comment: body.comment,
    })

    try{
        const savedMatch = await match.save()
        res.status(201).json(savedMatch)
    } catch (exception) {
        next(exception)
    }

})

// Borrar un partido de la BD
matchRouter.delete('/:id', async (req, res, next) => {
    try{
        await Match.findByIdAndDelete(req.params.id)
        res.status(204).end()
    }catch (exception) {
        next(exception)
    }
})


//Exportación del modulo
module.exports = matchRouter