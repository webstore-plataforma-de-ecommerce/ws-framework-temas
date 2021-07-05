const fs = require('fs'), archiver = require('archiver'), dateMark = Date.now(), readline = require('readline');
const colors = require('colors');

const nameShop = JSON.parse(fs.readFileSync(__dirname + '/sys/config/config.json', 'utf-8')).loja

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function quest() {
    rl.question('Faça um comentário para esse backup \n       ', answer => {
        mainFun(answer)
    })
}

function mainFun(commit) {
    if(!commit) {
        console.log('Seu comentário não pode estar em branco'.red.bold)
        quest(); 
        return 
    }

    if (commit.trim() == '') {
        console.log('Seu comentário não pode estar em branco'.red.bold)
        quest(); 
        return 
    }

    folderVerify('backup')
    folderVerify(nameShop, 'backup')
    folderVerify(getTime(dateMark),'backup/'+nameShop)

    writingFile(nameShop, commit)
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

function writingFile(dir, commit) {
    let writeName =  getTime(dateMark) + '_' + nameShop
    // Setando caminho do arquivo Zip
    let output = fs.createWriteStream(__dirname + '/backup/' + dir + '/' + getTime(dateMark) + '/' + writeName + '.rar')

    let archive = archiver('zip', {
            gzip: true,
            zlib: { level: 9 } // Setar o nível de compressão
        })

    // Em caso de erro no módulo do archive
    archive.on('error', function(err) {
        throw err
    })

    // Setar nome e local de gravação
    archive.pipe(output)

    // Inserir arquivos
    archive.directory(__dirname + '/layout/', false)

    // Finalizar seleção de arquivos
    archive.finalize();

    // Espera o Rar Como Resposta
    function waitForRar() {

        //if (!fs.existsSync(__dirname + '/backup/' + dir + '/' + getTime(dateMark) + '/' + writeName + '.rar')) { setTimeout(() => { waitForRar() }, 100); return }

        fs.writeFileSync(__dirname + '/backup/' + dir + '/' + getTime(dateMark) + '/' + writeName + '.json', JSON.stringify(mountData(commit)))

        console.log('Processo Finalizado!'.green.bold)
        console.log('Voce pode restaurar seu backup futuramente com o comando ' + 'node restore'.yellow.bold);

        setTimeout(finishProcess, 2000);
        
    }

    waitForRar()
}

function finishProcess() {
    process.exit();
}

function mountData(commit) {
    let data = {
        'commit': commit,
        'commitHour': getTime(dateMark,'/',' ',':')
    }

    return data
}

function getTime(ts,a,b,c) {
    let date_ob = new Date(ts), day = ("0" + date_ob.getDate()).slice(-2), month = ("0" + (date_ob.getMonth() + 1)).slice(-2), 
    hours = date_ob.getHours(), minutes = date_ob.getMinutes(), seconds = date_ob.getSeconds()

    seconds = seconds.toString().length == 1 ? '0'+seconds : seconds

    if (a == null || a == undefined) {
        return `${day}-${month}_${hours}-${minutes}-${seconds}`
    } else {
        return  day + a + month + b + hours + c + minutes+ c + seconds
    }

}

quest()