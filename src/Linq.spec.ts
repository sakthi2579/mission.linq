///<reference path="./Linq.ts" />
describe('Array', () => {
    let list: Array<number>;
    beforeEach(function () {
        list = [1, 2, 3, 4, 5];
    });

    describe('All', () => {
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
        it('Length should be 6', () => {
            let originalLen = list.length;
            list.Add(6);
            return list.length === originalLen + 1;
        });
        it('Last value shoud be 6', () => {
            list.Add(6);
            var res = list.Last();
            return expect(res).toEqual(6);
        });
    });
    describe('Any', () => {
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
    describe('Skip', () => {
        it('Skip first 2 items - Check Length', () => {
            let res = <Array<number>>list.Skip(2);
            return expect(res.length).toEqual(3);
        });
        it('Skip first 2 items - Check Items', () => {
            let res = <Array<number>>list.Skip(2);
            let val = [3, 4, 5];
            return expect(res).toEqual(val);
        });
    });
    describe('Take', () => {
        it('Take first 3 items - Check Length', () => {
            let res = <Array<number>>list.Take(3);
            return expect(res.length).toEqual(3);
        });
        it('Take first 3 items - Check Items', () => {
            let res = <Array<number>>list.Take(3);
            let val = [1, 2, 3];
            return expect(res).toEqual(val);
        });
    });
    describe('Skip and Take', () => {
        it('Skip first 2 items and take 2 items - Length', () => {
            let res = <Array<number>>list.Skip(2).Take(2);
            return expect(res.length).toEqual(2);
        });
        it('Skip first 2 items and take 2 items - Check Items', () => {
            let res = <Array<number>>list.Skip(2).Take(2);
            let val = [3, 4];
            return expect(res).toEqual(val);
        });
    });
});
