# 家族目標共有システム 基本設計書

## 1. システム構成

```
┌─────────────────────┐
│ React（フロントエンド） │
└──────────┬──────────┘
           │ REST API
┌──────────▼──────────┐
│ Spring Boot（Java） │
├─────────────────────┤
│ 認証                 │
│ 家族管理             │
│ 目標管理             │
│ タスク管理           │
│ 活動履歴             │
│ AI連携               │
└──────────┬──────────┘
      ┌────┴────┐
      │         │
┌─────▼─────┐ ┌─▼──────────┐
│PostgreSQL │ │Python API  │
│            │ │分析・AI    │
└───────────┘ └────────────┘
```

---

# 2. ディレクトリ構成

```
family-goals/

├─ docs/
│   ├─ requirements.md
│   ├─ basic-design.md
│   ├─ api.md
│   ├─ er-diagram.md
│   └─ screen-design.md
│
├─ frontend/
├─ backend/
├─ python/
├─ infra/
├─ docker/
└─ .github/
```

---

# 3. 画面一覧

| 画面ID   | 画面名    | 概要         |
| ------ | ------ | ---------- |
| SCR001 | ログイン   | 認証         |
| SCR002 | 新規登録   | ユーザー登録     |
| SCR003 | ホーム    | ダッシュボード    |
| SCR004 | 目標一覧   | 目標表示       |
| SCR005 | 目標登録   | 目標作成       |
| SCR006 | 目標詳細   | 達成状況表示     |
| SCR007 | タスク編集  | 目標配下タスク編集  |
| SCR008 | 家族一覧   | 家族メンバー表示   |
| SCR009 | タイムライン | 活動履歴       |
| SCR010 | プロフィール | ユーザー設定     |
| SCR011 | 分析画面   | Python分析結果 |

---

# 4. 画面遷移図

```
ログイン
    │
ホーム
 │  │  │
 │  │  └────プロフィール
 │  │
 │  ├────家族一覧
 │  │
 │  ├────タイムライン
 │  │
 │  └────目標一覧
 │
 └────────目標詳細
              │
      ┌───────┴────────┐
      │                │
  タスク編集      達成報告
```

---

# 5. ER設計

## users

| 項目         | 型         |
| ---------- | --------- |
| id         | UUID      |
| name       | varchar   |
| email      | varchar   |
| password   | varchar   |
| created_at | timestamp |

---

## families

| 項目          | 型       |
| ----------- | ------- |
| id          | UUID    |
| family_name | varchar |
| invite_code | varchar |

---

## family_members

| 項目        | 型       |
| --------- | ------- |
| id        | UUID    |
| family_id | UUID    |
| user_id   | UUID    |
| role      | varchar |

---

## goals

| 項目          | 型       |
| ----------- | ------- |
| id          | UUID    |
| family_id   | UUID    |
| owner_id    | UUID    |
| title       | varchar |
| description | text    |
| reward      | varchar |
| start_date  | date    |
| end_date    | date    |
| status      | varchar |

---

## tasks

| 項目        | 型       |
| --------- | ------- |
| id        | UUID    |
| goal_id   | UUID    |
| title     | varchar |
| sort_no   | int     |
| completed | boolean |

---

## daily_records

| 項目          | 型       |
| ----------- | ------- |
| id          | UUID    |
| goal_id     | UUID    |
| record_date | date    |
| status      | boolean |

---

## comments

| 項目      | 型    |
| ------- | ---- |
| id      | UUID |
| goal_id | UUID |
| user_id | UUID |
| comment | text |

---

## reactions

| 項目            | 型       |
| ------------- | ------- |
| id            | UUID    |
| comment_id    | UUID    |
| user_id       | UUID    |
| reaction_type | varchar |

---

# 6. テーブル関連

```
Users
   │
   │N
FamilyMembers
   │
   │N
Families
   │
   │1
Goals
   │
   │N
Tasks

Goals
   │
   ├── DailyRecords
   │
   └── Comments
             │
             └── Reactions
```

---

# 7. API一覧

## 認証

| Method | URI                |
| ------ | ------------------ |
| POST   | /api/auth/login    |
| POST   | /api/auth/logout   |
| POST   | /api/auth/register |

---

## 家族

| Method | URI                |
| ------ | ------------------ |
| GET    | /api/families      |
| POST   | /api/families      |
| POST   | /api/families/join |

---

## 目標

| Method | URI             |
| ------ | --------------- |
| GET    | /api/goals      |
| POST   | /api/goals      |
| PUT    | /api/goals/{id} |
| DELETE | /api/goals/{id} |

---

## タスク

| Method | URI             |
| ------ | --------------- |
| GET    | /api/tasks      |
| POST   | /api/tasks      |
| PUT    | /api/tasks/{id} |
| DELETE | /api/tasks/{id} |

---

## 達成報告

| Method | URI          |
| ------ | ------------ |
| POST   | /api/records |
| GET    | /api/records |

---

## コメント

| Method | URI           |
| ------ | ------------- |
| POST   | /api/comments |
| GET    | /api/comments |

---

## AI分析

| Method | URI                   |
| ------ | --------------------- |
| GET    | /api/analytics        |
| GET    | /api/analytics/streak |
| GET    | /api/analytics/advice |

---

# 8. Python分析API

入力

```
ユーザーID
↓
目標
↓
達成履歴
```

出力

```
達成率

連続記録

失敗傾向

AIコメント

おすすめ
```

---

# 9. Docker構成

```
frontend
backend
python
postgres
nginx
```

docker-composeで一括起動する。

---

# 10. AWS構成

```
Route53

↓

CloudFront

↓

ALB

↓

ECS(Fargate)

↓

SpringBoot

Python

↓

RDS(PostgreSQL)

↓

S3
```

---

# 11. GitHubブランチ戦略

```
main

develop

feature/#Issue番号
```

例

```
feature/15-login

feature/18-goal-api

feature/22-dashboard
```

---

# 12. AIエージェント担当

## Codex

* Spring Boot
* REST API
* JPA
* JWT認証
* PostgreSQL

---

## Claude

* Python分析
* AIアドバイス生成
* 統計分析
* テストデータ生成

---

## Cursor

* React
* UIコンポーネント
* グラフ表示
* レスポンシブ対応

---

# 13. 開発フェーズ

## Phase1

* 認証
* 家族管理

---

## Phase2

* 目標管理
* タスク管理

---

## Phase3

* タイムライン
* コメント
* スタンプ

---

## Phase4

* AI分析
* ダッシュボード
* グラフ

---

## Phase5

* AWSデプロイ
* Docker最適化
* CI/CD
* パフォーマンス改善
