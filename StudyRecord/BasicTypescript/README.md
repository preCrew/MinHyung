# 목차
0. [타입스크립트 넌 누구니?](README.md)
1. [기본타입](01.%20기본타입.md)
2. [함수](02.%20함수.md)
3. [인터페이스](03.%20인터페이스.md)
4. [열거형(Enum)](04.%20열거형(Enum).md)
5. [연산자를 이용한 타입 정의](05.%20연산자를%20이용한%20티입정의.md)
6. [클래스](06.%20클래스.md)
7. [제네릭](07.%20제네릭.md)
8. [타입추론](08.%20타입추론.md)
9. [타입호환](09.%20타입호환.md)

# 타입스크립트 넌 누구니?
- 타입스크립트는 마이크로소프트에서 개발한 슈퍼셋 프로그래밍 언어이다.
- 다른말로 자바스크립트의 문법에 타입스크립트의 문법을 얹은 언어이다.
- 즉, `자바스크립트 ⊂ 타입스크립트` 이다.

기존 자바스크립트에 타입만 추가되었기 때문에 러닝커브가 매우 낮다.  
이미 자바스크립트를 잘 알고있다면 며칠이면 배울 수 있다고 생각하다.

# 타입스크립트를 쓰는이유
기존에 자바스크립트로 개발을 진행하면 자동완성이 안돼서 매우 화가 난다 !!😡😡  
그리고 모든 변수의 타입이 any라서 디버깅하기 까다롭기도 했다.

하지만 타입스크립트를 쓰면 자바스크립트에 비해 가독성이 안좋아진다고 해도  
위에서 말한 두가지 문제를 해결할 수 있고, 에러도 사전에 방지할 수 있기 때문에  
단점보다 장점이 더 많다고 본다.

또, 프로젝트 규모가 작다면 자바스크립트로 충분할지 몰라도 규모가 커질수록  
타입스크립트가 가진 타입이라는 장점이 더더욱 부각될것이다.

## 예시
위에서 말 안한게 있는데 타입스크립트에선 강력한 타입추론과 타입 단언도 가능하다  
뒤에서 또 나올거라 생각하기 때문에 여기서 설명하지는 않겠다.

## 에러를 사전에 방지해줌
```javascript
function addNumber(a, b) {
    return a + b;
}
```
함수 이름에서 보면 알 수 있듯 이 함수는 숫자 두개를 더하는 함수다  
아래와 같은 값들을 넣으면 어떻게 작동할까?  
```javascript
const result1 = addNumber("1", 2);
const result2 = addNumber(1, true);
```
result1은 `12` result2는 `2` 가 나오게 된다.
자바스크립트는 매개변수 a, b가 어떤 타입이 들어올지 모르기 때문에 생기는 현상이다.  
타입스크립트는 매개변수의 타입을 지정해줘서 위와같은 실수를 방지할 수 있다.  
```typescript
function addNumber(a: number, b: number): number {
    return a + b;
}
```
이렇게 매개변수와 리턴타입이 뭔지 사전에 미리 정해둘수가 있다.  
만약 리턴타입을 생략한다면 타입스크립트가 알아서 적절하게 추론해준다.  

그래서 타입스크립트에서 위와같이 result1, result2를 할당해준다면  
컴파일 전에 `"1"` 과 `true`는 `number`형식이 아니라고 아래처럼 에러를 뱉어낸다.  

<img src="https://velog.velcdn.com/images/song961003/post/3a502d32-1287-4f0e-84bc-0e34bd2bb516/image.png" width="1024px">
<img src="https://velog.velcdn.com/images/song961003/post/9777e099-4796-4eb1-a07e-7c772c06e3fc/image.png" width="1024px">  


## 자동완성이 편함
또 자바스크립트랑 비교할건데 자바스크립트에서 매개변수로 넘어온 값은 any다.  
그래서 얘가 무슨 타입인지 추론이 불가능하다. 하지만 타입스크립트는 타입을 알고있기 때문에 가능하다😎
```javascript
function sumNumber(sumList) {
    return sumList. //요기 이부분에서 자바스크립트는 자동완성이 불가능하다
}
```
```typescript 
function sumNumber(sumList: number[]) {
    return sumList. // 하지만 타입스크립트는 sumList가 number로 이뤄진 배열이란걸 알고있다.
                    // 그렇기 때문에 배열객체의 메소드 push, join, slice등을 사용할 수 있다.
}
```

또다른 예시로는 객체의 자동완성이 있다.
```javascript
function getIdList(bigObject) {
    return bigObject. // 자바스크립트는 역시나 이게 무슨 타입인지 모른다.
                      // 그래서 아무런 자동완성도 뜨지 않는다.
}
```
```typescript
type TBigObject = {
    nicknames: number[];
    ids: number[];
}
function getIdList(bigObject: TBigObject) {
    return bigObject .  // 하지만 타입스크립트는 bigObject의 타입을 모두 알고있다.      
                        // 그래서 자동완성으로 nicknames와 ids를 보여준다.
}
```