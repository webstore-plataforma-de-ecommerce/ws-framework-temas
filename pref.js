const 
    fs = require('fs'), 
    readline = require('readline'),
    colors = require('colors');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let objConfig = JSON.parse(fs.readFileSync(__dirname + '/layout/config/config.json', 'utf-8'))
let groupPrefs = objConfig.grupoPreferencias

function invalidChoice() {
    console.log('Escolha Inválida'.red.bold)
    process.exit();
}

function saveChoice(txt) {
    fs.writeFileSync(__dirname + '/layout/config/config.json', JSON.stringify(objConfig))
    console.log(`\n${txt}\n`.green.bold)
    process.exit()
}

function listGroups() {
    console.log('\nSelecione o grupo que gostaria de trabalhar')
    console.log(0, '- Criar novo grupo')
    if (Array.isArray(groupPrefs) && groupPrefs.length >= 1) {
        groupPrefs.forEach((groupPref, i) => {
            console.log(i+1, '-', groupPref.grupo)
        });
    } else {
        groupPrefs = []
    }
    if (process.argv[2] == '-g' || process.argv[2] == '-G') process.exit()
    return ''
}

function createNewGroup() {
    rl.question('\nDigite o nome do novo grupo:\n\n', (newGroup) => {
        if (!newGroup || newGroup == '') {
            console.log('Escolha Inválida'.red.bold)
            process.exit();
        }

        groupPrefs.forEach(groupPref => {
            if (groupPref.grupo == newGroup) {
                console.log('\nEste grupo já existe\n'.red.bold)
                process.exit()
            }
        }) 

        groupPrefs.push({
            'grupo': newGroup.trim(),
            'variaveis': []
        })

        saveChoice('Grupo Criado')

    })
}

function showGroup(n) {
    let group = groupPrefs[n]
    rl.question(questionGroup(group.grupo), (choice) => {
        if (!choice || choice == '' || isNaN(choice)) invalidChoice()

        if (choice == 0) {
            showVar(n)
        }

        if (choice == 1) {
            groupPrefs.splice(n, 1);
            saveChoice('Grupo Excluido')
        }

        if (choice == 2) {
            rl.question('\nDigite o novo nome para o grupo:\n', (newName) => {
                if (!newName || newName == '') invalidChoice()

                group.grupo = newName
                saveChoice('Grupo Renomeado')
            })
        }
    })
}

function questionGroup(name) {
    console.log('\nOque você deseja fazer com o grupo', name.yellow.bold, '?')
    console.log(0, '-', 'Editar preferências')
    console.log(1, '-', 'Excluir'.red)
    console.log(2, '-', 'Renomear')
    return ''
}

function showVar(n) {
    let group = groupPrefs[n]
    let prefs = group.variaveis
    rl.question(listPrefs(prefs, group.grupo), (prefNum) => {
        if (!prefNum || prefNum == '' || isNaN(prefNum)) invalidChoice()

        if (prefNum == 0) {
            createNewPref(group)
        } else {
            questionPref(prefNum-1, group)
        }
    });
}

function listPrefs(arr, groupName) {
    console.log('\nSelecione a preferência que gostaria de trabalhar', `(${groupName})`.yellow)
    console.log(0, '- Criar nova preferência')
    if (Array.isArray(arr) && arr.length >= 1) {
        arr.forEach((prefName, i) => {
            console.log(i+1, '-', prefName.id)
        });
    } else {
        arr = []
    }
    if (process.argv[2] == '-p' || process.argv[2] == '-P') process.exit()
    return ''   
}

function questionPref(prefNum, group) {
    let pref = group.variaveis[prefNum]
    console.log('\nSelecione a opção que gostaria de editar\n')
    console.log(0, '-', 'Excluir'.red)
    console.log(1, '-', 'Editar'.yellow)

    rl.question('', (choice) =>{
        if (!choice || choice == '' || isNaN(choice)) invalidChoice()

        if (choice == 0) {
            group.variaveis.splice(prefNum, 1)
            saveChoice('Preferência Excluída');
        }
        if (choice == 1) {
            createNewPref(group, pref)
        }

    });
}

function createNewPref(group, oldPref) {
    let newPref = {}
    let keys = ['tipo', 'id', 'titulo', 'padrao', 'un', 'min', 'max', 'opcoes']
    function getNewValue(n) {
        console.log('Selecione o novo valor para:', keys[n].yellow)
        if (oldPref) {
            console.log('\nValor anterior:', oldPref[keys[n]].blue)
        }
        if (keys[n] == 'tipo') {
            console.log('\nTipos Válidos:')
            console.log('color')
            console.log('option')
            console.log('number')
            console.log('text')
            console.log('longtext')
        }
        if (keys[n] == 'id') {
            console.log('Não pode conter letras máiusculas, acentos e espaços.')
        }
        if (keys[n] == 'un' || keys[n] == 'min' || keys[n] == 'max') {
            console.log('Precisa conter apenas números')
        }
        if (keys[n] == 'opcoes') {
            console.log('Precisa conter um array: Exemplo: opcao1, opcao2')
        }
        rl.question('', (val) => {

            if (keys[n] == 'tipo') {
                if (val != 'color' && val != 'option' && val != 'number' && val != 'text' && val != 'longtext') {
                    console.log('Valor Inválido'.red)
                    getNewValue(n)
                }
            }

            if (keys[n] == 'id') {
                val = corrigeNomes(val)
            }

            if (keys[n] == 'un' || keys[n] == 'min' || keys[n] == 'max') {
                if (isNaN()) {
                    console.log('Valor Inválido'.red)
                    getNewValue(n)
                }
            }

            if (keys[n] == 'opcoes') {
                val = str.split(',').map(v => { return v.trim()})
            } 

            newPref[keys[n]] = val

            if (keys[n+1]) {

                getNewValue(n+1)
            } else {
                saveNewPref(newPref)
                process.exit()
            }
        })
    }

    function saveNewPref(newPref) {
        if (oldPref) {
            let toEdit = group.variaveis.indexOf(oldPref)
            group.variaveis[toEdit] = newPref
            saveChoice('Preferência Editada')
        } else {
            group.variaveis.push(newPref)
            saveChoice('Preferência Criada')
        }
    }
    
    getNewValue(0)
}

rl.question(listGroups(), (getGroup) => {
    getGroup = getGroup.trim()

    if (!getGroup || getGroup == '' || isNaN(getGroup)) invalidChoice()

    getGroup == 0 ? createNewGroup() : showGroup(getGroup-1);
})






function corrigeNomes(nome) {

    nome = nome.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/([^\w]+|\s+)/g, '-')
        .replace(/\-\-+/g, '-')
        .replace(/(^-+|-+$)/, '');

    while (nome.indexOf(" ") >= 0) {
        nome = nome.replace(" ", "_");
    }

    while (nome.indexOf("-") >= 0) {
        nome = nome.replace("-", "_");
    }

    nome = nome.toLowerCase();

    return nome;

}