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

- 다응과 같이 정적필드로 접근 가능

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