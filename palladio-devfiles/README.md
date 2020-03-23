# Eclipse Che devfile generator

This subproject will update the information in `plugins/palladio-lsp.yaml` and `devfile.yaml` during the build process.

## plug-in meta.yaml

`plugins/palladio-lsp.yaml` is the meta.yaml of the Che plug-in. It specifies the vscode extension URL and container where the extension runs in. It also contains some basic information.

Palladio Language Server requires a Java runtime environment, so we specify a java11 container for it.

```Yaml
spec:
  containers:
    - image: "docker.io/eclipse/che-remote-plugin-runner-java11:next"
      name: vscode-palladio
      memoryLimit: "768Mi"
  extensions:
    - https://palladio-languageserver.vsix
```

Read [this document](https://www.eclipse.org/che/docs/che-7/using-a-visual-studio-code-extension-in-che/) for more information.

## devfile

> A devfile defines the configuration of the workspace, which is the developer’s environment. This definition is portable - we can create any number of identical workspaces from the same devfile. Anyone can share a devfile and everyone using this devfile will get the same workspace including projects, tooling, commands, etc… (source: [Discover Eclipse Che 7 : devfile](https://che.eclipse.org/discover-che-7-devfile-85a8cc83d860))

devfile in this project only contains the palladio language support plug-in and a palladio sample project.

```Yaml
apiVersion: 1.0.0
metadata:
  generateName: KIT-Palladio-
projects:
  - name: palladio-sample
    source:
      type: git
      location: 'https://github.com/merlinz165/palladio-sample.git'
components:
  - type: chePlugin
    reference: 'https://palladio-lsp.yaml'
    alias: vscode-palladio
```

For more information, read [this document](https://www.eclipse.org/che/docs/che-7/making-a-workspace-portable-using-a-devfile/).