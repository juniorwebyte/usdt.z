# 💠 Tether USDBridged ZED20 (USDT.z)

**Tether USDBridged ZED20 (USDT.z)** é uma stablecoin multichain com foco em transparência, segurança e funcionalidade DeFi avançada. Com lastro auditável, suporte a flash loans, controle de acesso e compatibilidade com múltiplas redes EVM, o USDT.z é ideal para aplicações financeiras modernas e interoperáveis.

---

## ✨ Recursos Principais

- 🏦 **Lastro Auditável** – Permite declarar e comprovar reservas de forma pública (on-chain/off-chain).
- ⚡ **Flash Loans** – Empréstimos instantâneos, executáveis em uma única transação sem colateral.
- 🔐 **Access Control (RBAC)** – Controle de funções administrativas com base em papéis.
- 🚫 **Blacklist Dinâmica** – Proteção contra endereços maliciosos ou sancionados.
- ⏸️ **Emergency Pause** – Travamento imediato de funcionalidades críticas em caso de risco.
- 🌐 **Multichain EVM** – Funciona em Ethereum, BSC, Arbitrum, e outras redes compatíveis com EVM.
- 🧬 **Pools Autorizadas** – Gerenciamento de liquidez em DEXs específicas.
- 🗳️ **Governança DAO (Opcional)** – Estrutura para descentralização progressiva.

---

## ⚙️ Tecnologias Utilizadas

- Solidity ^0.8.x  
- OpenZeppelin Contracts  
- Chainlink (opcional)  
- Hardhat / Remix / Foundry  

---

## 🧠 Resumo Técnico dos Contratos

Este projeto contém três contratos principais baseados no padrão ERC20:

### 🔷 `TetherToken (USDT.z)`
Stablecoin avançada com:

- Cunhagem e pausa via `AccessControl`
- Flash Loans nativos com taxa de 0.05%
- Supply máximo: 1 trilhão de tokens
- Autorização de DEXs com `DEX_ROLE`
- Mint em lote com `batchMint()`
- Validação de transferências com `_beforeTokenTransfer`

### 💵 `USDT`
Versão simples do token com:

- Cunhagem controlada via `MINTER_ROLE`
- Função de pausa via `PAUSER_ROLE`
- Sem flash loans ou DEX autorizadas

### 🪙 `USDTz`
Variante leve com as mesmas permissões do `USDT`, porém com branding próprio para uso paralelo ou experimental.

Todos os contratos são pausáveis, auditáveis e seguros com base nas bibliotecas da OpenZeppelin.

---

## 🚀 Como Fazer o Deploy com Remix

1. Acesse: [Remix Ethereum IDE](https://remix.ethereum.org)
2. Importe o contrato `USDTz.sol`
3. Compile com `Solidity ^0.8.x`
4. Deploy para a rede desejada (Ethereum, BNB Chain, etc.)
5. Execute `grantRole` para configurar permissões

---

## 🔐 Segurança

- Proteção contra reentrância em flash loans  
- Pausa de emergência para cenários críticos  
- Validação de pares e contratos autorizados  
- Controle de acesso descentralizado e auditável  

---

## 💡 Casos de Uso

- Plataformas DeFi que exigem estabilidade e transparência  
- Serviços de remessa internacional com stablecoins confiáveis  
- Estratégias de arbitragem com flash loans integrados  
- Soluções institucionais com conformidade regulatória  

---

## ✅ Compatibilidade

- Ethereum  
- BNB Smart Chain  
- Arbitrum  
- Optimism  
- Base  
- Polygon  
- Qualquer rede EVM

---

## 📜 Licença

Distribuído sob a [MIT License](./LICENSE).  
© 2024 Webyte Desenvolvimentos. Todos os direitos reservados.

---

## 🤝 Contribuições

Sinta-se livre para abrir **issues**, enviar **pull requests** ou sugerir melhorias. Toda colaboração é bem-vinda!

---

## 📬 Contato

Desenvolvido por **Webyte Desenvolvimentos**  
🌐 Site: https://webytebr.com  
💬 Telegram: @juniorwebyte  
🐦 Twitter: @juniorwebyte
