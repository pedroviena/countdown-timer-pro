# 📦 Guia de Instalação - Countdown Timer Pro

## Instalação Rápida (5 minutos)

### 1. Download do Plugin
1. Acesse sua conta no marketplace do Framer
2. Baixe o arquivo `countdown-timer-pro.tsx`
3. Salve em uma pasta de fácil acesso

### 2. Importação no Framer
1. Abra seu projeto no Framer
2. Vá em **Assets** → **Code Components**
3. Clique em **"+"** → **"Import from File"**
4. Selecione o arquivo `countdown-timer-pro.tsx`
5. Aguarde a importação (30-60 segundos)

### 3. Primeiro Uso
1. Arraste o componente para sua tela
2. Configure no painel de propriedades:
   - **Mode**: Specific Date/Time
   - **Target Date**: 2024-12-31T23:59:59
   - **Theme**: Modern
3. Publique e teste!

## Configuração Avançada

### Configuração de Timezone
\`\`\`
Para eventos globais:
1. Mode: Specific Date/Time
2. Target Date: 2024-06-15T18:00:00
3. Timezone: Europe/London
4. Resultado: Countdown preciso para Londres
\`\`\`

### Configuração Dinâmica
\`\`\`
Para ofertas limitadas:
1. Mode: Dynamic Duration
2. Duration: 30 minutos
3. Reset on Session: false
4. Resultado: 30min para cada novo visitante
\`\`\`

### Integração com Google Analytics
\`\`\`
1. Certifique-se que GA4 está instalado
2. Send GA Event: true
3. GA Event Name: "flash_sale_ended"
4. Track Milestones: true
5. Milestone %: "75,50,25,10"
\`\`\`

### Configuração de Webhook
\`\`\`
1. Action on Zero: Webhook
2. Webhook URL: https://hooks.zapier.com/hooks/catch/123/abc/
3. Payload enviado:
   {
     "timerId": "countdown-abc123",
     "status": "completed",
     "timestamp": "2024-01-15T10:30:00.000Z",
     "timezone": "UTC",
     "language": "en"
   }
\`\`\`

## Exemplos de Configuração

### E-commerce Flash Sale
\`\`\`
✅ Mode: Dynamic Duration
✅ Duration: 60 minutos
✅ Theme: Neon
✅ Action: Hide Element
✅ Element ID: "sale-banner"
✅ GA Event: "flash_sale_expired"
✅ Show Progress Bar: true
\`\`\`

### Lançamento de Produto
\`\`\`
✅ Mode: Specific Date/Time
✅ Target Date: 2024-03-15T09:00:00
✅ Timezone: America/New_York
✅ Theme: Modern
✅ Action: Redirect
✅ Redirect URL: https://produto.com/lancamento
✅ Warning Text: "Lançamento em:"
\`\`\`

### Webinar Registration
\`\`\`
✅ Mode: Specific Date/Time
✅ Target Date: 2024-02-20T19:00:00
✅ Timezone: America/Sao_Paulo
✅ Theme: Elegant
✅ Action: Webhook
✅ Webhook URL: https://api.webinar.com/start
✅ Language: pt (Português)
\`\`\`

## Troubleshooting

### Problema: Timer não aparece
**Solução:**
1. Verifique se a data está no formato correto
2. Confirme que a data é futura
3. Teste com tema "Modern" primeiro

### Problema: Webhook não executa
**Solução:**
1. Teste a URL no Postman/Insomnia
2. Verifique se aceita POST requests
3. Confirme que é HTTPS (obrigatório)

### Problema: Analytics não trackeia
**Solução:**
1. Abra DevTools → Console
2. Digite `typeof gtag` → deve retornar "function"
3. Se undefined, instale GA4 corretamente

### Problema: Timezone incorreto
**Solução:**
1. Use formato YYYY-MM-DDTHH:MM:SS
2. Não inclua timezone na data
3. Configure timezone separadamente

## Otimização de Performance

### Configurações Recomendadas
\`\`\`
✅ Animation Type: fade (mais leve)
✅ Enable Count Animation: true (suave)
✅ Show Shadow: false (melhor performance)
✅ Custom CSS: vazio (evite se possível)
✅ Enable Accessibility: true (sempre)
\`\`\`

### Configurações para Sites de Alto Tráfego
\`\`\`
✅ Reset on Session: true (reduz localStorage)
✅ Show Error Messages: false (produção)
✅ Track Milestones: false (reduz eventos GA)
✅ Enable Sound: false (economiza bandwidth)
✅ Show Progress Bar: false (menos cálculos)
\`\`\`

## Integração com Ferramentas Populares

### Zapier Integration
1. Crie um novo Zap
2. Trigger: Webhooks by Zapier
3. URL: Copie do Zapier para o plugin
4. Actions: Email, Slack, CRM, etc.

### Make.com (Integromat)
1. Crie novo cenário
2. Webhook module como trigger
3. Configure URL no plugin
4. Conecte com 1000+ apps

### Google Sheets
1. Use Google Apps Script
2. Configure webhook endpoint
3. Dados salvos automaticamente
4. Relatórios em tempo real

## Suporte e Recursos

### Documentação Completa
- **API Reference**: Todas as propriedades explicadas
- **Code Examples**: 50+ exemplos práticos
- **Video Tutorials**: Passo a passo visual
- **Best Practices**: Dicas de performance e UX

### Comunidade Ativa
- **Discord Server**: 2000+ membros ativos
- **GitHub Issues**: Bug reports e feature requests
- **YouTube Channel**: Tutoriais semanais
- **Newsletter**: Updates e dicas mensais

### Suporte Premium
- **Email**: Resposta em 24h
- **Video Call**: Consultoria personalizada
- **Custom Development**: Recursos sob medida
- **Priority Support**: Fila prioritária

---

**🎉 Parabéns!** Seu Countdown Timer Pro está configurado e pronto para uso. Para dúvidas ou suporte, entre em contato conosco.

**Próximos Passos:**
1. Teste todas as configurações
2. Configure analytics e webhooks
3. Otimize para seu caso de uso
4. Monitore performance e conversões

*Desenvolvido com ❤️ para a comunidade Framer*
