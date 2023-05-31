# 1장 객체, 설계
## 1. 티켓 판매 애플리케이션 구현하기
티켓 판매 애플리케이션을 구현한다. 몇 가지 기능이 요구 된다.
1. 이벤트 당첨된 관람객은 초대장을 티켓으로 교환 후 입장가능하고, 미당첨자들은 티켓을 구매해야만 입장이 가능하다.
```java
public class Invitation {
    private LocalDateTime when; //초대 일자
}
```
```java
public class Ticket {
    private Long fee; //티켓 요금
    
    public Long getFee(){
        return fee;
    }
}
```
```java
public class Bag {
    private Long amount;
    private Invitation invitation;
    private Ticket ticket;

    public Bag(long amount) {
        this(null, amount);
    }

    public Bag(Invitation invitation, long amount) {
        this.invitation = invitation;
        this.amount = amount;
    }
    
    public boolean hasInvitation() {
        return invitation != null;
    }
    
    public boolean hasTicket() {
        return ticket != null;
    }

    public void setTicket(Ticket ticket) {
        this.ticket = ticket;
    }

    public void minusAmount(Long amount) {
        this.amount -= amount;
    }

    public void plusAmount(Long amount) {
        this.amount += amount;
    }
}
```

```java
public class Audience {
    private Bag bag;

    public Audience(Bag bag) {
        this.bag = bag;
    }

    public Bag getBag() {
        return bag;
    }
}
```
```java
public class TicketOffice {
    private Long amount;
    private List<Ticket> tickets = new ArrayList<>();

    public TicketOffice(Long amount, Ticket... tickets) {
        this.amount = amount;
        this.tickets.addAll(Arrays.asList(tickets));
    }
    
    public Ticket getTicket() {
        return tickets.remove(0);
    }

    public void minusAmount(Long amount) {
        this.amount != amount;
    }

    public void plusAmount(Long amount) {
        this.amount += amount;
    }
}
```

```java
public class TicketSeller {
    private TicketOffice ticketOffice;

    public TicketSeller(TicketOffice ticketOffice) {
        this.ticketOffice = ticketOffice;
    }

    public TicketOffice getTicketOffice() {
        return ticketOffice;
    }
}
```
```java
public class Theater {
    private TicketSeller ticketSeller;

    public Theater(TicketSeller ticketSeller) {
        this.ticketSeller = ticketSeller;
    }

    public void enter(Audience audience) {
        if (audience.getBag().hasInvitation()) {
            Ticket ticket = ticketSeller.getTicketOffice().getTicket();
            audience.getBag().setTicket(ticket);
        } else {
            Ticket ticket = ticketSeller.getTicketOffice().getTicket();
            audience.getBag().minusAmount(ticket.getFee());
            ticketSeller.getTicketOffice().plusAmount(ticket.getFee());
            audience.getBag().setTicket(ticket);
        }
    }
}
```

## 2. 무엇이 문제인가
### 예상을 빗나가는 코드
1. 관람객과 판매원이 소극장의 통제를 받는 수동적인 존재여서 어색하다.

### 변경에 취약한 코드
1. Theater의 enter 메서드를 이해하기 위해서는 Audience가 Bag을 가지고 있고, Bag 안에는 현금과 티켓이 들어 있으며
   TicketSeller가 TicketSeller가 TicketOffice에서 티켓을 판매하고, TicketOffice안에 돈과 티켓이 보관돼 있다는 모든 사실을 동시에 기억하고 있어야 한다.
2. Theater에 의존성이 높아져 결합도가 높아졌다.

## 3. 설계 개선하기
```java
public class Theater {
    private TicketSeller ticketSeller;

    public Theater(TicketSeller ticketSeller) {
        this.ticketSeller = ticketSeller;
    }

    public void enter(Audience audience) {
        ticketSeller.sellTo(audience);
    }
}
```
```java
public class TicketSeller {
    private TicketOffice ticketOffice;

    public TicketSeller(TicketOffice ticketOffice) {
        this.ticketOffice = ticketOffice;
    }

    public void sellTo(Audience audience) {
        if (audience.getBag().hasInvitation()) {
            Ticket ticket = ticketOffice.getTicket();
            audience.getBag().setTicket(ticket);
        } else {
            Ticket ticket = ticketOffice.getTicket();
            audience.getBag().minusAmount(ticket.getFee());
            ticketOffice.plusAmount(ticket.getFee());
            audience.getBag().setTicket(ticket);
        }
    }
}
```
```java
public class TicketSeller {
    private TicketOffice ticketOffice;

    public TicketSeller(TicketOffice ticketOffice) {
        this.ticketOffice = ticketOffice;
    }

    public void sellTo(Audience audience) {
        ticketOffice.plusAmount(audience.buy(ticketOffice.getTicket));
    }
}
```
```java
public class Audience {
    private Bag bag;

    public Audience(Bag bag) {
        this.bag = bag;
    }

    public Bag getBag() {
        return bag;
    }

    public Long buy(Ticket ticket) {
        if (bag.hasInvitation()) {
            bag.setTicket(ticket);
            return 0L;
        } else {
            bag.setTicket(ticket);
            bag.minusAmount(ticket.getFee());
            return ticket.getFee();
        }
    }
}
```

### 무엇이 개선됐는가
수정된 Audience와 TicketSeller는 자신이 가지고 있는 소지품을 스스로 관리한다.
Audience나 TicketSeller의 내부 구현을 변경하더라도 Theater를 함께 변경할 필요가 없어졌다.
Audience가 가방이 아니라 작은 지갑을 소지하도록 코드를 변경하려면 Audience 내부만 변경하면 된다.
TicketSeller가 매표소가 아니라 은행에 돈을 보관하도록 만들고 싶으면 TicketSeller 내부만 변경하면 된다.

### 어떻게 한 것인가
판매자가 티켓을 판매하기 위해 TicketOffice를 사용하는 모든 부분을 TicketSeller 내부로 옮기고, 관람객이 티켓을 구매하기 위해 Bag을 사용하는 모든 부분을 Audience 내부로 옮긴 것이다.
다시 말해 자기 자신의 문제를 스스로 해결하도록 코드를 변경한 것이다.

### 캡슐화와 응집도
객체의 응집도를 높이기 위해서는 객체 스스로 자신의 데이터를 책임져야 한다.
외부의 간섭을 최대한 배제하고 메시지를 통해서만 협력하는 자율적인 객체들의 공동체를 만드는 것이 훌륭한 객체지향 설계를 얻을 수 있는 지름길인 것이다.

### 절차지향과 객체지향
1. Theater의 enter 메서드는 프로세스 이며 Audience, TicketSeller, Bag, TicketOffice는 데이터 다. 이 처럼 프로세스와 데이터를 별도의 모듈에 위치시키는 방식을 절차적 프로그래밍이라고 부른다.
2. 수정한 후의 코드에서는 데이터를 사용하는 프로세스가 데이터를 소유하고 있는 Audience와 TicketSeller 내부로 옮겨졌다. 이처럼 데이터와 프로세스가 동일한 모듈 내부에 위치하도록 프로그래밍하는 방식을 객체지향 프로그래밍이라고 부른다.

### 책임의 이동
두 방식 사이에 근본적인 차이를 만드는 것은 책임의 이동이다. Theater에 몰려 있던 책임이 개별 객체로 이동하였다.
그렇게 함으로 써 객체간의 의존성을 제거하고 결합도를 낮추고 응집도를 올릴 수 있다. 그리고 몰라도 되는 세부사항을 캡슐화로 감출 수 있다.

### 더 개선 할 수 있다.
```java
public class Audience {
   public Long buy(Ticket ticket) {
      return bag.hold(ticket);
   }
}
```
```java
public class Bag {
   private Long amount;
   private Ticket ticket;
   private Invitation invitation;

    public Long hold(Ticket ticket) {
        if (hasInvitation()) {
            setTicket(ticket);
            return 0L;
        } else {
            setTicket(ticket);
            minusAmount(ticket.getFee());
            return ticket.getFee();
        }
    }

   private void setTicket(Ticket ticket) {
      this.ticket = ticket;
   }

   private boolean hasInvitation() {
      return invitation != null;
   }

   private void minusAmount(Long amount) {
      this.amount -= amount;
   }
}
```
```java
public class TicketSeller {
    private TicketOffice ticketOffice;

    public TicketSeller(TicketOffice ticketOffice) {
        this.ticketOffice = ticketOffice;
    }

    public void sellTo(Audience audience) {
       ticketOffice.sellTicketTo(audience);
    }
}
```
```java
public class TicketOffice {
   private Long amount;
   private List<Ticket> tickets = new ArrayList<>();

    public void sellTicketTo(Audience audience) {
        plusAmount(audience.buy(getTicket()));
    }
    
    private Ticket getTicket() {
       return tickets.remove(0);
    }

   private void plusAmount(Long amount) {
      this.amount += amount;
   }
}
```

### 그래, 거짓말이다!
비록 현실에서는 수동적인 존재라고 하더라도 일단 객체지향의 세계에 들어오면 모든 것이 능동적이고 자율적인 존재로 바뀐다.(의인화)

## 4. 객체지향 설계
### 설계가 왜 필요한가
우리는 오늘 완성해야 하는 기능을 구현하는 코드를 짜야 하는 동시에 내일 쉽게 변경할 수 있는 코드를 짜야 한다.

### 객체지향 설계
진정한 객체지향 설계로 나아가는 길은 협력하는 객체들 사이의 의존성을 적절하게 조절함으로써 변경에 용이한 설계를 만드는 것이다.