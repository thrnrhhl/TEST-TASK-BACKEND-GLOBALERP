const readline = require('readline');
const fs = require('fs');
const path = require('path');
const cliColor = require('cli-color');

const rLine1Color = cliColor.cyan('Введите путь входного файла: ');
const rLine2Color = cliColor.yellowBright('Введите путь выходного файла: ');

const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Чтение файла
function readFile(inputFile) {
    return new Promise((resolve, reject) => {
        fs.readFile(inputFile, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

// Запись файла
function writeFile(outputFile, data) {
    return new Promise((resolve, reject) => {
        const directoryPath = path.dirname(outputFile);

        // Проверяем есть ли такой у нас путь
        if (!fs.existsSync(directoryPath)) {
            // Создаем ее если не существует
            fs.mkdirSync(directoryPath, { recursive: true });
        }

        fs.writeFile(outputFile, data, 'utf8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve('Файл сохранен');
            }
        });
    });
}



readLine.question(rLine1Color, (inputFile) => {
    readLine.question(rLine2Color, (outputFile) => {
        readFile(inputFile.trim())
            .then((data) => writeFile(outputFile.trim(), data))
            .then((message) => {
                console.log(cliColor.green(message));
                readLine.close();
            })
            .catch((err) => {
                console.error('Error:', err);
                readLine.close();
            });
    });
});
