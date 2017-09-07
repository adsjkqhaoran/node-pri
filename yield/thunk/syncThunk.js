let gen = function*(a){
    console.log(a);
    let step1 = yield parseInt(a)+2;
    console.log(`${step1}`);
    let step2 = yield step1 + 5;
    console.log(step2);
}
let loop = gen(1);

    function step(){
        let temp = loop.next();
        while(!temp.done){
           temp = loop.next(temp.value);
        }
    }
step();