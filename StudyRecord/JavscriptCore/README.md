# 목차
1. [메모리](메모리.md)
2. [실행컨텍스트](실행컨텍스트.md)
3. [This](This.md)
4. [이벤트루프](이벤트루프.md)

# 자바스크립트를 다시 공부하게된 계기
지금까지 자바스크립트 혹은 타입스크립트를 써 개발을 할 때 에러가 발생하면 구글링을 통해 그걸 해결했다.  
하지만 그게 왜 문제가 돼서 에러가 발생하는지에 대한 이유를 깊이 생각해본적이 없던것같다.  
그렇게 계속 개발을 하다보니 왜 자바스크립트가 그렇게 동작하는지에 대해는 생각도 안해봤다.  
계속 자바스크립트를 쓰고 있었는데도 말이다.  

그래서 자바스크립트를 다시 기초부터 공부하게 됐다.  
물론 타입스크립트도 같이!

# 자바스크립트란?
자바스크립트는 이렇게 설명할 수 있다. `프로토타입 기반의 인터프리터 언어`  
일급함수를 지원하고, 웹브라우저뿐 아니라 브라우저 환경이 아닌곳에서도 사용하는 언어이다.  

`Java`와 관련이 1도 없지만 `Java` `Script`인 이유가 웃기다.  
그 당시 제일 핫하던 언어인 `Java`의 인기에 편승하기 위해서라고 알고있다.  

`Javascript` 처음 이름은 `Mocha`였다가 몇달만에 `LiveScript`로 개명되고  
다시 몇달 후 `Javascript`로 개명되어 `Javascript`로 쓰이고 있다.  

근데 여기서 파생된 언어들은 호환성의 문제가 심했었다.  
그래서 이를 표준화 하기 위해 `ECMA International`에 JS기술 규격을 제출했다.  
그 이름은 `ECMA Script`다. 스펙은  [ECMA-262](https://www.ecma-international.org/ecma-262/8.0)(언어 사양), [ECMA-402](https://www.ecma-international.org/publications-and-standards/standards/ecma-402/)(국제화 API 사양)에 기술되어있다.  
> 흔히 부르는 ES5, ES6가 ECMA Script의 약자인것이다.

# 자바스크립트가 하는일
페이지를 보다 생동감 있게 해준다.  
만약 자바스크립트가 없다면 그냥 글을 읽고, 페이지만 넘어갈 수 있을거다.  
하지만 자바스크립트가 있기 때문에 상상하는 모든 기능을 구현할 수 있다.

예를들면 아래같이 버튼을 누르면 입력한 값을 위에 똑같이 적어주는 간단한 기능도 자바스크립트가 필요하다.
```html
<input type="text" id="inputText">
<p id="outputText"></p>
```
```javascript
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");

inputText.addEventListener('keydown', (e) => {
    outputText.textContent = e.target.value;
});
```
- 위 코드는 `<input>`에 입력되는 값이 실시간으로 `<p>` 에 출력된다.

