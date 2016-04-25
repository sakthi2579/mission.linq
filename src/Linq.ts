Array.prototype.ToList = () => new List(this);
Object.prototype.GetHashCode = (obj) => 0; //Todo: Need to implement.
Object.prototype.Equals = (x, y) => false; //Todo: Need to implement.

export class List<T> {
    constructor(private array: T[] = []) {
        Object.defineProperty(this, "array", { value: array, writable: false });
    }

    public Add(item: T): List<T> {
        this.array.push(item);
        return this.array.ToList();
    }

    public Aggregate<TResult>(Func: (current: T, next: T) => TResult, seed: T): T {
        let current: any;
        let a: T[];
        if ((a = this.array).length === 0) {
            throw 'Aggregate of empty array';
        }
        current = a[0];
        for (var i = 1, n = a.length; i < n; ++i) {
            current = Func(current, a[i]);
        }
        return current;
    }

    public Sum(Func: (x: T) => number): number {
        let a = this.array;
        Func = Func || (o => <any>o);
        let total = 0;
        let len = a.length;
        for (let i = 0; i < len; ++i) {
            total += Func(a[i]);
        }
        return total;
    }

    public Average(Func?: (x: T) => number): number {
        let a = this.array;
        let total = this.Sum(Func);
        let len = a.length;
        return total / len;
    }

    public Concat(array: T[]): List<T> {
        return new List(this.array.concat(array));
    }

    public Any(Func?: (x: T) => boolean): boolean {
        let a = this.array;
        Func = Func || (o => <any>o);
        for (let i = 0, n = a.length; i < n; ++i) {
            if (Func(a[i])) {
                return true;
            }
        }
        return false;
    }

    public Contains(item: T, comparer: IEqualityComparer<T>): boolean {
        if (!comparer) {
            return this.Any((o) => o === item);
        }
        return this.Any(function (o) {
            return comparer.Equals(o, item);
        });
    }

    public Count(Func?: (x: T) => boolean): number {
        return Func ? this.Where(Func).Count() : this.array.length;
    }

    public Where(Func: (x: T) => boolean): List<T> {
        let a = this.array;
        let e: T;
        let result: T[] = [];

        for (let i = 0, n = a.length; i < n; ++i) {
            e = a[i];
            if (Func(e)) {
                result.push(e);
            }
        }
        return new List(result);
    }

    public Distinct(comparer: IEqualityComparer<T>): List<T> {
        return this.DistinctBy((o) => o, comparer);
    }

    public DistinctBy<U>(Func: (x: T) => U, comparer: IEqualityComparer<T>): List<T> {
        let a = this.array;
        let e: T;

        let keys: U[] = [], unique: T[] = [];

        for (let i = 0, n = a.length; i < n; ++i) {
            e = a[i];

            let objKey = Func(e);

            if (!keys.ToList().Contains(objKey, comparer)) {
                keys.push(objKey);
                unique.push(e);
            }
        }

        return new List(unique);
    }

    public ElementAt(index: number): T {
        if (index < 0 || index >= this.array.length) {
            throw "Index was out of range. Must be non-negative and less than the size of the collection.";
        }
        return this.array[index];
    }

    public ElementAtOrDefault(index: number): T {
        if (index >= this.array.length || index < 0) {
            return null;
        }
        return this.array[index];
    }

    public Except(except: T[], comparer?: IEqualityComparer<T>): List<T> {
        let a = this.array;
        let result: T[] = [];
        let hashTable: any = {};
        let e: T, eHash: number;
        let getHash = comparer ? comparer.GetHashCode : (e: T): number => Object.GetHashCode(e);
        for (let i = 0, n = except.length; i < n; ++i) {
            hashTable[getHash(except[i])] = 1;
        }
        for (let i = 0, n = a.length; i < n; ++i) {
            e = a[i];
            eHash = getHash(e);

            if (!hashTable[eHash]) {
                result.push(e);
            }
        }
        return new List(result);
    }

    public First(Func?: (x: T) => boolean): T {
        if (this.array.length === 0) {
            throw "Enumeration does not contain elements";
        }
        if (!Func) {
            return this.array[0];
        }
        var result = this.Where(Func);
        if (result.Count() === 0) {
            throw "Enumeration does not contain elements";
        }
        return result.ElementAt(0);
    }

    public FirstOrDefault(Func?: (x: T) => boolean): T {
        if (!Func) {
            return this.array.length > 0 ? this.array[0] : null;
        }
        return this.Where(Func).ElementAtOrDefault(0);
    }

    public ForEach(Func: (e: T, index?: number) => any): void {
        var a = this.array;
        for (var i = 0, n = a.length; i < n; ++i) {
            if (Func(a[i], i) === false) {
                break;
            }
        }
    }
    public GroupBy<TKey, TElement>(keySelector: (e: T) => TKey, elementSelector?: (e: T) => TElement, comparer?: IEqualityComparer<TKey>): List<any> {
        elementSelector = elementSelector || ((o: T) => <TElement>(<any>o));

        comparer = comparer || {
            Equals: function (a, b) {
                return a == b;
            }, GetHashCode: function (e) {
                return Object.GetHashCode(e);
            }
        };

        var a = this.array;

        var key: TKey, hashKey: number, reHashKey: number;
        var hashs: any = {};
        for (var i = 0, n = a.length; i < n; ++i) {
            reHashKey = undefined;

            key = keySelector(a[i]);
            hashKey = comparer.GetHashCode(key);

            if (typeof hashs[hashKey] !== "undefined")
                reHashKey = comparer.Equals(key, hashs[hashKey].Key) ? hashKey : hashKey + i;

            if (typeof reHashKey !== "undefined" && reHashKey !== hashKey)
                hashKey = reHashKey;

            hashs[hashKey] = hashs[hashKey] || { Key: key, Elements: [] };
            hashs[hashKey].Elements.push(elementSelector(a[i]));
        }

        var keys = Object.keys(hashs);
        var ret: any = [];
        for (var i = 0, n = keys.length; i < n; ++i) {
            ret.push(hashs[keys[i]]);
        }

        return new List(ret);
    }

    public ToList(): List<T> {
        return this;
    }
}


