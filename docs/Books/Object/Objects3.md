# 3장. 역할,책임,협력

## 1. 협력
객체들이 애플리케이션의 기능을 구현하기 위해 수행하는 상호작용을 `협력`이라고 한다.
객체가 협력에 참여하기 위해 수행하는 로직은 `책임`이라고 부른다.
객체들이 협력 안에서 수행하는 책임들이 모여 객체가 수행하는 `역할`을 구성한다.

### 협력
1. 협력은 객체지향의 세계에서 기능을 구현할 수 있는 유일한 방법이다. 두 객체 사이의 협력은 하나의 객체가 다른 객체에게 도움을 요청 할 때 시작한다.
2. `메시지 전송`은 객체 사이의 협력을 위해 사용할 수 있는 유일한 커뮤니케이션 수단이다.
3. 메시지를 수신한 객체는 `메서드`를 실행해 요청에 응답한다.
4. 객체의 자율성을 보장하기 위해서는 필요한 정보와 정보에 기반한 행동을 같은 객체에 모아야 한다. 그러기 위해서 `캡슐화`를 이용한다.
5. 자신이 알고 있는 정보는 직접하고 할 수 없는 일을 다른 객체에 위임 하여 자율적인 객체가 된다.

### 협력이 설계를 위한 문맥을 결정한다
객체의 행동을 결정하는 것은 객체가 참여하고 있는 협력이다. 협력이 바뀌면 객체가 제공해야 하는 행동 역시 바뀌어야 한다.
상태는 객체가 행동하는 데 필요한 정보에 의해 결정되고 행동은 협력 안에서 객체가 처리할 메시지로 결정된다.
결과적으로 객체가 참여하는 협력이 객체를 구성하는 행동과 상태 모두를 결정한다.
따라서, 협력은 객체를 설계하는 데 필요한 일종의 `문맥`을 제공한다.

## 2. 책임
### 책임이란 무엇인가.
객체의 책임은 객체가 '무엇을 알고 있는가' 와 '무엇을 할 수 있는가'로 구성된다.

하는 것
- 객체를 생성하거나 계산을 수행하는 등의 스스로 하는 것
- 다른 객체의 행동을 시작시키는 것
- 다른 객체의 활동을 제어하고 조절하는 것

아는 것
- 사적인 정보에 관해 아는 것
- 관련된 객체에 관해 아는 것
- 자신이 유도하거나 계산할 수 있는 것에 관해 아는 것

책임은 객체가 수행할 수 있는 행동을 종합적이고 간략하게 서술하기 때문에 메시지보다 추상적이고 개념적으로도 더 크다.
협력이 중요한 이유는 객체에게 할당할 책임을 결정할 수 있는 문맥을 제공하기 때문이다.

### 책임 할당
자율적인 객체를 만드는 가장 기본적인 방법은 책임을 수행하는 데 필요한 정보를 가장 잘 알고 있는 전문가에게 그 책임을 할당하는 것이다.

객체지향 설계는 협력에 필요한 메시지를 찾고 메시지에 적절한 객체를 선택하는 반복적인 과정을 통해 이뤄진다.

### 책임 주도 설계
책임을 찾고 책임을 수행할 적절한 객체를 찾아 책임을 할당하는 방식으로 협력을 설계하는 방법을 '책임 주도 설계'라고 부른다.

책임 주도 설계 방법의 과정
- 시스템이 사용자에게 제공해야 하는 기능인 시스템 책임을 파악한다.
- 시스템 책임을 더 작은 책임으로 분할한다.
- 분할된 책임을 수행할 수 있는 적절한 객체 또는 역할을 찾아 책임을 할당한다.
- 객체가 책임을 수행하는 도중 다른 객체의 도움이 필요한 경우 이를 책임질 적절한 객체 또는 역할을 찾는다.
- 해당 객체 또는 역할에게 책임을 할당함으로써 두 객체가 협력하게 한다.

### 메시지가 객체를 결정한다.
메시지가 객체를 선택하게 해야 하는 두 가지 중요한 이유
1. 객체가 최소한의 인터페이스를 가질 수 있게 된다.
2. 객체는 충분히 추상적인 인터페이스를 가질 수 있게 된다.

객체가 충분히 추상적이면서 미니멀리즘을 따르는 인터페이스를 가지게 하고 싶다면 메시지가 객체를 선택하게 하라.

### 행동이 상태를 결정한다.
객체에 필요한 상태가 무엇인지를 결정하고, 그 후에 상태에 필요한 행동을 결정하면 객체의 내부 구현이 객체의 퍼블릭 인터페이스에 노출되도록 만들기 때문에 `캡슐화`를 저해한다.
캡슐화를 위반하지 않도록 구현에 대한 결정을 뒤로 미루면서 객체의 행위를 고려하기 위해서는 항상 협력이라는 문맥 안에서 객체를 생각해야 한다.

## 3. 역할
### 역할과 협력
객체가 어떤 특정한 협력 안에서 수행하는 책임의 집합을 `역할`이라고 부른다. 실제로 협력을 모델링 할 때는 특정한 객체가 아니라 역할에게 책임을 할당한다고 생각하는게 좋다.

### 유연하고 재사용 가능한 협력
역할이 중요한 이유는 역할을 통해 유연하고 재사용 가능한 협력을 얻을 수 있기 때문이다.
두 종류 이상의 같은 책임을 가지고 있는 객체를 하나의 개념으로 묶는것을 역할이라고 한다.
책임과 역할을 중심으로 협력을 바라보는 것이 바로 변경과 확장이 용이한 유연한 설계로 나아가는 첫걸음이다.
역할을 구현하는 가장 일반적인 방법은 `추상 클래스`와 `인터페이스`를 사용하는 것이다.

### 객체 대 역할
협력 -> (reference) -> 역할 -> (select from) -> 객체 -> (instance of) -> 클래스
설계 초반에는 적절한 책임과 협력의 큰 그림을 탐색하는 것이 가장 중요한 목표여야 하고 역할과 객체를 명확하게 중요하지는 않다는 것이다.
애매하다면 단순하게 객체로 시작하고 반복적으로 책임과 협력을 정제해가면서 필요한 순간에 객체로부터 역할을 분리해내는 것이 가장 좋은 방법이다.
중요한 것은 협력을 구체적인 객체가 아니라 추상적인 역할의 관점에서 설계하면 협력이 유연하고 재 사용 가능해진다는 것이다. 따라서 역할의 가장 큰 장점은 설계의 구성 요소를 추상화할 수 있다는 것이다.

### 역할과 추상화
1. 추상화의 첫 번째 장점은 세부 사항에 억눌리지 않고도 상위 수준의 정책을 쉽고 간단하게 표현할 수 있다는 것이다.
   1. 추상화를 적절하게 사용하면 불필요한 세부 사항을 생략하고 핵심적인 개념을 강조할 수 있다.
2. 추상화의 두 번째 장점은 설계를 유연하게 만들 수 있다는 것이다.
   1. 협력 안에서 동일한 책임을 수행하는 객체들을 수용할 수 있게 해주므로 협력을 유연하게 만든다.

### 배우와 배역
연극의 배역과 배우 간의 관계
- 배역은 연극 배우가 특정 연극에서 연기하는 역할이다.
- 배역은 연극이 상영되는 동안에만 존재하는 일시적인 개념이다.
- 연극이 끝나면 연극 배우는 배역이라는 역할을 벗어 버리고 원래의 연극 배우로 돌아온다.
- 서로 다른 배우들이 동일한 배역을 연기할 수 있다.
- 하나의 배우가 다양한 연극 안에서 서로 다른 배역을 연기할 수 있다.

배역을 연기하는 배우라는 은유는 협력 안에서 역할을 수행하는 객체라는 관점이 가진 입체적인 측면들을 훌륭하게 담아낸다.
협력은 연극과 동일하고 코드는 극본과 동일하다. 배우는 연극이 상영될 때 배역이라는 특정한 역할을 연기한다.
객체는 협력이라는 실행 문맥 안에서 특정한 역할을 수행한다.
연극 배우는 연극이 끝나면 자신의 배역을 잊고 원래의 자기 자신을 되찾는다.
객체는 협력이 끝나고 협력에서의 역할을 잊고 원래의 객체로 돌아올 수 있다.
