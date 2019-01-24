const upath = require('upath');
const winston = require('winston');

winston.emitErrs = true;

function logger(module) {
    return new winston.Logger({
        transports: [
            new winston.transports.File({
                level: 'info',
                filename: process.cwd() + '/logs/all.log',
                handleException: true,
                json: true,
                maxSize: 5242880,
                maxFiles: 2,
                colorize: false
            }),
            new winston.transports.Console({
                level: 'debug',
                label: getFilePath(module),
                handleException: true,
                json: false,
                colorize: true
            })
        ],
        exitOnError: false
    });
}

const getFilePath = module => {
    const filePath = upath
        .normalize(module.filename)
        .split('/')
        .slice(-2)
        .join('/');
    return filePath;
};

module.exports = logger;
