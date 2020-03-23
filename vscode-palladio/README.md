# Palladio Language Server VS Code extension

## VS Code extension development

VS Code is the Client side of the Language Server Protocol. 

Basically, there are two ways to use a language server: an external server or an embedded one with the extension. In this project, the language server is embedded within the extension.

![hello](https://raw.githubusercontent.com/merlinz165/Palladio-Editors-VSCode-Assets/master/images/Xtext-LSP-Diagram2.png)

In this case, the lifecycles of the extension and the server are the same, and we don't need to care about the server separately. (reference: [INTEGRATING XTEXT LANGUAGE SERVER SUPPORT IN VISUAL STUDIO CODE](https://blogs.itemis.com/en/integrating-xtext-language-support-in-visual-studio-code))

This project was created using the scaffolding tool [YEOMAN](https://yeoman.io/) and [VS Code Extension Generator](https://www.npmjs.com/package/generator-code).

### Developing the extension

1. Copy/Download the LS binary to the extension
2. Register language to the Client  
	`vscode-languageclient`: npm module to talk to a VSCode language server from a VSCode extension.
	
	```ts
	    // The Server is a locally installed in ../build/palladio-ls/
	    let executable = os.platform() === 'win32' ? 'palladio-ls.bat' : 'palladio-ls';
	    let serverLauncher = context.asAbsolutePath(path.join(
	        'build', 'palladio-languageserver', 'bin', executable
	    ));
	
	    let serverOptions: ServerOptions = {
	        run: { command: serverLauncher },
	        debug: { command: serverLauncher }
	    };
	
	    let clientOptions: LanguageClientOptions = {
	        documentSelector: ['palladio'],
	        synchronize: {
	            fileEvents: vscode.workspace.createFileSystemWatcher('**/*.*')
	        }
	    };
	```
3. Packaging

## Build & Automate

Most of the work is done by Gradle, the role of Maven is just to invoke Gradle.

### Gradle

All tasks are defined in `build.gradle`

**Procedure:**

1. download language server zip file and uncompress it;  
	`task downloadAndUnzipFile`
	
2.	setup npm environment and install necessary module such as vsce;  
	`task npmInstallVsce`

3. package and copy the vsix file to `rootPath/target`  
	`task packageVSExtension` `task copyVSExtensionToTarget`

### Maven

Maven invoke Gradle using `exec-maven-plugin`

```xml
<plugin>
    <groupId>org.codehaus.mojo</groupId>
    <artifactId>exec-maven-plugin</artifactId>
    <version>1.6.0</version>
    <executions>
        <execution>
            <id>gradle-package</id>
            <phase>package</phase>
            <configuration>
                <executable>${gradle.executable}</executable>
                <arguments>
                    <argument>copyVSExtensionToTarget</argument>
                </arguments>
            </configuration>
            <goals>
                <goal>exec</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

## Further Work

- make it nice
	- Syntax highlighting ([TextMate grammar](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide#textmate-grammars))

- Connect with Palladio Simulation or other Palladio components	