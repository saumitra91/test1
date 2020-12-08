const fs = require('fs')
const childRoutes = (app) => {
  
    app.get('/childTransactions', (req, res) => {

        const { query: { parentId } } = req
        //console.log(parentId)
        //read child transactions
        const cdataBuffer = fs.readFileSync('./data/Child.json')
        const cdataJSON = cdataBuffer.toString()
        const cdata = JSON.parse(cdataJSON).data

        //filter child transactions using parentId
        const children = cdata.filter((child) => child.parentId == parentId)
        //console.log(children)

        res.status(200).json({
            success: true,
            data: { result: children}})
    })
}

module.exports = childRoutes
