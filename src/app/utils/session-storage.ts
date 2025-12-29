
export class Session {

    public static SetItem(key: string, value: string): void {

        if (this.GetItem(key) !== "" || this.GetItem(key) !== null)
            this.Clear();

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