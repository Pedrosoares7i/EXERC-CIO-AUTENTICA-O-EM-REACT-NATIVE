# Checklist de testes manuais

Execute este roteiro no celular com o aplicativo aberto no **Expo Go**.

Antes de começar:

1. No computador, rode `npx expo start`.
2. Abra o projeto no Expo Go pelo QR code.
3. Aguarde a tela de login aparecer.

## a) Login com campos vazios

**Passo a passo**

1. Deixe o campo de e-mail vazio e o campo de senha vazio.
2. Toque em **Entrar**.
3. Repita o teste preenchendo apenas a senha e deixando o e-mail vazio.
4. Repita o teste preenchendo apenas o e-mail e deixando a senha vazia.

**Resultado esperado**

- Com o e-mail vazio, aparece a mensagem **"Informe o e-mail."** na tela.
- Com o e-mail preenchido e a senha vazia, aparece a mensagem **"Informe a senha."** na tela.
- O botão não entra em estado de carregamento e o serviço de autenticação não é chamado.
- As mensagens somem quando o usuário volta a digitar.

## b) Login com senha incorreta

**Passo a passo**

1. Informe o e-mail `aluno@etec.sp.gov.br`.
2. Informe uma senha diferente de `pam2026`, por exemplo `123456`.
3. Toque em **Entrar**.
4. Observe o botão durante o processamento.

**Resultado esperado**

- O botão mostra um indicador de carregamento e os campos ficam desabilitados.
- Após aproximadamente 1,5 segundo, aparece em vermelho a mensagem **"E-mail ou senha incorretos."**.
- O usuário permanece na tela de login.
- O indicador de carregamento termina, permitindo tentar novamente.

## c) Login com credenciais corretas

**Passo a passo**

1. Informe o e-mail `aluno@etec.sp.gov.br`.
2. Informe a senha `pam2026`.
3. Toque em **Entrar**.

**Resultado esperado**

- O botão mostra o indicador de carregamento durante o login.
- A área restrita abre automaticamente.
- A tela exibe a mensagem **"Bem-vindo(a), João da Silva!"**.
- O cartão mostra:
  - Nome: João da Silva
  - E-mail: aluno@etec.sp.gov.br
  - Curso: Desenvolvimento de Sistemas
  - Módulo: 3º módulo
  - Token: token-meu-curso-2026
- O botão **Sair** está visível.
- O botão voltar do Android não retorna para a tela de login (a rota de login não existe enquanto há sessão).

## d) Fechar totalmente o app e reabrir

**Passo a passo**

1. Faça login com as credenciais corretas e confirme que a área restrita abriu.
2. Feche completamente o Expo Go (remova-o da lista de aplicativos recentes).
3. Abra o Expo Go novamente e abra o projeto **Meu Curso**.

**Resultado esperado**

- O aplicativo inicia a partir do zero, sem manter a tela anterior em memória.
- O teste continua no item (e), verificando a restauração da sessão salva.

## e) Sessão recuperada

**Passo a passo**

1. Execute o procedimento do item (d), reabrindo o app após um login válido.
2. Observe a primeira tela exibida.
3. Aguarde o término da verificação.

**Resultado esperado**

- Aparece a tela com o texto **"Verificando sessão..."** e um indicador de carregamento.
- Após a verificação, o app entra diretamente na área restrita, sem pedir login novamente.
- Os dados do aluno e o token continuam corretos.
- A tela de login não é exibida.

## f) Logout

**Passo a passo**

1. Na área restrita, toque em **Sair**.
2. No alerta, toque em **Cancelar**.
3. Toque em **Sair** novamente.
4. No alerta, confirme em **Sair**.
5. Feche completamente o aplicativo e abra novamente.

**Resultado esperado**

- Ao tocar em **Sair**, aparece a confirmação **"Deseja realmente sair?"** com os botões **Cancelar** e **Sair**.
- Em **Cancelar**, o usuário continua na área restrita.
- Em **Sair**, a sessão é apagada e o app volta automaticamente para a tela de login.
- Ao reabrir o aplicativo depois do logout, a tela de login é exibida (a sessão foi removida do AsyncStorage).
- O botão voltar do Android não retorna à área restrita.

## Observação

Na versão web, a confirmação de saída usa `window.confirm`, pois o `Alert` com botões não funciona no navegador.
