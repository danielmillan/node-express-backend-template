export default {
    environment: process.env.ENVIRONMENT || 'dev',
    apiPath: process.env.API_PATH || '',
    port: process.env.PORT || '3000',
};
