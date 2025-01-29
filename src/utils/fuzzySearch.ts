import Fuse from 'fuse.js';

export const fuzzySearch = (data: any[], search: string): any[] => {
    const options = {
        keys: ['title'],
        threshold: 0.3,
    };
    const fuse = new Fuse(data, options);
    return fuse.search(search);
};
