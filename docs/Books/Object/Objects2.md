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