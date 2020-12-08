var currentPage = 1
var pageSize = 2
var currentParentData

function showParentTable(){
    //console.log('button pressed')
    var button = document.getElementById('button')
    button.style.display='none'
    getTableData()
}

function getTableData() {

    url = 'http://localhost:3001/parentTransactions?currentPage='+currentPage+'&pageSize='+pageSize
    var tableElement = document.getElementById('my-table')
    // Add table header
    tableElement.innerHTML='<table id="my-table-data"><tr><th>ID</th><th>Sender</th><th>Receiver</th><th>Total Amount</th><th>Total Paid Amount</th></tr></table><button onclick=previous()>Previous</button><button onclick=next()>Next</button>'

    fetch(url).then(response => response.json()).then(data => {
        // console.log(data.data.result)

        currentParentData = data.data.result
        if(currentParentData.length == 0)
        {
            alert('You have reached the end of pages')
            previous()
        } else {
            var tableElementdata = document.getElementById('my-table-data')
        
            for (let index = 0; index < data.data.result.length; index++) {
                const e = data.data.result[index];
                tableElementdata.innerHTML+='<tr><th>'+e.id+'</th><th>'+e.sender+'</th><th>'+e.receiver+'</th><th>'+e.totalAmount+'</th><th onclick=getChild('+e.id+')>'+e.TotalPaidAmount+'</th></tr>'
            
            }
        }
    })
}

function previous() {
    //console.log('previous')
    if(currentPage == 1)
        alert('You are on the first page')
    else{
        currentPage--
        getTableData()
    }    
}

function next() {
    // console.log('next')
    if(false)
        alert('You are on the last page')
    else{
        currentPage++
        getTableData()
    }
}

function getChild(parentId) {
    // console.log('child '+parentId)
    // console.log(currentParentData)
    url = 'http://localhost:3001/childTransactions?parentId='+parentId
    fetch(url).then(response => response.json()).then(data => {
        // console.log(data)
        var tableElement = document.getElementById('my-table')
        // Add table header
        tableElement.innerHTML='<table id="my-table-data"><tr><th>ID</th><th>Sender</th><th>Receiver</th><th>Total Amount</th><th>Paid Amount</th></tr></table>'
        currentParent = currentParentData.filter(parent => parent.id == parentId)
        // console.log(currentParent)

        var tableElementdata = document.getElementById('my-table-data')
        for (let index = 0; index < data.data.result.length; index++) {
            const e = data.data.result[index];
            // console.log(element)
            tableElementdata.innerHTML+='<tr><th>'+e.id+'</th><th>'+currentParent[0].sender+'</th><th>'+currentParent[0].receiver+'</th><th>'+currentParent[0].totalAmount+'</th><th>'+e.paidAmount+'</th></tr>'            
        }
    })

    var button = document.getElementById('button')
    button.style.display='block'
}
