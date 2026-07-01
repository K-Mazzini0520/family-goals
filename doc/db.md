# db.md

# Family Goals データベース設計書

---

# 1. データベース概要

## DBMS

PostgreSQL

---

## 文字コード

UTF-8

---

## 命名規約

### テーブル

* スネークケース
* 複数形

例

```text
users
family_members
habit_records
```

---

### カラム

* スネークケース

例

```text
family_name
created_at
updated_at
```

---

## 主キー

* UUID

---

## 日時

TIMESTAMP

---

## 論理削除

MVPでは採用しない。

削除は物理削除とする。

---

# 2. ER概要

```text
users
   │
   ├──────────────┐
   │              │
family_members    goals(owner)
   │              │
families──────────┘
        │
        │
      goals
        │
        ├──── habits
        │        │
        │        └──── habit_records
        │
        └──── comments
                 │
                 └──── reactions
```

---

# 3. テーブル定義

---

# users

ユーザー情報

| カラム        | 型            | PK | NN | 備考     |
| ---------- | ------------ | -- | -- | ------ |
| id         | UUID         | 〇  | 〇  |        |
| name       | VARCHAR(100) |    | 〇  |        |
| email      | VARCHAR(255) |    | 〇  | UNIQUE |
| password   | VARCHAR(255) |    | 〇  | ハッシュ化  |
| icon_url   | VARCHAR(500) |    |    |        |
| created_at | TIMESTAMP    |    | 〇  |        |
| updated_at | TIMESTAMP    |    | 〇  |        |

---

# families

家族情報

| カラム         | 型            | PK | NN | 備考     |
| ----------- | ------------ | -- | -- | ------ |
| id          | UUID         | 〇  | 〇  |        |
| family_name | VARCHAR(100) |    | 〇  |        |
| invite_code | VARCHAR(20)  |    | 〇  | UNIQUE |
| created_at  | TIMESTAMP    |    | 〇  |        |
| updated_at  | TIMESTAMP    |    | 〇  |        |

---

# family_members

家族所属

| カラム        | 型           | PK | NN | 備考             |
| ---------- | ----------- | -- | -- | -------------- |
| id         | UUID        | 〇  | 〇  |                |
| family_id  | UUID        |    | 〇  | FK             |
| user_id    | UUID        |    | 〇  | FK             |
| role       | VARCHAR(20) |    | 〇  | OWNER / MEMBER |
| created_at | TIMESTAMP   |    | 〇  |                |

### 制約

* family_id + user_id は UNIQUE

---

# goals

目標

| カラム           | 型            | PK | NN | 備考                            |
| ------------- | ------------ | -- | -- | ----------------------------- |
| id            | UUID         | 〇  | 〇  |                               |
| family_id     | UUID         |    | 〇  | FK                            |
| owner_user_id | UUID         |    | 〇  | FK                            |
| title         | VARCHAR(100) |    | 〇  |                               |
| description   | TEXT         |    |    |                               |
| reward        | VARCHAR(255) |    |    |                               |
| start_date    | DATE         |    | 〇  |                               |
| end_date      | DATE         |    |    |                               |
| status        | VARCHAR(20)  |    | 〇  | ACTIVE / COMPLETED / ARCHIVED |
| created_at    | TIMESTAMP    |    | 〇  |                               |
| updated_at    | TIMESTAMP    |    | 〇  |                               |

---

# habits

習慣

1つの目標に複数登録できる。

例

* 毎日30分勉強
* 腕立て20回
* 英単語50個

| カラム        | 型            | PK | NN | 備考             |
| ---------- | ------------ | -- | -- | -------------- |
| id         | UUID         | 〇  | 〇  |                |
| goal_id    | UUID         |    | 〇  | FK             |
| title      | VARCHAR(100) |    | 〇  |                |
| frequency  | VARCHAR(20)  |    | 〇  | DAILY / WEEKLY |
| sort_order | INTEGER      |    | 〇  | 表示順            |
| active     | BOOLEAN      |    | 〇  | true/false     |
| created_at | TIMESTAMP    |    | 〇  |                |
| updated_at | TIMESTAMP    |    | 〇  |                |

---

# habit_records

達成履歴

| カラム         | 型         | PK | NN | 備考 |
| ----------- | --------- | -- | -- | -- |
| id          | UUID      | 〇  | 〇  |    |
| habit_id    | UUID      |    | 〇  | FK |
| record_date | DATE      |    | 〇  |    |
| completed   | BOOLEAN   |    | 〇  |    |
| memo        | TEXT      |    |    |    |
| created_at  | TIMESTAMP |    | 〇  |    |

### 制約

habit_id + record_date は UNIQUE

---

# comments

コメント

| カラム        | 型         | PK | NN | 備考 |
| ---------- | --------- | -- | -- | -- |
| id         | UUID      | 〇  | 〇  |    |
| goal_id    | UUID      |    | 〇  | FK |
| user_id    | UUID      |    | 〇  | FK |
| comment    | TEXT      |    | 〇  |    |
| created_at | TIMESTAMP |    | 〇  |    |

---

# reactions

リアクション

| カラム           | 型           | PK | NN | 備考                                   |
| ------------- | ----------- | -- | -- | ------------------------------------ |
| id            | UUID        | 〇  | 〇  |                                      |
| comment_id    | UUID        |    | 〇  | FK                                   |
| user_id       | UUID        |    | 〇  | FK                                   |
| reaction_type | VARCHAR(20) |    | 〇  | CLAP / FIRE / HEART / MUSCLE / PARTY |
| created_at    | TIMESTAMP   |    | 〇  |                                      |

### 制約

comment_id + user_id + reaction_type は UNIQUE

---

# 4. リレーション

| 親        | 子              | 関係  |
| -------- | -------------- | --- |
| users    | family_members | 1:N |
| families | family_members | 1:N |
| families | goals          | 1:N |
| users    | goals          | 1:N |
| goals    | habits         | 1:N |
| habits   | habit_records  | 1:N |
| goals    | comments       | 1:N |
| users    | comments       | 1:N |
| comments | reactions      | 1:N |
| users    | reactions      | 1:N |

---

# 5. インデックス

## users

* email（UNIQUE）

---

## families

* invite_code（UNIQUE）

---

## family_members

* family_id
* user_id
* UNIQUE(family_id, user_id)

---

## goals

* family_id
* owner_user_id
* status

---

## habits

* goal_id

---

## habit_records

* habit_id
* record_date
* UNIQUE(habit_id, record_date)

---

## comments

* goal_id
* user_id

---

## reactions

* comment_id
* user_id

---

# 6. ステータス定義

## goals.status

| 値         | 説明  |
| --------- | --- |
| ACTIVE    | 進行中 |
| COMPLETED | 達成  |
| ARCHIVED  | 終了  |

---

## habits.frequency

| 値      | 説明 |
| ------ | -- |
| DAILY  | 毎日 |
| WEEKLY | 毎週 |

---

## family_members.role

| 値      | 説明     |
| ------ | ------ |
| OWNER  | 家族管理者  |
| MEMBER | 一般メンバー |

---

## reactions.reaction_type

| 値      | 意味 |
| ------ | -- |
| CLAP   | 👏 |
| FIRE   | 🔥 |
| HEART  | ❤️ |
| MUSCLE | 💪 |
| PARTY  | 🎉 |

---

# 7. 将来追加予定テーブル

| テーブル             | 用途       |
| ---------------- | -------- |
| notifications    | 通知       |
| badges           | バッジマスタ   |
| user_badges      | 獲得バッジ    |
| reward_histories | ご褒美受取履歴  |
| goal_templates   | 目標テンプレート |
| ai_analysis_logs | AI分析履歴   |
| login_histories  | ログイン履歴   |
| audit_logs       | 監査ログ     |

---

# 8. 設計方針

* UUIDを主キーとして利用する。
* 正規化（第3正規形）を基本とする。
* 目標（Goal）と習慣（Habit）を分離し、1つの目標に複数の習慣を持てる構造とする。
* 習慣ごとに日次の達成履歴を保持することで、ストリークや達成率を柔軟に算出できるようにする。
* MVPでは物理削除を採用し、論理削除や監査ログは将来機能として追加可能な設計とする。
