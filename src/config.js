module.exports = {
    port: process.env.PORT || 3000,
    db: process.env.MONGODB || 'mongodb://localhost:27017/app_noticias_api',
    Secret_Token: 'miclavedetokens'
}