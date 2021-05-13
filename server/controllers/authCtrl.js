const bcrypt = require('bcryptjs');

module.exports = {

    register: async(req, res) => {
        const db = req.app.get('db');

        const {username, password, first_name, last_name} = req.body;

        try{
            const[exsistingUser] = await db.get_user_by_username(username)
            
            if(exsistingUser){
                return res.status(409).send('Username already exists')
            }

            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)

            const [newUser] = await db.register_user(username, hash)
            const [newUser2] = await db.register_name(newUser.id, first_name, last_name)

            req.session.user = newUser

            res.status(200).send({newUser, newUser2})

        } catch(err){
            console.log(err)
            return res.sendStatus(500)
        }

    },

    login: (req, res) => {

        const db = req.app.get('db')
        const {username, password} = req.body
        
        db.get_user_by_username(username)
            .then(([exsistingUser]) => {
                if(!exsistingUser){
                    return res.status(403).send('Incorrect username!')
                }

                const isAuth = bcrypt.compareSync(password, exsistingUser.hash)

                if(!isAuth) {
                    return res.status(403).send('Incorrect password!')
                }
                req.session.user = (username, password);

                delete exsistingUser.hash

                req.session.user = exsistingUser
                
                res.status(200).send(req.session.user)
            }) 
                    
    },

    logout: (req, res) => {
        req.session.destroy()
        // res.redirect('/')
        res.sendStatus(200)
    },
    
    userData: async(req, res) => {
        const db = req.app.get('db')
        const user = req.session.user

        if(user){
            const [x] = await db.join(user.id)
            let id = user.id
            return res.status(200).send({id, x})
            // let x = ''
            // let y = 9

            // db.join(user.id)
            // .then(name => {
            //     x = name[0].first_name + name[0].last_name
            //     // console.log('x : ' + x, {y})
            //     res.status(200).send({x})

            // })

        }else{
            return res.sendStatus(401)
        }
    }

}