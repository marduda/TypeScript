import { NewsData } from "../view/news/news";
import { SourcesData } from "../view/sources/sources";

interface LoaderOptions {
    endpoint: string;
    options?: Record<string, string>;
}

export type Callback = <T>(t: T) => void;
type ResponseData = NewsData | SourcesData;

interface ILoader {
    getResp: ({ endpoint, options}: LoaderOptions, action: () => void) => void;
    errorHandler: (res: Response) => Response;
    makeUrl: (options: object, endpoint: string) => string;
    load: (method: string, endpoint: string, callback: Callback, options: object) => void;
}


class Loader implements ILoader {
    constructor(
        private baseLink: string,
        private options: object,
    ) {}

    getResp(
        { endpoint, options = {} }: LoaderOptions,
        callback: Callback = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: object, endpoint: string) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        (Object.keys(urlOptions) as (keyof typeof urlOptions)[]).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });
        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: Callback, options: object = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: ResponseData) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
