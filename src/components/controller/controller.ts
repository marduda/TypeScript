import AppLoader from './appLoader';

type Callback = <T>(t: T) => void;

class AppController extends AppLoader {
    getSources(callback: Callback) {
        super.getResp({ endpoint: 'sources', }, callback );
    }

    getNews(e: Event, callback: Callback) {
        let target = e.target as Element;
        const newsContainer = e.currentTarget as Element;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    if (sourceId !== null) {
                        newsContainer.setAttribute('data-source', sourceId);
                        super.getResp(
                            {
                                endpoint: 'everything',
                                options: {
                                    sources: sourceId,
                                },
                            },
                            callback
                        );
                    }
                }
            }
            target = target.parentNode as Element;
        }
    }
}

export default AppController;
