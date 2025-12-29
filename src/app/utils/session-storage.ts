
export class Session {

    public static SetItem(key: string, value: string): void {
        sessionStorage.setItem(key, value);
    }

    public static GetItem(key: string): string | null {
        return sessionStorage.getItem(key);
    }

    public static Clear(): void {
        sessionStorage.clear();
    }

    public static Remove(key: string): void {
        sessionStorage.removeItem(key);
    }

}