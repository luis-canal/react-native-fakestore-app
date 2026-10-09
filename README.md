# StoreApp

Aplicativo de loja desenvolvido com React Native e Expo. O app permite fazer login, navegar por produtos e categorias e consultar os detalhes dos produtos. Os dados de autenticação e catálogo são obtidos da API [DummyJSON](https://dummyjson.com/).

## Requisitos

- Node.js (versão LTS) e npm
- Expo Go em um dispositivo Android/iOS, ou um emulador configurado

## Como executar

1. Clone o repositório e acesse a pasta do projeto:

   ```bash
   git clone <https://github.com/luis-canal/react-native-fakestore-app>
   cd react-native-fake-store-app
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o Expo:

   ```bash
   npm start
   ```

4. Abra o aplicativo:
   - **Dispositivo físico:** instale o Expo Go e leia o QR code exibido no terminal ou no navegador. O computador e o dispositivo devem estar na mesma rede.
   - **Android:** com um emulador aberto, execute `npx expo start --android`.
   - **iOS:** em um Mac com simulador configurado, execute `npx expo start --ios`.
   - **Web:** execute `npx expo start --web`.

## Login e usuários disponíveis

O login é validado pela API DummyJSON. Na tela de login, use o botão **Preencher acesso** para preencher automaticamente as credenciais de demonstração e depois toque em **Entrar**:

- **Usuário:** `emilys`
- **Senha:** `emilyspass`

Esse botão aparece somente no ambiente de desenvolvimento. Para consultar os usuários disponibilizados pela API, acesse [`https://dummyjson.com/users`](https://dummyjson.com/users); cada registro inclui o nome de usuário. A API de autenticação aceita as credenciais dos usuários de demonstração.

## Integrantes

| Nome | RA |
| --- | --- |
| Eduardo Pagliarini Herter | 1138269 |
| Guilherme Vassoler Daros | 1138143 |
| Kaiki André Pauletto | 1138218 |
| Luis Eduardo Brescansin Canal | 1137999 |
