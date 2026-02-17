# Vercel デプロイ手順

## 現在の構成（2025年2月）

**Next.js アプリはリポジトリルートにあります。**  
（`app/`、`package.json`、`next.config.ts` などがルートにあります。）

Vercel はルートで `npm install` → `npm run build` を実行するため、**追加の Root Directory 設定は不要**です。  
このルート構成を GitHub にプッシュすれば、そのまま Vercel でビルドできます。

---

## 過去の構成（kiriclip-lp サブフォルダ）でエラーが出ていた場合

以前は **ルートに package.json、Next アプリが `kiriclip-lp/` に入っている** 構成でした。

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

---

## 警告「Failed to fetch one or more git submodules」が出る場合

この警告は **Git サブモジュールの取得に失敗した** ときに表示されます。ビルド自体は続行されることが多いです。

### サブモジュールを使っていない場合

1. **リポジトリに `.gitmodules` があるか確認**
   ```bash
   cat .gitmodules
   ```
2. **ある場合で、サブモジュールが不要なら削除**
   ```bash
   git submodule deinit -f .
   git rm -f .gitmodules
   # サブモジュールだったフォルダが残っていれば、中身を通常のファイルとして追加
   git add .
   git commit -m "Remove git submodules"
   git push
   ```
3. **`.gitmodules` がなくても、過去にサブモジュールを追加したことがある場合**
   - GitHub のリポジトリ → **Settings** → 左の **General** の一番下 **Danger Zone** の上あたりで、サブモジュールの有無を確認
   - またはローカルで `git submodule status` を実行し、何か表示されればサブモジュールが登録されています。不要なら上記の `deinit` / `git rm .gitmodules` で解除してください。

### サブモジュールを利用している場合

- サブモジュールの URL が **HTTPS** で、Vercel からアクセス可能か確認する（プライベートの場合は Vercel の環境変数やデプロイキーで認証が必要なことがあります）。
- この警告だけなら **ビルドが成功していれば無視して問題ない** ことも多いです。
