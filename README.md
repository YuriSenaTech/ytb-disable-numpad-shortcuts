# Disable YouTube Number Shortcuts

Extensão para Chrome (e navegadores Chromium) que **bloqueia as teclas 0–9 no YouTube**, evitando pular para outra parte do vídeo sem querer — principalmente ao usar o teclado numérico (numpad).

Alternativa de código aberto e auditável à extensão "Disable YouTube Number Keyboard Shortcuts" da Chrome Web Store.

## Por que confiar
- **Zero permissões** no `manifest.json` — só injeta um content script no YouTube.
- **Sem rede, sem armazenamento, sem coleta de dados.**
- Todo o código são ~30 linhas em [`extension/content.js`](extension/content.js).

## Como funciona
Um listener na fase de captura do `window` (registrado em `document_start`, antes dos handlers do YouTube) descarta `keydown`/`keypress`/`keyup` de `0`–`9`, fileira superior e numpad com NumLock ligado.

Não interfere em:
- digitação em busca, comentários e qualquer campo editável;
- `Ctrl`/`Alt`/`Meta` + número (troca de abas do navegador);
- as demais teclas do player (`k`, `j`, `l`, espaço, setas, `f`…).

## Instalar (modo desenvolvedor)
1. Baixe/clone este repositório.
2. Abra `chrome://extensions` e ative **Modo do desenvolvedor**.
3. Clique em **Carregar sem compactação** e selecione a pasta [`extension/`](extension/).
4. Recarregue as abas do YouTube.

## Desenvolvimento
```bash
npm test                     # testes unitários (Node ≥ 18, sem dependências)
python scripts/make-icons.py # regenera os ícones (requer Pillow)
```

## Licença
[MIT](LICENSE)
