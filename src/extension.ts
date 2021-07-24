import * as vscode from 'vscode';
import generateSection from './commands/generateSection';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('site-generator.generateSection', generateSection)
	);
}

// this method is called when your extension is deactivated
export function deactivate() {}
