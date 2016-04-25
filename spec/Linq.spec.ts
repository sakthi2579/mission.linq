/// <reference path="../typings/main.d.ts" />
import {List} from '../src/Linq';

describe('Array', () => {
    let list: Array<number>;
    beforeEach(function () {
        list = [1, 2, 3, 4, 5];
    });

    it('ToList', () => {
        let lst = new List<number>();
        lst.Add(1);
        lst.Add(2);
        lst.Add(3);
        
        let exp = [1, 2, 3, 4, 5]
            .ToList();
        return expect(exp)
            .toEqual(list);
    })
});