import { hash } from "bcryptjs"
import connectMongo from "../../database/conn"
import Users from "../../model/User"
export default async function handler(req, res) {
    connectMongo().catch(err => res.json({ error: "connection failed" }))

    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Dont have form data" })

        const { email, password, username } = req.body
        const checkExisting = await Users.findOne({ email })
        if (checkExisting) return res.status(422).json({ error: "This Email already exist try another one" })
        Users.create({ username, email, password: await hash(password, 12) }, function (err, data) {
            if (err) return res.status(500).json({ err });
            res.status(200).json({ status: true, user: data })
        })

    }
    else {
        res.status(422).json({ error: "Only Post Req can sent" })
    }


}