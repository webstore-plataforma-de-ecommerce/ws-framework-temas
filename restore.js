const fs = require('fs'), readline = require('readline'), extract = require('extract-zip')
const colors = require('colors');

const nameShop = JSON.parse(fs.readFileSync(__dirname + '/sys/config/config.json', 'utf-8')).loja

if (!folderVerify('backup') || !folderVerify(nameShop, 'backup')) {
    console.log('Não Existem Backups Da Loja Atual!'.red.bold)
    process.exit()
}

const backups = getBackups()

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function restoreFun (source, target) {
    try {
        await extract(source, { dir: target })
        console.log('\n Extração Completa! \n'.green.bold)
        process.exit()
    } catch (err) {
        console.log(err.red.bold)
        // handle any errors
    }
}

function folderVerify(subdir, dir) {
    let vrfy = false

    let dirToRead = dir ? __dirname + '/' + dir : __dirname;

    fs.readdirSync(dirToRead).forEach(file => {
        vrfy = file == subdir ? true : vrfy || false
    })

    return vrfy
}

function getBackups() {
    let backupsJSON = []

    fs.readdirSync(__dirname+'/backup/' + nameShop + '/').forEach(backupDir => {
        let backupsFile = JSON.parse(fs.readFileSync(__dirname+'/backup/' + nameShop + '/' + backupDir + '/' + backupDir + '_' + nameShop + '.json', 'utf-8'))
        
        backupsFile['path'] = __dirname+'/backup/' + nameShop + '/' + backupDir + '/' + backupDir + '_' + nameShop + '.rar'
        
        backupsJSON.push(backupsFile)
    })

    return backupsJSON
}

function restoreBackup(n) {
    let dir = __dirname + '/layout'
    let backupToRestore = backups[n]

    fs.rmdirSync(dir, { recursive: true, force: true })

    fs.mkdirSync(dir)

    restoreFun(backupToRestore.path, dir)
}

function confirmQuest(n) {
    return rl.question('Este processo vai deletar toda sua pasta layout!'.red.bold + '\n (S/N): '.yellow, answer => {
        if (answer != 's' && answer != 'S') { process.exit() }

        restoreBackup(n)
    })
}

function quest() {
    rl.question('Escolha o backup para ser recuperado (Ex: 3): \n       ', answer => {
        if (!backups[(parseInt(answer))]) {
            console.log('Por favor Insira um Número Válido!'.red.bold)
            quest()
            return
        }

        confirmQuest(parseInt(answer))
    })
}

function mainFun() {
    console.log('\n <Num> <Commit> <DD/MM HH:MM:SS> \n'.green.bold)
    for (let i = 0;i < backups.length;i++) {
        let n = '<' + i + '>'
        console.log(' ' + n.bgWhite.black.italic + ' | ' + backups[i].commit.bold + ' | ' + backups[i].commitHour + '\n')
    }

    quest()
}

mainFun()
