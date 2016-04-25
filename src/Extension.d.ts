interface Array<T> {
    ToList(): List<T>;
}

interface Object {
    GetHashCode(obj: any): number;
    Equals(x: any, y: any): boolean;
}

interface IEqualityComparer<T> {
    Equals: (x: T, y: T) => boolean;
    GetHashCode: (obj: T) => number;
}

interface IGrouping<TKey, T> {
    Key: TKey;
    Elements: T[];
}