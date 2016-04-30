export {};

type Predicate<T> = (item: T) => boolean;

interface KeyArrayPair<K, T> {
    Key: K;
    Value: Array<T>;
}

declare global {
    interface Array<T> {
        First: {
            (): T;
            (Func: Predicate<T>): T;
        };
        FirstOrDefault: {
            (): T;
            (Func: Predicate<T>): T;
        };
        Any: {
            (): T;
            (Func: Predicate<T>): boolean;
        };
        Count: {
            (): number;
            (Func: Predicate<T>): number;
        };
        Last: {
            (): T;
            (Func: Predicate<T>): T;
        };
        LastOrDefault: {
            (): T;
            (Func: Predicate<T>): T;
        };
        Max: {
            (): number;
            (Func: (item: T) => number): number;
        };
        Min: {
            (): number;
            (Func: (item: T) => number): number;
        };
        OrderBy: {
            <TKey>(Func: (item: T) => TKey): Array<T>;
            <TKey>(Func: (item: T) => TKey, comparer: (a: TKey, b: TKey) => number): Array<T>;
        };
        OrderByDescending: {
            <TKey>(Func: (item: T) => TKey): Array<T>;
            <TKey>(Func: (item: T) => TKey, comparer: (a: TKey, b: TKey) => number): Array<T>;
        };

        Add(item: T): Array<T>;
        All(Func: Predicate<T>): boolean;
        Average(Func: (item: T) => number): number;
        Where(Func: Predicate<T>): Array<T>;
        Select<TResult>(Func: (item: T) => TResult): Array<TResult>;
        Skip(count: number): Array<T>;
        SkipWhile(Func: Predicate<T>): Array<T>;
        Sum(Func: (item: T) => number): number;
        Take(count: number): Array<T>;
        TakeWhile(Func: Predicate<T>): Array<T>;
        Remove(item: T): Array<T>;
    }
}

Array.prototype.All = function (func: (item: any) => boolean): boolean {
    let a: Array<any> = this;
    for (let i of a) {
        if (!func(i)) {
            return false;
        }
    }
    return true;
};

Array.prototype.Add = function (item: any): Array<any> {
    let a: Array<any> = this;
    a.push(item);
    return a;
};

Array.prototype.Any = function (func?: (item: any) => boolean): boolean {
    let a: Array<any> = this;
    if (!func && a.length > 0) {
        return true;
    }
    if (func) {
        for (let i of a) {
            if (func(i)) {
                return true;
            }
        }
    }
    return false;
};

Array.prototype.Average = function (func: (item: any) => number): number {
    let a: Array<any> = this;
    if (a.length === 0) {
        const err = 'Array contains no elements';
        throw err;
    }
    let len = a.length;
    let total = a.Sum(func);
    return total / len;
};

Array.prototype.Max = function (func?: (item: any) => number): number {
    let a: Array<any> = this;
    if (a.length === 0) {
        const err = 'Array contains no elements';
        throw err;
    }
    func = func || ((o) => o);
    let max = func(a[0]);
    for (let i of a) {
        var next = func(i);
        if (next > max) {
            max = next;
        }
    }
    return max;
};

Array.prototype.Min = function (func?: (item: any) => number): number {
    let a: Array<any> = this;
    if (a.length === 0) {
        const err = 'Array contains no elements';
        throw err;
    }
    func = func || ((o) => o);
    let min = func(a[0]);
    for (let i of a) {
        let next = func(i);
        if (next < min) {
            min = next;
        }
    }
    return min;
};

Array.prototype.OrderBy = function (func: (item: any) => any, comparer?: (a: any, b: any) => number): Array<any> {
    let a: Array<any> = this;
    comparer = comparer || ((a: any, b: any) => a > b ? 1 : a < b ? -1 : 0);
    let res: Array<any> = a.sort((x: any, y: any) => comparer(func(x), func(y)));
    return res;
};

Array.prototype.OrderByDescending = function (func: (item: any) => any, comparer?: (a: any, b: any) => number): Array<any> {
    let a: Array<any> = this;
    comparer = comparer || ((a: any, b: any) => a > b ? -1 : a < b ? 1 : 0);
    let res: Array<any> = a.sort((x: any, y: any) => comparer(func(x), func(y)));
    return res;
};

Array.prototype.Count = function (func?: (item: any) => boolean): number {
    let a: Array<any> = this;
    return func ? a.Where(func).Count() : a.length;
};

Array.prototype.Where = function (func: (item: any) => boolean): Array<any> {
    let result: Array<any> = [];
    let a: Array<any> = this;
    for (let i of a) {
        if (func(i)) {
            result.push(i);
        }
    }
    return result;
};

Array.prototype.Select = function (func: (item: any) => any): Array<any> {
    let a: Array<any> = this;
    let result: Array<any> = [];
    for (let i of a) {
        result.push(func(i));
    }
    return result;
};

Array.prototype.Skip = function (count: number) {
    let a: Array<any> = this;
    return a.slice(count);
};

Array.prototype.SkipWhile = function (func: (item: any) => boolean): Array<any> {
    let a: Array<any> = this, i: number = 0;
    for (let i of a) {
        if (!func(i)) {
            break;
        }
    }
    return a.slice(i);
};

Array.prototype.Sum = function (func: (item: any) => number): number {
    let a: Array<any> = this;
    let total = 0;
    for (let i of a) {
        total += func(i);
    }
    return total;
};

Array.prototype.Take = function (count: number) {
    let a: Array<any> = this;
    let result: Array<any> = [];
    var len: number = count > (len = a.length) ? len : count;
    for (let i = 0; i < len; ++i) {
        result.push(a[i]);
    }
    return result;
};

Array.prototype.TakeWhile = function (func: (item: any) => boolean): Array<any> {
    let a: Array<any> = this;
    let result: Array<any> = [];
    for (let i of a) {
        if (func(i)) {
            result.push(i);
        } else {
            break;
        }
    }
    return result;
};

Array.prototype.Remove = function (item: any): Array<any> {
    let a: Array<any> = this;
    const i = a.indexOf(item);
    if (i > 0) {
        a.splice(i, 1);
    }
    return a;
};

Array.prototype.First = function (func?: (item: any) => boolean): any {
    let a: Array<any> = this;
    let res = a.FirstOrDefault(func);
    if (!res) {
        throw 'Array does not contain elements';
    }
    return res;
};

Array.prototype.FirstOrDefault = function (func?: (item: any) => boolean): any {
    let a: Array<any> = this;
    if (a.length === 0) {
        return null;
    }
    if (!func) {
        return a[0];
    }
    for (let i of a) {
        if (func(i)) {
            return i;
        }
    }
    return null;
};

Array.prototype.Last = function (func?: (item: any) => any): any {
    let a: Array<any> = this;
    return a.reverse().First(func);
};

Array.prototype.LastOrDefault = function (func?: (item: any) => any): any {
    let a: Array<any> = this;
    return a.reverse().FirstOrDefault(func);
};




