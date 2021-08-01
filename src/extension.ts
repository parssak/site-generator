import * as vscode from 'vscode';
import generateSection from './commands/generateSection';
import generatePage from './commands/generatePage';
import generateProject from './commands/generateProject';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('site-generator.generateSection', generateSection)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('site-generator.generatePage', generatePage)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('site-generator.generateProject', generateProject)
	);
}

// this method is called when your extension is deactivated
export function deactivate() {}
