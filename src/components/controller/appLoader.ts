import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'c3ae929dc8a547dfaba320cfa1d7d044',
        });
    }
}

export default AppLoader;
