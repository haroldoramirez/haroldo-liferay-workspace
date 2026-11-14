# Angular Liferay Start Portlet (`angular-liferay-start-portlet`)

Módulo híbrido desenvolvido para o **Liferay 7.4 CE**, combinando uma interface **SPA em Angular** no front-end com o ecossistema nativo de portlets **OSGi (Java)** no back-end (`MVCPortlet` / `MVCResourceCommand`). O empacotamento final gera um único artefato `.jar` pronto para deploy no servidor Liferay.

---

## 🛠️ Tecnologias e Ambiente

* **Liferay Portal:** 7.4 CE (BOM `7.4.3.132`)
* **Java / JDK:** JDK 21
* **Gerenciador de Build:** Apache Maven (integrado ao `liferay-workspace`)
* **Front-end:** Angular `5.2.11` + TypeScript `~2.6.2`
* **Empacotador Front-end Liferay:** `liferay-npm-bundler` `2.32.2`
* **Node.js (gerenciado via Maven):** `v16.20.2`

---

## 🚀 Passo a Passo de Criação e Configuração

### 1. Criação Inicial via Liferay IDE / Developer Studio
O esqueleto base do projeto foi gerado utilizando o assistente oficial do **Liferay IDE Studio**:
1. No menu superior, acessamos **File ➔ New ➔ Liferay Module Project**.
2. Definimos o nome do projeto como `angular-liferay-start-portlet` dentro da pasta `modules/` do Liferay Workspace (`haroldo-liferay-workspace`).
3. Selecionamos o **Build Type** como **Maven** e o **Project Template Name** como **`npm-angular-portlet`**.

---

### 2. Ajustes no `pom.xml` (Compatibilidade com JDK 21 e Maven)
O template padrão gerado pelo Liferay IDE trazia configurações legadas e placeholders do Gradle (`@...@`). Foram realizados os seguintes ajustes no `pom.xml`:

* **Suporte ao JDK 21:** Definidas as propriedades `<maven.compiler.source>21</maven.compiler.source>`, `<maven.compiler.target>21</maven.compiler.target>` e `<maven.compiler.release>21</maven.compiler.release>`, além da atualização do `maven-compiler-plugin` para a versão `3.13.0`.
* **Atualização do Bnd para Bytecode Java 21:** Atualizado o `bnd-maven-plugin` e a biblioteca `biz.aQute.bndlib` para a versão `7.0.0`, substituindo os placeholders `@biz.aQute.bnd.version@` e `@com.liferay.ant.bnd.version@` por versões explícitas (`7.0.0` e `3.2.12`).
* **Substituição do Yarn pelo NPM no `frontend-maven-plugin`:** Atualizado o plugin para a versão `1.15.0` utilizando o Node `v16.20.2` e executando `npm install --legacy-peer-deps` e `npm run build`.

---

### 3. Limpeza e Alinhamento do `package.json`
O `package.json` original do template misturava dependências do Angular 5, 7 e 12, além de pacotes obsoletos (`gulp`, `webpack`, `node-sass`) e o pacote descontinuado `liferay-npm-bundler-preset-angular`. O arquivo foi higienizado para:

```json
{
	"name": "angular-liferay-start-portlet",
	"version": "1.0.0",
	"description": "Angular Portlet para Liferay 7.4",
	"main": "lib/angular-loader.js",
	"scripts": {
		"build": "tsc && liferay-npm-bundler"
	},
	"dependencies": {
		"@angular/animations": "^5.2.11",
		"@angular/common": "^5.2.11",
		"@angular/compiler": "^5.2.11",
		"@angular/core": "^5.2.11",
		"@angular/forms": "^5.2.11",
		"@angular/http": "^5.2.11",
		"@angular/platform-browser": "^5.2.11",
		"@angular/platform-browser-dynamic": "^5.2.11",
		"@angular/router": "^5.2.11",
		"@ngx-translate/core": "^9.1.1",
		"core-js": "^2.5.4",
		"rxjs": "^5.5.12",
		"zone.js": "0.8.26"
	},
	"devDependencies": {
		"@angular/compiler-cli": "^5.2.11",
		"@types/jasmine": "2.5.48",
		"@types/node": "8.0.53",
		"liferay-npm-bundler": "2.32.2",
		"typescript": "~2.6.2"
	}
}
```
* **Destaque:** A versão de `@types/node` foi fixada em `8.0.53` para manter compatibilidade com a sintaxe suportada pelo `typescript ~2.6.2`.

---

### 4. Configuração do TypeScript (`tsconfig.json`) e Bundler (`.npmbundlerrc`)
Para evitar que o compilador TypeScript (`tsc`) falhasse ao tentar validar arquivos de definição de tipos transitivos dentro de `node_modules/@types` (como o erro `TS2688: Cannot find type definition file for 'minimatch'`), ajustamos o `tsconfig.json`:

* Adicionado `"skipLibCheck": true` para ignorar checagens em bibliotecas de terceiros.
* Adicionado `"types": ["node"]` e `"exclude": ["node_modules"]` para restringir o escopo de tipos carregados automaticamente.

No arquivo `.npmbundlerrc`, removemos a referência ao preset legado (já embutido no `liferay-npm-bundler 2.32.2`) e garantimos o redirecionamento da saída para o diretório padrão do Maven (`target/classes/META-INF/resources`).

---

## 📦 Como Compilar e Gerar o Pacote `.jar`

Na raiz do módulo (`modules/angular-liferay-start-portlet`), execute:

```bash
mvn clean package
```

### O que acontece durante o build:
1. O `frontend-maven-plugin` baixa o Node `v16.20.2` isoladamente na pasta `target/node`.
2. Executa `npm install --legacy-peer-deps` para baixar os pacotes do Angular.
3. Executa `npm run build` (`tsc && liferay-npm-bundler`), transpilando o TypeScript e empacotando os módulos AMD para o loader do Liferay em `target/classes/META-INF/resources`.
4. O `maven-compiler-plugin` compila as classes Java (`MVCPortlet` e comandos OSGi) com target para **JDK 21**.
5. O `bnd-maven-plugin` gera o `MANIFEST.MF` com os metadados OSGi e o `maven-jar-plugin` empacota tudo em:
   ```text
   target/angular-liferay-start-portlet-1.0.0.jar
   ```

---

## 🚢 Deploy no Liferay 7.4

Copie o arquivo `.jar` gerado em `target/angular-liferay-start-portlet-1.0.0.jar` para a pasta `${LIFERAY_HOME}/deploy` da sua instância Liferay 7.4. Após o processamento pelo OSGi container, o portlet estará disponível na categoria **Sample** (ou na categoria configurada no `@Component` da classe Portlet) para ser adicionado a qualquer página do portal.