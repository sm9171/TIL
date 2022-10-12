https://martinkim1954.tistory.com/entry/SOLID-%EC%9B%90%EC%B9%99%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC
> SOLID 원칙
> 1. S: 단일 책임 원칙, Single Responsibility Principle
> 2. O: 개방 폐쇄 원칙, Open-Closed Principle
> 3. L: 리스코프 치환 원칙, Liskov Substitution Principle
> 4. I: 인터페이스 분리 원칙, Interface Segregation Principle
> 5. D: 의존관계 역전 원칙, Dependency Inversion Principle

### 단일 책임 원칙(SRP)
클래스는 오직 `하나의 기능`을 가져야 한다. 클래스를 설계할 때, 연관 있는 기능들을 묶으려고 해야 한다. 그래야 하나가 수정될 때, 같은 이유로 수정이된다. 그리고 다른 이유로 수정이 각각 되어야 한다면 기능들을 분리하려고 해야한다.

```java
// 수정 전 메소드
class Animal {
   constructor(name:string) {}
   getAnimalName() {}
   saveAnimal(a:Animal) {}
}
```
수정 전 메소드는 동물 데이터베이스 관리 ,동물 개체 관리 두개의 책임을 가지고 있다.
```java
// 수정 후 메소드
class Animal {
   class Animal {
      constructor(name:string) {}
      getAnimalName() {}
   }

   class AnimalDB {
      getAnimal(a:Animal) {}
      saveAnimal(a:Animal) {}
   }
}
```
다음과 같이 동물 저장하는 책임을 갖는 도 다른 클래스를 만들어서 분리한다.

### 개방 폐쇄 원칙 (OCP)
소프트웨어 엔티티(클래스, 모듈, 함수)는 `확장엔 열려` 있어야 하지만, `수정엔 닫혀` 있어야 한다.
OCP를 적용하는 방법은 크게 `상속`과 `컴포지션`이 있다.
컴포지션을 이용하여 전략패턴으로 OCP 원칙을 구현해본다.

- 변경이 필요한 부분을 TranHistoryStrategy 인터페이스로 분리
- UserAccountCreditService는 TranHistoryStrategy 인터페이스에 의존
```java
@Service
public class UserAccountCreditService {
   private final TranHistoryStrategy tranHistoryStrategy;  // 인터페이스
    ...
            ...
   public UserTranDto.Response tranHistroy(final String userId, final UserTranDto.Request request, final PageRequest pageable) {
      // 로직
        ...
      // 인터페이스의 의존
      final List<UserTranDto.UserTran> userTranList = tranHistoryStrategy.findTranHistory(mockUserId, request);
        ...
      return userTranList;
   }
}
```

```java
@Component
public interface TranHistoryStrategy {
   List<UserTranDto.UserTran> findTranHistory(final String userId, final UserTranDto.Request request);
}
```

```java
public class ElasticsearchTranHistoryFinder implements TranHistoryStrategy {
   private final ElasticsearchConfig elasticsearchConfig;
   public ElasticsearchTranHistoryFinder(final ElasticsearchConfig elasticsearchConfig) {
      this.elasticsearchConfig = elasticsearchConfig;
   }

   @Override
   public List<UserTranDto.UserTran> findTranHistory(final String userId, final UserTranDto.Request request) {
      // 구현 로직
      final List<UserTranDto.UserTran> userTranList = new ArrayList<>();
        ...
      return userTranList;
   }
}
```
이렇게 인터페이스로 의존주입해서 사용하면 단위테스트할때도 편리하다.

### 리스코프 치환 원칙 (LSP)