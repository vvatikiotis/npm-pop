import _ from 'underscore';

var arr = [1, 2, 3],
    newArr = _.map(arr, (el) => {
        return el * 5;
    });

console.log(newArr);
