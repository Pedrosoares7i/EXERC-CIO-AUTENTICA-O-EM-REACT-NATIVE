# Meu Curso

Aplicativo mobile desenvolvido em **React Native com Expo** para o trabalho acadêmico do Curso Técnico de Desenvolvimento de Sistemas, componente **Programação Mobile**.

O app simula a autenticação de um aluno. Após o login, o usuário acessa uma área restrita com seus dados acadêmicos. A sessão é persistida no dispositivo e restaurada automaticamente ao abrir o aplicativo.

## Funcionalidades

- Login com validação de campos vazios.
- Autenticação simulada (sem API real), com tempo de resposta de aproximadamente 1,5 segundo.
- Mensagem de erro para credenciais incorretas.
- Indicador de carregamento no botão durante o login.
- Sessão persistida com AsyncStorage e controlada pela Context API.
- Tela "Verificando sessão..." ao abrir o app.
- Área restrita com nome, e-mail, curso, módulo e token.
- Logout com confirmação.
- Rota protegida: a área restrita só existe quando há um token válido.
- Layout responsivo com SafeAreaView, KeyboardAvoidingView e ScrollView.

## Credenciais de teste

| Campo | Valor |
| --- | --- |
| E-mail | `aluno@etec.sp.gov.br` |
| Senha | `pam2026` |

O e-mail é comparado ignorando espaços nas pontas e diferenças entre maiúsculas e minúsculas. A senha é comparada exatamente.

## Tecnologias

- React Native
- Expo (JavaScript puro, sem TypeScript e sem expo-router)
- React Navigation (native stack)
- Context API
- AsyncStorage
- Componentes nativos do React Native e StyleSheet

## Como instalar e rodar

Pré-requisitos:

- Node.js instalado.
- Aplicativo **Expo Go** instalado no celular (Android ou iOS).
- Celular e computador na mesma rede Wi-Fi.

No diretório do projeto, execute:

```bash
npm install
npx expo start
```

Em seguida:

1. Abra o aplicativo Expo Go no celular.
2. Escaneie o QR code exibido no terminal ou na página aberta pelo Expo.
3. Aguarde o carregamento do aplicativo **Meu Curso**.

Também é possível executar no emulador:

```bash
npm run android
```

ou

```bash
npm run ios
```

## Estrutura de pastas

```text
.
├── App.js
├── app.json
├── index.js
├── package.json
├── README.md
├── TESTES.md
├── assets/
└── src/
    ├── theme.js
    ├── contexts/
    │   └── AuthContext.js
    ├── navigation/
    │   └── AppNavigator.js
    ├── screens/
    │   ├── HomeScreen.js
    │   ├── LoadingScreen.js
    │   └── LoginScreen.js
    └── services/
        └── authService.js
```

## Explicação resumida

### Context API

O `AuthContext` centraliza o estado de autenticação do aplicativo. Ele disponibiliza `user`, `token`, `loading`, `login` e `logout` para todas as telas por meio do hook `useAuth()`. Assim, o login, a área restrita e a navegação compartilham a mesma fonte de verdade, sem necessidade de passar props manualmente entre as telas.

### AsyncStorage

O AsyncStorage é usado para guardar a sessão no dispositivo. Ao fazer login, o app salva apenas `{ user, token }` na chave `@meucurso:session`; a senha nunca é armazenada. Ao abrir o aplicativo, o `AuthProvider` lê essa chave, valida o conteúdo e restaura a sessão. Se o conteúdo estiver ausente ou corrompido, a chave é descartada e o usuário permanece na tela de login.

### Rota protegida

O `AppNavigator` verifica o estado do contexto. Enquanto a sessão é recuperada, exibe a tela de carregamento. Sem token, o navegador registra somente a tela de login. Com token, registra somente a tela da área restrita. Dessa forma, não é possível acessar a Home sem autenticação, inclusive pelo botão voltar do Android, e a navegação muda automaticamente após login ou logout.

## Testes manuais

O roteiro completo com os seis testes obrigatórios está em [TESTES.md](./TESTES.md).
