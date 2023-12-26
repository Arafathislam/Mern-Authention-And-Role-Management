const { create } = require('../fileHandler')


async function test(fileContent, fileName) {
    let result = await create(fileContent, fileName)
    console.log(result)
    return
}



let fileTEST = {
    fileContent: "aadfasdfasdfadsfadsfailjadsfljasldfjalsdfjal;sdfjal;sdfjal;sdfkaslflasjdflajflds",
    fileName: "claim.txt"
}


test(fileTEST.fileContent, fileTEST.fileName)


