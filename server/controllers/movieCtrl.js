
module.exports = {

    getAllMovies : (req, res) => {
        const dbInstance = req.app.get('db');

        dbInstance.get_all_movies()
        .then(movies => res.status(200).send(movies))
        .catch(err => {
            res.sendStatus(500).send(console.log(err))
        })
    },

    getOneMovie: (req, res) => {
        const dbInstance = req.app.get('db')
        const {id} = req.params

        dbInstance.one_movie(id)
        .then(movie => res.status(200).send(movie))
        .catch(err => {
            res.sendStatus(500).send('errrrror' + console.log(err))
        })
    },

    putRating:  async (req, res) => {
        const dbInstance = req.app.get('db')
        const user = req.session.user

        const {rate, movie_id} = req.body;

        
        if(user){
            
            const [ratingSet] = await dbInstance.get_rating_set(user.id, movie_id)
            if(ratingSet){
                res.status(403).send('you already set a rating')
            }else{

                const [insert] = await dbInstance.insert_rating(user.id, movie_id ,rate)
                
                const [y] = await dbInstance.join_movie(user.id, movie_id)
                // const [z] = await dbInstance.join_movie_user(user.id)
    
                // const [z] = await dbInstance.join_movie_user(user.id)
                res.status(200).send({insert, y})

            }
        }else{
            res.status(401).send('not logged in!')
        }
        
    },

    getRatingAndUser: async(req, res) => {
        const dbInstance = req.app.get('db')
        const user = req.session.user

        const {movie_id} = req.body
        let obj = {}

        if(user){
            const [userAndRating] = await dbInstance.join_movie_user(user.id, movie_id)
            if({userAndRating} === obj || {userAndRating} == obj || userAndRating === obj){
            res.status(200).send('none')
            }
            res.status(200).send({userAndRating})
        }else{
            res.status(401).send('not logged in!')
        }
    },

    avgRating: async (req, res) => {
        const dbInstance = req.app.get('db')

        const {movie_id} = req.body

        const [average] = await dbInstance.avg_rating(movie_id)

        if(average === null || average === undefined){
            res.send('')
        }else{
            res.status(200).send(average)
        }

        // .then(average => res.status(200).send(average))
        
        // .catch(err => {
        //     res.sendStatus(500).send('errrrror' + console.log(err))
        // })
    },

    countRating:  (req, res) => {
        const dbInstance = req.app.get('db')

        const {movie_id} = req.body

        dbInstance.get_rating_count(movie_id)
        .then(count => res.status(200).send(count))
        .catch(err => {
            res.sendStatus(500).send('errrrror' + console.log(err))
        })

    },

    updateRating: async (req, res) => {
        const dbInstance = req.app.get('db')
        const user = req.session.user

        const {movie_id, rating} = req.body

        if(user){
            dbInstance.update_rating(rating, movie_id, user.id)
            .then(new_rating => res.status(200).send(new_rating))
            .catch(err => {
                res.sendStatus(500).send('errrrror' + console.log(err))
            })
        }else{
            res.status(401).send('not logged in!')
        }

    },

    deleteRating: (req, res) => {
        const dbInstance = req.app.get('db')
        const user = req.session.user

        const{id} = req.params

        dbInstance.delete_rating(id, user.id)
        .then(del => res.status(200).send(del))
        
        if(user){
        }
        else{
            res.status(401).send('not logged in!')
        }
    
    }


    // createUser: () => {   
    //     const express = require('express')
    //     const app = express()
    //     const http = require('http').createServer(app)

    //     const io = require('socket.io')(http, {
    //     cors: {origin: '*'}
    //     }).listen(4001)

    //     io.on('connection', (socket) => {
    //     console.log('a user connected')

    //     socket.on('message' , (message) => {
    //         console.log(message)
    //         io.emit('message', `${message}`)
    //         })
    //     })
    // }
}