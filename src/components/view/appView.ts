import News, { NewsData } from './news/news';
import Sources, { SourcesData } from './sources/sources';

interface IAppView {
    news: News;
    sources: Sources;
    drawNews: (data: NewsData) => void;
    drawSources: (data: SourcesData) => void;
}

export class AppView implements IAppView {
    news;
    sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: NewsData) {
        const values = data.articles ? data.articles : [];
        this.news.draw(values);
    }

    drawSources(data: SourcesData) {
        const values = data.sources ? data.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
