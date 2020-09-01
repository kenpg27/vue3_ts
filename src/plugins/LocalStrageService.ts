export class LocalStorageService {
    constructor() { }

    clear() {
        localStorage.clear();
    }

    removeItem(key: string) {
        localStorage.removeItem(key);
    }

    setItem<T>(key: string, data: T): boolean {
        try {
            if (typeof data === "string") {
                localStorage.setItem(key, data)
            }
            else if (typeof data === "number" || typeof data === "boolean" || typeof data === "date") {
                localStorage.setItem(key, data.toString())
            }
            else {
                //its my custom object
                localStorage.setItem(key, JSON.stringify(data));
            }
            return true;
        }
        catch (e) {
            return false;
        }
    }

    getItem<T>(key: string): T {
        try {
            let data: object = null;
            if (typeof T === "string" || typeof T === "number" || typeof T === "boolean" || typeof T === "date") {
                data = <T>localStorage.getItem(key);
            }
            else {
                data = <T>JSON.parse(localStorage.getItem(key));
            }

            if (data && data is T) {
                return <T>data;
            }

            return null;

        } catch (e) {
            console.log('Error getting data from localStorage', e);
            return null;
        }
    }
}