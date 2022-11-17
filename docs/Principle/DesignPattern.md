# Singleton 패턴
## 정의
- 싱글턴(singleton)은 오직 하나의 객체만을 생성할 수 있는 클래스를 말합니다. 따라서 싱글턴 패턴을 사용하면 쉽게 객체의 유일성을 보장할 수 있습니다.
- 또한 일반적으로 싱글턴 객체에 대한 참조를 public static 필드나 public static 메서드로 노출하므로 어디에서나 싱글턴 객체에 접근할 수 있습니다.
## 구현
### 싱글턴객체 기본 생성법
- public static final을 이용하여 외부에서 자유롭게 접근이 가능하지만 이 필드에 다른 객체가 할당되거나, 이미 할당했는데 싱글턴 내부에서 다시 객체를 할당하는 실수가 없도록 해야됨.
- 그리고 외부에서 생성자를 통해 객체를 생성할 수 없도록 생성자 접근을 private으로 제한
```java
public class Singleton {
public static final Singleton INSTANCE = new Singleton();

	private Singleton() { }
 
	...
}

// 혹은 ...
public class Singleton {
private static final Singleton INSTANCE = new Singleton();

	private Singleton() { }
 
	public static Singleton getInstance() {
		return INSTANCE;
	}
 
	...
}
```

- 다음과 같이 정적필드로 접근 가능

```java
// 생성자의 접근 범위가 private이기 때문에 생성자로는 객체를 생성할 수 없다.
// Singleton obj = new Singleton(); (X)
 
// INSTANCE는 final로 선언되었기 때문에 외부에서 다시 지정하는 것은 불가능하다.
// Singleton.INSTANCE = null; (X)
 
// 외부에서 정적 필드로 다음과 같이 접근할 수 있다.
Singleton.INSTANCE.service();
 
// 혹은...
Singleton obj = Singleton.getInstance();
obj.service();
```
### 지연초기
- 싱글턴 인스턴스를 초기화할때 다음과 같이 지연초기화를 이용하여 처음 한번만 초기화 가능하게 할 수 있다.
```java
public class Singleton {  
    private static Singleton instance;  
  
    private Singleton() { }  
  
    public static Singleton getInstance() {  
        if (instance == null) {  
            instance = new Singleton();  
        }  
        return instance;  
    }  
}
```
- 멀티쓰레드 환경에서 원자성을 위배할 수 있기 때문에 synchronized를 붙여 한번의 하나의 스레드만 접근가능하도록 동기화 하어야 한다.
```java
public class Singleton {  
    private static Singleton instance;  
  
    private Singleton() { }  
  
    public static synchronized Singleton getInstance() {  
        if (instance == null) {  
            instance = new Singleton();  
        }  
        return instance;  
    }  
}
```
- 더블 체크 락킹을 이용하여 동기화 범위를 줄여 동기화 오버헤드를 줄일 수 있다. 여기서 중요한 점은 instance 필드에 값을 쓸 때 재배열이 일어나지 않도록 volatile로 선언하는 것입니다.
```java
public class Singleton {
	private static volatile Singleton instance;
  
    private Singleton() { }  
 
	// 코드가 다소 장황하지만 동기화 오버헤드를 피할 수 있으므로 성능 이점이 있다.
	public static Singleton getInstance() {
		if (instance == null) {
			// 동기화 블록은 한번에 하나의 스레드만 접근할 수 있다.
			synchronized (Singleton.class) {
				if (instance == null) {
					instance = new Singleton();
				}
			}
		}
		return instance;
	}
 
	...
}
```
- 요청 시 초기화 홀더 패턴을 이용하여 간단하게 구현할 수도 있다.
```java
public class Singleton {  
 
    private Singleton() { }
    
    private static final class Holder {  
        private static final Singleton INSTANCE = new Singleton();  
    }  
    
    public static Singleton getInstance() {  
        return Holder.INSTANCE;  
    }
 
	...
}
```
## 싱글턴의 단점
1. 테스트하기가 어렵다
- 테스트는 독립적, 즉 다른 테스트에 영향을 미치지 않아야 하는데 한 테스트에서 싱글턴 객체가 만들어지면 그 이후의 다른 테스트에서도 이를 확인할 수 있다.
- 또한 일반적으로 인터페이스가 아닌 클래스를 통해 구현되는 싱글턴은 목(mock)으로 대체할 수 없으므로 단위 테스트를 매우 까다롭게 만든다.
- 이를 해결하기 위해서 주로 의존관계 주입(dependency injection, 이하 DI)을 사용할 수 있으며 이때는 보통 DI 프레임워크가 싱글턴 객체의 생성을 제어한다.
2. 데이터 경쟁이 일어나기 쉽다
- 싱글턴이 상태를 가지고 있다면 상황이 더 복잡해지며, 멀티 스레드 환경에서는 공유 변수 접근 시 적절하게 동기화가 이루어지지 않았다면 경쟁 상태(race condition)가 문제가 될 수 있으므로 주의해야 합니다.
3. 변경에 취약해진다

# Command 패턴
커맨드 패턴(Command pattern)은 객체가 특정 기능을 바로 수행하거나 나중에 트리거할 때 필요한 모든 정보를 캡슐화하는 행동 패턴이다. 
이렇게 하면, 나중에 순서대로 실행하기 위한 명령 목록을 구성하거나 되돌리기가 가능한 명령을 만드는 등이 가능하다. 커맨드 패턴이 캡슐화하는 정보는 다음과 같다.

- 메서드명
- 메서드를 소유하는 객체
- 메서드 인자(parameter)

## Command 패턴의 구성
![command_pattern.png](../.vuepress/public/images/principle/command_pattern.png)
Invoker 클래스는 Command 인터페이스를 가진 객체의 execute() 메서드를 호출한다. 
사실 이는 ConcreteCommand 클래스의 객체로, execute() 메서드는 실제 작업을 하는 Receiver 클래스의 객체를 호출한다.

- Invoker: 명령이 들어 있으며, execute() 메서드를 호출함으로써 ConcreteCommand 객체에게 특정 작업의 수행을 요청한다.
- Receiver: 요구 사항을 수행하기 위해 어떤 일을 처리해야 하는지 알고 있는 객체다.
- Command: 연산을 수행할 인터페이스를 정의한다. 모든 커맨드 객체는 이 인터페이스를 구현해야 하며, 모든 명령은 execute() 메서드 호출을 통해 수행된다. 이 메서드에서는 Receiver에 특정 작업을 처리하라는 지시를 전달한다.
- ConcreteCommand: 이 클래스는 Command 인터페이스를 확장하고, execute() 메서드를 구현함으로써 Receiver에 있는 메서드를 호출하여 요청된 작업을 수행한다.

## Command 패턴의 장점
- 작업을 요청하는 클래스와 실제로 작업을 수행하는 클래스를 분리한다.
- 기존 코드를 수정하지 않고 새로운 커맨드를 쉽게 추가할 수 있다.
- 정보 시스템의 일반적인 특성은 트랜잭션(transaction)을 처리해야 한다는 것이다. 트랜잭션은 일련의 과정을 통해 데이터를 변경하는 것인데, 커맨드 패턴은 이런 트랜잭션의 모델링을 가능하게 한다

## Command 패턴의 단점
- 모든 작업이 독립적인 ConcreteCommand 클래스이므로 구현 및 유지보수해야 하는 클래스가 많다.
- 단 하나의 커맨드에 대해 클래스가 많아진다.

# Strategy 패턴
# State 패턴
# Adapter 패턴
# Proxy 패턴
# Facade 패턴
# Template Method 패턴
# Decorator 패턴
# Factory Method 패턴
# Abstract Factory 패턴
# Mediator 패턴
# Composite 패턴