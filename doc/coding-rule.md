# coding-rule.md

# Family Goals コーディング規約

---

# 1. 目的

本規約は、チームメンバーおよびAIエージェント（Codex・Claude・Cursor）が統一したルールで開発を行うことを目的とする。

以下を重視する。

* 可読性
* 保守性
* 一貫性
* 拡張性
* レビューしやすいコード

---

# 2. 共通ルール

## 命名規則

### クラス

PascalCase

例

```text
GoalService
UserController
FamilyRepository
```

---

### メソッド

camelCase

```text
createGoal()

findUser()

updateHabit()
```

---

### 変数

camelCase

```text
goalId

familyName

achievementRate
```

---

### 定数

UPPER_SNAKE_CASE

```text
MAX_GOAL_COUNT

DEFAULT_PAGE_SIZE
```

---

### パッケージ

小文字

```text
controller

service

repository
```

---

# 3. Java（Spring Boot）

## Controller

責務

* Request受信
* Validation
* Service呼び出し
* Response返却

Controllerに業務ロジックを書かない。

---

## Service

責務

* 業務ロジック

DBアクセスは禁止。

Repository経由とする。

---

## Repository

Spring Data JPAを利用する。

SQLは必要最小限とする。

---

## Entity

* Lombok利用可
* UUIDを主キーとする

---

## DTO

Entityを直接返却しない。

必ずDTOを利用する。

---

## Exception

共通ExceptionHandlerで処理する。

Controller毎にtry-catchを書かない。

---

## Validation

Bean Validationを利用する。

例

```java
@NotBlank

@Email

@Size
```

---

## Logging

Loggerを利用する。

禁止

```java
System.out.println()
```

---

## コメント

コメントは

「なぜそうしたか」

を書く。

「何をしているか」

はコードで表現する。

悪い例

```java
// ユーザー取得
```

良い例

```java
// メールアドレスは一意であるため最初の1件を取得する
```

---

# 4. React

## Component

1ファイル1コンポーネント

---

## State

ローカル状態はuseState

共有状態はContextまたは将来的にRedux等を採用

---

## API

API呼び出しは

```text
/api
```

配下へ集約する。

---

## ページ

```text
/pages
```

画面

```text
/components
```

部品

---

## CSS

CSS ModulesまたはTailwind CSSを利用する。

インラインスタイルは最小限とする。

---

## Props

Propsの受け渡しは必要最小限にする。

---

# 5. Python

FastAPIを利用する。

---

## ディレクトリ

```text
api

service

analytics

model
```

---

## AI分析

分析ロジックは

```text
analytics
```

へ配置する。

---

## Logging

loggingライブラリを利用する。

---

# 6. SQL

* SELECT *
* を使用しない。

取得カラムを明示する。

---

JOINは必要最低限にする。

---

WHERE句を明確に記述する。

---

インデックスを考慮する。

---

# 7. Git運用

## ブランチ

```text
main

develop

feature/Issue番号-機能名

hotfix/内容
```

例

```text
feature/15-login-api

feature/22-dashboard
```

---

## Commit

コミットは小さくする。

---

コミットメッセージ

```text
feat: ログインAPI追加

fix: JWT認証修正

refactor: GoalService整理

docs: API更新

test: GoalServiceテスト追加

chore: Docker更新
```

---

# 8. Pull Request

PRには以下を記載する。

* Issue番号
* 概要
* 変更内容
* 動作確認内容
* スクリーンショット（UI変更時）

---

# 9. REST API

URIは名詞で表現する。

良い例

```text
GET /goals

POST /goals

PUT /goals/{id}

DELETE /goals/{id}
```

悪い例

```text
/getGoal

/createGoal
```

---

HTTPメソッド

| Method | 用途   |
| ------ | ---- |
| GET    | 取得   |
| POST   | 登録   |
| PUT    | 更新   |
| PATCH  | 部分更新 |
| DELETE | 削除   |

---

# 10. エラーハンドリング

共通レスポンス

```json
{
  "success": false,
  "message": "エラーメッセージ"
}
```

HTTPステータスを適切に利用する。

---

# 11. テスト

Java

* JUnit5
* Mockito

Python

* pytest

React

* Vitest

---

# 12. AIエージェント向けルール

AIへ依頼する際は以下を必ず伝える。

* Issue番号
* 対象ファイル
* 完了条件
* 修正範囲
* コーディング規約遵守

AIは

* 不要なリファクタリングを行わない。
* 指定範囲外の修正を行わない。
* 推測で仕様変更をしない。
* 不明点はコメントで残す。

---

# 13. レビュー観点

レビューでは以下を確認する。

### 設計

* 責務が適切か
* レイヤ違反がないか

### 可読性

* 命名
* メソッド長
* クラス長

### 保守性

* 重複コード
* 共通化
* 拡張性

### セキュリティ

* SQL Injection
* XSS
* 認証漏れ
* 権限チェック

### パフォーマンス

* N+1問題
* 不要なSELECT
* 不要なAPI呼び出し

---

# 14. 品質基準

* ビルドエラーなし
* コンパイル警告なし（可能な限り）
* テスト成功
* Linterエラーなし
* フォーマット適用済み
* レビュー承認後にマージ

---

# 15. AI協働開発ポリシー

* 人間（PM）が仕様・設計・最終判断を担当する。
* AIエージェントは実装・テスト・レビュー支援を担当する。
* AIが生成したコードは必ず人間がレビューする。
* Issue単位で開発し、1つのIssueでは1つの目的だけを達成する。
* ドキュメントと実装に差異が生じた場合は、実装ではなく設計書を基準とし、必要に応じて設計書を更新する。

---

# 16. コーディング原則

本プロジェクトでは以下の原則を重視する。

* SOLID原則を意識する。
* DRY（Don't Repeat Yourself）を心掛ける。
* KISS（Keep It Simple, Stupid）を優先する。
* YAGNI（You Aren't Gonna Need It）を守り、将来必要になるか不明な機能は実装しない。
* 「動くコード」だけでなく、「読みやすく保守しやすいコード」を目指す。
