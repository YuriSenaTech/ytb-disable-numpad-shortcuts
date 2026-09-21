const test = require("node:test");
const assert = require("node:assert");
const { shouldBlock } = require("../extension/content.js");

const ev = (key, extra = {}, target = { tagName: "BODY" }) => ({
  key, ctrlKey: false, altKey: false, metaKey: false, target, ...extra,
});

test("bloqueia 0-9 (fileira superior e numpad com NumLock)", () => {
  for (const k of "0123456789") assert.strictEqual(shouldBlock(ev(k)), true, k);
});

test("não bloqueia outras teclas (k, espaço, setas, End do numpad sem NumLock)", () => {
  for (const k of ["k", " ", "ArrowLeft", "End", "Home", "f"]) {
    assert.strictEqual(shouldBlock(ev(k)), false, k);
  }
});

test("não bloqueia Ctrl/Alt/Meta + número (atalhos do navegador)", () => {
  for (const m of ["ctrlKey", "altKey", "metaKey"]) {
    assert.strictEqual(shouldBlock(ev("1", { [m]: true })), false, m);
  }
});

test("não bloqueia digitação em campos editáveis", () => {
  for (const tagName of ["INPUT", "TEXTAREA", "SELECT"]) {
    assert.strictEqual(shouldBlock(ev("5", {}, { tagName })), false, tagName);
  }
  assert.strictEqual(shouldBlock(ev("5", {}, { tagName: "DIV", isContentEditable: true })), false);
});
