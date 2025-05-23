// 글로벌 변수
let currentExp = 0;
let currentLevel = 1;
let maxExp = 100;
let inventory = ["핸드폰 자유 이용권 30분"];

// 퀘스트 목록
const quests = [
    { id: 1, content: "공부 1시간 하기", reward: 20, coin: 10 },
    { id: 2, content: "운동 30분 하기", reward: 20, coin: 10 },
    { id: 3, content: "영어 단어장 Day 1개 외우기", reward: 40, coin: 20 },
    { id: 4, content: "인강 1개 듣기(고등)", reward: 30, coin: 15 }
];

// 아이템 목록
const items = [
    { id: 1, content: "딴짓하기 15분(음악 듣기만 허용)", cost: 10 },
    { id: 2, content: "핸드폰 자유 이용권 30분", cost: 30 },
    { id: 3, content: "랜덤 보상 상자", cost: 40 },
    { id: 4, content: "ㄱㄱ", cost: 100 },
];

// UI 초기화
window.onload = function () {
    updateExpBar(currentExp, maxExp);
    updatePlayerInfo();
    displayQuestsReward();
    displayStoreItems();
    updateInventory();
};

// 퀘스트 UI
function displayQuestsReward() {
    const questList = document.getElementById("quest-list");
    questList.innerHTML = "";
    quests.forEach((quest) => {
        const questDiv = document.createElement("div");
        questDiv.className = "quest";
        questDiv.id = `quest-${quest.id}`;

        const questP = document.createElement("p");
        questP.innerHTML = `Quest ${quest.id}: ${quest.content}<br><strong>🎁 보상: EXP ${quest.reward}, 코인 ${quest.coin}</strong>`;

        const questBtn = document.createElement("button");
        questBtn.textContent = "Start Quest";
        questBtn.className = "btn";  // 여기 추가!
        questBtn.onclick = () => completeQuest(quest.id);

        questDiv.appendChild(questP);
        questDiv.appendChild(questBtn);
        questList.appendChild(questDiv);
    });
}

// 퀘스트 완료 처리
function completeQuest(id) {
    const quest = quests.find((q) => q.id === id);
    if (!quest) return;

    alert(`퀘스트 완료! 경험치 ${quest.reward}점, 코인 ${quest.coin}개 획득! 🎉`);

    gainExp(quest.reward);

    const coinEl = document.getElementById("player-coin");
    let coin = parseInt(coinEl.textContent);
    coin += quest.coin;
    coinEl.textContent = coin;
}

// 경험치 획득 및 레벨업 처리
function gainExp(amount) {
    currentExp += amount;
    while (currentExp >= maxExp) {
        currentExp -= maxExp;
        currentLevel++;
        maxExp = Math.floor(maxExp * 1.2);
        alert(`🎉 레벨업! 현재 레벨: ${currentLevel}`);
    }
    updateExpBar(currentExp, maxExp);
    updatePlayerInfo();
}

// 상점 UI
function displayStoreItems() {
    const itemList = document.getElementById("item-list");
    itemList.innerHTML = "";
    items.forEach((item) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "item";

        const itemP = document.createElement("p");
        itemP.innerHTML = `Item ${item.id}: ${item.content}<br><strong>💰 가격: ${item.cost} 코인</strong>`;

        const itemBtn = document.createElement("button");
        itemBtn.textContent = "Buy Item";
        itemBtn.className = "btn";
        itemBtn.onclick = () => buyItem(item.id);

        itemDiv.appendChild(itemP);
        itemDiv.appendChild(itemBtn);
        itemList.appendChild(itemDiv);
    });
}

// 아이템 구매 처리 + 인벤토리 추가
function buyItem(id) {
    const item = items.find(i => i.id === id);
    const coinEl = document.getElementById("player-coin");
    let coin = parseInt(coinEl.textContent);

    if (coin < item.cost) {
        alert("코인이 부족해! 😢");
        return;
    }

    coin -= item.cost;
    coinEl.textContent = coin;

    // 인벤토리에 추가
    inventory.push(item.content);
    updateInventory();

    alert(`✅ [${item.content}] 획득!`)
}

// 인벤토리 UI 갱신
function updateInventory() {
    const list = document.getElementById("inventory-list");
    list.innerHTML = "";
    inventory.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = item;

        // 클릭 시 아이템 사용 처리
        li.onclick = () => {
            alert(`🧪 "${item}" 아이템 사용됨!`);
            inventory.splice(index, 1); // 사용 후 인벤토리에서 제거
            updateInventory(); // 새로고침
        };

        list.appendChild(li);
    });
    console.log(inventory);
}

// EXP 바 & 플레이어 정보 갱신
function updateExpBar(currentExp, maxExp) {
    const percent = (currentExp / maxExp) * 100;
    document.getElementById("player-exp-progress").style.width = `${percent}%`;
}

function updatePlayerInfo() {
    document.getElementById("player-exp").textContent = `${currentExp}/${maxExp}`;
    document.getElementById("player-level").textContent = currentLevel;
}

// 퀘스트/상점 토글
function showQuests() {
    document.getElementById('quests').classList.add('show');
  }
  
  function closeQuests() {
    document.getElementById('quests').classList.remove('show');
  }
  
  function openStore() {
    document.getElementById('store').classList.add('show');
  }
  
  function closeStore() {
    document.getElementById('store').classList.remove('show');
  }  



/** Todo 리스트 시스템 */
let todoList = []; // 할 일 목록

function addTodo() {
    const input = document.getElementById("new-todo");
    const value = input.value.trim();

    if (value === "") {
        alert("할 일을 입력하라고옹!! 😤");
        return;
    }

    const todo = {
        id: Date.now(), // 유니크 ID
        text: value,
        done: false
    };

    todoList.push(todo);
    input.value = "";
    renderTodoList();
}

function renderTodoList() {
    const ul = document.getElementById("todo-list");
    ul.innerHTML = "";

    todoList.forEach(todo => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = todo.text;
        if (todo.done) span.style.textDecoration = "line-through";

        const btn = document.createElement("button");
        btn.textContent = todo.done ? "완료됨" : "완료하기";
        btn.disabled = todo.done;
        btn.onclick = () => completeTodo(todo.id);

        li.appendChild(span);
        li.appendChild(btn);
        ul.appendChild(li);
    });
}

function completeTodo(id) {
    const todo = todoList.find(t => t.id === id);
    if (!todo || todo.done) return;

    todo.done = true;
    alert("✅ 할 일 완료! 보상으로 EXP 10, 코인 5를 받았어!");

    // 경험치 & 코인 보상
    gainExp(10);
    const coinEl = document.getElementById("player-coin");
    let coin = parseInt(coinEl.textContent);
    coin += 5;
    coinEl.textContent = coin;

    renderTodoList();
}

function renderTodoList() { // 삭제 기능
    const ul = document.getElementById("todo-list");
    ul.innerHTML = "";

    todoList.forEach(todo => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = todo.text;
        if (todo.done) span.style.textDecoration = "line-through";

        const completeBtn = document.createElement("button");
        completeBtn.textContent = todo.done ? "완료됨" : "완료하기";
        completeBtn.disabled = todo.done;
        completeBtn.onclick = () => completeTodo(todo.id);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "삭제🗑️";
        deleteBtn.style.marginLeft = "10px";
        deleteBtn.onclick = () => deleteTodo(todo.id);

        li.appendChild(span);
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);
        ul.appendChild(li);
    });
}

function deleteTodo(id) {
    todoList = todoList.filter(todo => todo.id !== id);
    renderTodoList();
}