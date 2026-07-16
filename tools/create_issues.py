import os
import yaml
import requests
from dotenv import load_dotenv

load_dotenv()

TOKEN = os.getenv("GITHUB_TOKEN")

HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Accept": "application/vnd.github+json",
}

# ------------------------------
# YAML読込
# ------------------------------
with open("issue.yml", "r", encoding="utf-8") as f:
    config = yaml.safe_load(f)

OWNER = config["repository"]["owner"]
REPO = config["repository"]["repo"]

BASE_URL = f"https://api.github.com/repos/{OWNER}/{REPO}"


# ------------------------------
# Label
# ------------------------------
def get_labels():
    r = requests.get(f"{BASE_URL}/labels", headers=HEADERS)
    r.raise_for_status()
    return {x["name"] for x in r.json()}


def create_label(name):
    colors = {
        "feature": "0E8A16",
        "backend": "1D76DB",
        "frontend": "5319E7",
        "infrastructure": "FBCA04",
        "ai": "D93F0B",
        "docs": "0075CA",
        "test": "BFDADC",
    }

    body = {
        "name": name,
        "color": colors.get(name, "CCCCCC"),
    }

    requests.post(
        f"{BASE_URL}/labels",
        headers=HEADERS,
        json=body,
    )


# ------------------------------
# Milestone
# ------------------------------
def get_milestones():
    r = requests.get(f"{BASE_URL}/milestones", headers=HEADERS)
    r.raise_for_status()

    return {
        m["title"]: m["number"]
        for m in r.json()
    }


def create_milestone(title, description):
    body = {
        "title": title,
        "description": description,
    }

    r = requests.post(
        f"{BASE_URL}/milestones",
        headers=HEADERS,
        json=body,
    )

    r.raise_for_status()

    return r.json()["number"]


# ------------------------------
# Issue
# ------------------------------
def create_issue(issue, epic=None):

    body = ""

    if epic:

        body += f"""## Epic

{epic["id"]} {epic["title"]}

"""

    body += f"""## 概要

{issue["title"]}

---

Generated from issue.yml
"""

    milestone_number = None

    if issue.get("milestone"):

        milestone_number = milestones[
            issue["milestone"]
        ]

    payload = {
        "title": issue["title"],
        "body": body,
        "labels": issue.get("labels", []),
    }

    if milestone_number:
        payload["milestone"] = milestone_number

    r = requests.post(
        f"{BASE_URL}/issues",
        headers=HEADERS,
        json=payload,
    )

    r.raise_for_status()

    print(f"Created : {issue['title']}")


# ------------------------------
# Label作成
# ------------------------------
print("Checking Labels...")

existing_labels = get_labels()

for label in config.get("labels", []):

    if label not in existing_labels:

        create_label(label)

print("OK")


# ------------------------------
# Milestone作成
# ------------------------------
print("Checking Milestones...")

milestones = get_milestones()

for ms in config.get("milestones", []):

    if ms["title"] not in milestones:

        number = create_milestone(
            ms["title"],
            ms["description"],
        )

        milestones[ms["title"]] = number

print("OK")


# ------------------------------
# Epic
# ------------------------------
print("Creating Issues...")

for epic in config["epics"]:

    print(f"\n{epic['title']}")

    for issue in epic["issues"]:

        create_issue(issue, epic)


# ------------------------------
# Tests
# ------------------------------
for issue in config.get("tests", []):

    create_issue(issue)


# ------------------------------
# Documents
# ------------------------------
for issue in config.get("documents", []):

    create_issue(issue)

print("\nDone!")
