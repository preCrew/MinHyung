# This란 무엇인가?
다른 언어에서 this는 보통 클래스에서 사용되고 자기 자신을 가리킨다.
하지만 javascript에서 this는 실행컨텍스트가 생성될 때 결정된다.
즉, 함수가 호출될 때 this가 결정된다고 보면 된다.

# c++에서 this는?
c++을 보면 this가 가리키는 값은 명확하다.
```cpp
class MyTest {
	private int val;
    MyTest(int val) {
    	// 여기서 가리키는 this는 생성한 인스턴스 MyTest를 가리킨다.
    	this.val = val;
    }
}
```
# 그럼 javascript에서 this는?
자바스크립트는 클래스 뿐만 아니라 코드의 어디서든 this를 사용할 수 있다.
그래서 여러가지 상황에 따라 this가 가리키는 값이 달라지기 떄문에 큰 혼란이 생긴다.
this가 달라지는 상황은 아래 상황으로 나뉜다.

1. 전역환경에서 this
2. 함수, 메소드 내부에서 this
3. 콜백함수 내부에서 this
4. 생성자 함수 내부에서 this

## 1. 전역 환경에서의 this
전역환경에서 this는 전역환경을 가리킨다.
처음 전역 컨텍스트가 L.E를 구성할 때 L.E는 전역환경을 참조하고 전역환경은 전역객체를 참조한다.
`전역환경의 L.E` -> `GlobalEnv` -> `전역객체`
즉, 전역변수를 선언하면 자바스크립트 엔진은 이를 전역객체의 프로퍼티로 할당한다.

그래서 아래의 결과도 true를 보인다.
```javascript
var a = 1;
console.log( this.a === window.a ); //true
console.log( this.a === a ); // true
```
왜냐하면 자바스크립트에서 변수를 선언하면 이는 특정 객체의 프로퍼티로 인식되기 때문이다.
위의 경우 전역객체의 프로퍼티로 할당된다. 그래서 `a`, `this.a`, `window.a`의 값이 같다.

하지만 다른경우가 하나 존재한다.
`delete`로 해당 변수를 지울 때인데
```javascript
var a = 1;
delete a;
console.log(a); // 1

this.b = 1;
delete b;
console.log(b); // Uncaught ReferenceError: b is not defined
```
그냥 전역변수로 선언하면 delete가 작동하지 않지만 
this.b로 전역객체의 프로퍼티로 선언하면 delete가 작동하는 모습을 볼 수있다.
왜냐하면 전역변수로 선언하면 configurable을 false로 정의하기 때문이다.

## 2. 함수, 메소드 내부에서의 this
```javascript
function first() {
  console.log(this); // window {...}
}
first(); 

const some = {
  func: first,		// some{...}
}
some.func();
```
처음 first()를 호출할 때는 this는 window를 가리킨다는게 예상이 된다.
some.func()를 호출할 떄도 window를 가리킬줄 알았지만 some객체를 가리킨다.

왜냐하면 this에는 호출한 주체에 대한 정보가 담기고, 주체가 없다면 전역환경이 담기기 때문이다.
그래서 그냥 first()를 호출하면 호출하는 주체 없이 바로 실행 했기때문에 window가 담기고
some.func()을 호출하면 호출한 주체가 some이기 때문에 some의 정보가 담기게 된다.
```javascript
const some = {
  func1: function() {
    console.log(this);	// some{...}
  },
  inSome: {
    func2: function() {
      console.log(this);// inSome{...}
    }
  }
}
some.func1();
some.inSome.func2();
```
some.func1()을 호출하면 주체는 some이기 때문에 some의 정보가 담기고
some.inSome.func2()를 호출하면 호출 주체는 inSome이기 때문에 inSome의 정보가 담긴다.
호출한 주체가 어떤 객체인지 모르겠다면 `.` 왼쪽에 있는 객체가 this가 된다고 생각하면 된다.

또다른 예제다
```javascript
const some = {
  inSome: {
    func1: function() {
      console.log(this);	// inSome{...}
      
      function func2() {
        console.log(this);	// window {...}
      }
      func2();
      
      const obj = {
        func3: function() {
          console.log(this);// obj{...}
        }
      }
      obj.func3();
    }
  }
}
some.inSome.func1();
```
func2()는 함수로 호출했기 때문에 this는 전역객체를 가리키고
some.inSome.func1()은 inSome의 메소드로 호출됐기 때문에 inSome을 가리키고
obj.func3()은 obj의 메소드로 호출됐기 때문에 obj를 가리킨다.

### 메소드 함수 내부에서 상위 환경을 바라보는 방법
만약 메소드 내부의 함수에서 this를 window가 아닌 상위의 this를 바라보고싶다면 
arrow function을 사용하면 된다.
```javascript
const some = {
  inSome: {
    func1: function() {
      console.log(this);	// inSome{...}
      
      const func2 = () => () {
        console.log(this);	// inSome{...}
      }
      func2();
    }
  }
}
some.inSome.func1();
```
이게 가능한 이유는 화살표 함수는 실행 컨텍스트를 생성할 때 this 바인딩을 하지 않기 때문이다.
그래서 Outer Environment Reference를 따라 올라가 위에있는 환경을 참조하게된다.

### 함수, 메소드 내부에서 this 정리
1. 함수로 호출되면 this는 전역환경을 가리킨다.
2. 메소드로 호출되면 `.` 왼쪽의 객체를 가리킨다.
3. 메소드 내부의 함수에서 상위의 환경을 바라보고싶으면 화살표 함수를 사용하면 된다.

## 3. 콜백함수 내부에서 this
기본적으로 콜백함수에서도 this는 전역객체를 가리킨다.
하지만 콜백함수를 받는 함수에서 콜백함수에 this를 별도로 지정하면 해당 대상을 참조한다.
```javascript
function callback() {
  console.log(this);
}
setTimeout(callback, 100);// window{...}
```
하지만 아래의 경우 addEventListener가 this에 클릭한 element를 지정했기 때문에
btn 이란 아이디를 가진 버튼을 클릭하면 해당 element가 this로 참조된다.
```html
<body>
  <button id="btn">버튼</button>
  <script>
    const btn = document.getElementById("btn");
    btn.addEventListener("click", function() {
	    console.log(this); //<button id="btn">버튼</button>
    });
  </script>
</body>
```
## 4. 생성자 함수 내부에서 this
자바스크립트는 함수로 인스턴스 생성이 가능하다.
생성자 함수로 인스턴스를 만들경우 내부의 this는 클래스와 마찬가지로 자기 자신이 된다.
```javascript
const People = function(name, age) {
  this.name = name;
  this.age = age;
  this.print = function() {
    console.log(`이름: ${this.name}, 나이: ${this.age}`);
  }
}
const me = new People("song", 27);
me.print();
```
위의 예제를 보면 this는 People 내부를 가리키는걸 알 수 있다.

# this를 바인딩 하는방법
## call()을 사용한다
call()은 프로토타입의 메소드다.
call 메소드는 매개변수로 넘어오는 객체를 this로 지정한다.
두번째 이후의 매개변수를 모두 호출할 함수의 매개변수로 할당한다.
```javascript
const func = function(a,b){
  console.log(this, a, b);
}
func(3,4);					// window{...} 3 4
func.call({a: 1, b: 2},3,4);// {a: 1, b: 2} 3 4
```
## apply()를 사용한다
apply() 역시 프로토타입의 메소드다.
apply 메소드는 call 메소드와 동일하지만 두번째 매개변수를 배열로 받아서 
호출할 함수의 매개변수로 할당해준다.
```javascript
const func = function(a,b){
  console.log(this, a, b);
}
func.apply({a: 1, b: 2}, [3,4]);// {a: 1, b: 2} 3 4
```
## bind()를 사용한다
ES5에 추가된 기능인데 call과 비슷하지만 함수를 호출하지 않고 
넘겨받은 this, 인수를 바탕으로 새로운 함수를 반환하는 함수이다.
```javascript
const func = function(a,b) {
  console.log(this, a, b);
}
func(1,2);	 // window{...} 1 2
const binding = func.bind({x: 1});
binding(3,4);// {x: 1} 3 4
```
# 정리
- this란 해당 함수의 실행 컨텍스트가 활성화 될 때 함수를 호출하는 주체이다.
- 호출하는 주체가 없다면 this는 전역 환경을 참조한다.
- 콜백함수의 경우 콜백함수를 받는 함수에서 this를 정의할 수 있다. 
정의되지 않은경우 전역객체를 참조한다.
- 명시적으로 this를 바인딩 하려면 call, apply, bind 함수를 사용하면 된다.

