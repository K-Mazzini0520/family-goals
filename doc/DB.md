+--------------------+
| users              |
+--------------------+
| PK id              |
| name               |
| email              |
| password           |
| icon_url           |
| created_at         |
| updated_at         |
+--------------------+
          |
          | N
          |
          |
+----------------------+
| family_members       |
+----------------------+
| PK id                |
| FK family_id         |
| FK user_id           |
| role                 |
+----------------------+
          |
          | N
          |
          |1
+----------------------+
| families             |
+----------------------+
| PK id                |
| family_name          |
| invite_code          |
| created_at           |
+----------------------+

          |
          |1
          |
          |N

+----------------------+
| goals                |
+----------------------+
| PK id                |
| FK family_id         |
| FK owner_user_id     |
| title                |
| description          |
| reward               |
| start_date           |
| end_date             |
| status               |
| created_at           |
+----------------------+

          |
          |1
          |
          |N

+----------------------+
| habits               |
+----------------------+
| PK id                |
| FK goal_id           |
| title                |
| frequency            |
| sort_order           |
| active               |
+----------------------+

          |
          |1
          |
          |N

+----------------------+
| habit_records        |
+----------------------+
| PK id                |
| FK habit_id          |
| record_date          |
| completed            |
| memo                 |
| created_at           |
+----------------------+

          |
          |1
          |
          |N

+----------------------+
| comments             |
+----------------------+
| PK id                |
| FK goal_id           |
| FK user_id           |
| comment              |
| created_at           |
+----------------------+

          |
          |1
          |
          |N

+----------------------+
| reactions            |
+----------------------+
| PK id                |
| FK comment_id        |
| FK user_id           |
| reaction_type        |
| created_at           |
+----------------------+
