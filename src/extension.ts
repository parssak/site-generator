import * as vscode from 'vscode';
import addSection from './commands/addSection';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('site-generator.addSection', addSection)
	);
}

// this method is called when your extension is deactivated
export function deactivate() {}
