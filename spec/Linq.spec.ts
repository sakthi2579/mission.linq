/// <reference path="../src/linq.ts" />

describe('Array', () => {
    let list: Array<number>;
    beforeEach(function () {
        list = [1, 2, 3, 4, 5];
    });

    it('ToList', () => {
        let lst = new Array<number>();
        lst.Add(1);
        lst.Add(2);
        lst.Add(3);

        let exp = [1, 2, 3, 4, 5];

        return expect(exp)
            .toEqual(list);
    });
});
