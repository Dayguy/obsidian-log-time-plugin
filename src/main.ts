import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(utc);
dayjs.extend(customParseFormat);

interface LogtimeSettings {
	formatMask: string;
	isUTC: boolean;
}

const DEFAULT_SETTINGS: LogtimeSettings = {
	formatMask: 'HH:mm',
	isUTC: true,
};

export default class LogtimePlugin extends Plugin {
	public settings: LogtimeSettings;
	private readonly logtimeTrigger = '-:-';



	async onload() {
		console.log('Time Log plugin loaded.');

		await this.loadSettings();

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('dice', 'Sample Plugin', (_evt: MouseEvent) => {
			// Called when the user clicks the icon.
			new Notice('This is a notice!');
		});
		// Perform additional things with the ribbon
		ribbonIconEl.addClass('my-plugin-ribbon-class');

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Status Bar Text');

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-sample-modal-simple',
			name: 'Open sample modal (simple)',
			callback: () => {
				new SampleModal(this.app).open();
			}
		});
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'sample-editor-command',
			name: 'Sample editor command',
			editorCallback: (editor: Editor, _view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection('Sample Editor Command');
			}
		});
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: 'open-sample-modal-complex',
			name: 'Open sample modal (complex)',
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// If checking is true, we're simply "checking" if the command can be run.
					// If checking is false, then we want to actually perform the operation.
					if (!checking) {
						new SampleModal(this.app).open();
					}

					// This command will only show up in Command Palette when the check function returns true
					return true;
				}
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new LogtimeSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

class LogtimeSettingTab extends PluginSettingTab {
	plugin: LogtimePlugin;

	constructor(app: App, plugin: LogtimePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	private allValidMaskChars(userInputChars: string[]): boolean {
		const validMaskChars = ['y', 'm', 'd', 'h', 's', 'z', 'a'];
		return userInputChars.every(char => validMaskChars.includes(char));
	}	

	display(): void {
		const {containerEl} = this;
		let validMaskChars = true;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Format Mask')
			.setDesc('If you aren\'t sure, see a list of format masks here: https://day.js.org/docs/en/display/format')
			.addText(text => text
				.setPlaceholder('HH:mm')
				.setValue(this.plugin.settings.formatMask)
				.onChange(async (value: string) => {

					// Capture the alphas from the user input in an array
					const regex = /[a-zA-Z]/g;
					const inputAlphas = value.toLowerCase().match(regex);

					// Test to ensure the array only contains valid mask letters, i.e. HH:mm
					if (inputAlphas !== null) {
						validMaskChars = this.allValidMaskChars(inputAlphas);
						console.log(validMaskChars); // Using just to clear the problem message
					}
					
					// Set the validated user input as the mask
					this.plugin.settings.formatMask = value;
					await this.plugin.saveSettings();
				}));
	}
}
