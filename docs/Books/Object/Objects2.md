# 2장 객체지향 프로그래밍

## 1. 영화 예매 시스템
1. 영화 예매 시스템에는 크게 예매, 영화, 상영, 할인조건, 할인 정책으로 객체를 나누어 볼 수 있다.
2. 영화별로 하나의 할인 정책만 할당할수 있고 할인 조건은 여러개 적용이 가능하다.

## 2. 객체지향 프로그래밍을 향해

### 협력, 객체 클래스
프로그래밍을 하는 동안 다음의 두가지에 집중해야 한다.
1. 어떤 클래스가 필요한지를 고민하기 전에 어떤 객체들이 필요한지 고민하라.
2. 객체를 독립적인 존재가 아니라 기능을 구현하기 위해 협력하는 공동체의 일원으로 봐야 한다.

### 도메인의 구조를 따르는 프로그램 구조
클래스의 구조는 도메인의 구조와 유사한 형태를 띄어야한다.

### 클래스 구현하기
1. 인스턴스 변수의 가시성은 private이고 메서드의 가시성은 public이다.
2. 클래스는 내부와 외부로 구분되며 훌륭한 클래스를 설계하기 위한 핵심은 어떤 부분을 외부에 공개하고 어떤 부분을 감출지를 결정하는 것이다. 
3. 두 가지 중요한 사실을 알아야 한다. 첫 번째 사실은 객체가 `상태`와 `행동`을 함께 가지는 복합적인 존재라는 것이다. 두 번째 사실은 객체가 스스로 판단하고 행동하는 `자율적인 존재`라는 것이다.
4. 객체라는 단위 안에 데이터와 기능을 한 덩어리로 묶는 것을 `캡슐화`라고 한다.
5. `접근 제어`를 위해 public, protected, privater과 같은 `접근 수정자`를 제공한다.
6. 캡슐화와 접근 제어는 객체를 두 부분으로 나눈다.
   1. 외부에서 접근가능한 `퍼블릭 인터페이스`
   2. 내부에서만 접근 가능한 `구현`
7. 프로그래머의 역할을 `클래스 작성자`와 `클라이언트 프로그래머`로 구분하는 것이 유용하다. 클래스 작성자는 새로운 데이터 타입을 프로그램에 추가하고, 클라이언트 프로그래머는 클래스 작성자가 추가한 데이터 타입을 이용한다.
8. 클라이언트 프로그래머는 숨겨 놓은 부분에 마음대로 접근할 수 없도록 방지하는데 이를 `구현은닉` 이라고 부른다.

### 협력하는 객체들의 공동체
의미를 좀 더 명시적이고 분명하게 표현할 수 있다면 객체를 사용해서 해당 개념을 구현하라.
시스템의 어떤 기능을 구현하기 위해 객체들 사이에 이뤄지는 상호작용을 `협력`이라고 부른다.

### 협력에 관한 짧은 이야기
1. 객체는 다른 객체의 인터페이스에 공개된 행동을 수행하도록 `요청` 할 수 있다. 요청을 받은 객체는 자율적인 방법에 따라 요청을 처리한 후 `응답`한다.
2. 객체가 다른 객체와 상호작용할 수 있는 유일한 방법은 `메시지를 전송`하는 것 뿐이다. 다른 객체에게 요청이 도착할 때 해당 객체가 `메시지를 수신`했다고 이야기 한다.
3. 메시지를 수신한 객체는 스스로의 결정에 따라 자율적으로 메시지를 처리할 방법을 결정하는데 이것을 `메서드`라고 부른다.
4. 메시지와 메서드의 구분에서부터 `다형성`의 개념이 출벌한다.

## 3. 할인 요금 구하기
### 할인 요금 계산을 위한 협력 시작하기, 할인 정책과 할인 조건

이 코드에는 상속과 다형성이 있다. 그리고 그 기반에는 추상화라는 원리가 숨겨져 있다.
```java
public class Movie {
   private String title;
   private Duration runningTime;
   private Money fee;
   private DiscountPolicy discountPolicy;

   public Movie(String title, Duration runningTime, Money fee, DiscountPolicy discountPolicy) {
      this.title = title;
      this.runningTime = runningTime;
      this.fee = fee;
      this.discountPolicy = discountPolicy;
   }
   
   public Money getFee() {
      return fee;
   }

   public Money calculateMovieFee(Screening screening) {
      return fee.minus(discountPolicy.calculateDiscountAmount(screening));
   }
}

```

DiscountPolicy의 인스턴스를 추상클래스로 구현하였다.
DiscountPolicy는 할인 여부와 요금 계산에 필요한 전체적인 흐름은 정의하지만 실제로 요금을 계산하는 부분은 추상 메서드인 getDiscountAmount 메서드에게 위임한다.
이처럼 부모 클래스에 기본적인 알고리즘의 흐름을 구현하고 중간에 필요한 처리를 자식 클래스에게 위임하는 디자인 패턴을 TEMPLATE METHOD 패턴이라고 부른다.

```java
public abstract class DiscountPolicy {
   private List<DiscountPolicy> conditions = new ArrayList<>();

   public DiscountPolicy(DiscountCondition... conditions) {
      this.conditions = Arrays.asList(conditions);
   }

   public Money calculateDiscountAmount(Screening screening) {
      for (DiscountPolicy each : conditions) {
         if (each.isSatisfiedBy(screening)) {
            return getDiscountAmount(screening);
         }
      }
      return Money.ZERO;
   }

   abstract protected Money getDiscountAmount(Screening screening);
}
```

DiscountCondition은 자바의 인터페이스를 이용해 선언돼 있다.

```java
public interface DiscountCondition {
   boolean isSatisfiedBy(Screening screening);
}
```

영화 예매 시스템에는 순번조건과 기간 조건의 두가지 할인 조건이 존재한다.

```java
// 순번 조건
public class SequenceCondition implements DiscountCondition {
    private int sequence;

   public SequenceCondition(int sequence) {
      this.sequence = sequence;
   }

   public boolean isSatisfiedBy(Screening screening) {
      return screening.isSequence(sequence);
   }
}
```

```java
// 기간 조건
public class PeriodCondition implements DiscountCondition {
   private int sequence;

   public SequenceCondition(int sequence) {
      this.sequence = sequence;
   }

   public boolean isSatisfiedBy(Screening screening) {
      return screening.isSequence(sequence);
   }
}
```

```java
public class AmountDiscountPolicy extends DiscountPolicy {
   private Money discountAmount;

   public AmountDiscountPolicy(Money discountAmount, DiscountCondition... conditions) {
      super(conditions);
      this.discountAmount = discountAmount;
   }

   @Overide
   protected public Money getDiscountAmount(Screening screening) {
      return discountAmount;
   }
}
```

```java
public class PercentDiscountPolicy extends DiscountPolicy {
   private double percent;

   public PercentDiscountPolicy(double percent, DiscountCondition... conditions) {
      super(conditions);
      this.percent = percent;
   }

   @Overide
   protected public Money getDiscountAmount(Screening screening) {
      return screening.getMovieFee().times(percent);
   }
}
```

### 할인 정책 구성하기
Movie 생성자는 하나의 DiscountPolicy 클래스 인스턴스만 받지만, DiscountPolicy 생성자는 여러 개의 DiscountPolicy 클래스 인스턴스를 받는다.
이처럼 생성자의 파라미터 목록을 이용해 초기화에 필요한 정보를 전달하도록 강제하면 올바른 상태를 가진 객체의 생성을 보장할 수 있다.

## 4. 상속과 다형성

### 컴파일 시간 의존성과 실행 시간 의존성
1. 코드의 의존성과 실행 시점의 의존성이 서로 다를 수 있다. 객체와 클래스가 다르듯이.
2. 설계가 유연해질수록 코드를 이해하고 디버깅하기는 어려워지고 반면 유연성을 억제하면 코드를 이해하고 디버깅하기는 쉬워지지만 재사용성과 확장 가능성은 낮아진다는 사실도 기억하라.

### 차이에 의한 프로그래밍
상속은 객체지향에서 코드를 재사용하기 위해 가장 널리 사용되는 방법이다. 
상속을 이용하면 클래스 사이에 관계를 설정하는 것만으로 기존 클래스가 가지고 있는 모든 속성과 행동을 새로운 클래시에 포함시킬 수 있다.

부모 클래스와 다른 부분만을 추가해서 새로운 클래스를 쉽고 빠르게 만드는 방법을 `차이에 의한 프로그래밍`이라고 부른다.

### 상속과 인터페이스
자식 클래스는 부모 클래스가 수신할 수 있는 모든 메시지를 수신할 수 있기 때문에 외부 객체는 자식 클래스를 부모 클래스와 동일한 타입으로 간주할 수 있다.
자식 클래스가 부모 클래스를 대신하는 것을 업캐스팅이라고 부른다.

### 다형성
객체에서 동일한 메시지를 전송하지만 실제로 어떤 메서드가 실행될 것인지는 메시지를 수신하는 객체의 클래스가 무엇이냐에 따라 달라진다. 이를 다형성이라고 한다.
다형성이란 동일한 메시지를 수신했을 때 객체의 타입에 따라 다르게 응답할 수 있는 능력을 의미한다. 따라서 다형적인 협력에 참여하는 객체들은 모두 같은 메시지를 이해할 수 있어야한다.(인터페이스)

메시지와 메서드를 실행 지점에 바인딩 하는것을 지연 바인딩 혹은 동적 바인딩 이라고 부르고 이에 반해 함수 호출처럼 컴파일 시점에 실행될 함수나 프로시저를 결정하는 것은 초기 바인딩 또는 정적 바인딩이라고 한다.

## 5. 추상화와 유연성
### 추상화의 힘
추상화의 장점
1. 추상화의 계층만 따로 떼어 놓고 살펴보면 요구사항의 정책을 높은 수준에서 서술할 수 있다는 것이다.
   1. 추상화를 사용하면 세부적인 내용을 무시한 채 상위 정책을 쉽고 간단하게 중요한 개념만으로 표현할 수 있다.
   2. 추상화를 이용해 상위 정책을 기술한다는 것은 기본적인 애플리케이션의 협력 흐름을 기술한다는 것을 의미한다.
2. 추상화를 이용하면 설계가 좀 더 유연해진다는 것이다.
   1. 추상화를 이용해 상위 정책을 표현하면 기존 구조를 수정하지 않고도 새로운 기능을 쉽게 추가하고 확장할 수 있다.

### 유연한 설계

```java
public class Movie {
   public Money calculateMovieFee(Screening screening) {
      if (discountPolicy == null) {
		  return fee;
      }

      return fee.minus(discountPolicy.calculateDiscountAmount(screening));
   }

}
```

책임의 위치를 결정하기 위해 조건문을 사용하는 것은 협력의 설계 측면에서 대부분의 경우 좋지 않은 선택이다.

```java
public class NoneDiscountPolicy extends DiscountPolicy {
   @Override
   protected Money getDiscountAmount(Screening screening) {
	   return Money.ZERO;
   }
}
```

이제 Movie 인스턴스에 NoneDiscountPolicy의 인스턴스를 연결해서 할인되지 않는 영화를 생성할 수 있다.

```java
Movie starWars = new Movie("스타워즈",
        Duration.ofMinutes(210),
        Money.wons(10000),
        new NoneDiscountPolicy());
```

Movie와 DiscountPolicy는 수정하지 않고 NoneDiscountPolicy라는 새로운 클래스를 추가하는 것만으로 애플리케이션의 기능을 확장했다.

### 추상 클래스와 인터페이스 트레이드오프

NoneDiscountPolicy 클래스에서 getDiscountAmount() 메서드가 어떤 값을 교환하더라도 상관이 없다는 것을 알 수 있다.
DiscountPolicy를 인터페이스로 바꾸고 NoneDiscountPolicy가 DiscountPolicy의 getDiscountAmount() 메서드가 아닌 calculateDiscountAmount() 오퍼레이션을 오버라이딩하도록 변경해라.

```java
public interface DiscountPolicy {
   Money calculateDiscountAmount(Screening screening);
}
```

```java
public abstract class DefaultDiscountPolicy implements DiscountPolicy {
   ...
}
```

```java
public class NoneDiscountPolicy implements DiscountPolicy {
   @Override
   public Money calculateDiscountAmount(Screening screening) {
      return Money.ZERO;
   }
}
```

### 코드 재사용
상속보다는 합성이 더 좋은 방법이라고 한다.
합성은 다른 객체의 인스턴스를 자신의 인스턴스 변수로 포함해서 재사용하는 방법을 말한다.

### 상속
상속은 객체지향에서 코드를 재사용하기 위해 널리 사용하는 기법이다.
하지만 두 가지 관점에서 설계에 안좋은 영향을 미친다.
1. 캡슐화를 위반한다.
   1. 자식 클래스가 부모 클래스에 강하게 결합되도록 만들기 때문에 부모클래스를 변경할 때 자식 클래스도 변경될 확률이 높다.
2. 설계를 유연하지 못하게 한다.
   1. 상속은 부모 클래스와 자식 클래스 사이의 관계를 컴파일 시점에 결정한다. 따라서 실행 시점에 객체의 종류를 변경하는 것이 불가능하다.
   2. 인스턴스 변수로 관계를 연결하여 유연하게 변경할 수 있다.

### 합성
인터페이스에 정의된 메시지를 통해서만 코드를 재사용하는 방법을 합성이라고 한다.
합성은 상속이 가지는 두 가지 문제점을 모두 해결한다.
1. 정의된 메시지를 통해서만 재사용이 가능하기 때문에 구현을 효과적으로 캡슐화할 수 있다.
2. 의존하는 인스턴스를 교체하는 것이 비교적 쉽기 때문에 설계를 유연하게 만든다.