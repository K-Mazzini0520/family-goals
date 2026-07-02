# issue-plan.md

# Family Goals Issue計画

---

# 概要

本ドキュメントはMVP開発で作成するIssue一覧を定義する。

開発はIssue駆動で進める。

原則

* 1Issue = 1目的
* 1Issue = 1Pull Request
* 1Issue = 1ブランチ

---

# Milestone

## MVP

目標

「家族で目標共有し、毎日の達成記録ができる」

---

# Epic一覧

| Epic    | 概要          | 担当AI   |
| ------- | ----------- | ------ |
| EPIC-01 | 開発環境        | Codex  |
| EPIC-02 | 認証          | Codex  |
| EPIC-03 | 家族管理        | Codex  |
| EPIC-04 | 目標管理        | Codex  |
| EPIC-05 | 習慣管理        | Codex  |
| EPIC-06 | 達成記録        | Codex  |
| EPIC-07 | タイムライン・コメント | Codex  |
| EPIC-08 | フロントエンド     | Cursor |
| EPIC-09 | AI分析        | Claude |
| EPIC-10 | インフラ・デプロイ   | Codex  |

---

# EPIC-01 開発環境

| Issue | 内容                      | 担当     |
| ----- | ----------------------- | ------ |
| #1    | Spring Bootプロジェクト作成     | Codex  |
| #2    | Reactプロジェクト作成           | Cursor |
| #3    | Python(FastAPI)プロジェクト作成 | Claude |
| #4    | Docker Compose構築        | Codex  |
| #5    | PostgreSQL接続            | Codex  |
| #6    | GitHub Actions初期設定      | Codex  |

---

# EPIC-02 認証

| Issue | 内容                | 担当     |
| ----- | ----------------- | ------ |
| #10   | User Entity作成     | Codex  |
| #11   | ユーザー登録API         | Codex  |
| #12   | ログインAPI           | Codex  |
| #13   | JWT認証             | Codex  |
| #14   | Spring Security設定 | Codex  |
| #15   | ログイン画面            | Cursor |
| #16   | 新規登録画面            | Cursor |

---

# EPIC-03 家族管理

| Issue | 内容                  | 担当     |
| ----- | ------------------- | ------ |
| #20   | Family Entity       | Codex  |
| #21   | FamilyMember Entity | Codex  |
| #22   | 家族作成API             | Codex  |
| #23   | 招待コード生成             | Codex  |
| #24   | 家族参加API             | Codex  |
| #25   | 家族一覧API             | Codex  |
| #26   | 家族一覧画面              | Cursor |

---

# EPIC-04 目標管理

| Issue | 内容          | 担当     |
| ----- | ----------- | ------ |
| #30   | Goal Entity | Codex  |
| #31   | 目標登録API     | Codex  |
| #32   | 目標一覧API     | Codex  |
| #33   | 目標詳細API     | Codex  |
| #34   | 目標更新API     | Codex  |
| #35   | 目標削除API     | Codex  |
| #36   | 目標一覧画面      | Cursor |
| #37   | 目標登録画面      | Cursor |
| #38   | 目標詳細画面      | Cursor |

---

# EPIC-05 習慣管理

| Issue | 内容           | 担当     |
| ----- | ------------ | ------ |
| #40   | Habit Entity | Codex  |
| #41   | 習慣登録API      | Codex  |
| #42   | 習慣一覧API      | Codex  |
| #43   | 習慣更新API      | Codex  |
| #44   | 習慣削除API      | Codex  |
| #45   | 習慣編集画面       | Cursor |

---

# EPIC-06 達成記録

| Issue | 内容                 | 担当     |
| ----- | ------------------ | ------ |
| #50   | HabitRecord Entity | Codex  |
| #51   | 達成登録API            | Codex  |
| #52   | 達成履歴API            | Codex  |
| #53   | ストリーク計算            | Codex  |
| #54   | 達成率計算              | Codex  |
| #55   | 達成登録画面             | Cursor |
| #56   | カレンダー表示            | Cursor |

---

# EPIC-07 タイムライン・コメント

| Issue | 内容              | 担当     |
| ----- | --------------- | ------ |
| #60   | Comment Entity  | Codex  |
| #61   | Reaction Entity | Codex  |
| #62   | コメントAPI         | Codex  |
| #63   | リアクションAPI       | Codex  |
| #64   | タイムラインAPI       | Codex  |
| #65   | タイムライン画面        | Cursor |

---

# EPIC-08 フロントエンド共通

| Issue | 内容                | 担当     |
| ----- | ----------------- | ------ |
| #70   | 共通レイアウト           | Cursor |
| #71   | Header            | Cursor |
| #72   | Footer Navigation | Cursor |
| #73   | Menu              | Cursor |
| #74   | 共通Button          | Cursor |
| #75   | 共通Modal           | Cursor |
| #76   | Loading Component | Cursor |
| #77   | Error画面           | Cursor |
| #78   | 404画面             | Cursor |

---

# EPIC-09 AI分析

| Issue | 内容        | 担当     |
| ----- | --------- | ------ |
| #80   | FastAPI構築 | Claude |
| #81   | 達成率分析     | Claude |
| #82   | ストリーク分析   | Claude |
| #83   | 曜日分析      | Claude |
| #84   | AIコメント生成  | Claude |
| #85   | 分析API     | Claude |
| #86   | 分析画面      | Cursor |

---

# EPIC-10 インフラ

| Issue | 内容                | 担当    |
| ----- | ----------------- | ----- |
| #90   | Docker最適化         | Codex |
| #91   | ECR構築             | Codex |
| #92   | ECSデプロイ           | Codex |
| #93   | RDS接続             | Codex |
| #94   | CloudWatch設定      | Codex |
| #95   | GitHub Actions CD | Codex |

---

# テスト

| Issue | 内容                | 担当     |
| ----- | ----------------- | ------ |
| #100  | Backend Unit Test | Codex  |
| #101  | Frontend Test     | Cursor |
| #102  | Python Test       | Claude |
| #103  | 結合テスト             | PM     |
| #104  | リリース確認            | PM     |

---

# ドキュメント

| Issue | 内容       | 担当 |
| ----- | -------- | -- |
| #110  | README更新 | PM |
| #111  | API仕様更新  | PM |
| #112  | DB設計更新   | PM |
| #113  | 画面設計更新   | PM |

---

# リリース条件

MVP完了条件

* 全Issue完了
* 全テスト成功
* Dockerで起動可能
* AWSへデプロイ完了
* README整備済み
* API仕様書更新済み
* DB設計書更新済み
* レビュー完了

---

# AIエージェントへの割り振り

## Codex

* Spring Boot
* Security
* API
* Database
* Docker
* AWS

想定Issue数：約40件

---

## Cursor

* React
* UI
* UX
* 共通コンポーネント

想定Issue数：約20件

---

## Claude

* Python
* AI分析
* 分析アルゴリズム
* Pythonテスト

想定Issue数：約10件

---

# PM（人間）の担当

* 要件定義
* 設計
* GitHub運用
* Issue作成
* レビュー
* マージ判断
* 結合テスト
* リリース

PMは実装を直接担当するのではなく、AIエージェントが円滑に開発できるようにプロジェクト全体を管理する役割を担う。
