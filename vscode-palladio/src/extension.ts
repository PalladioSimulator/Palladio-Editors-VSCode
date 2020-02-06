// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as os from 'os';

import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions
} from 'vscode-languageclient';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "palladio-ls" is now active!');

    // LSP client & server Options
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

    let disposable = new LanguageClient('Palladio', serverOptions, clientOptions).start();
    vscode.window.showInformationMessage('Palladio Language Server Started!');

    context.subscriptions.push(disposable);
}
