# 電通主任 過去問アプリ — 年度追加手順

## フォルダ構成

```
telecom_app/
├── index.html          ← メインアプリ
├── manifest.json       ← PWA設定
├── sw.js               ← Service Worker（オフライン対応）
├── icons/              ← アプリアイコン
└── data/
    ├── r7_2_setubi.json   ← 令和7年度第2回 伝送設備
    ├── r7_2_houki.json    ← 令和7年度第2回 法規
    └── r7_2_system.json   ← 令和7年度第2回 電気システム
```

## 新しい年度を追加する手順

### 1. PDFをClaudeにアップロード

新しい年度のPDF（問題+解答）を6ファイルアップロードします：
```
r8_1_setubi.pdf / r8_1_setubi_ans.pdf
r8_1_houki.pdf  / r8_1_houki_ans.pdf
r8_1_system.pdf / r8_1_system_ans.pdf
```

### 2. Claudeに変換依頼

「令和8年度第1回の問題をJSONに変換してください」と依頼すると、
以下の形式のJSONファイルを生成します：

```json
{
  "id": "r8_1_system",
  "year": "令和8年度",
  "session": "第1回",
  "subject": "電気通信システム",
  "subject_short": "system",
  "questions": [
    {
      "id": "r8_1_system_q01",
      "number": 1,
      "text": "問題文...",
      "options": ["①...", "②...", "③...", "④...", "⑤..."],
      "answer": 3,
      "explanation": "解説..."
    }
  ]
}
```

### 3. index.htmlの修正（年度選択機能追加）

`index.html` の SUBJECTS 配列に追加：

```javascript
const SUBJECTS = [
  { id: 'setubi', file: 'data/r7_2_setubi.json', year: 'R7-2' },
  { id: 'houki',  file: 'data/r7_2_houki.json',  year: 'R7-2' },
  { id: 'system', file: 'data/r7_2_system.json', year: 'R7-2' },
  // ↓ 追加分
  { id: 'r8_1_setubi', file: 'data/r8_1_setubi.json', year: 'R8-1' },
  { id: 'r8_1_houki',  file: 'data/r8_1_houki.json',  year: 'R8-1' },
  { id: 'r8_1_system', file: 'data/r8_1_system.json', year: 'R8-1' },
];
```

### 4. sw.jsのキャッシュリスト更新

```javascript
const CACHE_NAME = 'telecom-v2'; // バージョンを上げる
const ASSETS = [
  // ... 既存のファイル ...
  './data/r8_1_setubi.json',
  './data/r8_1_houki.json',
  './data/r8_1_system.json',
];
```

## PWAとしてのインストール方法

### PC（Chrome/Edge）
1. アドレスバー右端のインストールアイコンをクリック
2. または、右上メニュー → 「アプリをインストール」

### スマートフォン（iOS Safari）
1. 画面下部の「共有」ボタンをタップ
2. 「ホーム画面に追加」をタップ

### スマートフォン（Android Chrome）
1. メニュー →「ホーム画面に追加」
2. またはアプリ内のインストールボタンをタップ

## オフライン利用

Service Workerにより、一度開いた後はインターネット接続なしでも利用できます。

## 学習データの保存場所

学習履歴（正誤・進捗）はブラウザのlocalStorageに保存されます。
ブラウザのデータをクリアすると消えます。
