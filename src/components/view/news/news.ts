import './news.css';

interface INews {
    draw: (data: Articles[]) => void;
}

export interface NewsData {
    status: string;
    totalResults: number;
    articles: Articles[] | null;
}
interface Articles {
    source: Source;
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: Date;
    content: string;
}
interface Source {
    id: string;
    name: string;
}

class News implements INews {
    draw(data: Articles[]) {
        const news = data.length >= 10 ? data.filter((_item, idx: number) => idx < 10) : data;
        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement | null;

        news.forEach((item, idx: number) => {
            if (newsItemTemp) {
                const newsClone = newsItemTemp.content.cloneNode(true);
                if (newsClone instanceof DocumentFragment) {
                    if (idx % 2 === 0) newsClone.querySelector('.news__item')?.classList.add('alt');

                    const photo: HTMLDivElement | null = newsClone.querySelector('.news__meta-photo');
                    if (photo) photo.style.backgroundImage = `url(${
                        (item.urlToImage !== null) ? item.urlToImage :'img/news_placeholder.jpg'
                    })`;

                    const author = newsClone.querySelector('.news__meta-author');
                    if (author) author.textContent = (item.author !== null) ? item.author : item.source.name;

                    const date = newsClone.querySelector('.news__meta-date');
                    if (date) date.textContent = item.publishedAt
                        .toString()
                        .slice(0, 10)
                        .split('-')
                        .reverse()
                        .join('-');

                    const title = newsClone.querySelector('.news__description-title');
                    if (title) title.textContent = item.title;

                    const source = newsClone.querySelector('.news__description-source');
                    if (source) source.textContent = item.source.name;

                    const content = newsClone.querySelector('.news__description-content')
                    if (content) content.textContent = item.description;
                    newsClone.querySelector('.news__read-more a')?.setAttribute('href', item.url);
                }

                fragment.append(newsClone);
            }
        });

        const newsElement: HTMLDivElement | null = document.querySelector('.news');
        if (newsElement) {
            newsElement.innerHTML = '';
            newsElement.appendChild(fragment);
        }
    }
}

export default News;
