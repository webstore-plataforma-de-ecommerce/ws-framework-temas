const fs = require('fs'), readline = require('readline'), colors = require('colors'), { exec } = require('child_process');

let id = 0, presetToWork, delFunc = false, saveFunc = false;

folderVerify('presets')
const presets = getPresets()

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const quest = (fun) => {
    rl.question("Informe o ID do preset que deseja " + fun + '. \n', function (answer) {

        presetToWork = answer

        rl.close();

    });
}

rl.on("close", function () {

    mainFunction()

});

function  mainFunction() {
    if (delFunc) {
        fs.unlinkSync(presets[parseInt(presetToWork)].path)
        console.log('Preset ', presetToWork, ' deletado')
        process.exit()
    }

    if (saveFunc) {
        if (fs.existsSync(__dirname + '/sys/config/config.json')) {
            let fileToSave = fs.readFileSync(__dirname + '/sys/config/config.json', 'utf-8')
            if (fileToSave == '' || !fileToSave) {
                console.log('Não há loja configurada.' )
            } else {
                if (verifyForCopies(fileToSave)) {
                    console.log('Este preset já está salvo.')
                } else {
                    fs.writeFileSync(__dirname + '/presets/preset_' + (presets.length) + '.json', fileToSave)
                    console.log('Preset salvo com sucesso.')
                }
            }
        } else {
            console.log('Não há loja configurada.' )
        }
        process.exit();
    }

    if (presetToWork == '' || !presetToWork || parseInt(presetToWork) == null || parseInt(presetToWork) == undefined) {
        console.log(presetToWork, ' não é um preset válido.'.red.bold)
        quest()
        return
    }
    
    if (parseInt(presetToWork) > presets.length) {
        console.log(presetToWork, ' não é um preset válido.'.red.bold)
        quest()
        return
    }

    exec('node config ' + presets[parseInt(presetToWork)].token, function (error, stdout, stderr) {
        if (!error) {
          if (stdout && stdout != undefined && stdout != '') {
            console.log(stdout)
                exec('node setpage ' + presets[parseInt(presetToWork)].editar_pagina, function (error, stdout, stderr) {
                    if (!error) {
                    if (stdout && stdout != undefined && stdout != '') {
                        console.log(stdout)
                        exec('node pull', function (error, stdout, stderr) {
                            if (!error) {
                              if (stdout && stdout != undefined && stdout != '') {
                                console.log(stdout)
                                return
                              }
                              return
                            } else {
                                console.log(error)
                            }
                        })
                    }
                    return
                    } else {
                        console.log(error)
                    }
                })
          }
          return
        } else {
            console.log(error)
        }
    })

}

function verifyForCopies(presetToVerify) {
    presetToVerify = JSON.parse(presetToVerify)
    let vrfy = false;

    if (presets <= 0) {
        return false
    }

    let presetCopies = getPresets();
    presetCopies.forEach(prs => {
        if (prs.token == presetToVerify.token) {
            if (prs.editar_pagina == presetToVerify.editar_pagina && prs.temaNome == presetToVerify.temaNome) {
                vrfy = true
            }    
        }
    })

    return vrfy
}

function showPresets() {
    if (presets <= 0) {
        console.log('Não há presets salvos.')
        process.abort()
    }

    console.log('ID          ', 'Loja          '.red, 'Tema          '.yellow, 'Página          '.blue)
    presets.forEach(prs => {
        console.log(prs.id + '       ' + prs.loja.red + '       ' + prs.temaNome.yellow + '       ' + prs.editar_pagina.blue)
    })
}

function getPresets() {
    let presetJSON = []

    fs.readdirSync(__dirname+'/presets/').forEach(presetFile => {
        let presetInfos = JSON.parse(fs.readFileSync(__dirname+ '/presets/' + presetFile, 'utf-8'))
        
        presetInfos['id'] = id
        presetInfos['path'] = __dirname+ '/presets/' + presetFile
        id++
        presetJSON.push(presetInfos)
    })

    return presetJSON
}

function folderVerify(subdir, dir) {
    let vrfy = false

    let dirToRead = dir ? __dirname + '/' + dir : __dirname;

    fs.readdirSync(dirToRead).forEach(file => {
        vrfy = file == subdir ? true : vrfy || false
    })
    vrfy ? null : fs.mkdirSync(dirToRead + '/' + subdir)
    
    return
}

let params = process.argv[2], preInput = process.argv[3]

if (params && params != '') {
    if (params == '-d' || params == '-D' || params == '-delete' ) {
        if (preInput && preInput != '' && parseInt(preInput)) {
            presetToWork = preInput
            delFunc = true;
            mainFunction()
        } else {
            delFunc = true;
            showPresets()
            quest('deletar')
            return 
        }
        return
    }
    if (params == '-s' || params == '-S' || params == '-save' ) {
        saveFunc = true;
        mainFunction()
        return
    }
    if (parseInt(params)) {
        presetToWork = preInput
        mainFunction()
    } else {
        showPresets()
        quest('recuperar')
    }

    return
}

showPresets()
quest('recuperar')