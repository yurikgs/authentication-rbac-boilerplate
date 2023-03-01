const arr = [];
// pushs não alteram a rteferência dos arrays
for (let i = 1; i <= 10; i++) {
  arr.push(i);
}
console.log(arr);
// Deletar um elemento de um array com um delete cria um espaço undefined (empty item), deletar com splice reorganiza o array
// arr.splice(3, 1);
delete arr[3];
delete arr[4];
console.log(arr[3]); // undefined
console.log(arr); // [ 1, 2, 3, <2 empty items>, 6, 7, 8, 9, 10 ]
arr[3] = 4;
arr[4] = 5;

// forma de deletar vários elementos de um array, iterando,por uma regra:
arr.forEach((value, index) => {
  if (value % 2 == 0) {
    arr.splice(index, 1);
  }
});

console.log(arr); //[ 1, 3, 5, 7, 9 ]

arr.splice(0, 5);
for (let i = 1; i <= 10; i++) {
  arr.push(i);
}

// forma correta (filter) - nesse caso, preisamos criar um novo array, pois filter (se fizer com map retornando value ou não retrornando, os valores não retornados ficam undefined):

const newArr = arr.filter((value) => value % 2 != 0);
console.log({ newArr }); //{ newArr: [ 1, 3, 5, 7, 9 ] }

// testing 'map filter' empty return

const config = ' 2 45 3e4 5 t 4.5';
let statusConfigArr = config.split(' ').filter((value) => {
  if (value != '' && !isNaN(Number(value)) && !value.includes('e')) {
    console.log(Number(value));
    return true;
  }
});

console.log({ config: config.split(''), boolean: !!config.split('') });
console.log({ statusConfigArr });

// Estudar isso amanhã :)
const Person = function (firstName) {
  if (!firstName) this.firstName = 'Fulano';
  else this.firstName = firstName;
  // verificar:

  // function sayHello() {
  //   console.log("Hello, I'm " + this.firstName);
  // }
};
Person.sayHello = function () {
  console.log("Hello, I'm " + this.firstName);
};
Person.sayHello(); // Hello, I'm undefined
Person.firstName = 'Função';
Person.sayHello(); // Hello, I'm Função
const person = new Person('joao');
// person.sayHello()  --> retorna erro, pq a função está definida apenas na função construtora

// teste de função que remove duiplicidade
statusConfigArr = ['200', '201', '202', '200', '204'];
const notRepeatedElementsArr = [];
statusConfigArr = statusConfigArr.filter((code) => {
  if (!notRepeatedElementsArr.includes(code)) {
    console.log('not included: ', code);
    notRepeatedElementsArr.push(code);
    return true;
  }
  return false;
});

console.log('STATUS CONFIG ARR:', statusConfigArr);

// {
//   statusConfigArr: [],
//   basicDefaults: undefined,
//   detailedDefaults: [ { status: 200 } ]
// }
// { statusConfigArr: [ [ 200 ] ] }
// {
//   statusConfigArr: [],
//   basicDefaults: {
//     config: '200 400 401 403 408 500',
//     mode: 1,
//     statusCodes: [ 200, 401, 403 ]
//   },
//   detailedDefaults: [
//     { status: 200, description: 'Ok', model: [class UserModel] },
//     { status: 400, description: 'Bad Request' },
//     { status: 401 }
//   ]
// }
// {
//   statusConfigArr: [
//     [ 408 ],
//     [ 500 ],
//     [ 200, 'Ok', [class UserModel] ],
//     [ 400, 'Bad Request' ],
//     [ 401 ]
//   ]
// }
