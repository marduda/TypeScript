import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { NewsData } from '../view/news/news';
import { SourcesData } from '../view/sources/sources';

interface IApp {
    controller: AppController;
    view: AppView;
    start: () => void;
}

class App implements IApp {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        document
            .querySelector('.sources')?.addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data as NewsData)));
        this.controller.getSources((data) => this.view.drawSources(data as SourcesData));
    }
}

export default App;
