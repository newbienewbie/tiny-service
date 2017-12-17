const assert=require('assert');
const helper=require('../lib/helper');


describe('test helper.js',function(){

    describe('test #deepcopy()',function(){

        it('should deep equal',function(){
            const s={
                x1:{
                    b1:[ {x:' a test'} ],
                },
            };
            const new_s=helper.deepcopy(s);
            assert.deepEqual(s,new_s,"should deep equal");
        });

    });


    describe('test #toIntegerGreaterThan()',function(){
        it('test with gt',function(){
            const test_cases=[
                { s:10,gt:6,expected:10 },
                { s:5,gt:6,expected:7 },
                { s:-1,gt:6,expected:7 },
                { s:-1,gt:-1,expected:0 },
            ];;
            test_cases.forEach(c=>{
                const {s,gt,expected}=c;
                const result=helper.toIntegerGreaterThan(s,gt);
                const tips=`should return ${expected}`;
                assert.equal(result,expected,tips);
            });
        });
        it('test default gt',function(){
            const test_cases=[
                { s:10,expected:10},
                { s:1,expected:1},
                { s:0,expected:1},
                { s:-1,expected:1},
            ];;
            test_cases.forEach(c=>{
                const {s,expected}=c;
                const result=helper.toIntegerGreaterThan(s);
                const tips=`should return ${expected}`;
                assert.equal(result,expected,tips);
            });
        });
    });


    describe('test #message()',function(){
        const {info,success,fail}=helper.message;
        describe('test info()',function(){
            it('should deepEqual',function(){
                const test_cases=[
                    { status:'done',msg:'hello,world',expected:{status:'done',msg:'hello,world'}, },
                    { status:'FAIL',msg:'foo',expected:{status:'FAIL',msg:'foo'}, },
                    { status:'SUCCESS',msg:'bar',expected:{status:'SUCCESS',msg:'bar'}, },
                ];
                test_cases.forEach(c=>{
                    const {status,msg,expected}=c;
                    const result=info(status,msg);
                    const tips=`should return ${expected.toString()} `;
                    assert.deepEqual(result,expected,tips);
                });
            });
            it('should not deepEqual',function(){
                const test_cases=[
                    { status:'done',msg:'hellO,wOrld',expected:{status:'done',msg:'hello,world'}, },
                    { status:'FAIL',msg:'fOo',expected:{status:'FAIL',msg:'foo'}, },
                    { status:'SUCCESS',msg:'bar',expected:{status:'SUCCESS',msg:'BAR'}, },
                ];
                test_cases.forEach(c=>{
                    const {status,msg,expected}=c;
                    const result=info(status,msg);
                    const tips=`should return ${expected.toString()} `;
                    assert.notDeepEqual(result,expected,tips);
                });
            });

        });

        describe('test success()',function(){
            it('should deepEqual',function(){
                const test_cases=[
                    { msg:'hello,world',expected:{status:'SUCCESS',msg:''}, },
                    { msg:'foo',expected:{status:'SUCCESS',msg:''}, },
                    { msg:'bar',expected:{status:'SUCCESS',msg:''}, },
                ];
                test_cases.forEach(c=>{
                    const {msg,expected}=c;
                    const result=success(msg);
                    const tips=`should return ${expected.toString()} `;
                    assert.deepEqual(result,expected,tips);
                });
            });
        });
        describe('test fail()',function(){
            it('should deepEqual',function(){
                const test_cases=[
                    { msg:'hello,world',expected:{status:'FAIL',msg:'hello,world'}, },
                    { msg:'foo',expected:{status:'FAIL',msg:'foo'}, },
                    { msg:'bar',expected:{status:'FAIL',msg:'bar'}, },
                ];
                test_cases.forEach(c=>{
                    const {msg,expected}=c;
                    const result=fail(msg);
                    const tips=`should return ${expected.toString()} `;
                    assert.deepEqual(result,expected,tips);
                });
            });
        });
    });

});