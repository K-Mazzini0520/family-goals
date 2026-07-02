# development-flow.md

# Family Goals 開発フロー

---

# 1. 目的

本ドキュメントは、GitHubを利用したAIチーム開発の標準フローを定義する。

開発では以下のAIエージェントを利用する。

| エージェント | 担当                 |
| ------ | ------------------ |
| Codex  | Spring Boot・API・DB |
| Claude | Python・AI分析・テスト    |
| Cursor | React・UI・UX        |

人間はプロジェクトマネージャー（PM）としてプロジェクト全体を管理する。

---

# 2. 開発フロー

```text
要件定義
    │
    ▼
基本設計
    │
    ▼
Issue作成
    │
    ▼
ブランチ作成
    │
    ▼
AIへ依頼
    │
    ▼
実装
    │
    ▼
Pull Request
    │
    ▼
レビュー
    │
    ▼
developへマージ
    │
    ▼
動作確認
    │
    ▼
mainへリリース
```

---

# 3. 開発ブランチ

```
main
│
develop
│
├── feature/*
├── bugfix/*
├── hotfix/*
└── release/*
```

---

## main

本番リリース用

直接コミット禁止

---

## develop

開発ブランチ

featureはdevelopから作成する。

---

## feature

新機能

例

```
feature/15-login-api

feature/32-goal-list
```

---

## bugfix

不具合修正

```
bugfix/88-login-error
```

---

## hotfix

緊急修正

```
hotfix/login-fix
```

---

# 4. Issue運用

Issue単位で開発する。

Issueは1つの目的だけを持つ。

悪い例

```
ログイン画面

ログインAPI

認証

全部やる
```

良い例

```
ログイン画面

ログインAPI

JWT認証

プロフィール取得

別Issue
```

---

## ラベル

| Label    | 用途     |
| -------- | ------ |
| feature  | 新機能    |
| bug      | 不具合    |
| refactor | リファクタ  |
| test     | テスト    |
| docs     | ドキュメント |
| infra    | インフラ   |

---

## Milestone

例

```
MVP

Version1.0

Version2.0
```

---

# 5. AI担当

## Codex

担当

* Spring Boot
* Controller
* Service
* Repository
* Entity
* JWT
* PostgreSQL

Codexへ依頼しない

* React
* Python

---

## Claude

担当

* Python
* AI分析
* アルゴリズム
* テストデータ

Claudeへ依頼しない

* React画面

---

## Cursor

担当

* React
* UI
* CSS
* グラフ

Cursorへ依頼しない

* Spring Boot

---

# 6. AIへの依頼テンプレート

```
Issue番号

#15

目的

ログインAPIを作成する

対象

backend/

完了条件

・POST /login

・JWT発行

・テスト成功

修正範囲

Issue対象のみ

コーディング規約

coding-rule.mdを遵守
```

---

# 7. ブランチ作成

Issue作成後

```
feature/Issue番号-内容
```

例

```
feature/15-login-api
```

---

# 8. Pull Request

PRタイトル

```
#15 ログインAPI実装
```

---

PR本文

```
## Issue

#15

## 内容

ログインAPI追加

## 動作確認

ログイン成功

JWT発行確認

## スクリーンショット

なし
```

---

# 9. レビュー

レビュー項目

## 設計

* 責務は適切か

---

## 命名

* 命名は統一されているか

---

## セキュリティ

* 認証漏れはないか
* SQL Injection
* XSS

---

## パフォーマンス

* 不要SQL
* N+1問題

---

## テスト

* 正常系
* 異常系

---

# 10. マージ条件

developへマージする条件

* ビルド成功
* テスト成功
* レビュー承認
* コンフリクトなし

---

# 11. コミットルール

小さい単位でコミットする。

例

```
feat: ログインAPI追加

fix: JWT修正

docs: API更新

test: GoalService追加

refactor: Repository整理
```

---

# 12. ドキュメント更新

仕様変更時

更新対象

* requirements.md
* basic-design.md
* api.md
* db.md
* screen.md

コードだけ変更しない。

---

# 13. AIレビュー

推奨

```
Codex実装

↓

Claudeレビュー

↓

Cursorレビュー

↓

人間レビュー
```

異なるAIにレビューさせることで見落としを減らす。

---

# 14. Definition of Done（完了条件）

Issueは以下を満たしたら完了とする。

* 要件を満たす
* ビルド成功
* テスト成功
* Linterエラーなし
* コーディング規約準拠
* レビュー承認
* ドキュメント更新済み

---

# 15. GitHub運用ルール

* mainへの直接Push禁止
* developへの直接Push禁止
* Pull Request経由でマージする
* Issueを作成してからブランチを切る
* 1Issueにつき1ブランチ
* 1Pull Requestにつき1Issueを原則とする

---

# 16. AI開発時の禁止事項

AIエージェントは以下を行わない。

* Issue外の機能追加
* 無断リファクタリング
* 設計変更
* ライブラリ追加
* DB変更
* API変更

変更が必要な場合は必ずIssueを起票する。

---

# 17. 人間（PM）の責任

PMが担当する。

* 要件定義
* 設計
* Issue作成
* 優先順位決定
* レビュー
* マージ判断
* リリース判断

AIは実装支援ツールであり、最終判断はPMが行う。

---

# 18. リリース手順

```
develop

↓

結合テスト

↓

release作成

↓

最終確認

↓

mainへマージ

↓

タグ付け

↓

デプロイ
```

タグ例

```
v1.0.0
v1.1.0
v2.0.0
```

---

# 19. 振り返り

各マイルストーン終了後に以下を確認する。

* 完了Issue数
* AIごとの担当実績
* バグ件数
* レビュー指摘件数
* 改善点

継続的に開発フローを改善し、AIと人間が効率よく協働できる体制を目指す。
