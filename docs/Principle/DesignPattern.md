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

# Strategy 패턴
# State 패턴
# Command 패턴
# Adapter 패턴
# Proxy 패턴
# Facade 패턴
# Template Method 패턴
# Decorator 패턴
# Factory Method 패턴
# Abstract Factory 패턴
# Mediator 패턴
# Composite 패턴