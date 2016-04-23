import {IEqualityComparer} from './EqualityComparer.d';
import {IGrouping} from './Grouping.d';

export class List<T> extends Array<T>{
    constructor(private array: T[] = []) {
        super();
        Object.defineProperty(this, "array", { value: array, writable: false });
    }

    public Add(item: T): List<T> {
        this.array.push(item);
        return new List<T>(); //this.array.ToList();
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

    public ToList(): List<T> {
        return this;
    }
}
