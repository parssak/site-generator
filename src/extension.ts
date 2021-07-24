import * as vscode from 'vscode';
import generateSection from './commands/generateSection';
import generatePage from './commands/generatePage';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('site-generator.generateSection', generateSection)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('site-generator.generatePage', generatePage)
	);
}

// this method is called when your extension is deactivated
export function deactivate() {}
