# architecture.md

# Family Goals アーキテクチャ設計書

---

# 1. システム全体構成

```text
                           ┌────────────────────┐
                           │     Browser        │
                           │  React(Web App)    │
                           └─────────┬──────────┘
                                     │ HTTPS
                                     ▼
                          ┌──────────────────────┐
                          │ Spring Boot API      │
                          │ Authentication       │
                          │ Goal Management      │
                          │ Family Management    │
                          │ Timeline             │
                          └───────┬──────────────┘
                                  │
                 ┌────────────────┴────────────────┐
                 │                                 │
                 ▼                                 ▼
       ┌──────────────────┐              ┌──────────────────┐
       │ PostgreSQL       │              │ Python API       │
       │ Master Database  │              │ AI Analytics     │
       └──────────────────┘              └──────────────────┘
```

---

# 2. システム構成概要

| レイヤ       | 使用技術              |
| --------- | ----------------- |
| Frontend  | React             |
| Backend   | Spring Boot(Java) |
| AI分析      | Python(FastAPI予定) |
| Database  | PostgreSQL        |
| Container | Docker            |
| Cloud     | AWS               |

---

# 3. 採用アーキテクチャ

レイヤードアーキテクチャを採用する。

```text
Presentation

↓

Application

↓

Domain

↓

Infrastructure

↓

Database
```

責務を分離することで保守性・拡張性を高める。

---

# 4. Spring Boot構成

```text
backend

src/main/java

├── controller
├── service
├── repository
├── entity
├── dto
├── config
├── security
├── exception
├── util
└── FamilyGoalsApplication.java
```

---

# 5. React構成

```text
frontend

src

├── pages
├── components
├── hooks
├── api
├── context
├── routes
├── utils
├── assets
└── App.jsx
```

---

# 6. Python構成

```text
python

app

├── api
├── service
├── analytics
├── model
├── util
└── main.py
```

Pythonでは

* 達成率分析
* 習慣分析
* AIコメント生成

を担当する。

---

# 7. API連携

```text
React

↓

REST API

↓

Spring Boot

↓

PostgreSQL
```

AI分析時

```text
React

↓

Spring Boot

↓

Python API

↓

Spring Boot

↓

React
```

Spring BootをAPI Gatewayの役割とし、フロントエンドからPython APIを直接呼び出さない構成とする。

---

# 8. Docker構成

```text
docker-compose

├── frontend
├── backend
├── python
├── postgres
└── nginx
```

---

## コンテナ構成

| コンテナ     | 役割          |
| -------- | ----------- |
| frontend | React       |
| backend  | Spring Boot |
| python   | AI分析        |
| postgres | DB          |
| nginx    | リバースプロキシ    |

---

# 9. AWS構成

```text
                  Internet
                      │
                      ▼
               Amazon Route53
                      │
                      ▼
               Amazon CloudFront
                      │
                      ▼
         Application Load Balancer
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
   ECS(Fargate)             ECS(Fargate)
 Spring Boot API            Python API
          │                       │
          └───────────┬───────────┘
                      ▼
               Amazon RDS
                PostgreSQL
                      │
                      ▼
                 Amazon S3
```

---

# 10. 認証方式

JWT認証を採用する。

ログイン成功後

```text
Login

↓

JWT発行

↓

Authorization Header

↓

API呼び出し
```

Authorization Header

```text
Authorization: Bearer xxxxxxxxx
```

---

# 11. データフロー

## 目標登録

```text
React

↓

POST /goals

↓

Spring Boot

↓

Repository

↓

PostgreSQL
```

---

## 今日達成

```text
React

↓

POST /habit_records

↓

Spring Boot

↓

PostgreSQL
```

---

## AI分析

```text
React

↓

GET /analytics

↓

Spring Boot

↓

Python

↓

分析

↓

Spring Boot

↓

React
```

---

# 12. ログ出力

Spring Boot

* Application Log
* Error Log

Python

* Analytics Log
* Error Log

AWS

* CloudWatch Logs

---

# 13. 例外処理

共通ExceptionHandlerを実装する。

レスポンス形式

```json
{
  "success": false,
  "message": "入力内容が不正です"
}
```

---

# 14. セキュリティ

## 通信

* HTTPS

---

## パスワード

BCryptでハッシュ化する。

---

## 対策

* SQL Injection
* XSS
* CSRF（Cookie認証採用時）
* CORS設定

---

# 15. CI/CD

GitHub Flowをベースに運用する。

```text
Developer

↓

GitHub

↓

Pull Request

↓

Review

↓

Merge

↓

GitHub Actions

↓

Docker Build

↓

Amazon ECR

↓

Amazon ECS
```

---

# 16. GitHub構成

```text
family-goals

├── docs
├── frontend
├── backend
├── python
├── docker
├── infra
├── .github
└── README.md
```

---

# 17. 開発環境

| 項目          | 内容              |
| ----------- | --------------- |
| OS          | Windows / macOS |
| IDE         | VS Code・Cursor  |
| Java        | JDK 21          |
| Spring Boot | 3.x             |
| Node.js     | LTS版            |
| Python      | 3.12            |
| Docker      | Docker Desktop  |
| DB          | PostgreSQL 16   |

---

# 18. 開発担当

## Codex

担当

* Spring Boot
* API
* Entity
* Repository
* Security

---

## Claude

担当

* Python
* AI分析
* テストデータ
* アルゴリズム

---

## Cursor

担当

* React
* UI
* UX
* グラフ
* レスポンシブ対応

---

# 19. アーキテクチャ設計方針

* フロントエンド・バックエンド・AI分析を疎結合に保つ。
* バックエンドを唯一のAPI窓口とし、フロントエンドはPythonサービスへ直接アクセスしない。
* Dockerでローカル開発環境を統一する。
* AWS上でコンテナ化された構成を前提とし、本番環境との差異を最小限に抑える。
* OpenAPI（Swagger）を利用し、API仕様をコードと同期させる。
* GitHub・Issue・Pull Requestを中心としたAIエージェントとの協働開発を前提とする。
