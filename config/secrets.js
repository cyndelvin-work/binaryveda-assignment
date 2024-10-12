const {
    SecretsManagerClient,
    GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");

const getSecret = async () => {
    const secret_name = process.env.SECRET_NAME;

    const client = new SecretsManagerClient({
        region: 'ap-south-1',
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
    });

    let response;

    try {
        response = await client.send(
            new GetSecretValueCommand({
                SecretId: secret_name,
            })
        );
    } catch (error) {
        console.log(error);
        throw error;
    }

    const secrets = JSON.parse(response.SecretString);
    process.env.MONGODB_URI = secrets.MONGODB_URI;
    process.env.PORT = secrets.PORT;
    process.env.JWT_SECRET = secrets.JWT_SECRET;

    console.log(process.env.MONGODB_URI);
};

getSecret();

module.exports = { getSecret };