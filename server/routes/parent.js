
const paginate = require('paginate-info')
const fs = require('fs')

const parentRoutes = (app) => {
  
    app.get('/parentTransactions', (req, res) => {

        const { query: { currentPage, pageSize } } = req
        const { limit, offset } = paginate.calculateLimitAndOffset(currentPage, pageSize)

        //read parent data
        const dataBuffer = fs.readFileSync('./data/Parent.json')
        const dataJSON = dataBuffer.toString()
        const data = JSON.parse(dataJSON).data

        //paginate
        const count = data.length;
        paginatedData = data.slice(offset, offset + limit);
        const paginationInfo = paginate.paginate(currentPage, count, paginatedData);

        //read child data
        const cdataBuffer = fs.readFileSync('../server/data/Child.json')
        const cdataJSON = cdataBuffer.toString()
        const cdata = JSON.parse(cdataJSON).data

        //calculate totalPaidAmount
        for (let index = 0; index < paginatedData.length; index++) {
            const element = paginatedData[index];
            //console.log(element)
            const children = cdata.filter((child) => child.parentId == element.id)
            totalPaid = 0
            children.forEach(element => {
                totalPaid += element.paidAmount
            });
            paginatedData[index].TotalPaidAmount=totalPaid
        }

        res.status(200).json({
            success: true,
            data: { result: paginatedData, meta: paginationInfo }})
      })
    }
  
  module.exports = parentRoutes;