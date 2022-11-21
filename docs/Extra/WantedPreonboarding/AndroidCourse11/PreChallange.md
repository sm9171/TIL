https://github.com/1mlines/wanted-preonboarding-challenge-android-1/issues

1. NullPointerException은 무엇이며, 이를 방지할 수 있는 방법은 무엇인가요?
    1. NullPointerException이란
        - **선언만 하고 아무것도 참조하지 않는 null 상태인 변수에서 내용을 참조하려 할 때 발생**
    2. NullPointerException 방지
        1. try-catch
        2. if (variable != null)
        3. Optional

2. List, Set, Map의 주요 특징을 학습하고 정리해주세요.
    1. List
        - 순서가 있고 중복을 허용
        - 인덱스로 원소에 접근 가능
        - 크기가 가변적
    2. SET
        - 순서가 없고 중복을 허용 안함
        - 인덱스가 따로 존재하지 않기 때문에 iterator를 사용
        - 빠른 검색 속도
    3. Map
        - key와 value의 한쌍으로 이루어지는 데이터의 집합
        - key는 중복을 허용하지 않지만 value는 중복 허용
        - 인덱스가 따로 존재하지 않기 때문에 iterator를 사용
        - 빠른 검색 속도

3. Java로 싱글톤 패턴을 구현해주세요.

```java
public class Singleton {

	private Singleton() {
	}

	private static final class Holder {
		private static final Singleton INSTANCE = new Singleton();
	}

	public static Singleton getInstance() {
		return Holder.INSTANCE;
	}
 
	...
}
```

4. 아래는 JSON 포맷의 문자열이며, 함수의 인자로 전달됩니다.
    - price가 높은 순으로 정렬된 List를 반환하는 함수를 Java로 작성해주세요.
    - JSON 라이브러리는 자유롭게 사용하셔도 좋습니다.

    ```
    {
       "items": [
         {
           "label": "캐시미어 100% 터틀넥 스웨터",
           "price": 70000
         },
         {
           "label": "반팔 스트라이프 스웨터",
           "price": 30000
         },
         {
           "label": "화이트 스포츠 점퍼",
           "price": 150000
         }
       ]
    }
    
    ```
    ```java
    public static List<JSONObject> sortDescendingPrice(String jsonString) throws JSONException {
        final String ITEMS_KEY = "items";
        JSONObject clothingObject = new JSONObject(jsonString);
        boolean hasItemsKey = clothingObject.has(ITEMS_KEY);

        if (!hasItemsKey) {
            throw new JSONException("It does not have an \'items\' key.");
        }

        JSONArray items = clothingObject.getJSONArray(ITEMS_KEY);
        ArrayList<JSONObject> itemList = new ArrayList<>();

        for (int i = 0, j = items.length(); i < j; i++) {
            JSONObject item = items.getJSONObject(i);
            itemList.add(item);
        }

        itemList.sort((o1, o2) -> {
            int o1Price = o1.getInt("price");
            int o2Price = o2.getInt("price");
            return o2Price - o1Price;
        });
        return itemList;
    }
    ```