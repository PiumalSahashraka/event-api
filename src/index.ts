import configureApp from './config/app-config.js';
import { connectToDatabase } from './config/database-config.js';

const main = async () => {
    await connectToDatabase();

    const app = configureApp();
    app.listen(app.get('port'), () => {
        console.log('Server listening on port:', app.get('port'));
    });
};

main();
