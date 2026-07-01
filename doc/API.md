# API詳細設計書

## 家族目標共有システム（Family Goals）

---

# 1. 共通仕様

## ベースURL

```text
/api/v1
```

---

## 通信方式

* HTTPS
* REST API
* JSON

---

## 文字コード

UTF-8

---

## 認証方式

JWT Bearer Token

```
Authorization: Bearer xxxxxxxxx
```

---

## 共通レスポンス

### 正常

```json
{
  "success": true,
  "message": "",
  "data": {}
}
```

---

### 異常

```json
{
  "success": false,
  "message": "エラーメッセージ"
}
```

---

# 2. 認証API

---

## ログイン

### POST

```
/api/v1/auth/login
```

### Request

```json
{
  "email":"sample@test.com",
  "password":"password"
}
```

### Response

```json
{
  "success":true,
  "data":{
    "token":"jwt-token",
    "userId":"uuid",
    "userName":"山田太郎"
  }
}
```

---

## 新規登録

### POST

```
/api/v1/auth/register
```

Request

```json
{
  "name":"山田太郎",
  "email":"sample@test.com",
  "password":"password"
}
```

---

## ログアウト

### POST

```
/api/v1/auth/logout
```

---

# 3. ユーザーAPI

---

## 自分の情報取得

### GET

```
/api/v1/users/me
```

Response

```json
{
  "id":"uuid",
  "name":"山田太郎",
  "email":"sample@test.com"
}
```

---

## プロフィール更新

### PUT

```
/api/v1/users/me
```

Request

```json
{
  "name":"山田太郎"
}
```

---

# 4. 家族API

---

## 家族作成

POST

```
/api/v1/families
```

Request

```json
{
  "familyName":"山田家"
}
```

Response

```json
{
  "familyId":"uuid",
  "inviteCode":"ABC123"
}
```

---

## 家族取得

GET

```
/api/v1/families
```

---

## 家族参加

POST

```
/api/v1/families/join
```

Request

```json
{
  "inviteCode":"ABC123"
}
```

---

## メンバー一覧

GET

```
/api/v1/families/{familyId}/members
```

---

# 5. 目標API

---

## 一覧取得

GET

```
/api/v1/goals
```

Query

```
status=ACTIVE
```

Response

```json
[
  {
    "goalId":"uuid",
    "title":"毎日30分勉強",
    "reward":"Switch2",
    "streak":15,
    "achievementRate":92
  }
]
```

---

## 詳細取得

GET

```
/api/v1/goals/{goalId}
```

---

## 登録

POST

```
/api/v1/goals
```

Request

```json
{
  "title":"基本情報技術者合格",
  "description":"毎日勉強する",
  "reward":"ゲーム購入",
  "startDate":"2026-07-01",
  "endDate":"2026-10-15"
}
```

---

## 更新

PUT

```
/api/v1/goals/{goalId}
```

---

## 削除

DELETE

```
/api/v1/goals/{goalId}
```

---

# 6. タスクAPI

---

## 一覧

GET

```
/api/v1/goals/{goalId}/tasks
```

---

## 登録

POST

```
/api/v1/goals/{goalId}/tasks
```

Request

```json
{
  "title":"参考書20ページ"
}
```

---

## 更新

PUT

```
/api/v1/tasks/{taskId}
```

Request

```json
{
  "title":"午後問題演習",
  "completed":true
}
```

---

## 削除

DELETE

```
/api/v1/tasks/{taskId}
```

---

# 7. 達成報告API

---

## 今日の達成登録

POST

```
/api/v1/goals/{goalId}/records
```

Request

```json
{
  "date":"2026-07-01",
  "completed":true
}
```

---

## 達成履歴取得

GET

```
/api/v1/goals/{goalId}/records
```

Response

```json
[
  {
    "date":"2026-07-01",
    "completed":true
  }
]
```

---

# 8. コメントAPI

---

## コメント登録

POST

```
/api/v1/goals/{goalId}/comments
```

Request

```json
{
  "comment":"頑張って！"
}
```

---

## コメント一覧

GET

```
/api/v1/goals/{goalId}/comments
```

---

# 9. リアクションAPI

---

## スタンプ送信

POST

```
/api/v1/comments/{commentId}/reactions
```

Request

```json
{
  "reaction":"CLAP"
}
```

### reaction候補

* CLAP
* FIRE
* HEART
* PARTY
* MUSCLE

---

# 10. タイムラインAPI

---

## 家族タイムライン取得

GET

```
/api/v1/timeline
```

Response

```json
[
  {
    "user":"パパ",
    "action":"毎日30分勉強を達成しました",
    "createdAt":"2026-07-01T20:15:10"
  }
]
```

---

# 11. ダッシュボードAPI

---

## ホーム画面

GET

```
/api/v1/dashboard
```

Response

```json
{
  "todayGoals":3,
  "completedGoals":2,
  "currentStreak":15,
  "achievementRate":91,
  "familyActivities":[]
}
```

---

# 12. AI分析API

---

## 習慣分析

GET

```
/api/v1/analytics/habit
```

Response

```json
{
  "achievementRate":91,
  "bestDay":"土曜日",
  "worstDay":"月曜日",
  "currentStreak":15,
  "maxStreak":42
}
```

---

## AIアドバイス

GET

```
/api/v1/analytics/advice
```

Response

```json
{
  "message":"あと2日で自己ベストです。寝る前の時間帯は達成率が高い傾向があります。"
}
```

---

## ご褒美分析

GET

```
/api/v1/analytics/reward
```

Response

```json
{
  "rewardEffect":true,
  "achievementRate":92,
  "analysis":"ご褒美を設定した目標は達成率が高い傾向があります。"
}
```

---

# 13. エラーコード

| HTTP | 意味      |
| ---- | ------- |
| 200  | 正常終了    |
| 201  | 登録成功    |
| 204  | 削除成功    |
| 400  | 入力エラー   |
| 401  | 認証エラー   |
| 403  | 権限不足    |
| 404  | データなし   |
| 409  | 重複データ   |
| 422  | 業務エラー   |
| 500  | システムエラー |

---

# 14. API命名規約

* 名詞をURIに使用する
* 動詞はHTTPメソッドで表現する
* JSON形式で統一する
* 複数形リソースを使用する
* ネストは2階層までを基本とする

例

```
GET    /goals
POST   /goals
PUT    /goals/{goalId}
DELETE /goals/{goalId}

GET    /goals/{goalId}/tasks

POST   /comments/{commentId}/reactions
```
