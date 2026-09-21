// Bloqueia os atalhos numéricos (0-9) do player do YouTube.
// Roda em document_start, na fase de captura do window, antes dos handlers do YouTube.

const EDITABLE_TAGS = new Set(["INPUT", "TEXTAREA", "SELECT"]);

function isEditable(target) {
  return !!target && (target.isContentEditable || EDITABLE_TAGS.has(target.tagName));
}

// Digitar em busca/comentários continua funcionando; Ctrl/Alt/Meta+número
// (troca de aba do navegador) não é tocado.
function shouldBlock(event) {
  if (event.ctrlKey || event.altKey || event.metaKey) return false;
  if (!/^[0-9]$/.test(event.key)) return false;
  const target = typeof event.composedPath === "function" ? event.composedPath()[0] : event.target;
  return !isEditable(target);
}

function onKey(event) {
  if (shouldBlock(event)) event.stopImmediatePropagation();
}

if (typeof window !== "undefined" && typeof module === "undefined") {
  for (const type of ["keydown", "keypress", "keyup"]) {
    window.addEventListener(type, onKey, true);
  }
}

if (typeof module !== "undefined") module.exports = { shouldBlock };
