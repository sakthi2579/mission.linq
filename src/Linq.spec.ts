///<reference path="./Linq.ts" />
describe('Array', () => {
    describe('All', () => {
        let list: Array<number>;
        beforeEach(function () {
            list = [1, 2, 3, 4, 5];
        });
        it('All value should be less than 6', () => {
            let res = list.All((x) => x < 6);
            return expect(res).toEqual(true);
        });
        it('All value should not be greater than 5', () => {
            let res = list.All((x) => x > 5);
            return expect(res).toEqual(false);
        });
    });
    describe('Add', () => {
        let list: Array<number>;
        beforeEach(function () {
            list = [1, 2, 3, 4, 5];
        });
        it('Length should be increased to one', () => {
            let originalLen = list.length;
            list.Add(6);
            return list.length === originalLen + 1;
        });
        it('Last value shoud be equal to last added value', () => {
            list.Add(6);
            var res = list.Last();
            return expect(res).toEqual(6);
        });
    });
    describe('Any', () => {
        let list: Array<number>;
        beforeEach(function () {
            list = [1, 2, 3, 4, 5];
        });
        it('It should return true', () => {
            return expect(list.Any()).toEqual(true);
        });
        it('It should return true', () => {
            return expect(list.Any(x => x > 4)).toEqual(true);
        });
        it('It should return false', () => {
            return expect(list.Any(x => x > 5)).toEqual(false);
        });
    });
    describe('Remove', () => {
        let list: Array<number>;
        beforeEach(function () {
            list = [1, 2, 3, 4, 5];
        });
        it('Length should be 4 after remvoe', () => {
            let originalLen = list.length;
            let res = <Array<number>>list.Remove(3);
            return expect(res.length).toEqual(originalLen - 1);
        });
        it('Array shoud not contain 3 after remove', () => {
            let res = <Array<number>>list.Remove(3);
            let val = res.All(x => x !== 3);
            return expect(val).toEqual(true);
        });
    });
    describe('Average', () => {
        let list: Array<number>;
        beforeEach(function () {
            list = [1, 2, 3, 4, 5];
        });
        it('Average should be equal to 3', () => {
            let val = list.Average(x => x);
            return expect(val).toEqual(3);
        });
    });
    describe('Where', () => {
        let list: Array<number>;
        beforeEach(function () {
            list = [1, 2, 3, 4, 5];
        });
        it('It should filter odd number', () => {
            let val = list.Where(x => x % 2 !== 0);
            return expect(val).toEqual([1, 3, 5]);
        });
        it('It should filter even number', () => {
            let val = list.Where(x => x % 2 === 0);
            return expect(val).toEqual([2, 4]);
        });
    });
    describe('OrderBy', () => {
        let list: Array<any>;
        beforeEach(function () {
            list = [
                { name: 'Abirami', age: 32, place: 'chennai' },
                { name: 'Sakthi', age: 35, place: 'Perambalur' },
                { name: 'Karthik', age: 28, place: 'Erode' },
                { name: 'Manikandan', age: 31, place: 'Darmapuri' },
                { name: 'Srini', age: 55, place: 'chennai' },
                { name: 'Bhubanaganesh', age: 29, place: 'Tanjure' },
                { name: 'Rajasekaran', age: 32, place: 'Kottampatti' }
            ];
        });
        it('It should be Order by name ASC', () => {
            let res = list.OrderBy(x => x.name);
            let exp = [
                { name: 'Abirami', age: 32, place: 'chennai' },
                { name: 'Bhubanaganesh', age: 29, place: 'Tanjure' },
                { name: 'Karthik', age: 28, place: 'Erode' },
                { name: 'Manikandan', age: 31, place: 'Darmapuri' },
                { name: 'Rajasekaran', age: 32, place: 'Kottampatti' },
                { name: 'Sakthi', age: 35, place: 'Perambalur' },
                { name: 'Srini', age: 55, place: 'chennai' }
            ];
            return expect(res).toEqual(exp);
        });
        it('It should be order by Age Asc', () => {
            let res = list.OrderBy(x => x.age);
            let exp = [
                { name: 'Karthik', age: 28, place: 'Erode' },
                { name: 'Bhubanaganesh', age: 29, place: 'Tanjure' },
                { name: 'Manikandan', age: 31, place: 'Darmapuri' },
                { name: 'Abirami', age: 32, place: 'chennai' },
                { name: 'Rajasekaran', age: 32, place: 'Kottampatti' },
                { name: 'Sakthi', age: 35, place: 'Perambalur' },
                { name: 'Srini', age: 55, place: 'chennai' }
            ];
            return expect(res).toEqual(exp);
        });
        it('It shoud order ', () => {
            let res = list.OrderBy(x => x, (a, b) => {
                return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
            });
            let exp = [
                { name: 'Abirami', age: 32, place: 'chennai' },
                { name: 'Bhubanaganesh', age: 29, place: 'Tanjure' },
                { name: 'Karthik', age: 28, place: 'Erode' },
                { name: 'Manikandan', age: 31, place: 'Darmapuri' },
                { name: 'Rajasekaran', age: 32, place: 'Kottampatti' },
                { name: 'Sakthi', age: 35, place: 'Perambalur' },
                { name: 'Srini', age: 55, place: 'chennai' }
            ];
            return expect(res).toEqual(exp);
        });
    });

    describe('Object Compare Test', () => {
        it('Both object should match', () => {
            let val = { name: 'Natarajan', Age: 30 };
            return expect(val).toEqual({ name: 'Natarajan', Age: 30 });
        });
        it('Both object should not match', () => {
            let val = { name: 'Natarajan', Age: 30 };
            return expect(val).not.toEqual({ name: 'natarajan', Age: 30 });
        });
    });
});
