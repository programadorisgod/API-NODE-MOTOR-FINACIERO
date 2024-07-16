import winston from 'winston'

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'app-running' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
    ]
})
