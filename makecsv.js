import { CSV } from "https://js.sabae.cc/CSV.js";

const data = await Deno.readTextFile("cedict_ts.u8");
const ss = data.split("\n");
const head = {};
for (const s0 of ss) {
  const s = s0.trim();
  if (s.startsWith("#")) {
    console.log(s);
    if (s.startsWith("#! ")) {
      const n = s.indexOf("=");
      if (n >= 0) {
        const name = s.substring(3, n);
        const value = s.substring(n + 1);
        head[name] = value;
      }
    }
  }
}
const csvfn = "cedict_ts.csv";
head.csv = csvfn;
console.log(head);
await Deno.writeTextFile("cedict_ts.json", JSON.stringify(head, null, 2));

const list = [];
for (const s0 of ss) {
  const s = s0.trim();
  if (s.startsWith("#")) continue;
  const n = s.indexOf("/");
  const means = s.substring(n + 1, s.length - 1);
  const n2 = s.indexOf("[");
  const pron = s.substring(n2 + 1, n - 2);
  const n3 = s.indexOf(" ");
  const kanji = s.substring(0, n3);
  const kanji_s = s.substring(n3 + 1, n2 - 1);
  list.push({ kanji, kanji_s, pron, means });
}
await Deno.writeTextFile("cedict_ts.csv", CSV.stringify(list));
