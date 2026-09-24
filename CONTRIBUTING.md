# Contributing to Cơm Nhà

This is the workflow everyone on the team follows to make changes to this repo. Read this before you start on any issue.

---

## Contents

- [Branch naming convention](#branch-naming-convention)
- [Workflow](#workflow)
- [Pull request checklist](#pull-request-checklist)
- [Quick reference](#quick-reference)

---

## Branch naming convention

Every branch follows this pattern:

```
<type>/<issue-number>-<short-description>
```

Lowercase, hyphens between words, no spaces.

| Type | Use for |
|---|---|
| `feature` | New functionality (a new section, a new page, a new component) |
| `fix` | Fixing something that's broken |
| `docs` | Documentation only, no site code |
| `chore` | Setup, config, cleanup, anything that isn't user-facing |

**Example:** issue #1 ("Build shared header/nav/footer") became `feature/1-shared-layout`.

> **One issue per branch.** Don't bundle multiple issues into one branch, even if they touch the same file.

---

## Workflow

```
clone ──▶ pull main ──▶ branch ──▶ build & preview ──▶ commit ──▶ push ──▶ open PR ──▶ review ──▶ merge
```

### 1. Clone the repo

Only needed once. Skip this if you already have the repo on your machine.

```
git clone https://github.com/ninihub1/Com-Nha.git
cd Com-Nha
```

### 2. Get an up-to-date main

Do this every time, even if you cloned five minutes ago. Someone else's merge might already be in there.

```
git checkout main
git pull
```

### 3. Create your branch

```
git checkout -b <type>/<issue-number>-<short-description>
```

Match the issue number and description to the GitHub issue you're working on.

### 4. Build and preview

Make the changes the issue describes. Preview locally with Live Server (or `python3 -m http.server`) before moving on.

> **Don't push something you haven't looked at in a browser.**

### 5. Stage, commit, push

```
git add <the files you changed>
git commit -m "<short description of what you did>"
git push -u origin <type>/<issue-number>-<short-description>
```

Only add the files the issue actually touched.

> **Avoid `git add .`** It's easy to accidentally commit things you didn't mean to, like `.DS_Store`.

### 6. Open a pull request

On GitHub, base `main` ← compare your branch. In the description, write:

```
Closes #<issue-number>
```

This links the PR to the issue and closes it automatically once merged. Set the Milestone on the right sidebar to the current week (for example, Week 5).

### 7. Wait for review

Tag Blony (ninihub1) as a reviewer and wait for approval before it goes into main. If changes are requested, push more commits to the same branch, they'll show up on the same PR automatically.

> **Don't merge your own PR.**

---

## Pull request checklist

Before you request review, confirm:

- [ ] Branch name follows the `type/issue-number-description` pattern
- [ ] Only the files this issue touches are staged
- [ ] Changes were previewed locally and actually work
- [ ] PR description includes `Closes #<issue-number>`
- [ ] Milestone is set to the current week
- [ ] Reviewer is tagged

---

## Quick reference

```
git checkout main
git pull
git checkout -b feature/12-example-issue
# ... build and preview ...
git add file1.html file2.css
git commit -m "Describe what changed"
git push -u origin feature/12-example-issue
# open PR on GitHub: "Closes #12", set milestone, request review
```
