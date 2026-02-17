# Vercel デプロイ手順

## エラー「ENOENT: no such file or directory, open '.../kiriclip-lp/package.json'」が出る場合

このリポジトリは **ルートに package.json、その中に Next アプリが `kiriclip-lp/` に入っている** 構成です。  
Vercel でビルドを通すには、次のいずれかを行ってください。

---

### 方法 1: リポジトリに `kiriclip-lp` フォルダが含まれている場合

1. **Git に `kiriclip-lp` が含まれているか確認**
   - リポジトリルートに `kiriclip-lp` フォルダがあること
   - その中に `package.json` と `app/` があること

2. **ルートの `vercel.json` をそのまま利用**
   - すでに「`kiriclip-lp` で install / build する」設定を入れています。
   - この状態でプッシュすれば、Vercel は `installCommand` / `buildCommand` で `kiriclip-lp` をビルドします。

3. **（推奨）Vercel の Root Directory を設定**
   - Vercel のダッシュボード → 対象プロジェクト → **Settings** → **General**
   - **Root Directory** で `kiriclip-lp` を指定し **Save**
   - これで Vercel は `kiriclip-lp` をプロジェクトルートとして扱い、その中の `package.json` でビルドします。
   - この場合、ルートの `package.json` の `build` は使われません。

---

### 方法 2: リポジトリに `kiriclip-lp` フォルダがない場合

GitHub のリポジトリが「Next アプリの内容だけがルートにある」構成（`kiriclip-lp` なし）のときは、次のどちらかになります。

- **A. ローカルで `kiriclip-lp` ごとルートに含めてプッシュする**
  - ルートに `kiriclip-lp` フォルダが存在する形でコミット・プッシュする。
  - その後、上記「方法 1」の手順でデプロイする。

- **B. Vercel の Root Directory は使わず、ルートを Next アプリにする**
  - ルートの `package.json` を `kiriclip-lp/package.json` の内容で置き換える（`"build": "next build"` など）。
  - `app/` など Next のファイルをルートに移動する。
  - ルートの `vercel.json` は削除するか、Next がルートにある前提の設定に変更する。

---

### まとめ

- **「kiriclip-lp/package.json がない」と言われる**  
  → まずはリポジトリに **`kiriclip-lp` フォルダごと** 含まれているか確認し、含まれていれば **Root Directory を `kiriclip-lp` に設定** するのが確実です。
