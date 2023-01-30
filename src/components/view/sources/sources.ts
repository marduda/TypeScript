import './sources.css';

interface ISources {
    draw: (data: Source[]) => void;
}

export interface SourcesData {
    status:  string;
    sources: Source[] | null;
}

export interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

class Sources implements ISources {
    draw(data: Source[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement | null;

        data.forEach((item) => {
            if (sourceItemTemp) {
                const sourceClone = sourceItemTemp.content.cloneNode(true);

                if (sourceClone instanceof DocumentFragment) {
                    const itemName = sourceClone.querySelector('.source__item-name');

                    if (itemName) itemName.textContent = item.name;
                    sourceClone.querySelector('.source__item')?.setAttribute('data-source-id', item.id);
                }

                fragment.append(sourceClone);
            }
        });

        document.querySelector('.sources')?.append(fragment);
    }
}

export default Sources;
