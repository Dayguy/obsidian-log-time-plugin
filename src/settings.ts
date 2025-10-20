import { App, PluginSettingTab, Setting } from 'obsidian';
import LogTimePlugin from './main';
import { DEFAULT_SETTINGS } from './main';

export class LogTimeSettingTab extends PluginSettingTab {
    plugin: LogTimePlugin;

	constructor(app: App, plugin: LogTimePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	private allValidMaskChars(userInputChars: string[]): boolean {
		const validMaskChars = ['a', 'd', 'h', 'm', 's', 'y', 'z'];
		return userInputChars.every(char => validMaskChars.includes(char));
	}	    
    
    display(): void {
		const { containerEl } = this;
		containerEl.empty();
		
		new Setting(containerEl)		
			.setName('Format mask')
			.setDesc('Refer to list of valid masks found here: https://day.js.org/docs/en/display/format')
			.addText((text) => text
				.setPlaceholder("FUCK YOU")
				.setValue(this.plugin.settings.formatMask)
				.onChange(async (value) => {
					const inputChars = value.toLowerCase().replace(/[^a-zA-Z]/g,'').split('');
					const isValid = this.allValidMaskChars(inputChars);
					if (isValid) {
						// Characters are valid for time/date mask 
						this.plugin.settings.formatMask = value;
					} else {
						// Invalid format so use the default
						this.plugin.settings.formatMask = DEFAULT_SETTINGS.formatMask;				
					}
					await this.plugin.saveSettings();
				}),
			);

            new Setting(containerEl)
                .setName('Use UTC')
                .setDesc('If not using UTC, your local time will be used.')
                .addToggle((toggle) => {
                    toggle.setValue(this.plugin.settings.isUTC).onChange(async (value) => {
                        this.plugin.settings.isUTC = value;
                        await this.plugin.saveSettings();
                    });
			});
	}
}